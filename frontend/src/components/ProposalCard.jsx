export default function ProposalCard({ proposal, onVote, loading, isMember }) {
  const shortCreator = `${proposal.creator.slice(0, 6)}...${proposal.creator.slice(-4)}`

  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-800 text-gray-400 text-xs font-mono px-2 py-0.5 rounded-md">
              #{proposal.id}
            </span>
          </div>
          <p className="text-gray-100 font-medium break-words">{proposal.description}</p>
          <p className="text-xs text-gray-500 mt-2 font-mono">
            Criado por: {shortCreator}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-gray-800 rounded-xl px-3 py-2">
            <span className="text-lg">🗳️</span>
            <span className="text-xl font-bold text-white">{proposal.voteCount}</span>
            <span className="text-xs text-gray-400">{proposal.voteCount === 1 ? 'voto' : 'votos'}</span>
          </div>

          {isMember && (
            <button
              onClick={() => onVote(proposal.id)}
              disabled={loading}
              className="px-4 py-2 bg-green-700 hover:bg-green-600 disabled:opacity-50 rounded-xl text-sm font-semibold transition-colors"
            >
              Votar ✓
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
