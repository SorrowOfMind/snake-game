const cvs = document.getElementById('board');
const ctx = cvs.getContext('2d');

const SIZE = 32;
const width = ctx.canvas.width;
const height = ctx.canvas.height;
const numOfFields = width / SIZE;
let score = 0;

const random = () => Math.floor(Math.random() * numOfFields + 1);

const food = new Image();
food.src = "./assets/apple.png";

const definePos = (w, box) => Math.floor((w / box) * 0.5) * box;

let snake = [
    {x: definePos(width, SIZE), y: definePos(width, SIZE)}
];

let apple = [
    {x: random(), y: random()}
];

const drawSnake = () => {
    let i = 0;
    while (i < snake.length) {
        ctx.fillStyle = '#ff4437';
        ctx.fillRect(snake[i].x, snake[i].y, SIZE, SIZE)
        i++;
    }
}

const gameLoop = () => {
    ctx.fillStyle = '#8ACF00';
    ctx.fillRect(0,0,width,height);
    drawSnake();

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
