# 🗳️ Sistema de Votação DAO — Trabalho 03

Disciplina: Tópicos Especiais em Computação — Blockchain (IFPI)  
Stack: Solidity · Remix IDE · Ethers.js v6 · React.js · Tailwind CSS

---

## Estrutura do Projeto

```
contracts/
  DAO.sol                  ← Smart contract (deploy no Remix IDE)
frontend/
  src/
    contract/
      contractConfig.js    ← Cole aqui o endereço e ABI após o deploy
    components/
      Header.jsx
      AdminPanel.jsx
      CreateProposal.jsx
      ProposalList.jsx
      ProposalCard.jsx
    App.jsx
    main.jsx
```

---

## Passo 1 — Smart Contract no Remix IDE

1. Acesse [remix.ethereum.org](https://remix.ethereum.org)
2. Na aba **File Explorer**, crie um novo arquivo chamado `DAO.sol`
3. Copie o conteúdo de `contracts/DAO.sol` e cole no editor
4. Vá para a aba **Solidity Compiler**:
   - Selecione a versão `0.8.20` (ou superior)
   - Clique em **Compile DAO.sol**
5. Verifique que não há erros de compilação

---

## Passo 2 — Deploy e Teste no Remix IDE

### Deploy

1. Vá para a aba **Deploy & Run Transactions**
2. Em **Environment**, selecione **Remix VM (Cancun)**
3. Certifique-se de que **Contract** está em `DAO`
4. Clique em **Deploy**
5. Anote o **Contract Address** exibido (você precisará dele no Passo 3)

### Fluxo de Teste (simulando contas diferentes)

**Conta 1 (Admin — quem fez o deploy):**

1. No campo `addMember`, cole o endereço da **Conta 2** e execute
2. No campo `addMember`, cole o endereço da **Conta 3** e execute
3. Verifique nos eventos emitidos: `MemberAdded` deve aparecer no log

**Trocar para a Conta 2 no seletor "Account" do Remix:**

4. Execute `createProposal` com a descrição `"Proposta 1: Aumentar fundo de reserva"`
5. Execute `createProposal` com a descrição `"Proposta 2: Contratar auditoria externa"`
6. Verifique o evento `ProposalCreated` no log
7. Execute `vote` com `_proposalId = 0` para votar na primeira proposta

**Trocar para a Conta 3:**

8. Execute `vote` com `_proposalId = 0` — segundo voto na mesma proposta
9. Execute `vote` com `_proposalId = 1`
10. Tente votar novamente na proposta 0 — deve dar revert com "membro ja votou"

**Verificar resultados:**

11. Chame `getProposalDetails(0)` — deve retornar `voteCount = 2`
12. Chame `getProposalDetails(1)` — deve retornar `voteCount = 1`
13. Tente executar `addMember` com a Conta 2 selecionada — deve dar revert "apenas o admin"

---

## Passo 3 — Frontend React.js

### 3.1 — Configurar endereço e ABI

Após o deploy no Remix, abra `frontend/src/contract/contractConfig.js` e:

1. **Endereço:** copie o endereço do campo "Deployed Contracts" no Remix e substitua `"COLE_O_ENDERECO_DO_CONTRATO_AQUI"`
2. **ABI (opcional):** a ABI já está pré-preenchida no arquivo. Se preferir, copie a ABI completa do Remix em *Compilation Details > ABI* e substitua o array `CONTRACT_ABI`

### 3.2 — Instalar dependências e rodar

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`

### 3.3 — Usando o DApp

1. Clique em **Conectar MetaMask** (use a mesma rede que o Remix, ou importe as contas da Remix VM no MetaMask via chave privada)
2. A interface detecta automaticamente se a conta conectada é **Admin**, **Membro** ou **Visitante**
3. **Admin** vê o painel para adicionar membros
4. **Membros** podem criar propostas e votar
5. As propostas se atualizam em tempo real via eventos do contrato
