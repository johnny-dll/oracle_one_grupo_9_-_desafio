let participantes = []; // Array para armazenar os nomes dos participantes
let valorDefinido = false;
let valorPresente;

// Mapeia os elementos do HTML para variáveis JS
const nameInput = document.getElementById('amigo');
const addOrDefineButton = document.getElementById('add-btn');
const sortearButton = document.getElementById('sortearBtn');
const nameList = document.getElementById('amigos-lista');
const priceDisplay = document.getElementById('valor-gasto');
const inputTitle = document.getElementById('input-title');
const resultadoSorteio = document.getElementById('resultado-sorteio');

//--- FUNÇÕES PRINCIPAIS ---

// Função para definir o valor do presente
function definirValor() {
    const valorCampo = nameInput.value.replace(',', '.');
    valorPresente = parseFloat(valorCampo);

    if (isNaN(valorPresente) || valorPresente < 50 || valorPresente > 450) {
        alert('Por favor, insira um valor entre R$ 50,00 e R$ 450,00.');
        return;
    }

    valorDefinido = true;
    priceDisplay.textContent = `R$ ${valorPresente.toFixed(2).replace('.', ',')}`;
    mudarParaAdicionarNomes();
}

// Função para mudar a interface para adicionar nomes
function mudarParaAdicionarNomes() {
    inputTitle.textContent = "Digite o nome dos seus amigos";
    nameInput.placeholder = "Digite um nome";
    nameInput.value = '';
    
    addOrDefineButton.textContent = "Adicionar";
    // Remove o listener de "Definir" e adiciona o de "Adicionar"
    addOrDefineButton.removeEventListener('click', definirValor);
    addOrDefineButton.addEventListener('click', adicionarAmigo);

    sortearButton.disabled = false;
}

// Função para adicionar um nome à lista
function adicionarAmigo() {
    const nome = nameInput.value.trim();

    if (nome && !participantes.includes(nome)) {
        participantes.push(nome);
        renderizarListaDeNomes();
        nameInput.value = '';
    } else if (participantes.includes(nome)) {
        alert('Este nome já foi adicionado!');
    }
}

// Função para sortear os nomes
function sortearAmigo() {
    if (participantes.length < 2) {
        alert('É necessário ter pelo menos 2 participantes para o sorteio!');
        return;
    }

    // Lógica para embaralhar e garantir que ninguém tire a si mesmo
    const embaralhados = [...participantes];
    
    let sorteioValido = false;
    while (!sorteioValido) {
        embaralhados.sort(() => Math.random() - 0.5);
        sorteioValido = true;
        for (let i = 0; i < participantes.length; i++) {
            if (participantes[i] === embaralhados[i]) {
                sorteioValido = false;
                break;
            }
        }
    }
    
    // Mostra o resultado completo no Console.log (apenas para o desenvolvedor)
    console.log("--- Resultado do Sorteio ---");
    for (let i = 0; i < participantes.length; i++) {
        console.log(`${participantes[i]} tirou ${embaralhados[i]}`);
    }
    console.log("----------------------------");

    // Mostra a mensagem genérica na tela
    const mensagemSorteio = "Através do sorteio realizado, você deverá presentear esta pessoa:";
    resultadoSorteio.textContent = mensagemSorteio;
    resultadoSorteio.style.display = 'block';
    
    // Exibe o nome da pessoa sorteada no console
    // OBS: Você pode personalizar esta parte para o sorteio de um único usuário
    console.log(`Você deverá presentear: ${embaralhados[0]}`); 
}

//--- FUNÇÕES DE RENDERIZAÇÃO E INÍCIO ---

// Função para renderizar a lista de nomes na tela
function renderizarListaDeNomes() {
    nameList.innerHTML = '';
    participantes.forEach(nome => {
        const item = document.createElement('li');
        item.textContent = nome;
        nameList.appendChild(item);
    });
}

// Inicia a aplicação na primeira etapa
window.onload = function() {
    // Adiciona o listener inicial para o botão "Definir"
    addOrDefineButton.addEventListener('click', definirValor);
    sortearButton.addEventListener('click', sortearAmigo);
    sortearButton.disabled = true;
};