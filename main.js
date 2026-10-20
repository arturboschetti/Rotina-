import { database } from "./firebase.js";
import {
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

const inputTarefa = document.getElementById("i1");
const botaoAdicionar = document.getElementById("btnADD");
const listaTarefas = document.getElementById("listaTarefas");

const pastaTarefas = ref(database, "tarefas");

let idTarefaSendoEditada = null;

botaoAdicionar.addEventListener("click", () => {
  const textoDaTarefa = inputTarefa.value;

  if (textoDaTarefa !== "") {
    if (idTarefaSendoEditada === null) {
      const novaTarefaRef = push(pastaTarefas);
      set(novaTarefaRef, {
        nome: textoDaTarefa,
      });
    } else {
      const tarefaParaEditar = ref(database, `tarefas/${idTarefaSendoEditada}`);
      update(tarefaParaEditar, {
        nome: textoDaTarefa,
      });

      idTarefaSendoEditada = null;
      botaoAdicionar.innerText = "Adicionar Tarefa";
    }

    inputTarefa.value = "";
  }
});

onValue(pastaTarefas, (snapshot) => {
  listaTarefas.innerHTML = "";

  const dados = snapshot.val();

  if (dados) {
    Object.keys(dados).forEach((idDaTarefa) => {
      const tarefa = dados[idDaTarefa];

      const itemDaLista = document.createElement("li");
      itemDaLista.innerText = `${tarefa.nome} `;

      const botaoEditar = document.createElement("button");
      botaoEditar.innerText = "Editar";
      botaoEditar.id = "btnEDT";

      botaoEditar.addEventListener("click", () => {
        inputTarefa.value = tarefa.nome;

        idTarefaSendoEditada = idDaTarefa;

        botaoAdicionar.innerText = "Salvar Edição";
      });

      const botaoDeletar = document.createElement("button");
      botaoDeletar.innerText = "Apagar";
      botaoDeletar.id = "btnDEL";

      botaoDeletar.addEventListener("click", () => {
        const tarefaParaApagar = ref(database, `tarefas/${idDaTarefa}`);
        remove(tarefaParaApagar);
      });

      itemDaLista.appendChild(botaoEditar);
      itemDaLista.appendChild(botaoDeletar);
      listaTarefas.appendChild(itemDaLista);
    });
  }
});
