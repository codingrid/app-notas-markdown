const languages = {
    pt: {
      title: "Minhas Notas",
      placeholderTitle: "Título da nota",
      placeholderContent: "Escreva em Markdown...",
      save: "Salvar Nota",
      feedback: "Nota salva com sucesso!",
      yourNotes: "Suas Notas",
      language: "Idioma"
    },
    en: {
      title: "My Notes",
      placeholderTitle: "Note title",
      placeholderContent: "Write in Markdown...",
      save: "Save Note",
      feedback: "Note saved successfully!",
      yourNotes: "Your Notes",
      language: "Language"
    }
  };
  
  function setLanguage(lang) {
    const t = languages[lang];
    document.getElementById("app-title").innerText = t.title;
    document.getElementById("note-title").placeholder = t.placeholderTitle;
    document.getElementById("note-content").placeholder = t.placeholderContent;
    document.getElementById("save-note").innerText = t.save;
    document.getElementById("feedback").innerText = t.feedback;
    document.querySelector("#notes-list h2").innerText = t.yourNotes;
    document.querySelector("#lang-switcher span").innerText = t.language + ":";
  
    localStorage.setItem("language", lang);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "pt";
    setLanguage(savedLang);
  });
  