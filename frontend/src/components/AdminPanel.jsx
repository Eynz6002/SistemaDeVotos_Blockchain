import { useState } from 'react'

const TABS = ['Membros', 'Propostas']

export default function AdminPanel({ onAddMember, onRemoveMember, onCancelProposal, loading }) {
  const [activeTab, setActiveTab] = useState('Membros')
  const [addAddress, setAddAddress] = useState('')
  const [removeAddress, setRemoveAddress] = useState('')
  const [cancelId, setCancelId] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!addAddress.trim()) return
    onAddMember(addAddress.trim())
    setAddAddress('')
  }

  const handleRemove = (e) => {
    e.preventDefault()
    if (!removeAddress.trim()) return
    onRemoveMember(removeAddress.trim())
    setRemoveAddress('')
  }

  const handleCancel = (e) => {
    e.preventDefault()
    if (cancelId === '') return
    onCancelProposal(Number(cancelId))
    setCancelId('')
  }

  return (
    <section className="bg-gray-900 border border-purple-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
        <span>👑</span> Painel do Admin
      </h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-gray-800 p-1 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${activeTab === tab
                ? 'bg-purple-700 text-white'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Aba: Membros */}
      {activeTab === 'Membros' && (
        <div className="space-y-4">
          {/* Adicionar membro */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Adicionar membro</p>
            <form onSubmit={handleAdd} className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                value={addAddress}
                onChange={(e) => setAddAddress(e.target.value)}
                placeholder="0x... (endereço do novo membro)"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm font-mono text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !addAddress.trim()}
                className="px-5 py-2.5 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Adicionar
              </button>
            </form>
          </div>

          {/* Remover membro */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Revogar membro</p>
            <form onSubmit={handleRemove} className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                value={removeAddress}
                onChange={(e) => setRemoveAddress(e.target.value)}
                placeholder="0x... (endereço do membro)"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm font-mono text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !removeAddress.trim()}
                className="px-5 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Remover Membro
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Aba: Propostas */}
      {activeTab === 'Propostas' && (
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Cancelar proposta</p>
          <form onSubmit={handleCancel} className="flex gap-3 flex-col sm:flex-row">
            <input
              type="number"
              min="0"
              value={cancelId}
              onChange={(e) => setCancelId(e.target.value)}
              placeholder="ID da proposta (ex: 0)"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || cancelId === ''}
              className="px-5 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Cancelar Proposta
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Esta ação é irreversível — a proposta ficará desativada e não aceitará mais votos.
          </p>
        </div>
      )}
    </section>
  )
}
