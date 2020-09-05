const cvs = document.getElementById('board');
const ctx = cvs.getContext('2d');

const SIZE = 32;
const width = ctx.canvas.width;
const height = ctx.canvas.height;
const numOfFields = width / SIZE;
const scoreDisplay = document.querySelector(".score");
let score = 0;

const appleImg = new Image();
appleImg.src = "./assets/apple.png";

const random = () => Math.floor(Math.random() * numOfFields);

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
        let key = e.keyCode;
        if (key === 37 && !controller.right) {
            controller.left = state;
            controller.up = false;
            controller.down = false;
        }
        if (key === 38 && !controller.down) {
            controller.up = state;;
            controller.right = false;
            controller.left = false;
        }
        if (key === 39 && !controller.left) {
            controller.right = state;
            controller.up = false;
            controller.down = false;
        }
        if (key === 40 && !controller.up) {
            controller.down = state;
            controller.right = false;
            controller.left = false;
        }
    }
   
}

const moveSnake = ({left, right, up, down}) => {
    if (left)  head.x -= SIZE;
    if (right)  head.x += SIZE;
    if (up) head.y -= SIZE;
    if (down) head.y += SIZE;
}

const drawApple = () => ctx.drawImage(appleImg, apple.x, apple.y);

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
    if (head.x + SIZE > width) head.x = 0;
    if (head.y < 0) head.y = height - SIZE;
    if (head.y + SIZE > height) head.y = 0;
}

const detectSelfCollision = (head, arr) => {
    if (arr.length >= 3) {
        for (let i = 2; i < arr.length; i++) {
            if (head.x === arr[i].x && head.y === arr[i].y) gameOver();
        }
    }
    else return ;
}

const eatApple = () => {
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        scoreDisplay.textContent = score;
        apple = {x: random() * SIZE, y: random() * SIZE};
        console.log(apple);
    } else snake.pop();

    let newHead = {x: head.x, y: head.y}
    snake.unshift(newHead);
}

const gameOver = () => clearInterval(gameLoop);

const game = () => {
    ctx.fillStyle = '#68edcb';
    ctx.fillRect(0,0,width,height);
    drawSnake();
    drawApple();
    moveSnake(controller);
    detectBorderCollision();
    eatApple();
    detectSelfCollision(head, snake);
}

window.addEventListener('keydown', controller.checkKeys);

let gameLoop = setInterval(game, 90);