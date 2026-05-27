import { useState } from 'react'

export default function AdminPanel({ onAddMember, loading }) {
  const [address, setAddress] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) return
    onAddMember(address.trim())
    setAddress('')
  }

  return (
    <section className="bg-gray-900 border border-purple-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-purple-300 mb-1 flex items-center gap-2">
        <span>👑</span> Painel do Admin
      </h2>
      <p className="text-sm text-gray-400 mb-4">Adicione endereços como membros da DAO.</p>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x... (endereço do novo membro)"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm font-mono text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !address.trim()}
          className="px-6 py-2.5 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
        >
          Adicionar Membro
        </button>
      </form>
    </section>
  )
}
