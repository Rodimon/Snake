let canvas = document.getElementById("game");
let l = document.getElementById('points')
let wallo
let context = canvas.getContext('2d');
let grid = 16;
let count = 0;
let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
let apple = {
    x: 320,
    y: 320
};
let wall = {
    x: 160,
    y: 320,
    dx: grid,
    dy: 0,
    walls: [],
    maxWalls: 9
};
if (window.screen.width < 800) {
    snake.x = 80
    snake.y = 80
    apple.x = 160
    apple.y = 160
    wall.x = 80
    wall.y = 160
    grid = 8
    game.width = 200;
    game.height = 200;
    function Lose() {
        snake.x = 80;
        snake.y = 80;
        snake.cells = [];
        l.innerHTML = 0
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(1, 24) * grid;
        apple.y = getRandomInt(1, 24) * grid;
        wall.y = getRandomInt(1, 24) * grid;
    };
    if (wall.dx == 1 || wall.dy == 1) {
        wall.dx = wall.dx / 2;
        wall.dy = wall.dy / 2;
    };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function Lose() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    l.innerHTML = 0
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = getRandomInt(1, 24) * grid;
    apple.y = getRandomInt(1, 24) * grid;
    wallo = getRandomInt(1, 24) * grid;
}
function loop() {
    requestAnimationFrame(loop);
    if (++count < 4) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (wall.x < 0) {
        wall.x = canvas.width - grid;
    }
    else if (wall.x >= canvas.width) {
        wall.x = 0;
    }
    if (wall.y < 0) {
        wall.y = canvas.height - grid;
    }
    else if (wall.y >= canvas.height) {
        wall.y = 0;
    }
    wall.x = wall.x + grid;
    wall.y = wall.y + wall.dy;
    wall.walls.unshift({ x: wall.x, y: wall.y });
    if (wall.walls.length > wall.maxWalls) {
        wall.walls.pop();
    }
    context.fillStyle = 'white';
    wall.walls.forEach(function (wal) {
        context.fillRect(wal.x, wal.y, grid - 1, grid - 1);
        snake.cells.forEach(function (cell, index) {
            for (let i = index + 1; i < wall.walls.length; i++) {
                if (cell.x === wall.walls[i].x && cell.y === wall.walls[i].y) {
                    Lose()
                }
            }
        });
    });

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(1, 24) * grid;
            apple.y = getRandomInt(1, 24) * grid;
            l.innerHTML = snake.maxCells - 4
            wall.y = getRandomInt(1, 24) * grid;
        }
        if (cell.x === wall.x && cell.y === wall.y) {
            Lose()
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y || snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
                Lose()
            }
        }
    });


}
document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
let xDown = null;
let yDown = null;

function getTouches(evt) {
    return evt.touches
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
        }
        else {
            snake.dx = grid;
            snake.dy = 0;
        }
    }
    else {
        if (yDiff > 0 && snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
        } else {
            snake.dy = grid;
            snake.dx = 0;
        }
    }
    xDown = null;
    yDown = null;
};

requestAnimationFrame(loop);
