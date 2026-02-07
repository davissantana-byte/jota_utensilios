if (window.location.search.includes('categoria=')) {
    document.body.classList.add('carregando');
}


// --- 1. CONFIGURAÇÕES GLOBAIS ---
let indiceAtual = 0;
const itensPorPagina = 4;

// --- 2. FUNÇÕES DO CARROSSEL ---
function atualizarVisibilidadeSetas() {
    const setaAnterior = document.querySelector('.seta-anterior');
    const setaProxima = document.querySelector('.seta-proxima');
    const itens = document.querySelectorAll('.lista-produtos .card-produto');
    const totalItens = itens.length;
    const maxIndice = Math.ceil(totalItens / itensPorPagina) - 1;

    if (!setaAnterior || !setaProxima) return;

    setaAnterior.style.visibility = (indiceAtual === 0) ? 'hidden' : 'visible';
    setaAnterior.style.opacity = (indiceAtual === 0) ? '0' : '1';

    setaProxima.style.visibility = (indiceAtual === maxIndice) ? 'hidden' : 'visible';
    setaProxima.style.opacity = (indiceAtual === maxIndice) ? '0' : '1';
}

function navegarCarrossel(direcao) {
    const lista = document.querySelector('.lista-produtos');
    const itens = document.querySelectorAll('.lista-produtos .card-produto');
    const maxIndice = Math.ceil(itens.length / itensPorPagina) - 1;

    let novoIndice = indiceAtual + direcao;
    if (novoIndice < 0) novoIndice = 0;
    if (novoIndice > maxIndice) novoIndice = maxIndice;

    if (novoIndice === indiceAtual) return;

    indiceAtual = novoIndice;
    const movimentoPorcentagem = 100 / (itens.length / itensPorPagina); // Ajuste de cálculo
    lista.style.transform = `translateX(-${indiceAtual * 70}%)`; // Mantendo sua lógica de 70%
    
    atualizarVisibilidadeSetas();
}

// --- 3. LÓGICA DO CARRINHO (ADICIONAR) ---
function adicionarAoCarrinho(id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const index = carrinho.findIndex(item => item.id === id);

    if (index !== -1) {
        carrinho[index].quantidade += 1;
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${nome} adicionado!`);
    atualizarContador();
}

function adicionarComQuantidade(id, nome, preco) {
    // 1. Tenta pegar o input. Se houver vários, precisamos de uma classe ou contexto, 
    // mas para teste único, vamos garantir que ele ache o valor:
    const campoQtd = document.getElementById('quantidade-produto');
    let quantidadeSelecionada = 1;

    if (campoQtd) {
        quantidadeSelecionada = parseInt(campoQtd.value) || 1;
    }

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Convertemos o ID para String para garantir que a comparação funcione sempre
    const idString = String(id);
    const index = carrinho.findIndex(item => String(item.id) === idString);

    if (index !== -1) {
        carrinho[index].quantidade += quantidadeSelecionada;
    } else {
        carrinho.push({
            id: idString,
            nome: nome,
            preco: preco,
            quantidade: quantidadeSelecionada
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContador();
    alert(`Adicionado: ${quantidadeSelecionada}x ${nome}`);
}

function renderizarCarrinho() {
    const container = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('valor-total');
    if (!container) return;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (carrinho.length === 0) {
        container.innerHTML = `<p>Seu carrinho está vazio.</p>`;
        if(totalElement) totalElement.innerText = "R$ 0,00";
        return;
    }

    let somaTotalGeral = 0;

    container.innerHTML = carrinho.map((item, index) => {
        // Garantimos que preco seja string antes do replace para não dar erro
        let precoLimpo = String(item.preco).replace(',', '.');
        const precoNumerico = parseFloat(precoLimpo) || 0;
        
        // MULTIPLICAÇÃO REAL:
        const subtotal = precoNumerico * item.quantidade;
        somaTotalGeral += subtotal;

        return `
            <div class="item-carrinho">
                <div class="info">
                    <h3>${item.nome}</h3>
                    <p>Unitário: R$ ${precoNumerico.toFixed(2).replace('.', ',')}</p>
                    <p>Quantidade: <strong>${item.quantidade}</strong></p>
                    <p><strong>Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}</strong></p>
                </div>
                <button onclick="removerItem(${index})">Remover</button>
            </div>
        `;
    }).join('');

    if(totalElement) {
        totalElement.innerText = "R$ " + somaTotalGeral.toFixed(2).replace('.', ',');
    }
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContador();
    renderizarCarrinho();
}

function atualizarContador() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        const totalReal = carrinho.reduce((acc, item) => acc + (parseInt(item.quantidade) || 0), 0);
        contador.innerText = totalReal;
    }
}

window.onload = function() {
    atualizarContador();
    if (document.getElementById('lista-carrinho')) {
        renderizarCarrinho();
    }
};

// --- 5. FINALIZAÇÃO ---
function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de finalizar meu pedido no Jota Utensílios:\n\n";
    let total = 0;

    carrinho.forEach(item => {
        let precoLimpo = String(item.preco).replace(',', '.');
        let subtotal = parseFloat(precoLimpo) * item.quantidade;
        total += subtotal;
        mensagem += `📦 *${item.quantidade}x ${item.nome}* - R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    });

    mensagem += `\n💰 *Valor Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    let numeroWhatsApp = "5511977245250"; 
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`, '_blank');
}

function carregarDados() {
    atualizarContador();
    atualizarVisibilidadeSetas(); 
    
    if (document.getElementById('lista-carrinho')) {
        renderizarCarrinho();
    }
}

function filtrarCategoria(nomeCategoria) {
    // Mostra o loader ao iniciar o filtro
    document.body.classList.add('carregando');

    const secoes = document.querySelectorAll('.produtos h2');
    const containers = document.querySelectorAll('.sub-trava-seguranca');

    // Pequeno delay para o usuário ver que está processando (UX)
    setTimeout(() => {
        secoes.forEach((titulo, index) => {
            const containerCorrespondente = containers[index];
            const eAlvo = (nomeCategoria.toUpperCase() === 'TUDO' || 
                          titulo.innerText.trim().toUpperCase() === nomeCategoria.toUpperCase());

            if (eAlvo) {
                titulo.style.display = 'block';
                containerCorrespondente.style.display = 'grid';
            } else {
                titulo.style.display = 'none';
                containerCorrespondente.style.display = 'none';
            }
        });

        // FILTRO CONCLUÍDO: Esconde o loader
        document.body.classList.remove('carregando');
    }, 400); // 400ms é o tempo perfeito para ser percebido sem irritar
}


function IrParaHomeEFiltrar(categoria) {
    document.body.classList.add('carregando');
    // Verifica se o usuário já está na página principal (index ou "/")
    const naHome = window.location.pathname === "/" || window.location.pathname.includes("index");

    if (naHome) {
        // Se já está na home, apenas filtra sem recarregar a página ou mudar a URL
        filtrarCategoria(categoria);
        
        // Opcional: Limpa a URL visualmente para não ficar com o ?categoria= antigo
        window.history.replaceState({}, '', window.location.pathname);
    } else {
        // Se estiver na página de produto, aí sim redireciona
        window.location.href = `/?categoria=${encodeURIComponent(categoria)}`;
    }
}

// 1. Remova as linhas soltas de window.onload e carregarDados e use isto:
window.addEventListener('load', function() {
    // Roda sua função de carregar dados do banco/JSON
    if (typeof carregarDados === "function") {
        carregarDados();
    }

    // Atualiza o ícone do carrinho
    atualizarContador();

    // Se estiver na página do carrinho, renderiza
    if (document.getElementById('lista-carrinho')) {
        renderizarCarrinho();
    }

    // Lógica do Filtro via URL (vindo de outra página)
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaFiltro = urlParams.get('categoria');

    if (categoriaFiltro) {
        // Um tempo maior (300ms) para dar tempo de carregar os produtos do banco
        setTimeout(() => {
            filtrarCategoria(categoriaFiltro);
        }, 300);
    }
});

// Mantém esta linha para garantir o contador ao voltar
window.addEventListener('pageshow', atualizarContador);