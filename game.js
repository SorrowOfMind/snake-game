const cvs = document.getElementById('board');
const ctx = cvs.getContext('2d');

const SIZE = 32;
const width = ctx.canvas.width;
const height = ctx.canvas.height;
const numOfFields = width / SIZE;
let score = 0;

const appleImg = new Image();
appleImg.src = "./assets/apple.png";

const random = () => Math.floor(Math.random() * numOfFields + 1);

const definePos = (fields, box) => Math.floor(fields * 0.5) * box;

let snake = [
    {x: definePos(numOfFields, SIZE), y: definePos(numOfFields, SIZE)}
];
const head = snake[0];

let apple = {x: random() * SIZE, y: random() * SIZE};

const controller = {
    right: false,
    left: false,
    up: false,
    down: false,

    checkKeys(e) {
        let state = e.type === 'keydown';
        console.log(e.keyCode)
        switch(e.keyCode) {
            case 37:
                controller.left = state;
                controller.right = false;
                controller.up = false;
                controller.down = false;
                break;
            case 38: 
                controller.up = state;
                controller.down = false;
                controller.right = false;
                controller.left = false;
                break;
            case 39:
                controller.right = state;
                controller.left = false;
                controller.up = false;
                controller.down = false;
                break;
            case 40:
                controller.down = state;
                controller.up = false;
                controller.right = false;
                controller.left = false;
                break;
        }
    }
   
}

const moveSnake = () => {
    if (controller.left) {
        head.x -= SIZE;
    }
    if (controller.right) {
        head.x += SIZE;
    }
    if (controller.up) {
        head.y -= SIZE;
    }
    if (controller.down) {
        head.y += SIZE;
    }
}

const drawApple = () => {
    ctx.drawImage(appleImg, apple.x, apple.y);
}


const drawSnake = () => {
    let i = 0;
    while (i < snake.length) {
        ctx.fillStyle = '#545479';
        ctx.fillRect(snake[i].x, snake[i].y, SIZE, SIZE)
        i++;
    }
}

const detectBorderCollision = () => {
    if (head.x < 0) head.x = width - SIZE;
    if (head.x - SIZE> width) head.x = 0;
    if (head.y + SIZE < 0) head.y = height - SIZE;
    if (head.y > height) head.y = 0;
}

const game = () => {
    ctx.fillStyle = '#68edcb';
    ctx.fillRect(0,0,width,height);
    drawSnake();
    drawApple();
    moveSnake();
    detectBorderCollision();

    // window.requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', controller.checkKeys);
// window.requestAnimationFrame(gameLoop);

let gameLoop = setInterval(game, 100);


