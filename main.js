document.addEventListener("DOMContentLoaded", () => {
  // Alternar Tema
  const themeButton = document.getElementById("theme-button");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // Reproduzir Música
  const playMusicButton = document.getElementById("play-music-button");
  if (playMusicButton) {
    playMusicButton.addEventListener("click", () => {
      const audio = new Audio("photography-ed-sheeran.mp3"); // Caminho correto
      audio.play();
    });
  }

  // Modal de Imagem
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const galleryImages = document.querySelectorAll(".gallery img");

  if (galleryImages) {
    galleryImages.forEach((image) => {
      image.addEventListener("click", () => {
        modal.style.display = "block";
        modalImage.src = image.src;
        captionText.textContent = image.alt;
      });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // Formulário de Pensamentos
  const thoughtForm = document.getElementById("thought-form");
  const thoughtInput = document.getElementById("thought-input");
  const thoughtList = document.getElementById("thought-list");

  if (thoughtForm) {
    thoughtForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const thought = thoughtInput.value.trim();
      if (thought) {
        const listItem = document.createElement("li");
        listItem.textContent = thought;
        thoughtList.appendChild(listItem);
        thoughtInput.value = "";
      }
    });
  }
});
