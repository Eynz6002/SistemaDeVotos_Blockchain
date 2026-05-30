export default function ProposalCard({ proposal, onVote, loading, isMember }) {
  const { id, description, votesFor, votesAgainst, isActive, creator } = proposal
  const shortCreator = `${creator.slice(0, 6)}...${creator.slice(-4)}`
  const total = votesFor + votesAgainst
  const forPercent = total > 0 ? Math.round((votesFor / total) * 100) : 0
  const againstPercent = 100 - forPercent

  return (
    <div className={`bg-gray-900 border rounded-2xl p-5 transition-colors
      ${isActive ? 'border-gray-800 hover:border-gray-700' : 'border-gray-800 opacity-60'}
    `}>
      <div className="flex items-start justify-between gap-4">
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-gray-800 text-gray-400 text-xs font-mono px-2 py-0.5 rounded-md">
              #{id}
            </span>
            {!isActive && (
              <span className="bg-red-900/50 text-red-400 text-xs font-semibold px-2 py-0.5 rounded-md border border-red-800">
                Cancelada
              </span>
            )}
          </div>

          <p className="text-gray-100 font-medium break-words">{description}</p>
          <p className="text-xs text-gray-500 mt-2 font-mono">Criado por: {shortCreator}</p>

          {/* Placar */}
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-xs text-gray-400">
              <span className="text-green-400">👍 A Favor: {votesFor}</span>
              <span className="text-red-400">👎 Contra: {votesAgainst}</span>
            </div>

            {/* Barra de progresso */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex">
              {total > 0 ? (
                <>
                  <div
                    className="bg-green-500 h-full transition-all duration-500"
                    style={{ width: `${forPercent}%` }}
                  />
                  <div
                    className="bg-red-500 h-full transition-all duration-500"
                    style={{ width: `${againstPercent}%` }}
                  />
                </>
              ) : (
                <div className="bg-gray-700 h-full w-full" />
              )}
            </div>

            {total > 0 && (
              <p className="text-xs text-gray-500 text-right">
                {forPercent}% aprovação · {total} {total === 1 ? 'voto' : 'votos'}
              </p>
            )}
          </div>
        </div>

        {/* Botões de voto */}
        {isMember && (
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={() => onVote(id, true)}
              disabled={loading || !isActive}
              className="px-4 py-2 bg-green-700 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-colors"
            >
              👍 A Favor
            </button>
            <button
              onClick={() => onVote(id, false)}
              disabled={loading || !isActive}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition-colors"
            >
              👎 Contra
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
