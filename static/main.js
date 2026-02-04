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
    
    // Se não estiver na página de carrinho, nem tenta rodar
    if (!container) return;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (carrinho.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        if(totalElement) totalElement.innerText = "0,00";
        return;
    }

    let total = 0;
    container.innerHTML = carrinho.map((item, index) => {
        // Garante que o preço seja tratado como string antes do replace
        let precoLimpo = String(item.preco).replace(',', '.');
        const subtotal = parseFloat(precoLimpo) * item.quantidade;
        total += subtotal;
        
        return `
            <div class="item-carrinho" style="border-bottom: 1px solid #ccc; margin-bottom: 10px; padding: 10px;">
                <p><strong>${item.nome}</strong></p>
                <p>Qtd: ${item.quantidade} - Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}</p>
                <button onclick="removerItem(${index})" style="color: red;">Remover</button>
            </div>
        `;
    }).join('');

    if(totalElement) totalElement.innerText = total.toFixed(2).replace('.', ',');
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

// Executa sempre que a página carregar ou recarregar
window.onload = carregarDados;