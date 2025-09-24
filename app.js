let amigos = [];

function adicionarAmigo() {
    let nomeAmigo = document.getElementById('amigo');
    
    // Validação: garante que o campo não está vazio
    if (nomeAmigo.value == '') {
        alert('Por favor, insira um nome.');
        return; // Retorna para parar a execução da função
    }

    // Adiciona o nome ao array
    amigos.push(nomeAmigo.value);

    // Atualiza a exibição da lista e da contagem
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

    for (let i = 0; i < amigos.length; i++) {
        let item = document.createElement('li');
        item.textContent = amigos[i];
        lista.appendChild(item);
    }
    
    let contagem = amigos.length;
    let aviso = '';
    if (contagem < 3) {
        aviso = `(${3 - contagem} falta(m) para o mínimo de 3)`;
    }
    document.getElementById('contagemParticipantes').textContent = `Participantes: ${contagem} ${aviso}`;

    // Limpa o campo de entrada
    nomeAmigo.value = '';
}

function sortearAmigo() {
    // 1. Validar se há pelo menos 3 amigos no array.
    // 2. Gerar um índice aleatório para o array 'amigos'.
    // 3. Obter o nome sorteado e exibir na tela.
}

