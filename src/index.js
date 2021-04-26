// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pending = document.querySelector(".js-pending"),
  finished = document.querySelector(".js-finished");

const TODOS_LS = "toDos";

let toDos = [];

function changeToDo(event, toDo) {
  const btn = event.target;
  const li = btn.parentNode;
  if (toDo.position === true) {
    toDo.position = false;
    pending.removeChild(li);
    finished.appendChild(li);
  } else {
    toDo.position = true;
    finished.removeChild(li);
    pending.appendChild(li);
  }
  console.log(toDos);
  saveToDos();
}

function deleteToDo(event, toDo) {
  const btn = event.target;
  const li = btn.parentNode;
  console.log(li);
  console.log(li.id);
  if (toDo.position === true) {
    pending.removeChild(li);
  } else {
    finished.removeChild(li);
  }
  const cleanToDos = toDos.filter(function (item) {
    return item.id !== parseInt(li.id);
  });
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

let idNumbers = 1;

function paintToDo(toDo) {
  console.log(toDo);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const changeBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  idNumbers += 1;
  span.innerText = toDo.text;
  changeBtn.innerText = "✅";
  changeBtn.addEventListener("click", function (event) {
    changeToDo(event, toDo);
  });
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", function (event) {
    deleteToDo(event, toDo);
  });
  li.appendChild(span);
  li.appendChild(changeBtn);
  li.appendChild(delBtn);
  li.id = newId;
  //console.log(toDo);
  if (toDo.position === true) {
    pending.appendChild(li);
  } else {
    finished.appendChild(li);
  }
  toDos.push(toDo);
  saveToDos();
}

function paintToDoText(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const changeBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  idNumbers += 1;
  span.innerText = text;
  changeBtn.innerText = "✅";
  changeBtn.addEventListener("click", function (event) {
    changeToDo(event, toDoObj);
  });
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", function (event) {
    deleteToDo(event, toDoObj);
  });
  li.appendChild(span);
  li.appendChild(changeBtn);
  li.appendChild(delBtn);
  li.id = newId;
  pending.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
    position: true
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDoText(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos === null) {
  } else {
    const parsedToDos = JSON.parse(loadedToDos);
    console.log(parsedToDos);
    parsedToDos.forEach(paintToDo);
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
