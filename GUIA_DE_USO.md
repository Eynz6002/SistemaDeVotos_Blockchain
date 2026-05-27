# Guia de Uso — Sistema de Votação DAO

Este documento explica como cada tipo de usuário interage com o sistema.

---

## Papéis do Sistema

O DApp identifica automaticamente o papel da carteira conectada e exibe apenas as funcionalidades disponíveis para aquele perfil.

| Papel | Quem é | Badge |
|---|---|---|
| **Admin** | Quem fez o deploy do contrato | Roxo |
| **Membro** | Carteira adicionada pelo Admin | Verde |
| **Visitante** | Qualquer outra carteira | Cinza |

---

## 👑 Admin

O Admin é definido no momento do deploy — é o endereço que executou a transação de criação do contrato. Só existe um Admin por contrato.

### O que pode fazer

**Adicionar membros à DAO**

1. Conecte a carteira que fez o deploy no MetaMask
2. O painel **"Painel do Admin"** aparecerá no topo da página
3. Cole o endereço (`0x...`) da carteira que deseja autorizar no campo de texto
4. Clique em **"Adicionar Membro"**
5. Confirme a transação no MetaMask
6. Aguarde a confirmação — uma notificação de sucesso aparecerá na tela

> O Admin também pode criar propostas e votar **se** o próprio endereço for adicionado como membro. Ser Admin não concede automaticamente o papel de Membro.

### O que não pode fazer

- Remover membros (não implementado no contrato)
- Transferir o papel de Admin para outro endereço
- Criar propostas ou votar sem ser membro

---

## 🟢 Membro

Um Membro é qualquer carteira que o Admin adicionou via `addMember`. É o papel principal da DAO — apenas membros participam da governança.

### O que pode fazer

**Criar uma proposta**

1. Conecte a carteira cadastrada como membro
2. A seção **"Nova Proposta"** aparecerá abaixo do painel admin (se houver)
3. Digite a descrição da proposta no campo de texto (máximo 200 caracteres)
4. Clique em **"Criar Proposta"**
5. Confirme a transação no MetaMask
6. A proposta aparecerá imediatamente na lista assim que a transação for confirmada

**Votar em uma proposta**

1. Na seção **"Propostas"**, localize a proposta desejada
2. Clique no botão **"Votar ✓"** no canto direito do card
3. Confirme a transação no MetaMask
4. O contador de votos é atualizado automaticamente

### Regras de votação

- Cada membro pode votar **apenas uma vez** por proposta
- Tentar votar novamente na mesma proposta gera um erro: *"membro já votou nesta proposta"*
- Não é possível desfazer um voto após a confirmação na blockchain

### O que não pode fazer

- Adicionar ou remover outros membros
- Votar mais de uma vez na mesma proposta

---

## 👁️ Visitante

Um Visitante é qualquer carteira conectada que não foi cadastrada como membro e não é o Admin.

### O que pode fazer

- Conectar a carteira e visualizar todas as propostas existentes com seus contadores de votos

### O que não pode fazer

- Criar propostas
- Votar em propostas

### Como se tornar membro

O Visitante não pode solicitar acesso diretamente pelo DApp. É necessário que o **Admin copie o endereço da sua carteira** e o adicione manualmente pelo painel de Admin.

> Ao conectar, um aviso amarelo é exibido: *"Sua carteira ainda não é membro da DAO. Peça ao admin para adicioná-la."*

---

## Fluxo Completo de Uso

```
Admin faz deploy do contrato
        │
        ▼
Admin adiciona Conta B como Membro
Admin adiciona Conta C como Membro
        │
        ▼
Conta B (Membro) cria Proposta #0
Conta B (Membro) cria Proposta #1
        │
        ▼
Conta B vota na Proposta #0  →  voteCount = 1
Conta C vota na Proposta #0  →  voteCount = 2
Conta C vota na Proposta #1  →  voteCount = 1
        │
        ▼
Qualquer carteira pode visualizar os resultados
```

---

## Mensagens de Erro Comuns

| Mensagem | Causa |
|---|---|
| `apenas o admin pode executar esta acao` | Tentativa de `addMember` com carteira que não é o Admin |
| `apenas membros podem executar esta acao` | Tentativa de criar proposta ou votar sem ser Membro |
| `membro ja votou nesta proposta` | Voto duplicado na mesma proposta |
| `proposta nao existe` | ID de proposta inválido |
| `endereco ja e membro` | Tentativa de adicionar um endereço já cadastrado |
