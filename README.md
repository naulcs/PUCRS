# Gerenciador de Produtos - AgilStore 🛒

Aplicação de gerenciamento de inventário para a loja AgilStore, desenvolvida em **Node.js**. Essa aplicação permite adicionar, listar, atualizar, excluir e buscar produtos no inventário de forma automatizada.

---

## 📋 Funcionalidades
- **Adicionar Produto**: Insira novos produtos no inventário com os campos nome, categoria, quantidade e preço.
- **Listar Produtos**: Veja todos os produtos cadastrados em formato de tabela.
- **Atualizar Produto**: Modifique informações de produtos existentes.
- **Excluir Produto**: Remova produtos do inventário com base no ID.
- **Buscar Produto**: Pesquise produtos pelo ID ou pelo nome.
- **Persistência de Dados**: Os dados são salvos automaticamente em um arquivo JSON (`inventory.json`).

---

## 🚀 Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript.
- **readline-sync**: Biblioteca para criar interação com o terminal.
- **fs**: Módulo do Node.js para manipulação de arquivos.

---

## 🛠️ Pré-requisitos
Antes de começar, você precisará ter instalado:
- **Node.js** (recomendado: versão LTS) → [Instalar Node.js](https://nodejs.org/)
- **Visual Studio Code** (ou outro editor de sua preferência) → [Instalar VS Code](https://code.visualstudio.com/)

---

## 📦 Como Rodar a Aplicação Localmente

### 1. Clone o repositório 
```bash
git clone 
cd GerenciadorDeProdutos
```

### 2. Instale as dependências
No terminal, execute:
```bash
npm install
```

Isso instalará os pacotes necessários (`readline-sync` e `fs`).

### 3. Execute a aplicação
Para rodar a aplicação, use:
```bash
node app.js
```

### 4. Navegue pelo Menu
Ao rodar o comando acima, um menu será exibido no terminal com as opções:
```
==============================
Gerenciamento de Inventário - AgilStore
==============================
1. Adicionar Produto
2. Listar Produtos
3. Atualizar Produto
4. Excluir Produto
5. Buscar Produto
6. Sair
==============================
```

Selecione a opção desejada e siga as instruções para gerenciar o inventário.

---

## 📝 Estrutura do Projeto
```
GerenciadorDeProdutos/
│
├── app.js               # Arquivo principal da aplicação (contém a interação com o usuário)
├── db.js                # Arquivo com as funções de persistência de dados
├── inventario.json      # Arquivo JSON para persistência de dados
├── package.json         # Configurações do projeto Node.js
└── README.md            # Documentação do projeto

```

---

## 🛡️ Validações Implementadas
- **ID Único**: Geração automática de IDs para novos produtos.
- **Validação de Entradas**: Apenas números positivos são aceitos para quantidade e preço.
- **Persistência de Dados**: Salvamento automático em `inventory.json`.

---


## 🧑‍💻 Autor
Desenvolvido por Luan Silva. 🚀

Se tiver dúvidas ou sugestões, entre em contato!
```
