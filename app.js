let participantes = [];
let valorPresente;

// Mapeamento dos elementos do HTML
const valueInput = document.getElementById('value-input');
const defineBtn = document.getElementById('define-btn');
const nameInput = document.getElementById('name-input');
const addBtn = document.getElementById('add-btn');
const sortearBtn = document.getElementById('sortearBtn');
const valorGastoDisplay = document.getElementById('valor-gasto');
const amigosLista = document.getElementById('amigos-lista');
const inputTitle = document.querySelector('#set-value-container .section-title');
const resultadoSorteio = document.getElementById('resultado-sorteio');
const sorteioMessage = document.getElementById('sorteio-message');

// Contêineres de cada etapa
const setValueContainer = document.getElementById('set-value-container');
const addNamesContainer = document.getElementById('add-names-container');
const infoDisplayContainer = document.getElementById('info-display-container');

// --- Funções de Lógica do Jogo ---

function definirValor() {
    const valorCampo = valueInput.value.replace(',', '.');
    valorPresente = parseFloat(valorCampo);

    if (isNaN(valorPresente) || valorPresente < 50 || valorPresente > 450) {
        alert('Por favor, insira um valor entre R$ 50,00 e R$ 450,00.');
        return;
    }

    // Atualiza o display do valor
    valorGastoDisplay.textContent = `R$ ${valorPresente.toFixed(2).replace('.', ',')}`;
    
    // Desabilita o campo de input e muda o botão para "Alterar valor"
    valueInput.disabled = true;
    defineBtn.textContent = "Alterar valor";
    
    // Esconde a etapa de definir valor e mostra as próximas
    setValueContainer.classList.add('hidden');
    addNamesContainer.classList.remove('hidden');
    infoDisplayContainer.classList.remove('hidden');
}

function alterarValor() {
    // Habilita o campo de input e muda o botão de volta para "Definir"
    valueInput.disabled = false;
    defineBtn.textContent = "Definir";
    
    // Esconde as etapas seguintes e volta para a de definir valor
    setValueContainer.classList.remove('hidden');
    addNamesContainer.classList.add('hidden');
    infoDisplayContainer.classList.add('hidden');
    resultadoSorteio.classList.add('hidden');
}

function adicionarAmigo() {
    const nome = nameInput.value.trim();

    if (nome && !participantes.includes(nome)) {
        participantes.push(nome);
        renderizarListaDeNomes();
        nameInput.value = '';

        if (participantes.length >= 3) {
            sortearBtn.disabled = false;
        }
    } else if (participantes.includes(nome)) {
        alert('Este nome já foi adicionado!');
    }
}

function sortearAmigo() {
    if (participantes.length < 3) {
        alert('É necessário ter pelo menos 3 participantes para o sorteio!');
        return;
    }

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
    
    // Esconde as etapas anteriores e mostra o resultado
    addNamesContainer.classList.add('hidden');
    infoDisplayContainer.classList.add('hidden');
    resultadoSorteio.classList.remove('hidden');

    // Mostra a mensagem e o nome da pessoa sorteada na tela
    sorteioMessage.textContent = `Através do sorteio realizado, você, ${participantes[0]}, deverá presentear esta pessoa: ${embaralhados[0]}`;
    
    // Mostra o resultado completo no Console para os organizadores do jogo
    console.log("--- Resultado do Sorteio ---");
    for (let i = 0; i < participantes.length; i++) {
        console.log(`${participantes[i]} tirou ${embaralhados[i]}`);
    }
    console.log("----------------------------");
}

// --- Funções de Renderização e Eventos ---

function renderizarListaDeNomes() {
    amigosLista.innerHTML = '';
    participantes.forEach(nome => {
        const item = document.createElement('li');
        item.textContent = nome;
        amigosLista.appendChild(item);
    });
}

// Event Listeners dinâmicos
defineBtn.addEventListener('click', () => {
    if (defineBtn.textContent === "Definir") {
        definirValor();
    } else {
        alterarValor();
    }
});

addBtn.addEventListener('click', adicionarAmigo);
sortearBtn.addEventListener('click', sortearAmigo);