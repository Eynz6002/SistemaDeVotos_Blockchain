import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contract/contractConfig'
import Header from './components/Header'
import AdminPanel from './components/AdminPanel'
import CreateProposal from './components/CreateProposal'
import ProposalList from './components/ProposalList'

export default function App() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [account, setAccount] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMember, setIsMember] = useState(false)
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(false)
  const [txStatus, setTxStatus] = useState(null)

  const loadProposals = useCallback(async (contractInstance) => {
    try {
      const count = await contractInstance.proposalCount()
      const total = Number(count)
      const list = []
      for (let i = 0; i < total; i++) {
        const [description, votesFor, votesAgainst, isActive, creator] =
          await contractInstance.getProposalDetails(i)
        list.push({
          id: i,
          description,
          votesFor: Number(votesFor),
          votesAgainst: Number(votesAgainst),
          isActive,
          creator,
        })
      }
      setProposals(list)
    } catch (err) {
      console.error('Erro ao carregar propostas:', err)
    }
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask não encontrado. Por favor, instale a extensão MetaMask.')
      return
    }
    try {
      setLoading(true)
      const _provider = new ethers.BrowserProvider(window.ethereum)
      await _provider.send('eth_requestAccounts', [])
      const _signer = await _provider.getSigner()
      const _account = await _signer.getAddress()
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, _signer)

      const adminAddress = await _contract.admin()
      const memberStatus = await _contract.members(_account)

      setProvider(_provider)
      setSigner(_signer)
      setContract(_contract)
      setAccount(_account)
      setIsAdmin(_account.toLowerCase() === adminAddress.toLowerCase())
      setIsMember(memberStatus)

      await loadProposals(_contract)

      _contract.on('ProposalCreated', () => loadProposals(_contract))
      _contract.on('Voted', () => loadProposals(_contract))
      _contract.on('ProposalCancelled', () => loadProposals(_contract))
      _contract.on('MemberAdded', async () => {
        const updated = await _contract.members(_account)
        setIsMember(updated)
      })
      _contract.on('MemberRemoved', async () => {
        const updated = await _contract.members(_account)
        setIsMember(updated)
      })
    } catch (err) {
      console.error('Erro ao conectar carteira:', err)
      setTxStatus({ type: 'error', message: 'Falha ao conectar a carteira.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!window.ethereum) return
    const handleAccountChange = () => {
      setAccount(null)
      setContract(null)
      setSigner(null)
      setIsAdmin(false)
      setIsMember(false)
      setProposals([])
    }
    window.ethereum.on('accountsChanged', handleAccountChange)
    return () => window.ethereum.removeListener('accountsChanged', handleAccountChange)
  }, [])

  const showStatus = (type, message) => {
    setTxStatus({ type, message })
    setTimeout(() => setTxStatus(null), 5000)
  }

  const handleAddMember = async (address) => {
    try {
      setLoading(true)
      showStatus('info', 'Enviando transação...')
      const tx = await contract.addMember(address)
      await tx.wait()
      showStatus('success', `Membro ${address.slice(0, 6)}...${address.slice(-4)} adicionado!`)
    } catch (err) {
      showStatus('error', err.reason || 'Erro ao adicionar membro.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveMember = async (address) => {
    try {
      setLoading(true)
      showStatus('info', 'Enviando transação...')
      const tx = await contract.removeMember(address)
      await tx.wait()
      showStatus('success', `Membro ${address.slice(0, 6)}...${address.slice(-4)} removido.`)
    } catch (err) {
      showStatus('error', err.reason || 'Erro ao remover membro.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelProposal = async (proposalId) => {
    try {
      setLoading(true)
      showStatus('info', 'Enviando transação...')
      const tx = await contract.cancelProposal(proposalId)
      await tx.wait()
      showStatus('success', `Proposta #${proposalId} cancelada.`)
    } catch (err) {
      showStatus('error', err.reason || 'Erro ao cancelar proposta.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProposal = async (description) => {
    try {
      setLoading(true)
      showStatus('info', 'Enviando transação...')
      const tx = await contract.createProposal(description)
      await tx.wait()
      showStatus('success', 'Proposta criada com sucesso!')
    } catch (err) {
      showStatus('error', err.reason || 'Erro ao criar proposta.')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (proposalId, support) => {
    try {
      setLoading(true)
      showStatus('info', 'Registrando voto...')
      const tx = await contract.vote(proposalId, support)
      await tx.wait()
      showStatus('success', `Voto ${support ? 'a favor' : 'contra'} registrado na proposta #${proposalId}!`)
    } catch (err) {
      showStatus('error', err.reason || 'Erro ao votar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header
        account={account}
        isAdmin={isAdmin}
        isMember={isMember}
        onConnect={connectWallet}
        loading={loading}
      />

      {txStatus && (
        <div className={`fixed top-20 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all
          ${txStatus.type === 'success' ? 'bg-green-600' : ''}
          ${txStatus.type === 'error' ? 'bg-red-600' : ''}
          ${txStatus.type === 'info' ? 'bg-indigo-600' : ''}
        `}>
          {txStatus.message}
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {!account ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="text-6xl">🗳️</div>
            <h2 className="text-2xl font-bold text-gray-200">Sistema de Votação DAO</h2>
            <p className="text-gray-400 text-center max-w-md">
              Conecte sua carteira MetaMask para participar da governança descentralizada.
            </p>
            <button
              onClick={connectWallet}
              disabled={loading}
              className="mt-4 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-semibold text-lg transition-colors"
            >
              {loading ? 'Conectando...' : 'Conectar MetaMask'}
            </button>
          </div>
        ) : (
          <>
            {isAdmin && (
              <AdminPanel
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
                onCancelProposal={handleCancelProposal}
                loading={loading}
              />
            )}

            {isMember && (
              <CreateProposal onCreateProposal={handleCreateProposal} loading={loading} />
            )}

            {!isMember && !isAdmin && (
              <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4 text-yellow-300 text-sm">
                ⚠️ Sua carteira ainda não é membro da DAO. Peça ao admin para adicioná-la.
              </div>
            )}

            <ProposalList
              proposals={proposals}
              onVote={handleVote}
              loading={loading}
              isMember={isMember}
            />
          </>
        )}
      </main>
    </div>
  )
}
