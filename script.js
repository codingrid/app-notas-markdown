const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const previewDiv = document.getElementById("preview");
const saveButton = document.getElementById("save-note");
const feedback = document.getElementById("feedback");
const notesList = document.getElementById("notes-ul");
const toggleTheme = document.getElementById("toggle-theme");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderPreview() {
  previewDiv.innerHTML = marked.parse(contentInput.value || "");
}

function saveNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) return;
  const note = {
    id: Date.now(),
    title,
    content,
    done: false
  };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  showFeedback();
  renderNotes();
  titleInput.value = "";
  contentInput.value = "";
  renderPreview();
}

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach(note => {
    const li = document.createElement("li");
    li.className = "note-item";

    const span = document.createElement("span");
    span.innerHTML = `<strong>${note.title}</strong> - ${note.done ? "✅" : "📝"}`;

    const actions = document.createElement("div");
    actions.className = "note-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = note.done ? "Desmarcar" : "Concluir";
    toggleBtn.onclick = () => toggleNoteDone(note.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.onclick = () => deleteNote(note.id);

    actions.append(toggleBtn, deleteBtn);
    li.append(span, actions);
    notesList.appendChild(li);
  });
}

function toggleNoteDone(id) {
  notes = notes.map(n => n.id === id ? { ...n, done: !n.done } : n);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function showFeedback() {
  feedback.classList.remove("hidden");
  setTimeout(() => feedback.classList.add("hidden"), 2000);
}

saveButton.addEventListener("click", saveNote);
contentInput.addEventListener("input", renderPreview);
toggleTheme.addEventListener("click", () => {
  const html = document.documentElement;
  const theme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", theme);
});

document.addEventListener("DOMContentLoaded", () => {
  renderNotes();
  renderPreview();
});
