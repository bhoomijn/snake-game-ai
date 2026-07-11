const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{x: 200, y: 200}]; // snake start center
let dx = 10;
let dy = 0;
let food = {x: 100, y: 100};
let score = 0;
let highScore = 0;

document.addEventListener("keydown", changeDirectionKey);

function changeDirectionKey(event) {
  if (event.key === "ArrowLeft" && dx === 0) { dx = -10; dy = 0; }
  else if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -10; }
  else if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = 10; }
  else if (event.key === "ArrowRight" && dx === 0) { dx = 10; dy = 0; }
}

function changeDirection(dir) {
  if (dir === 'LEFT' && dx === 0) { dx = -10; dy = 0; }
  else if (dir === 'UP' && dy === 0) { dx = 0; dy = -10; }
  else if (dir === 'DOWN' && dy === 0) { dx = 0; dy = 10; }
  else if (dir === 'RIGHT' && dx === 0) { dx = 10; dy = 0; }
}

function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    if (score > highScore) {
      highScore = score;
      document.getElementById("highScore").innerText = "High Score: " + highScore;
    }
    food = {
      x: Math.floor(Math.random() * 40) * 10,
      y: Math.floor(Math.random() * 40) * 10
    };
  } else {
    snake.pop();
  }
}

function checkGameOver() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

function restartGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake = [{x: 200, y: 200}];
  dx = 10; dy = 0;
  score = 0;
  document.getElementById("score").innerText = "Score: 0";
  food = {x: 100, y: 100};
  drawSnake(); // ensure visible after restart
}

function gameLoop() {
  if (checkGameOver()) {
    restartGame(); // auto restart instead of stopping
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  moveSnake();
  drawSnake();
}

// 👇 snake visible at start
drawSnake();

// 👇 thoda delay ke baad loop start hoga
setTimeout(() => {
  setInterval(gameLoop, 100);
}, 200);
