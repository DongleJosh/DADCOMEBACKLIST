const titleInput = document.querySelector("#title");
const textInput = document.querySelector("#text");
const saveButton = document.querySelector(".save-note");
const listGroup = document.querySelector(".list-group");

let notes = [];

function renderNotes() {
  listGroup.innerHTML = "";
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    const div = document.createElement("div");
    div.innerHTML = `<h5>${note.title}</h5><p>${note.text}</p>`;
    li.appendChild(div);
    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger", "delete-note");
    button.setAttribute("data-id", i);
    button.innerHTML = `<i class="fas fa-trash"></i>`;
    li.appendChild(button);
    listGroup.appendChild(li);
  }
}

function saveNote() {
  const title = titleInput.value.trim();
  const text = textInput.value.trim();
  if (title.length === 0 || text.length === 0) {
    return;
  }
  const note = { title, text };
  notes.push(note);
  renderNotes();
  titleInput.value = "";
  textInput.value = "";
}

function deleteNote() {
  const id = parseInt(this.getAttribute("data-id"));
  notes.splice(id, 1);
  renderNotes();
}

function handleFormSubmit(event) {
  event.preventDefault();
  saveNote();
}

function handleDeleteClick() {
  deleteNote.call(this);
}

function initialize() {
  const savedNotes = JSON.parse(localStorage.getItem("notes"));
  if (savedNotes) {
    notes = savedNotes;
    renderNotes();
  }
  saveButton.addEventListener("click", handleFormSubmit);
  listGroup.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-note")) {
      handleDeleteClick.call(event.target);
    }
  });
}

document.querySelector('form').addEventListener('submit', handleFormSubmit);

initialize();

window.addEventListener("beforeunload", function () {
  localStorage.setItem("notes", JSON.stringify(notes));
});