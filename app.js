const readline = require("readline-sync");
const { carregarInv, salvarInv, gerarID } = require("./db");

//adicionar produto
function addProduto(inventario) {
  const nome = readline.question("Nome do Produto: ");
  const categoria = readline.question("Categoria: ");
  const quantidade = parseInt(readline.question("Quantidade em Estoque: "), 10);
  const preco = parseFloat(readline.question("Preço: "));

  const novoProduto = {
    id: gerarID(inventario),
    nome,
    categoria,
    quantidade,
    preco,
  };

  inventario.push(novoProduto);
  console.log("Produto adicionado com sucesso!");
  salvarInv(inventario);
}

//listar produtos
function listarProdutos(inventario) {
  while (true) {
    console.log("\nEscolha uma opção:");
    console.log("1. Filtrar por categoria");
    console.log("2. Mostrar todos os produtos");
    console.log("3. Ordenar produtos");
    console.log("4. Voltar ao menu principal");

    const opcaoListar = readline.question("Escolha uma opção: ");

    if (opcaoListar === "1") {
      const filtrarCategoria = readline
        .question("Digite a categoria para filtrar: ")
        .toLowerCase();
      const resultado = inventario.filter(
        (p) => p.categoria.toLowerCase() === filtrarCategoria
      );

      if (resultado.length > 0) {
        console.table(resultado, [
          "id",
          "nome",
          "categoria",
          "quantidade",
          "preco",
        ]);
      } else {
        console.log("Nenhum produto encontrado nesta categoria.");
      }
    } else if (opcaoListar === "2") {
      console.table(inventario, [
        "id",
        "nome",
        "categoria",
        "quantidade",
        "preco",
      ]);
    } else if (opcaoListar === "3") {
      const criterio = readline
        .question("Escolha a ordenação (nome, quantidade, preco): ")
        .toLowerCase();

      let resultado = [...inventario];

      if (criterio === "nome") {
        resultado = resultado.sort((a, b) => a.nome.localeCompare(b.nome));
      } else if (criterio === "quantidade") {
        resultado = resultado.sort((a, b) => a.quantidade - b.quantidade);
      } else if (criterio === "preco") {
        resultado = resultado.sort((a, b) => a.preco - b.preco);
      } else {
        console.log("Critério inválido para ordenação.");
        continue;
      }

      console.table(resultado, [
        "id",
        "nome",
        "categoria",
        "quantidade",
        "preco",
      ]);
    } else if (opcaoListar === "4") {
      break;
    } else {
      console.log("Opção inválida! Tente novamente.");
    }
  }
}

//atualizar produto
function attProduto(inventario) {
  const id = parseInt(
    readline.question("ID do produto a ser atualizado: "),
    10
  );
  const produto = inventario.find((p) => p.id === id);

  if (!produto) {
    console.log("Produto não encontrado!");
    return;
  }

  const dados = ["nome", "categoria", "quantidade", "preco"];
  dados.forEach((field) => {
    const newValue = readline.question(
      `Novo valor para ${field} (atual: ${produto[field]}): `
    );
    if (newValue) {
      produto[field] =
        field === "quantidade" || field === "preco"
          ? parseFloat(newValue)
          : newValue;
    }
  });

  console.log("Produto atualizado com sucesso!");
  salvarInv(inventario);
}

//excluir produto
function deleteproduto(inventario) {
  const id = parseInt(readline.question("ID do produto a ser excluído: "), 10);
  const index = inventario.findIndex((p) => p.id === id);

  if (index === -1) {
    console.log("Produto não encontrado!");
    return;
  }

  inventario.splice(index, 1);
  console.log("Produto excluído com sucesso!");
  salvarInv(inventario);
}

//buscar produto
function buscarProduto(inventario) {
  const buscar = readline
    .question("Digite o ID ou parte do nome do produto: ")
    .toLowerCase();
  const resultado = inventario.filter(
    (p) => p.id.toString() === buscar || p.nome.toLowerCase().includes(buscar)
  );

  if (resultado.length > 0) {
    console.table(resultado);
  } else {
    console.log("Nenhum produto encontrado!");
  }
}

//menu principal
function main() {
  const inventario = carregarInv();

  while (true) {
    console.log("\nGerenciamento de Inventário - AgilStore");
    console.log("1. Adicionar Produto");
    console.log("2. Listar Produtos");
    console.log("3. Atualizar Produto");
    console.log("4. Excluir Produto");
    console.log("5. Buscar Produto");
    console.log("6. Sair");

    const opcaoListar = readline.question("Escolha uma opção: ");
    switch (opcaoListar) {
      case "1":
        addProduto(inventario);
        break;
      case "2":
        listarProdutos(inventario);
        break;
      case "3":
        attProduto(inventario);
        break;
      case "4":
        deleteproduto(inventario);
        break;
      case "5":
        buscarProduto(inventario);
        break;
      case "6":
        console.log("Saindo...");
        return;
      default:
        console.log("Opção inválida! Tente novamente.");
    }
  }
}

main();
