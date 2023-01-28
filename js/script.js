//1) Referenciar o input, botão e lista

const input = document.querySelector('input[name=tarefa]');
const btn = document.querySelector('#botao');
const list = document.querySelector('#lista')
const card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] //transformando a lista de strings em um array novamente

function renderAsk() {
    //Limpar a listagem de itens antes de renderizar novamente a tela
    list.innerHTML = '';
    for (tarefa of tarefas){
        //Criar o item da lista
        let itemLista = document.createElement('li');

        //Adicionar classe no item
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Adicionar evento de click no item da lista
        itemLista.onclick = function() {
            deleteAsks(this)
        }

        //Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        //Adicionar texto no item da lista
        itemLista.appendChild(itemTexto)

        //Adicionar o item da lista na lista
        list.appendChild(itemLista)
    }
}
renderAsk()
//Precisa escutar o evento de click no botao
//Precisa capturar o valor digitado pelo usuario no input
//Atualizar a nova tarefa na lista e renderizar na tela
// btn.addEventListener('click', renderAsk)
btn.onclick = () => {
    let novaTarefa = input.value;
    if(novaTarefa !== '') {
        tarefas.push(novaTarefa); //Adiciona na lista
        renderAsk() //Renderiza
        input.value = ''; //Limpa o input
        removeSpan(); //Limpa os spans
        salvarDadosStorage()

    } else {
        removeSpan();

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Campo vazio.');
        span.appendChild(msg);

        card.appendChild(span)
    }


}

function removeSpan() {
    let spans = document.querySelectorAll('span');


    for(let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i])
    }

}

function deleteAsks(ask) {
    console.log(tarefas.indexOf(ask.textContent))
//     //Remove a tarefa do array
    tarefas.splice(tarefas.indexOf(ask.textContent), 1);

//     //Renderiza novamente a tela
    renderAsk()

    salvarDadosStorage()
}

 function salvarDadosStorage() {
//     //Todo navegador web possui essa capacidade
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
 }
// console.log(JSON.stringify(tarefas))