const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let player = { x: 50, y: 400, width: 40, height: 40, vx: 0, vy: 0, onGround: false };
let gravity = 0.5;
let keys = { left: false, right: false, up: false };

const groundY = () => canvas.height - 60;

const treePositions = [
  { x: 300, y: 370, value: 12, shown: false },
  { x: 500, y: 370, value: 20, shown: false },
  { x: 650, y: 370, value: 18, shown: false },
];

const bgImg = new Image();
const playerImg = new Image();
const treeImg = new Image();

bgImg.src = 'https://opengameart.org/sites/default/files/background_3.png';
playerImg.src = 'https://opengameart.org/sites/default/files/hero_idle.png';
treeImg.src = 'https://opengameart.org/sites/default/files/tree-cartoon.png';

let assetsLoaded = 0;
[bgImg, playerImg, treeImg].forEach(img => {
  img.crossOrigin = "anonymous";
  img.onload = () => {
    assetsLoaded++;
    if (assetsLoaded === 3) {
      requestAnimationFrame(gameLoop);
    }
  };
});

function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function drawTrees() {
  treePositions.forEach(tree => {
    ctx.drawImage(treeImg, tree.x, tree.y, 40, 60);
    if (!tree.shown && isColliding(player, tree)) {
      tree.shown = true;
    }
    if (tree.shown) {
      ctx.fillStyle = 'white';
      ctx.font = '20px Comic Sans MS';
      ctx.fillText(tree.value, tree.x + 5, tree.y - 10);
    }
  });
}

function isColliding(a, b) {
  return a.x < b.x + 40 && a.x + a.width > b.x &&
         a.y < b.y + 60 && a.y + a.height > b.y;
}

function update() {
  if (keys.left) player.vx = -3;
  else if (keys.right) player.vx = 3;
  else player.vx = 0;

  player.vy += gravity;
  player.x += player.vx;
  player.y += player.vy;

  if (player.y + player.height > groundY()) {
    player.y = groundY() - player.height;
    player.vy = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  drawTrees();
  drawPlayer();
  update();
  requestAnimationFrame(gameLoop);
}

// Kontrol sentuhan
document.getElementById('leftBtn').addEventListener('mousedown', () => keys.left = true);
document.getElementById('rightBtn').addEventListener('mousedown', () => keys.right = true);
document.getElementById('upBtn').addEventListener('mousedown', () => {
  if (player.onGround) {
    player.vy = -10;
    player.onGround = false;
  }
});
document.getElementById('leftBtn').addEventListener('mouseup', () => keys.left = false);
document.getElementById('rightBtn').addEventListener('mouseup', () => keys.right = false);

// Keyboard
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === 'ArrowUp' && player.onGround) {
    player.vy = -10;
    player.onGround = false;
  }
});
window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
});
