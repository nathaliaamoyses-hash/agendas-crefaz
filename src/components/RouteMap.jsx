import { routeMaps } from '../data/routeMaps.js'
import { ExternalAction } from './ContentPrimitives.jsx'
const colors = { Walk: '#236b65', 'Cable Car': '#a65110', 'Taxi / rideshare': '#7860a7' }
const offsets = { ferry: [50,-35], water:[60,0],board:[10,45],alight:[0,50],nob:[-40,35],lombard:[-30,35],bottom:[25,30],buena:[10,-45],ghir:[-30,-5],east:[0,-30],west:[0,-30],bridge:[-55,0],oracle:[-15,25],epic:[-25,30] }
function point(id) { const [,lat,lon] = routeMaps.anchors[id]; return [70+(lon+122.482)*9200,45+(37.815-lat)*10500] }
export default function RouteMap({ routeId }) {
  const legs = routeMaps.legs.filter(leg => leg.routeId === routeId)
  const nodes = [...new Set([legs[0].origin, ...legs.map(leg => leg.destination)])]
  const points = nodes.map(id => { const [x,y]=point(id), [dx,dy]=offsets[id]??[0,0]; return [x+dx,y+dy] })
  const left = Math.min(...points.map(p=>p[0]))-35, top = Math.min(...points.map(p=>p[1]))-45
  const width = Math.max(...points.map(p=>p[0]))-left+35, height = Math.max(...points.map(p=>p[1]))-top+35
  const viewBox = routeId === 'sunday-both' ? `${left} ${top} ${width} ${height}` : '0 0 1000 540'
  return <details className="local-route-map"><summary>Route map and directions</summary>
    <p>Approximate locations; connecting lines show the sequence, not street paths. Swipe sideways on the map to see the full overview. Use the directions for each leg below.</p>
    <div className="route-map-scroll" tabIndex={0} role="region" aria-label="Scrollable route map"><svg viewBox={viewBox} style={routeId === 'sunday-both' ? { minWidth: '100%' } : undefined} role="img" aria-label="Geographic overview of the Sunday route">
      <rect width="1000" height="540" fill="#e7f3f4"/><path d="M0 75 L155 75 L225 100 L360 130 L500 140 L610 110 L680 130 L800 180 L870 240 L910 360 L960 455 L1000 460 L1000 540 L0 540 Z" fill="#f5f1e8"/><text x="55" y="30" fill="#486475" fontSize="17">San Francisco Bay</text>
      {legs.map((leg,i) => { const a=point(leg.origin), b=point(leg.destination); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={colors[leg.mode]} strokeWidth="4" strokeDasharray={leg.mode === 'Walk' ? undefined : '8 5'}><title>{routeMaps.anchors[leg.origin][0]} → {routeMaps.anchors[leg.destination][0]} · {leg.mode}</title></line> })}
      {nodes.map((id,i) => { const [x,y]=point(id), [dx,dy]=offsets[id]??[0,0]; return <g key={id}><title>{i+1}. {routeMaps.anchors[id][0]}</title><line x1={x} y1={y} x2={x+dx} y2={y+dy} stroke="#879496"/><circle cx={x} cy={y} r="4" fill="#143e49"/><circle cx={x+dx} cy={y+dy} r="13" fill="white" stroke="#143e49" strokeWidth="2"/><text x={x+dx} y={y+dy+5} textAnchor="middle" fontSize="13" fill="#143e49">{i+1}</text></g> })}
    </svg></div>
    <ol className="map-anchor-key">{nodes.map(id => <li key={id}>{routeMaps.anchors[id][0]}</li>)}</ol>
    <ul className="map-directions">{legs.map((leg,i) => <li key={i}><span style={{color: colors[leg.mode]}}>{leg.mode}</span><ExternalAction href={leg.url}>{routeMaps.anchors[leg.origin][0]} → {routeMaps.anchors[leg.destination][0]}</ExternalAction></li>)}</ul>
  </details>
}
