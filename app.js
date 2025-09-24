let amigos = [];

function adicionarAmigo() {
    let nomeAmigo = document.getElementById('amigo');
    let lista = document.getElementById('listaAmigos');
    
    // Validação 1: Campo de entrada vazio
    if (nomeAmigo.value.trim() === '') {
        alert('Por favor, insira um nome.');
        return;
    }

    // Validação 2: Nome duplicado
    if (amigos.includes(nomeAmigo.value.trim())) {
        alert('Nome já adicionado! Por favor, inclua sobrenome ou um apelido.');
        return;
    }
    
    // Validação 3: Conteúdo inválido (números, datas, etc.)
    // A nova regex [\p{L}] aceita qualquer tipo de letra, incluindo as acentuadas.
    if (/[^\p{L}\s]/u.test(nomeAmigo.value)) {
        alert('Por favor, insira apenas letras.');
        return;
    }

    // Adiciona o nome ao array
    amigos.push(nomeAmigo.value.trim());

    // Atualiza a exibição da lista de nomes
    lista.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join('');

    // Atualiza a contagem e o aviso
    atualizarContagemParticipantes();

    // Limpa o campo de entrada
    nomeAmigo.value = '';
}

function atualizarContagemParticipantes() {
    let contagem = amigos.length;
    let aviso = '';
    let sortearBtn = document.getElementById('sortearBtn');
    let avisoElemento = document.getElementById('avisoParticipantes');
    
    if (contagem < 3) {
        aviso = `${contagem} de 3 amigos adicionados`;
        sortearBtn.disabled = true;
    } else {
        aviso = `${contagem} amigos adicionados, a partir de agora você pode sortear.`;
        sortearBtn.disabled = false;
    }
    
    avisoElemento.textContent = aviso;
}

function sortearAmigo() {
    // Validação final: garante que a lista tem 3 ou mais nomes antes de sortear
    if (amigos.length < 3) {
        alert('É necessário adicionar pelo menos 3 amigos para sortear.');
        return;
    }

    // Lógica para gerar um índice aleatório
    let numeroSorteado = Math.floor(Math.random() * amigos.length);
    
    // Pega o nome no array usando o índice aleatório
    let nomeSorteado = amigos[numeroSorteado];
    
    // Exibe o resultado na tela
    let resultadoElemento = document.getElementById('resultado');
    resultadoElemento.innerHTML = `O amigo secreto sorteado é: <br> ${nomeSorteado}`;
}

// Inicia a aplicação com a mensagem e o botão desativado
window.onload = function() {
    document.getElementById('avisoParticipantes').textContent = "Para sortear, você precisa digitar pelo menos 3 nomes.";
    document.getElementById('sortearBtn').disabled = true;
};