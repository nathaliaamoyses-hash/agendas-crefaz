import test from 'node:test';
import assert from 'node:assert/strict';
import { events } from '../src/data/events.js';
import { brazilSessions } from '../src/data/brazil.js';
import { recordedSessions } from '../src/data/recordedsessions.js';
import { client } from '#client-config';
import { sessionsForView, liveSessions, conferenceCopy } from '../src/data/conference.js';
import { toUtcComponents } from '../src/utils/calendar.js';
import { routeMaps } from '../src/data/routeMaps.js';

test('Mercantil, Brazilian live sessions, and recordings stay in their intended collections', () => {
  assert.equal(client.id,'banco-mercantil');
  assert.equal(events.length,20); assert.equal(brazilSessions.length,8); assert.equal(recordedSessions.length,24);
  assert.equal(sessionsForView('all'),events); assert.equal(sessionsForView('brazil'),brazilSessions);
  const selected=new Set([events[0].id,brazilSessions[0].id,recordedSessions[0].id,'deleted']);
  assert.deepEqual(sessionsForView('mySchedule',selected),[events[0],brazilSessions[0]]);
  assert.equal(liveSessions.length,28);
  assert.ok(!liveSessions.some(event=>event.id.startsWith('vod-')));
  assert.equal(new Set(liveSessions.map(e=>e.id)).size,28);
  assert.equal(conferenceCopy.recordedUrl,'https://www.salesforce.com/plus');
});

test('calendar conversions use SF time on Brazilian and other devices, including midnight and winter', () => {
  const old=process.env.TZ;
  try { for(const zone of ['America/Sao_Paulo','UTC','Asia/Tokyo']) {
    process.env.TZ=zone;
    assert.deepEqual(toUtcComponents('2026-09-15','10:00'),{iso:'2026-09-15T17:00:00Z',compact:'20260915T170000Z'});
    assert.equal(toUtcComponents('2026-09-16','22:00').iso,'2026-09-17T05:00:00Z');
    assert.equal(toUtcComponents('2026-12-01','10:00').iso,'2026-12-01T18:00:00Z');
  }} finally { if(old===undefined) delete process.env.TZ; else process.env.TZ=old; }
});

test('client-facing data omits internal account commentary across all visible fields', () => {
  const text=JSON.stringify(events);
  for(const phrase of ['footprint they do not have','without deep platform expertise','for this account','Bruno Simão','expansion motion','Ahead of the current footprint','50+ demographic','emerging WAME interest']) assert.ok(!text.includes(phrase),phrase);
  assert.equal(client.teamContacts.length,3);
  assert.match(client.favoritesKey,/banco-mercantil/);
});

test('Do Both map uses the approved direct car leg, retaining sightseeing and dinner legs', () => {
  const both=routeMaps.legs.filter(leg=>leg.routeId==='sunday-both');
  assert.ok(!JSON.stringify(both).includes('streetcar'));
  const ride=both.find(leg=>leg.origin==='buena');
  assert.equal(ride.destination,'oracle');
  assert.equal(new URL(ride.url).searchParams.get('travelmode'),'driving');
  assert.ok(both.some(leg=>leg.mode==='Cable Car'));
  assert.equal(both.at(-1).destination,'epic');
});


test('repeat live occurrences keep their selected date when also listed as recordings', () => {
  const live = events.find(e=>e.id==='wed-natural-language-marketing-getting-started');
  const vod = recordedSessions.find(e=>e.id==='vod-tue-natural-language-marketing-getting-started');
  assert.equal(live.date,'2026-09-16'); assert.equal(vod.date,'2026-09-15');
  assert.notEqual(live.id,vod.id);
});
