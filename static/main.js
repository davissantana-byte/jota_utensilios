let indiceAtual = 0; 
const lista = document.querySelector('.lista-produtos');
const itens = document.querySelectorAll('.lista-produtos .card-produto'); 
const totalItens = itens.length; 

const itensPorPagina = 6; 

const maxIndice = Math.ceil(totalItens / itensPorPagina) - 1; 


function atualizarVisibilidadeSetas() {
    const setaAnterior = document.querySelector('.seta-anterior');
    const setaProxima = document.querySelector('.seta-proxima');
    
    if (indiceAtual === 0) {
        setaAnterior.style.visibility = 'hidden'; 
        setaAnterior.style.opacity = '0'; 
    } else {
        setaAnterior.style.visibility = 'visible'; 
        setaAnterior.style.opacity = '1';
    }

    if (indiceAtual === maxIndice) {
        setaProxima.style.visibility = 'hidden';
        setaProxima.style.opacity = '0';
    } else {
        setaProxima.style.visibility = 'visible'; 
        setaProxima.style.opacity = '1';
    }
}

function navegarCarrossel(direcao) {
    
    let novoIndice = indiceAtual + direcao;

    if (novoIndice < 0) {
        novoIndice = 0; 
    } 
    
    else if (novoIndice > maxIndice) {
        novoIndice = maxIndice; 
    }
    
    if (novoIndice === indiceAtual) {
        return; 
    }
    
    indiceAtual = novoIndice;

    const movimentoPorcentagem = 70 / itensPorPagina;
    lista.style.transform = `translateX(-${indiceAtual * movimentoPorcentagem}%)`;
    
    atualizarVisibilidadeSetas();
}

window.onload = atualizarVisibilidadeSetas; 





function adicionarAoCarrinho(id, nome, preco) {
    // 1. Puxa o carrinho do localStorage ou cria um vazio se não existir
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 2. Cria o objeto do produto
    const produto = {
        id: id,
        nome: nome,
        preco: preco,
        quantidade: 1
    };

    // 3. Verifica se o produto já está no carrinho
    const index = carrinho.findIndex(item => item.id === id);

    if (index !== -1) {
        carrinho[index].quantidade += 1; // Se já existe, só aumenta a quantidade
    } else {
        carrinho.push(produto); // Se é novo, adiciona ao array
    }

    // 4. Salva de volta no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${nome} adicionado ao carrinho!`);
}