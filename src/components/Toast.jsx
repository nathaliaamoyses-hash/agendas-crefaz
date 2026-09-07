export default function Toast({ message, visible }) {
  if (!visible) return null
  return (
    <div role="status"
      className="fixed left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm rounded-full px-4 py-2 z-50 pointer-events-none"
      style={{ bottom: 80 }}
    >
      {message}
    </div>
  )
}
