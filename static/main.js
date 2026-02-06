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


function renderizarCarrinho() {
    const container = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('valor-total');
    
    if (!container) return;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (carrinho.length === 0) {
        container.innerHTML = `<div class="carrinho-vazio"><p>Seu carrinho está vazio.</p></div>`;
        if(totalElement) totalElement.innerText = "R$ 0,00";
        return;
    }

    let total = 0;
    container.innerHTML = carrinho.map((item, index) => {
        let precoLimpo = String(item.preco).replace(',', '.');
        const subtotal = parseFloat(precoLimpo) * item.quantidade;
        total += subtotal;
        
        // AQUI MUDOU: Usamos classes em vez de style=""
        return `
            <div class="item-carrinho">
                <div class="detalhes-item">
                    <h3>${item.nome}</h3>
                    <p class="qtd-preco">
                        <span>Qtd: ${item.quantidade}</span>
                        <span>Total: R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                    </p>
                </div>
                <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
            </div>
        `;
    }).join('');

    if(totalElement) totalElement.innerText = "R$ " + total.toFixed(2).replace('.', ',');
}


function adicionarAoCarrinho(id, nome, preco) {
    // 1. Puxa do localStorage (sempre use o mesmo nome: 'carrinho')
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 2. Verifica se o produto já está no carrinho
    const index = carrinho.findIndex(item => item.id === id);

    if (index !== -1) {
        carrinho[index].quantidade += 1; 
    } else {
        // 3. Se é novo, cria o objeto e adiciona
        const produto = {
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1
        };
        carrinho.push(produto); 
    }

    // 4. Salva de volta
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${nome} adicionado ao carrinho!`);
    atualizarContador(); // Chama a função que já criamos
}

function atualizarContador() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        // O contador deve mostrar o tamanho atual do array salvo
        contador.innerText = carrinho.length;
    }
}


function removerItem(index) {
    // 1. Puxa a lista atual do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 2. Remove o item específico pelo índice (posição dele no array)
    carrinho.splice(index, 1);

    // 3. SALVA a nova lista (sem o item) de volta no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // 4. REATUALIZA a tela e o contador
    atualizarContador();   // Para o número lá no ícone diminuir
    renderizarCarrinho(); // Para sumir da lista da página
}



function carregarDados() {
    atualizarContador();
    
    // Se estivermos na página de carrinho, desenha os itens
    if (document.getElementById('lista-carrinho')) {
        renderizarCarrinho();
    }
}

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
        
        mensagem += `📦 *${item.quantidade}x ${item.nome}*\n   (Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')})\n`;
    });

    mensagem += `\n💰 *Valor Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    // Substitua pelo SEU número (DD + NÚMERO) sem espaços ou traços
    let numeroWhatsApp = "5511970595785"; 
    
    let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Executa sempre que a página carregar ou recarregar
window.onload = carregarDados;