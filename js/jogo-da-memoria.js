const cards = document.querySelectorAll(".memory-card");
const restartButton = document.querySelector("#restart-button"); // Botão para reiniciar o jogo

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.foto === secondCard.dataset.foto) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length); // Corrigido para garantir posições válidas
    card.style.order = randomPos;
  });
}

function restartGame() {
  // Desvira todas as cartas
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard); // Reativa o clique nas cartas
  });

  // Reembaralha as cartas
  shuffle();

  // Reseta o estado do jogo
  resetBoard();
}

// Adiciona evento de clique para reiniciar o jogo
restartButton.addEventListener("click", restartGame);

// Embaralha as cartas no início do jogo
shuffle();

// Adiciona evento de clique para as cartas
cards.forEach((card) => card.addEventListener("click", flipCard));
