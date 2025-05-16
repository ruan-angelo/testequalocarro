const imageContainer = document.getElementById('image-container');
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const info = document.getElementById('info');

// Nome da imagem sem extensão
const answer = "gtr";

// Ordem personalizada de revelação
const revealOrder = [0, 2, 3, 5, 1, 4];

let currentIndex = 0;

// Criar os blocos
for (let i = 0; i < 6; i++) {
  const div = document.createElement('div');
  div.classList.add('hidden');
  div.style.backgroundImage = `url('carros/${answer}.png')`;

  // Posição correta da imagem de fundo
  const x = -(i % 3) * 300;
  const y = -Math.floor(i / 3) * 300;
  div.style.backgroundPosition = `${x}px ${y}px`;

  imageContainer.appendChild(div);
}

function revealNextPiece() {
  if (currentIndex < revealOrder.length) {
    const divs = imageContainer.querySelectorAll('div');
    const nextIndex = revealOrder[currentIndex];
    divs[nextIndex].classList.remove('hidden');
    currentIndex++;
  }
}

guessForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const guess = guessInput.value.trim().toLowerCase();
  if (guess === answer.toLowerCase()) {
    info.textContent = "Parabéns! Você acertou!";
    const divs = imageContainer.querySelectorAll('div');
    divs.forEach(div => div.classList.remove('hidden'));
  } else {
    revealNextPiece();
    info.textContent = "Tente novamente!";
  }
  guessInput.value = "";
});
