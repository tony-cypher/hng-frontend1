const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#A52A2A",
  "#FFC0CB",
  "#808000",
  "#008080",
];
let score = 0;
let currentColor;

const colorBox = document.querySelector('[data-testid="colorBox"]');
const optionsContainer = document.querySelector(".options-container");
const scoreDisplay = document.querySelector('[data-testid="score"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

function initializeGame() {
  // Select random target color
  currentColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = currentColor;

  // Generate color options
  const colorOptions = getRandomColors(5).concat(currentColor);
  colorOptions.sort(() => Math.random() - 0.5);

  // Create option buttons
  optionsContainer.innerHTML = "";
  colorOptions.forEach((color) => {
    const button = document.createElement("button");
    button.dataset.testid = "colorOption";
    button.style.backgroundColor = color;
    button.addEventListener("click", () => handleGuess(color));
    optionsContainer.appendChild(button);
  });
}

function getRandomColors(num) {
  const availableColors = colors.filter((c) => c !== currentColor);
  const selected = [];
  while (selected.length < num) {
    const color =
      availableColors[Math.floor(Math.random() * availableColors.length)];

    // selects the color if it does not exist.
    if (!selected.includes(color)) {
      selected.push(color);
    }
  }
  return selected;
}

function handleGuess(selectedColor) {
  if (selectedColor === currentColor) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    gameStatus.textContent = "Correct! Well done! 🎉";
    gameStatus.classList.add("correct");
    setTimeout(initializeGame, 1000);
  } else {
    gameStatus.textContent = "Wrong! Try again! ❌";
    gameStatus.classList.add("wrong");
  }

  setTimeout(() => {
    gameStatus.classList.remove("correct", "wrong");
    gameStatus.textContent = "";
  }, 1000);
}

newGameButton.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  gameStatus.textContent = "";
  initializeGame();
});

// Start initial game
initializeGame();
