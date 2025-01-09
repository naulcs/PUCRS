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
    if (inventario.length > 0) {
        let ultimoProduto = inventario[inventario.length - 1];
        return ultimoProduto.id + 1;
    } else {
        return 1;
    }
}


module.exports = {
    carregarInv,
    salvarInv,
    gerarID
};
