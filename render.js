// https://mycolor.space/?hex=%231C0C37&sub=1
let world = [];
let generations = 0;
let speed = 10;
let livingCells = 0;

// https://www.justgivemeanexample.com/example/get-a-random-number-from-min-to-max-in-javascript
function GetRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  resize();
  for(let row = 0;row < verticalCellCount;row++) {
    cells = [];
    for(let col = 0;col < horizontalCellCount;col++) {
      cells.push(false);
    }
    world.push(cells);
  }

  for(let i = 0;i < horizontalCellCount * 10;i++) {
    world[GetRandomNumber(0, verticalCellCount - 1)][GetRandomNumber(0, horizontalCellCount - 1)] = true;
  }
}

let lastTime = new Date().getTime();
let deltaTime = 0;

function draw() {
  background("#1C0C37");
  drawDots();

  let time = new Date().getTime();

  deltaTime = deltaTime + (time - lastTime);
  if (deltaTime > speed) {
    deltaTime = 0;
    tick();
  }
  drawCells();
  drawInfo();

  lastTime = time;
}

function drawCells() {
  livingCells = 0;
  for(let row = 0;row < verticalCellCount;row++) {
    for(let col = 0;col < horizontalCellCount;col++) {
      fill(col * 10, row * 10, 10);
      if(world[row][col] === true) {
        livingCells++;
        rect(gridCellSize * col, gridCellSize * row, gridCellSize, gridCellSize);
      }
    }
  }
}

function getNeighboursCount(row, col) {
  let neighbours = [
    [-1,  0],
    [-1,  1],
    [ 0,  1],
    [ 1,  1],
    [ 1,  0],
    [ 1, -1],
    [ 0, -1],
    [-1, -1]
  ]

  let count = 0;
  for(const n of neighbours) {
    let nr = (row + n[0]) % verticalCellCount;
    if (nr === -1) {
      nr = verticalCellCount - 1;
    }
    let nc = (col + n[1]) % horizontalCellCount;
    if (nc === -1) {
      nc = horizontalCellCount - 1;
    }
    if (world[nr][nc] === true) {
      count++;
    }
  }
  return count;
}

function tick() {
  generations++;
  let die = [];
  let birth = [];
  for (let row = 0;row < verticalCellCount;row++) {
    for (let col = 0;col < horizontalCellCount;col++) {
      let count = getNeighboursCount(row, col);
      if (world[row][col] === true && count < 2) {
        die.push([row, col]);
      }
      if (world[row][col] === true && count > 3) {
        die.push([row, col]);
      }
      if (world[row][col] === false && count === 3) {
        birth.push([row, col]);
      }
      // extra rule that is not in Conway's game of live:
      // if a cell has 8 neightbours, create 20 random living cells.
      // that way the game never goes to a static state
      if (world[row][col] === false && count === 8) {
        for(let i = 0;i < 20;i++) {
          world[GetRandomNumber(0, verticalCellCount - 1)][GetRandomNumber(0, horizontalCellCount - 1)] = true;
        }
      }
    }
  }

  for(const d of die) {
    row = d[0];
    col = d[1];
    world[row][col] = false;
  }
  for(const d of birth) {
    row = d[0];
    col = d[1];
    world[row][col] = true;
  }
}

function drawInfo() {
  textSize(20);
  fill("#F9F871");
  text(`Grid: ${horizontalCellCount}x${verticalCellCount}, Alive: ${livingCells}, Generation: ${generations}`, 10, 30);
}

function drawDots() {
  noStroke();
  fill("#64204F");
  for (var y = 0; y < windowHeight; y += gridCellSize) {
    for (var x = 0; x < windowWidth; x += gridCellSize) {
      ellipse(x, y, 2, 2);
    }
  }
}
