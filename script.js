const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{x: 200, y: 200}]; // snake start center
let dx = 10;
let dy = 0;
let food = {x: 100, y: 100};

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
    food = {
      x: Math.floor(Math.random() * 40) * 10,
      y: Math.floor(Math.random() * 40) * 10
    };
  } else {
    snake.pop();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  moveSnake();
  drawSnake();
}

// 👇 ye line snake ko start me visible banati hai
drawSnake(); // snake visible at start

setInterval(gameLoop, 100);
