const maxAttempts = 6;
let attempts = 0;
let revealedParts = 0;

const respostasDiarias = {
  "2025-05-16": "ferrari",
  "2025-05-17": "fusca",
  "2025-05-18": "golquadrado"
};

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const currentDate = getCurrentDate();
const respostaCorreta = respostasDiarias[currentDate];
const imagePath = `carros/${currentDate}.jpg`;

const imageContainer = document.getElementById('image-container');

function createImageParts() {
  for (let i = 0; i < 6; i++) {
    const part = document.createElement('div');
    part.style.backgroundImage = `url(${imagePath})`;
    part.style.backgroundPosition = getPosition(i);
    part.classList.add('hidden');
    imageContainer.appendChild(part);
  }
}

function getPosition(i) {
  const partWidth = 300;  // 900 / 3
  const partHeight = 300; // 600 / 2
  const row = Math.floor(i / 3);
  const col = i % 3;
  return `-${col * partWidth}px -${row * partHeight}px`;
}

function revelarParte() {
  const parts = imageContainer.querySelectorAll('div.hidden');
  if (parts.length > 0) {
    parts[0].classList.remove('hidden');
    revealedParts++;
  }
}

function revelarTodasPartes() {
  const parts = imageContainer.querySelectorAll('div.hidden');
  parts.forEach(p => p.classList.remove('hidden'));
}

function disableInput() {
  document.getElementById('guess-input').disabled = true;
  document.getElementById('guess-submit').disabled = true;
}

document.getElementById('guess-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (attempts >= maxAttempts) return;

  const input = document.getElementById('guess-input');
  const palpite = input.value.trim().toLowerCase().replace(/\s/g, '');
  input.value = '';

  if (!palpite) return;

  attempts++;

  if (palpite === respostaCorreta.toLowerCase().replace(/\s/g, '')) {
    revelarTodasPartes();
    alert('Parabéns! Você acertou o carro do dia!');
    disableInput();
  } else {
    revelarParte();

    if (attempts === maxAttempts) {
      alert(`Você perdeu! O carro do dia era: ${respostaCorreta}`);
      revelarTodasPartes();
      disableInput();
    }
  }
});

createImageParts();
