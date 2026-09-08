import PlaceCard from './PlaceCard.jsx'
export default function Roundup({ content, sources }) {
  return <><header className="detail-intro"><h1>{content.name}</h1><p className="guide-lede">{content.shortDescription}</p><p>{content.introduction}</p></header><div className="content-card-grid">{content.entries.map(reference => <PlaceCard key={reference.id} place={sources.place.find(place => place.id === reference.id)} headingLevel={2} linkToDetails />)}</div></>
}
