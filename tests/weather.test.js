import test from 'node:test'
import assert from 'node:assert/strict'
import { parseObservation, validReading, readWeather, saveWeather, weatherDisplay, requestWeather } from '../src/utils/weather.js'
import { weatherService } from '../src/data/services.js'

const now = Date.parse('2026-09-13T16:00:00Z')
const fixture = () => ({ properties: { station:'https://api.weather.gov/stations/KSFO', temperature:{value:18.3,unitCode:'wmoUnit:degC'}, textDescription:'Mostly Cloudy', timestamp:'2026-09-13T15:45:00+00:00' } })

test('weather requires a valid station, Celsius value, and recent timestamp', () => {
  const reading = parseObservation(fixture(),now)
  assert.equal(reading.temperatureC,18.3)
  assert.equal(reading.stationId,'KSFO')
  for(const mutate of [p=>p.temperature.value=null,p=>p.temperature.value=Infinity,p=>p.temperature.unitCode='wmoUnit:degF',p=>p.station='https://api.weather.gov/stations/KOAK',p=>p.station=12,p=>p.timestamp='not-a-date',p=>p.timestamp='2026-09-14T16:00:00Z',p=>p.timestamp='2026-09-10T16:00:00Z']) {
    const payload=fixture(); mutate(payload.properties)
    assert.equal(parseObservation(payload,now),null)
  }
  assert.equal(parseObservation(null,now),null)
})

test('cached observations retain timestamps and expire rather than pretending to be current', () => {
  const reading=parseObservation(fixture(),now)
  assert.equal(weatherDisplay(reading,true,now).cached,false)
  assert.equal(weatherDisplay(reading,false,now).cached,true)
  assert.equal(weatherDisplay(reading,true,now+2*3600000).cached,true)
  assert.equal(weatherDisplay(reading,true,now+25*3600000).reading,null)
  assert.equal(validReading({...reading,temperatureC:'18'},now),false)
})

test('weather cache tolerates corrupt, blocked, missing, or stale storage', () => {
  const values=new Map()
  const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)}
  const reading=parseObservation(fixture(),now)
  saveWeather(storage,reading)
  assert.deepEqual(readWeather(storage,now),reading)
  assert.equal(readWeather(storage,now+25*3600000),null)
  values.set(weatherService.cacheKey,'not JSON')
  assert.equal(readWeather(storage,now),null)
  assert.equal(readWeather(null,now),null)
  assert.doesNotThrow(()=>saveWeather(null,reading))
})

test('weather network success validates data and failures never manufacture observations', async () => {
  const reading=await requestWeather({fetchImpl:async(url,options)=>{
    assert.equal(url,weatherService.endpoint)
    assert.equal(options.credentials,'omit')
    return {ok:true,json:async()=>fixture()}
  },now:()=>now})
  assert.equal(reading.temperatureC,18.3)
  for(const fetchImpl of [async()=>{throw new Error('offline')},async()=>({ok:false}),async()=>({ok:true,json:async()=>({})})]) {
    await assert.rejects(requestWeather({fetchImpl,now:()=>now}))
  }
})

test('timeout bounds the entire request including a stalled response body', async () => {
  let signal
  await assert.rejects(requestWeather({fetchImpl:async(_,options)=>{
    signal=options.signal
    return {ok:true,json:()=>new Promise(()=>{})}
  },timeoutMs:10,now:()=>now}),/timeout/)
  assert.equal(signal.aborted,true)
})

test('unmount cancellation aborts requests and does not return a usable observation', async () => {
  const controller=new AbortController()
  controller.abort()
  await assert.rejects(requestWeather({signal:controller.signal,fetchImpl:async(_,options)=>{
    assert.equal(options.signal.aborted,true)
    return {ok:true,json:async()=>fixture()}
  },now:()=>now}))
})
