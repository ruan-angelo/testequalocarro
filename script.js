const maxAttempts = 6;
let currentAttempt = 0;
let answer = "";
let dateKey = new Date().toISOString().slice(0, 10);
let revealedParts = 0;

// Carregar a resposta do dia
fetch('palavras.json')
  .then(res => res.json())
  .then(data => {
    answer = data[dateKey];
    setupImage(dateKey);
  });

function setupImage(date) {
  const container = document.getElementById("image-container");
  container.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const part = document.createElement("div");
    part.id = `part${i}`;
    part.style.backgroundImage = `url(carros/${date}.png)`;
    part.style.backgroundPosition = getPosition(i);
    part.style.visibility = "hidden";
    container.appendChild(part);
  }
}

function getPosition(i) {
  const row = Math.floor(i / 3);
  const col = i % 3;
  return `-${col * 200}px -${row * 200}px`;  // ← ajuste o valor aqui!
}

function makeGuess() {
  const input = document.getElementById("guess-input");
  const guess = input.value.trim().toLowerCase();
  if (!guess) return;

  const li = document.createElement("li");
  li.textContent = guess;
  document.getElementById("guesses-list").appendChild(li);
  input.value = "";

  const part = document.getElementById(`part${currentAttempt}`);
  if (part) part.style.visibility = "visible";
  
  currentAttempt++;

  if (guess === answer.toLowerCase()) {
    revealAll();
    document.getElementById("result").textContent = "🎉 Parabéns! Você acertou!";
  } else if (currentAttempt >= maxAttempts) {
    revealAll();
    document.getElementById("result").textContent = `❌ Fim de jogo! A resposta era: ${answer}`;
  }
}

function revealAll() {
  for (let i = 0; i < 6; i++) {
    const part = document.getElementById(`part${i}`);
    if (part) part.style.visibility = "visible";
  }
}
