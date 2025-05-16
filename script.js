
const imageContainer = document.getElementById("image-container");
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const info = document.getElementById("info");

const imageName = "2025-05-16.jpg"; // Nome da imagem
const answer = "fusca"; // Resposta correta

const rows = 2;
const cols = 3;
const totalTiles = rows * cols;

// Criação das peças
for (let i = 0; i < totalTiles; i++) {
  const tile = document.createElement("div");
  const x = (i % cols) * -300;
  const y = Math.floor(i / cols) * -300;
  tile.style.backgroundImage = `url('carros/${imageName}')`;
  tile.style.backgroundPosition = `${x}px ${y}px`;
  tile.classList.add("hidden");
  imageContainer.appendChild(tile);
}

// Mostrar uma peça aleatória a cada segundo
let revealed = 0;
const interval = setInterval(() => {
  const hiddenTiles = Array.from(imageContainer.children).filter(tile => tile.classList.contains("hidden"));
  if (hiddenTiles.length === 0) {
    clearInterval(interval);
    return;
  }
  const randomTile = hiddenTiles[Math.floor(Math.random() * hiddenTiles.length)];
  randomTile.classList.remove("hidden");
  revealed++;
}, 1000);

// Verificar resposta
guessForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const guess = guessInput.value.trim().toLowerCase();
  if (guess === answer) {
    clearInterval(interval);
    Array.from(imageContainer.children).forEach(tile => tile.classList.remove("hidden"));
    info.textContent = "Parabéns! Você acertou.";
  } else {
    info.textContent = "Tente novamente.";
  }
});
