const fs = require('fs');
const readline = require('readline-sync');

const dataFile = './inventario.json';

//função para carregar dados do inventário
function carregarInv() {
    if (fs.existsSync(dataFile)) {
        const data = fs.readFileSync(dataFile, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

//função para salvar dado no inventário
function salvarInv(inventario) {
    fs.writeFileSync(dataFile, JSON.stringify(inventario, null, 2), 'utf8');
}

//gerar o ID 
function gerarID(inventario) {
    return inventario.length > 0 ? inventario[inventario.length - 1].id + 1 : 1;
}

//adicionar produto
function addProduto(inventario) {
    const nome = readline.question('Nome do Produto: ');
    const categoria = readline.question('Categoria: ');
    const quantidade = parseInt(readline.question('Quantidade em Estoque: '), 10);
    const preco = parseFloat(readline.question('Preço: '));

    const novoProduto = {
        id: gerarID(inventario),
        nome,
        categoria,
        quantidade,
        preco,
    };

    inventario.push(novoProduto);
    console.log('Produto adicionado com sucesso!');
    salvarInv(inventario);
}

//listar produtos
function listarProdutos(inventario) {
    console.table(inventario, ['id', 'nome', 'categoria', 'quantidade', 'preco']);
}

//atualizar produto
function attProduto(inventario) {
    const id = parseInt(readline.question('ID do produto a ser atualizado: '), 10);
    const produto = inventario.find(p => p.id === id);

    if (!produto) {
        console.log('Produto não encontrado!');
        return;
    }

    const dados = ['nome', 'categoria', 'quantidade', 'preco'];
    dados.forEach(field => {
        const newValue = readline.question(`Novo valor para ${field} (atual: ${produto[field]}): `);
        if (newValue) {
            produto[field] = field === 'quantidade' || field === 'preco' ? parseFloat(newValue) : newValue;
        }
    });

    console.log('Produto atualizado com sucesso!');
    salvarInv(inventario);
}

//excluir produto
function deleteproduto(inventario) {
    const id = parseInt(readline.question('ID do produto a ser excluído: '), 10);
    const index = inventario.findIndex(p => p.id === id);

    if (index === -1) {
        console.log('Produto não encontrado!');
        return;
    }

    inventario.splice(index, 1);
    console.log('Produto excluído com sucesso!');
    salvarInv(inventario);
}

//buscar produto
function buscarProduto(inventario) {
    const buscar = readline.question('Digite o ID ou parte do nome do produto: ').toLowerCase();
    const resultado = inventario.filter(p => p.id.toString() === buscar || p.nome.toLowerCase().includes(buscar));

    if (resultado.length > 0) {
        console.table(resultado);
    } else {
        console.log('Nenhum produto encontrado!');
    }
}

//menu principal
function main() {
    const inventario = carregarInv();

    while (true) {
        console.log('\nGerenciamento de Inventário - AgilStore');
        console.log('1. Adicionar Produto');
        console.log('2. Listar Produtos');
        console.log('3. Atualizar Produto');
        console.log('4. Excluir Produto');
        console.log('5. Buscar Produto');
        console.log('6. Sair');

        const choice = readline.question('Escolha uma opção: ');
        switch (choice) {
            case '1':
                addProduto(inventario);
                break;
            case '2':
                listarProdutos(inventario);
                break;
            case '3':
                attProduto(inventario);
                break;
            case '4':
                deleteproduto(inventario);
                break;
            case '5':
                buscarProduto(inventario);
                break;
            case '6':
                console.log('Saindo...');
                return;
            default:
                console.log('Opção inválida! Tente novamente.');
        }
    }
}

main();
