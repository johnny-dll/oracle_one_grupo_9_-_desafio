let participantes = [];
let valorPresente;
let sorteioCompleto = [];
let sorteadorAtualIndex = 0;

// Mapeamento dos elementos do HTML
const valueInput = document.getElementById('value-input');
const defineBtn = document.getElementById('define-btn');
const nameInput = document.getElementById('name-input');
const addBtn = document.getElementById('add-btn');
const sortearBtn = document.getElementById('sortearBtn');
const valorGastoDisplay = document.getElementById('valor-gasto');
const amigosLista = document.getElementById('amigos-lista');
const resultadoSorteio = document.getElementById('resultado-sorteio');
const sorteioMessage = document.getElementById('sorteio-message');
const restartBtn = document.getElementById('restart-btn');

// Contêineres de cada etapa
const setValueContainer = document.getElementById('set-value-container');
const addNamesContainer = document.getElementById('add-names-container');
const valorDisplay = document.getElementById('valor-display');
const namesDisplay = document.getElementById('names-display');

// --- Funções de Lógica do Jogo ---

/**
 * Reinicia o jogo para um novo sorteio, com confirmação do usuário.
 */
function reiniciarJogo() {
    const confirmarReiniciar = window.confirm("Você tem certeza que deseja reiniciar o jogo? Todos os nomes e o valor serão perdidos.");
    if (!confirmarReiniciar) {
        return;
    }

    participantes = [];
    valorPresente = null;
    sorteioCompleto = [];
    sorteadorAtualIndex = 0;

    valorGastoDisplay.textContent = 'R$ 0,00';
    amigosLista.innerHTML = '';
    nameInput.value = '';
    valueInput.value = '';
    sortearBtn.disabled = true;
    sortearBtn.textContent = 'Sortear';
    namesDisplay.classList.add('hidden');
    resultadoSorteio.classList.add('hidden');
    sorteioMessage.innerHTML = '';
    
    setValueContainer.classList.remove('hidden');
    addNamesContainer.classList.add('hidden');
    valorDisplay.classList.add('hidden');
    
    valueInput.disabled = false;
    defineBtn.textContent = 'Definir';
}

/**
 * Define o valor do presente e avança para a próxima etapa.
 */
function definirValor() {
    const valorCampo = valueInput.value.replace(',', '.');
    valorPresente = parseFloat(valorCampo);

    if (isNaN(valorPresente) || valorPresente < 50 || valorPresente > 450) {
        alert('Por favor, insira um valor entre R$ 50,00 e R$ 450,00.');
        return;
    }

    valorGastoDisplay.textContent = `R$ ${valorPresente.toFixed(2).replace('.', ',')}`;
    
    valueInput.disabled = true;
    defineBtn.textContent = "Alterar valor";
    
    valorDisplay.classList.remove('hidden');
    addNamesContainer.classList.remove('hidden');
}

/**
 * Permite alterar o valor do presente, voltando à primeira etapa.
 */
function alterarValor() {
    valueInput.disabled = false;
    defineBtn.textContent = "Definir";
    
    valorDisplay.classList.add('hidden');
    addNamesContainer.classList.add('hidden');
    resultadoSorteio.classList.add('hidden');
}

/**
 * Adiciona um nome à lista de participantes e atualiza a interface.
 */
function adicionarAmigo() {
    const nome = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\u00C0-\u017F\s-]+$/;
    
    if (!nome) {
        nameInput.classList.add('error');
        setTimeout(() => nameInput.classList.remove('error'), 300);
        return;
    }
    
    if (!nameRegex.test(nome)) {
        alert('O nome deve conter apenas letras, hífens e espaços.');
        nameInput.classList.add('error');
        setTimeout(() => nameInput.classList.remove('error'), 300);
        return;
    }
    
    if (participantes.includes(nome)) {
        nameInput.classList.add('error');
        setTimeout(() => nameInput.classList.remove('error'), 300);
        return;
    }

    if (nome) {
        participantes.push(nome);
        renderizarListaDeNomes();
        nameInput.value = '';
        namesDisplay.classList.remove('hidden');
        if (participantes.length >= 3) {
            sortearBtn.disabled = false;
        }
    }
}

/**
 * Realiza o sorteio e revela o nome na tela.
 */
function sortearAmigo() {
    if (sortearBtn.textContent === 'Sortear novamente') {
        const confirmarNovoSorteio = window.confirm("Atenção: A ordem do sorteio atual será apagada. Deseja realizar um novo sorteio?");
        if (!confirmarNovoSorteio) {
            return;
        }
    }

    if (participantes.length < 3) {
        alert('É necessário ter pelo menos 3 participantes para o sorteio!');
        return;
    }

    if (sorteioCompleto.length === 0) {
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
        sorteioCompleto = embaralhados;

        console.log("--- Resultado do Sorteio Completo ---");
        for (let i = 0; i < participantes.length; i++) {
            console.log(`${participantes[i]} tirou ${sorteioCompleto[i]}`);
        }
        console.log("----------------------------");
    }

    if (sorteadorAtualIndex < participantes.length) {
        const sorteadoNome = sorteioCompleto[sorteadorAtualIndex];
        const sorteadorNome = participantes[sorteadorAtualIndex];
        
        sorteioMessage.innerHTML = `Olá, ${sorteadorNome}, você deverá presentear: <span class="revealed-name">${sorteadoNome}</span>`;
        sorteadorAtualIndex++;
        
        setValueContainer.classList.add('hidden');
        addNamesContainer.classList.add('hidden');
        resultadoSorteio.classList.remove('hidden');

        if (sorteadorAtualIndex === participantes.length) {
            sortearBtn.disabled = true;
            alert("Todos os participantes já sortearam seus amigos secretos. Agora o jogo pode começar!");
        } else {
            sortearBtn.textContent = 'Sortear novamente';
        }
    } else {
        alert("Todos os participantes já sortearam seus amigos secretos. Clique em 'Novo Sorteio' para começar um novo jogo.");
    }
}

// --- Funções de Renderização e Eventos ---

/**
 * Atualiza a lista de nomes na interface.
 */
function renderizarListaDeNomes() {
    amigosLista.innerHTML = '';
    participantes.forEach(nome => {
        const item = document.createElement('li');
        item.textContent = nome;
        amigosLista.appendChild(item);
    });
}

// Event Listeners dinâmicos para os botões
defineBtn.addEventListener('click', () => {
    if (defineBtn.textContent === "Definir") {
        definirValor();
    } else {
        alterarValor();
    }
});

addBtn.addEventListener('click', adicionarAmigo);
sortearBtn.addEventListener('click', sortearAmigo);
restartBtn.addEventListener('click', reiniciarJogo);

// Adiciona a funcionalidade de "Enter" para os inputs
valueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        definirValor();
    }
});

nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        adicionarAmigo();
    }
});