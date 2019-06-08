let gridCellSize;
let horizontalCellCount;
let verticalCellCount;

// this takes the available space and divides it into cells.
// it looks at the shortest side (horizontally or vertically)
// and divides that side by 24. That means there will always
// be a minimum of 24 cells.
// - If the window width is bigger than the window height, there will be more than 24 cells horizontally.
// - If the window height is bigger than the window with, there will be more than 24 cells vertically.
function resize() {
  let width = windowWidth;
  let height = windowHeight;

  if (width > height) {
    width = height;
  } else {
    height = width;
  }

  gridCellSize = width / 48;

  horizontalCellCount = Math.round(windowWidth / gridCellSize);
  verticalCellCount = Math.round(windowHeight / gridCellSize);
}
