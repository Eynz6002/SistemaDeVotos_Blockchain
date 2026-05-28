# 🗳️ DApp Sistema de Votação (DAO) - IFPI (Grupo 07)

Projeto referente ao Trabalho 03 da disciplina de Tópicos Especiais em Computação - Blockchain.

## 📌 Pré-requisitos para testar
1. Navegador web (Chrome, Brave, Firefox, etc).
2. Extensão **MetaMask** instalada e configurada para a rede de testes utilizada (ex: Remix VM local ou Sepolia).
3. Saldo fictício na carteira (caso utilize uma testnet pública).
4. **Node.js** instalado na máquina (necessário para executar o servidor do frontend).

## 🚀 Como executar o projeto localmente

Como este é um DApp (Aplicação Descentralizada) construído em React que interage com a carteira do navegador via `window.ethereum`, não basta abrir o ficheiro HTML. O projeto precisa de ser executado através de um servidor de desenvolvimento.

**Passo 1: Configurar o Contrato**
Após realizar o deploy do `DAO.sol` no Remix IDE, abra o ficheiro `frontend/src/contract/contractConfig.js` e cole o endereço gerado na constante `CONTRACT_ADDRESS`.

**Passo 2: Iniciar o Servidor (via Terminal)**
1. Abra o terminal na pasta `frontend` do projeto.
2. Instale as dependências executando o comando: `npm install`
3. Inicie o servidor local executando: `npm run dev`
4. Aceda ao link gerado (geralmente `http://localhost:5173`) no seu navegador.

## 🧪 Testando as Funcionalidades
* **Consulta (Qualquer pessoa):** Qualquer visitante pode ligar a carteira para visualizar as propostas abertas e a contagem total de votos.
* **Adicionar Membros (Apenas Admin):** O contrato restringe a gestão de utilizadores à carteira que realizou o deploy. Ao ligar esta carteira, um painel exclusivo será exibido permitindo registar o endereço de novos membros na DAO.
* **Votação e Criação (Apenas Membros):** Carteiras previamente autorizadas pelo administrador podem utilizar a interface para submeter novas propostas e registar um voto único em cada proposta aberta.