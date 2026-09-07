import test from 'node:test'
import assert from 'node:assert/strict'
import { createContentSources } from '../src/data/content/index.js'
import { sfGuidePages } from '../src/data/sfGuides.js'
import { routes as pageRoutes, getRoute } from '../src/routing/routes.js'
import { contentPath, resolveContent, guidesForContent } from '../src/utils/content.js'

const sources = createContentSources()

test('all six guides resolve every content reference and each detail destination', () => {
  assert.deepEqual(Object.keys(sfGuidePages), ['eatDrink','onlyInSf','explore','monday','friday','practical'])
  assert.equal(new Set(pageRoutes.map(route=>route.path)).size, pageRoutes.length)
  for (const [id, page] of Object.entries(sfGuidePages)) {
    assert.ok(pageRoutes.find(route=>route.id===id))
    assert.equal(new Set(page.sections.map(section=>section.id)).size, page.sections.length)
    for (const section of page.sections) {
      for (const reference of section.entries) {
        const content = resolveContent(reference,sources)
        assert.ok(content, `Missing ${reference.kind}:${reference.id}`)
        if(section.presentation==='links') assert.ok(content.externalUrl?.startsWith('https://'))
        const path=content.path??contentPath(reference)
        if(path) assert.ok(getRoute(path), `Unreachable ${path}`)
      }
    }
  }
  assert.equal(getRoute('/sf/places/missing'),null)
})

test('Buena Vista, Napa wine shop, and Sunday landmarks remain single shared place records', () => {
  assert.equal(sources.place.filter(p=>p.id==='buena-vista').length,1)
  assert.deepEqual(guidesForContent({kind:'place',id:'buena-vista'}),[{kind:'guide',id:'eatDrink'}])
  const wine=sources.activity.find(a=>a.id==='friday-wine-stop')
  assert.equal(wine.placeId,'napa-valley-winery-exchange')
  assert.equal(resolveContent({kind:'place',id:wine.placeId},sources),sources.place.find(p=>p.id==='napa-valley-winery-exchange'))
  for(const route of sources.route) for(const stop of route.stops) assert.ok(resolveContent({kind:'place',id:stop.placeId},sources))
})

test('neighborhood links resolve in both directions and related cards have destinations', () => {
  for(const place of sources.place) {
    if(place.neighborhoodId) assert.ok(sources.neighborhood.find(n=>n.id===place.neighborhoodId))
  }
  for(const neighborhood of sources.neighborhood) {
    assert.ok(neighborhood.related.length>=3 && neighborhood.related.length<=4)
    for(const reference of neighborhood.related) {
      const record=resolveContent(reference,sources)
      assert.ok(record)
      assert.ok(getRoute(record.path??contentPath(reference)))
      if(reference.kind==='place') assert.equal(record.neighborhoodId,neighborhood.id)
    }
  }
  assert.equal(sources.place.find(p=>p.id==='city-lights').neighborhoodId,'north-beach')
  assert.equal(sources.place.find(p=>p.id==='original-joes').neighborhoodId,'north-beach')
  assert.equal(sources.place.find(p=>p.id==='amoeba-music').neighborhoodId,'haight-ashbury')
})

test('Monday and Friday suggestions preserve null schedules and the optional bike choice', () => {
  for(const [guideId,date,count] of [['monday','2026-09-14',4],['friday','2026-09-18',5]]) {
    const refs=sfGuidePages[guideId].sections[0].entries
    assert.equal(refs.length,count)
    for(const ref of refs) {
      const activity=resolveContent(ref,sources)
      assert.equal(activity.date,date)
      assert.equal(activity.status,'draft')
      assert.equal(activity.schedule,null)
      if(activity.placeId) assert.ok(sources.place.find(p=>p.id===activity.placeId))
    }
  }
  assert.equal(sources.activity.find(a=>a.id==='golden-gate-bike').optional,true)
  for(const id of ['flower-piano','fort-mason-market']) {
    const activity=sources.activity.find(a=>a.id===id)
    assert.equal(activity.placeId,null)
    assert.equal(activity.directionsUrl,null)
    assert.ok(activity.shortDescription.includes('confirmed'))
  }
})

test('unknown branches and unselected bar recommendations have no fabricated map destination', () => {
  for(const id of ['loris-diner','super-duper','boudin','cocktail-pick','view-bar-pick']) {
    const place=sources.place.find(p=>p.id===id)
    assert.equal(place.directionsUrl,null)
    assert.equal(place.address,null)
  }
  const categories=sfGuidePages.eatDrink.sections.map(section=>section.id)
  assert.deepEqual(categories,['institutions','quick','if-time','drinks'])
  assert.equal(sfGuidePages.onlyInSf.sections[0].entries.length,5)
})

test('Practical SF includes maps, transit, ferries, and weather without a live data requirement', () => {
  const links=sfGuidePages.practical.sections.find(section=>section.id==='links').entries
  for(const id of ['city-map','getting-around','ferries','layers']) assert.ok(links.some(ref=>ref.id===id))
  for(const tip of sources.practicalTip) {
    assert.equal(typeof tip.shortDescription,'string')
    if(tip.externalUrl) assert.equal(new URL(tip.externalUrl).protocol,'https:')
    for(const reference of tip.related) assert.ok(resolveContent(reference,sources))
  }
})
