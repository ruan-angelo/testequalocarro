
const imageSrc = "imagem.png"; // Substitua pelo nome correto
const correctAnswer = "montanha"; // Exemplo

const positions = [0, 2, 3, 5, 1, 4]; // Ordem customizada
const container = document.getElementById("image-container");

positions.forEach((pos, i) => {
  const div = document.createElement("div");
  div.style.backgroundImage = `url('${imageSrc}')`;
  div.style.backgroundPosition = `-${(pos % 3) * 100 / 3}% -${Math.floor(pos / 3) * 100 / 2}%`;
  div.classList.add("hidden");
  container.appendChild(div);
});

const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const info = document.getElementById("info");
const previousGuesses = [];

guessForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const guess = guessInput.value.trim().toLowerCase();
  guessInput.value = "";

  if (!guess) return;

  if (!previousGuesses.includes(guess)) {
    previousGuesses.push(guess);
    updateGuessHistory();
  }

  if (guess === correctAnswer.toLowerCase()) {
    document.querySelectorAll("#image-container div").forEach(div => div.classList.remove("hidden"));
    info.textContent = "Parabéns! Você acertou!";
  } else {
    const hidden = Array.from(document.querySelectorAll("#image-container div.hidden"));
    if (hidden.length > 0) hidden[0].classList.remove("hidden");
    else info.textContent = "Você já revelou toda a imagem!";
  }
});

function updateGuessHistory() {
  const historyContainer = document.getElementById("guess-history");
  historyContainer.innerHTML = '';
  previousGuesses.forEach(g => {
    const span = document.createElement("span");
    span.textContent = g;
    historyContainer.appendChild(span);
  });
}
