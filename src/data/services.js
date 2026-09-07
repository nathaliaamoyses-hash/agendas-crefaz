export const weatherService = {
  stationId: 'KSFO', stationLabel: 'SFO airport · NWS',
  endpoint: 'https://api.weather.gov/stations/KSFO/observations/latest',
  sourceUrl: 'https://www.weather.gov/documentation/services-web-api',
  cacheKey: 'dreamforce-sf-2026:weather:v1',
  refreshMs: 30 * 60 * 1000, freshMs: 90 * 60 * 1000,
  retainMs: 24 * 60 * 60 * 1000, timeoutMs: 8000,
}
export const serviceCopy = {
  offline: 'Your device reports no connection. Saved guides are available; maps and live services may not load.',
  external: 'Opens an external service in a new tab.',
  offlineExternal: 'This external service may need a connection. Local place details remain available here.',
  weatherObserved: 'Observed', weatherSaved: 'Last saved observation',
  weatherUnknown: 'Conditions not reported', weatherSource: 'SFO airport · NWS',
  offlineReady: 'Guides saved for offline browsing.',
  offlinePreparing: 'Open once online to save guides for offline browsing.',
  offlineUnavailable: 'Offline saving is unavailable in this browser.',
  install: 'For quick access, add this site to your home screen from your browser’s Share or menu button.',
  dismissInstall: 'Dismiss installation tip',
}
