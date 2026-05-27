import { useState } from 'react'

export default function CreateProposal({ onCreateProposal, loading }) {
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description.trim()) return
    onCreateProposal(description.trim())
    setDescription('')
  }

  return (
    <section className="bg-gray-900 border border-indigo-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-indigo-300 mb-1 flex items-center gap-2">
        <span>📝</span> Nova Proposta
      </h2>
      <p className="text-sm text-gray-400 mb-4">Submeta uma proposta para a votação da DAO.</p>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva a proposta..."
          maxLength={200}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !description.trim()}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
        >
          Criar Proposta
        </button>
      </form>
    </section>
  )
}
