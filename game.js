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

let apple = {x: random() * SIZE, y: random() * SIZE};

const controller = {
    right: false,
    left: false,
    up: false,
    down: false,

    checkKeys(e) {
        let state = e.type === 'keydown' ? true : false;
        console.log(e.keyCode)
        switch(e.keyCode) {
            case 37:
                controller.left = state;
                break;
            case 38: 
                controller.up = state;
                break;
            case 39:
                controller.right;
                break;
            case 40:
                controller.down;
                break;
        }
    }
   
}

const moveSnake = () => {
    if (controller.left) {

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

const gameLoop = () => {
    ctx.fillStyle = '#68edcb';
    ctx.fillRect(0,0,width,height);
    drawSnake();
    drawApple();

    window.requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', controller.checkKeys)
window.requestAnimationFrame(gameLoop);
