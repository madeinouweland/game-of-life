let gridCellSize;
let horizontalCellCount;
let verticalCellCount;
const cellSize = 48;

// this takes the available space and divides it into cells.
// it looks at the shortest side (horizontally or vertically)
// and divides that side by cellSize. That means there will always
// be a minimum of cellSize cells.
// - If the window width is bigger than the window height, there will be more than cellSize cells horizontally.
// - If the window height is bigger than the window with, there will be more than cellSize cells vertically.
function resize() {
  let width = windowWidth;
  let height = windowHeight;

  if (width > height) {
    width = height;
  } else {
    height = width;
  }

  gridCellSize = width / cellSize;

  horizontalCellCount = Math.round(windowWidth / gridCellSize);
  verticalCellCount = Math.round(windowHeight / gridCellSize);
}
