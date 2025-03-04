/*
ONE: CHALLENGE AMIGO SECRETO
----------------------------

A função deste programa é simular o sorteio de um amigo secreto.

Ele conta com as seguintes funções:
* Adicionar: Adiciona nome à lista de nomes do amigo secreto. A lista de nomes será exibida na tela.
** Só funciona se algum nome foi adicionado (alerta é exibido)
** O botão para de funcionar se o sorteio já foi iniciado (alerta é exibido)
* Sortear amigo: Sorteia um nome da lista, um texto em destaque indica qual foi o nome sorteado.
** Uma vez iniciado o sorteio, não podem ser adicionados novos nomes ao sorteio.
* Quando todos os nomes forem sorteados, o sorteio é reiniciado apertando qualquer botão.

Teclas de atalho:
* Enter: Efeito do botão "Adicionar".
* Igual ("="): Efeito do botão "Sortear amigo"
* Menos ("-"): Reinicia antecipadamente o sorteio.

Desenvolvido por Paulo Henrique Dihl.
*/

// Variáveis "globais"
let listaAmigos = [];
let numeroAmigos = 0;
let iniciado = false;
let inputAmigo = document.getElementById('amigo');
let botaoAmigo = document.getElementById('amigoBtn');
let listaAmigosTxt = document.getElementById('listaAmigos');
let resultado = document.getElementById('resultado');

// Traz o foco para o campo de entrada
inputAmigo.focus();

// Configura entradas por teclas
inputAmigo.addEventListener('keypress',
    function(event) {
        if (event.key == 'Enter') {
        event.preventDefault();
        botaoAmigo.click();
        }
        if (event.key == '=') {
        event.preventDefault();
        document.getElementById('resultadoBtn').click();
        }
        if (event.key == '-') {
        event.preventDefault();
        reiniciarSorteio();
        }
    }
);

// Função para adicionar amigos à lista
function adicionarAmigo(){
    resultado.innerHTML = '';
    let amigo = inputAmigo.value;

    if (numeroAmigos < 1 && iniciado) {
        reiniciarSorteio();
    } else if (iniciado) {
        alert('O sorteio já foi iniciado, termine o sorteio ou o reinicie (aperte "-")');
        inputAmigo.focus();
        return;
    } else if (!amigo || amigo.trim() == '') {
        alert('Por favor, insira um nome válido.');
        inputAmigo.focus();
        return;
    } else {
        listaAmigos.push(amigo);
        inputAmigo.value = '';
        inputAmigo.focus();
        atualizarLista();
    }
}

// Função para adicionar um nome à lista
function atualizarLista(){
    listaAmigosTxt.innerHTML = '';

    for(let i = 0; i < listaAmigos.length; i++) {
        let elemento = document.createElement('li');
        elemento.textContent = listaAmigos[i];
        listaAmigosTxt.appendChild(elemento);
    }
}

// Função para sortear um nome da lista
function sortearAmigo(){
    numeroAmigos = listaAmigos.length;

    if (numeroAmigos < 1 && !iniciado) {
        alert('Adicione pelo menos um amigo.');
        resultado.innerHTML = '';
        inputAmigo.focus();
        return;
    } else if (numeroAmigos < 1 && iniciado) {
        reiniciarSorteio();
    } else {
        iniciado = true;

        let sorteado = parseInt(Math.random() * numeroAmigos)
        let amigoSorteado = listaAmigos[sorteado];
        resultado.innerHTML = `<h2>O amigo sorteado foi: ${amigoSorteado}.</h2>`;
        
        listaAmigos.splice(sorteado, 1);
        numeroAmigos--;
        atualizarLista();
    }
}

// Função para reiniciar sorteio
function reiniciarSorteio(){
    iniciado = false;
    listaAmigosTxt.innerHTML = '';
    listaAmigos = [];
    alert('O sorteio foi reiniciado.');
}