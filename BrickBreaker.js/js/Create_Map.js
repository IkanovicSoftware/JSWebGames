let canvasWidth = 1200;
let canvasHeight = 800;
let cellDimension = 40;

let rows;
let cols;

let defaultHealth = 1;

let grid;
let gridString;

let tempi = -1;
let tempj = -1;

let multiSelect;

let input;
let deselectButton;
let selectButton;
let multiSelectCheckbox;
let saveMap;
let mapNameInput;
let mapName;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  cols = floor(canvasWidth / cellDimension);
  rows = floor(canvasHeight / cellDimension / 2);

  grid = make2DArray(cols, rows);

  createCells();

  createButtons();
}

function draw() {
  background(245, 245, 245);

  displayGrid();

  editBrickHealth();
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function displayGrid() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].display();
    }
  }
}

function createCells() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i * cellDimension, j * cellDimension, cellDimension);
    }
  }
}

function mousePressed() {
  if (!multiSelect) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY) && grid[i][j].isEmpty()) {
          if (tempi != -1 && tempj != -1) {
            grid[tempi][tempj].stopEditingBrick();
          }
          grid[i][j] = new Brick(createVector(i * cellDimension, j * cellDimension), cellDimension, defaultHealth); // Replaces empty cell with Brick
          grid[i][j].startEditingBrick();
          tempi = i;
          tempj = j;
          input = createInput(grid[i][j].getHealth() + "");
          input.position(windowWidth - 270, 120);
        } else if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].isEmpty() && !grid[i][j].isEditingBrick()) {
          grid[tempi][tempj].stopEditingBrick();
          grid[i][j].startEditingBrick(); //Select singular brick for editing
          tempi = i;
          tempj = j;
          // input = createInput(grid[i][j].getHealth() + "");
          input.position(windowWidth - 270, 120);
        } else if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].isEmpty() && grid[i][j].isEditingBrick()) {
          grid[i][j].stopEditingBrick(); //Deselect singular brick for editing
        }
      }
    }
  } else {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY) && grid[i][j].isEmpty()) {
          grid[i][j] = new Brick(createVector(i * cellDimension, j * cellDimension), cellDimension, defaultHealth); // Replaces empty cell with Brick
        } else if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].isEmpty() && !grid[i][j].isEditingBrick()) {
          grid[i][j].startEditingBrick(); //Select singular brick for editing
        } else if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].isEmpty() && grid[i][j].isEditingBrick()) {
          grid[i][j].stopEditingBrick(); //Deselect singular brick for editing
        }
      }
    }
  }
}

function deselectAllBricks() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (!grid[i][j].isEmpty() && grid[i][j].isEditingBrick()) {
        grid[i][j].stopEditingBrick();
      }
    }
  }
}

function selectAllBricks() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (!grid[i][j].isEmpty()) {
        grid[i][j].startEditingBrick();
      }
    }
  }
}

function multiSelectChange() {
  deselectAllBricks();
  if (multiSelect) {
    multiSelect = false;
  } else {
    multiSelect = true;
  }
}

function createButtons() {
  selectButton = createButton("Select All");
  selectButton.position(windowWidth - 270, 150);
  selectButton.mousePressed(selectAllBricks);

  deselectButton = createButton("Deselect All");
  deselectButton.position(windowWidth - 170, 150);
  deselectButton.mousePressed(deselectAllBricks);

  multiSelectCheckbox = createCheckbox("Select multiple bricks", false);
  multiSelectCheckbox.position(windowWidth - 270, 180);
  multiSelectCheckbox.changed(multiSelectChange);

  mapNameInput = createInput("Name of map");
  mapNameInput.position(windowWidth - 270, 240);

  saveMap = createButton("Save Map");
  saveMap.position(windowWidth - 270, 270);
  saveMap.mousePressed(saveMapFunction);

  
}

function editBrickHealth() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (!grid[i][j].isEmpty() && grid[i][j].isEditingBrick()) {
        if (input.value() > 0) {
          grid[i][j].editHealth(input.value());
        }
      }
    }
  }
}

function saveMapFunction() {
  if (mapNameInput.value() != "") {
    gridString += mapNameInput.value() + ":";
  } else {
    gridString += "map:";
  }
  turnGridToString();
  console.log(gridString);
  let a = document.createElement("a");
  a.href = "data:application/octet-stream," + encodeURIComponent(gridString);
  a.download = "map.txt";
  a.click();
}

function turnGridToString() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (!grid[i][j].isEmpty()) {
        gridString += grid[i][j].pos.x + "," + grid[i][j].pos.y + ",";
      }
    }
  }
  gridString = gridString.replace("undefined", "");
  gridString = gridString.substring(0, gridString.length - 1);
}
