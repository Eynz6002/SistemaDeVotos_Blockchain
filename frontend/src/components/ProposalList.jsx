import ProposalCard from './ProposalCard'

export default function ProposalList({ proposals, onVote, loading, isMember }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
        <span>📋</span> Propostas ({proposals.length})
      </h2>

      {proposals.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center text-gray-500">
          Nenhuma proposta criada ainda. Seja o primeiro a submeter uma!
        </div>
      ) : (
        <div className="grid gap-4">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={onVote}
              loading={loading}
              isMember={isMember}
            />
          ))}
        </div>
      )}
    </section>
  )
}
