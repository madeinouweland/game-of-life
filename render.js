// https://mycolor.space/?hex=%231C0C37&sub=1
let world = [];
let generations = 0;
let speed = 10;
let livingCells = 0;

let isRunning = true;

function keyPressed() {
  if (key === " ") {
    if (isRunning) {
      noLoop();
      isRunning = false;
    } else {
      loop();
      isRunning = true;
    }
  }
}

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
  let count = 0;
  let left = col - 1;
  if(left < 0) {
    left = horizontalCellCount - 1;
  }
  let right = col + 1;
  if(right > horizontalCellCount - 1) {
    right = 0;
  }
  let top = row - 1;
  if(top < 0) {
    top = verticalCellCount - 1;
  }
  let bottom = row + 1;
  if(bottom > verticalCellCount - 1) {
    bottom = 0;
  }

  if(world[row][left] === true) {
    count++;
  }
  if(world[top][left] === true) {
    count++;
  }
  if(world[top][col] === true) {
    count++;
  }
  if(world[top][right] === true) {
    count++;
  }
  if(world[row][right] === true) {
    count++;
  }
  if(world[bottom][right] === true) {
    count++;
  }
  if(world[bottom][col] === true) {
    count++;
  }
  if(world[bottom][left] === true) {
    count++;
  }
  return count;
}

function tick() {
  generations++;
  let die = [];
  let birth = [];
  for(let row = 0;row < verticalCellCount;row++) {
    for(let col = 0;col < horizontalCellCount;col++) {
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
  text(`${horizontalCellCount}x${verticalCellCount}, cells: ${livingCells}, generation ${generations}`, 10, 30);
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
