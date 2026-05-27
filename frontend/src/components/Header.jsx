export default function Header({ account, isAdmin, isMember, onConnect, loading }) {
  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : null

  const roleLabel = isAdmin
    ? { text: 'Admin', style: 'bg-purple-700 text-purple-100' }
    : isMember
    ? { text: 'Membro', style: 'bg-green-700 text-green-100' }
    : { text: 'Visitante', style: 'bg-gray-700 text-gray-300' }

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🗳️</span>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">DAO Voting</h1>
            <p className="text-xs text-gray-400">Sistema de Votação Descentralizado</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {account ? (
            <>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleLabel.style}`}>
                {roleLabel.text}
              </span>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-300">
                {shortAddress}
              </div>
            </>
          ) : (
            <button
              onClick={onConnect}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg text-sm font-semibold transition-colors"
            >
              {loading ? 'Conectando...' : 'Conectar Carteira'}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
