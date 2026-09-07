import { agendaTitle, instructions, teamContacts, heroImage } from '../config.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import salesforceLogo from '../assets/salesforce-logo.svg'
import interLogo from '../assets/inter-logo.svg'

export default function Header({ onOfflineTap }) {
  const isOnline = useOnlineStatus()
  return (
    <header className="w-full bg-white border-b-2" style={{ borderColor: '#032D60' }}>
      <div className="px-4 py-3 space-y-3">

        {/* Row 1 — Logos */}
        <div className="flex items-center justify-between">
          <img src={salesforceLogo} alt="Salesforce" className="h-7 w-auto" />
          <img src={interLogo} alt="Inter" className="h-6 w-auto" />
        </div>

        {/* Row 2 — Agenda title */}
        <h1 className="text-center font-bold text-lg" style={{ color: '#032D60' }}>
          {agendaTitle}
        </h1>

        {/* Row 3 — Instructions */}
        <p className="text-sm" style={{ color: '#6B7280' }}>
          {instructions}
        </p>

        {/* Row 4 — Team contacts */}
        <div className="flex justify-around">
          {teamContacts.map((contact) => {
            const waUrl = `https://wa.me/${contact.phone}?text=${encodeURIComponent(
              `Oi ${contact.name.split(' ')[0]}!`
            )}`
            return isOnline ? (
              <a
                key={contact.phone}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline py-2 min-h-[44px] inline-flex items-center"
                style={{ color: '#032D60' }}
              >
                {contact.name}
              </a>
            ) : (
              <button
                key={contact.phone}
                type="button"
                onClick={onOfflineTap}
                className="text-sm underline py-2 min-h-[44px] inline-flex items-center"
                style={{
                  color: '#032D60',
                  opacity: 0.6,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {contact.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Row 5 — Hero image */}
      {heroImage ? (
        <img
          src={heroImage}
          alt="Salesforce Connections 2026"
          className="w-full object-cover"
          style={{ height: 120 }}
        />
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ height: 120, background: '#E5E7EB' }}
        >
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>Event Hero Image</span>
        </div>
      )}
    </header>
  )
}
