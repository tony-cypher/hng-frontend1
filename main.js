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
let currentColor = "";

const colorBox = document.querySelector(".colorBox");
const optionsBox = document.querySelector(".options-box");
const showScore = document.querySelector(".score");
const gameStatus = document.querySelector(".gameStatus");
const newGameButton = document.querySelector(".newGameButton");

function startGame() {
  currentColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = currentColor;

  const randomColors = generateRandomColors(5).concat(currentColor);
  randomColors.sort(() => Math.random() - 0.5);

  optionsBox.innerHTML = "";
  randomColors.forEach((color) => {
    const button = document.createElement("button");
    button.className = "colorOption";
    button.style.backgroundColor = color;
    button.addEventListener("click", () => handleChoice(color));
    optionsBox.appendChild(button);
  });
}

function generateRandomColors(num) {
  const availableColors = colors.filter((c) => c !== currentColor);
  const selected = [];
  while (selected.length < num) {
    const color =
      availableColors[Math.floor(Math.random() * availableColors.length)];

    if (!selected.includes(color)) {
      selected.push(color);
    }
  }
  return selected;
}

function handleChoice(selectedColor) {
  if (selectedColor === currentColor) {
    score++;
    showScore.textContent = `Score: ${score}`;
    gameStatus.textContent = "Correct! Well done! 🎉";
    gameStatus.classList.add("correct");
    setTimeout(startGame, 1000);
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
  showScore.textContent = "Score: 0";
  gameStatus.textContent = "";
  startGame();
});

startGame();
