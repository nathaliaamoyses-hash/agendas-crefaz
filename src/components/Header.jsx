import { agendaTitle, instructions, teamContacts, heroImage, client } from '../config.js'
import salesforceLogo from '../assets/salesforce-logo.svg'
export default function Header() {
  return <header className="conference-header">
    <div className="conference-brands"><img src={salesforceLogo} alt="Salesforce" /><span className="conference-client-brand">{client.logo ? <img src={client.logo} alt={client.name} /> : <span>{client.name}</span>}</span></div>
    <h1>{agendaTitle}</h1><p>{instructions}</p>
    {teamContacts.length > 0 && <div className="conference-contacts">{teamContacts.map(contact => <a key={contact.phone} href={`https://wa.me/${contact.phone}?text=${encodeURIComponent(`Oi ${contact.name.split(' ')[0]}!`)}`} target="_blank" rel="noreferrer">{contact.name}</a>)}</div>}
    {heroImage && <img className="conference-hero" src={heroImage} alt="Dreamforce 2026" />}
  </header>
}
