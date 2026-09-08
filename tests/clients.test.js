import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import configure from '../vite.config.js';
import { client as acerto } from '../src/data/clients/acerto/config.js';
import { events as acertoEvents } from '../src/data/clients/acerto/events.js';
import { client as mercantil } from '../src/data/clients/banco-mercantil/config.js';
import { events as mercantilEvents } from '../src/data/clients/banco-mercantil/events.js';
import { brazilSessions } from '../src/data/brazil.js';
import { createContentSources, dayPlans } from '../src/data/content/index.js';
import { composeDay } from '../src/utils/today.js';
import { trip } from '../src/data/trip.js';

test('build selection resolves each client and keeps Mercantil as the default', async () => {
  const previous=process.env.AGENDA_CLIENT;
  try {
    for (const id of ['banco-mercantil','acerto',undefined]) {
      if(id) process.env.AGENDA_CLIENT=id; else delete process.env.AGENDA_CLIENT;
      const config=await configure({mode:'test'});
      const expected=id || 'banco-mercantil';
      for(const [alias,file] of [['#client-events','events.js'],['#client-config','config.js']])
        assert.equal(config.resolve.alias[alias],resolve('src/data/clients',expected,file));
      assert.equal(config.base,'/');
    }
    process.env.AGENDA_CLIENT='../../other';
    await assert.rejects(configure({mode:'test'}),/Unsupported agenda client/);
  } finally { if(previous===undefined) delete process.env.AGENDA_CLIENT; else process.env.AGENDA_CLIENT=previous; }
});

test('Acerto has its own identity and storage with the confirmed shared contacts', () => {
  assert.equal(acerto.name,'Acerto');
  assert.equal(acerto.agendaTitle,'Acerto @ Dreamforce 2026');
  assert.deepEqual(acerto.teamContacts,mercantil.teamContacts);
  assert.equal(acerto.whatsappNumber,mercantil.whatsappNumber);
  for(const key of ['favoritesKey','sundayPreferenceKey','logo']) assert.notEqual(acerto[key],mercantil[key]);
  for(const key of ['small','large']) assert.notEqual(acerto.appIcons[key],mercantil.appIcons[key]);
});

test('Acerto day plans use its full agenda without introducing Mercantil-only events', () => {
  assert.equal(acertoEvents.length,27);
  assert.equal(new Set([...acertoEvents,...brazilSessions].map(e=>e.id)).size,35);
  const sources=createContentSources(acertoEvents);
  const expectedKeys=Object.keys(mercantilEvents[0]).sort();
  for(const event of acertoEvents) {
    assert.deepEqual(Object.keys(event).sort(),expectedKeys);
    assert.equal(event.eventCategory,'suggested');
  }
  for(const [date,count] of [['2026-09-15',6],['2026-09-16',12],['2026-09-17',9]]) {
    const day=composeDay(date,dayPlans,sources,trip);
    assert.equal(day.agenda.length,count);
    assert.ok(day.agenda.every(e=>acertoEvents.includes(e.content)));
    assert.equal(day.evening.length,1);
  }
  assert.ok(!acertoEvents.some(e=>e.id==='tue-an-event-driven-multi-cloud'));
  assert.ok(!mercantilEvents.some(e=>e.id==='wed-unlock-the-full-potential-of'));
  const text=JSON.stringify(acertoEvents);
  for(const phrase of ['Anchor deal','bank-partner motion','Melhor Dívida','nine institutions','renewal conversation','headcount argument','their Slack footprint','their size','operating constraint','Path Optimizer ask','what they are buying'])
    assert.ok(!text.includes(phrase),phrase);
});
