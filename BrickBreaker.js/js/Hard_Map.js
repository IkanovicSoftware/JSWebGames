let canvasWidth = 1200;
let canvasHeight = 800;
let cellDimension = 40;

let tank;
let ball;

let defaultValues;

let score = 0;
let grid;
let scoreToWin = 0;

let map;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  defaultValues = new Default();

  map = new Maps();
  tank = new Tank(defaultValues.tankSize, defaultValues.tankSpeed);
  ball = new Ball(defaultValues.ballSize, defaultValues.ballSpeed);

  grid = new Array(map.hardmap.length);

  for (var i = 0; i < grid.length; i += 2) {
    grid[i] = new Brick(createVector(map.hardmap[i], map.hardmap[i + 1]), cellDimension, 1);
  }

  scoreToWin = grid.length / 2;
}

function draw() {
  background(245, 245, 245);

  if (ball.getHealth() >= 0 && score < scoreToWin) {
    for (var i = 0; i < grid.length; i++) {
      if (grid[i] != null) {
        if (grid[i].collideWith(ball)) {
          ball.direction.y *= -1;
          grid.splice(i, 1);
          score++;
        }
      }
    }

    displayBricks();

    ball.checkEdges();
    ball.touchTank(tank);

    ball.update();
    ball.display();

    tank.update();
    tank.display();
    if (ball.touchTank(tank) && ball.direction.y < 0) {
      ball.direction.y *= -1;
    }

    displayScoreLives();
  } else if (score == scoreToWin) {
    gameWon();
  } else {
    gameLost();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    tank.isMovingLeft = true;
  } else if (keyCode === RIGHT_ARROW) {
    tank.isMovingRight = true;
  }

  if (keyCode === 32) {
    //Spacebar
    ball.setDirection();
    ball.launchBall();
  }
}

function keyReleased() {
  tank.isMovingLeft = false;
  tank.isMovingRight = false;
}

function gameWon() {
  textAlign(CENTER, CENTER);
  textSize(40);
  text("WINNER", width / 2, height / 2);
}

function gameLost() {
  textAlign(CENTER, CENTER);
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
}

function displayScoreLives() {
  textSize(24);
  fill(0);
  text("Ball Lives: " + ball.getHealth(), 80, height - 10);
  text("Score: " + score, width - 50, height - 10);
}

function displayBricks() {
  for (var i = 0; i < grid.length; i++) {
    if (grid[i] != null) {
      grid[i].display();
    }
  }
}

/*
Change tank speed
*/
function tankSpeed() {
  tspeed = document.getElementById("tankSpeedChange").value;
  if (tspeed > 0 && tspeed <= 1000) {
    tank.setSpeed(tspeed);
    document.getElementById("tspChanged").style.color = "green";
    document.getElementById("tspChanged").innerHTML = "O";
  } else {
    document.getElementById("tspChanged").style.color = "red";
    document.getElementById("tspChanged").innerHTML = "X";
  }
}

/*
Change tank size
*/
function tankSize() {
  tsize = document.getElementById("tankSizeChange").value;
  if (tsize > 0 && tsize <= 750) {
    tank.setWidth(tsize);
    document.getElementById("tszChanged").style.color = "green";
    document.getElementById("tszChanged").innerHTML = "O";
  } else {
    document.getElementById("tszChanged").style.color = "red";
    document.getElementById("tszChanged").innerHTML = "X";
  }
}

/*
Change ball speed
*/
function ballSpeed() {
  bspeed = document.getElementById("ballSpeedChange").value;
  if (bspeed > 0 && bspeed <= 20) {
    ball.setSpeed(bspeed);
    document.getElementById("bspChanged").style.color = "green";
    document.getElementById("bspChanged").innerHTML = "O";
  } else {
    document.getElementById("bspChanged").style.color = "red";
    document.getElementById("bspChanged").innerHTML = "X";
  }
}

/*
Change ball size
*/
function ballSize() {
  bsize = document.getElementById("ballSizeChange").value;
  if (bsize > 0 && bsize <= 12) {
    ball.setSize(bsize);
    document.getElementById("bszChanged").style.color = "green";
    document.getElementById("bszChanged").innerHTML = "O";
  } else {
    document.getElementById("bszChanged").style.color = "red";
    document.getElementById("bszChanged").innerHTML = "X";
  }
}

/*
Restart Game
*/
function restart() {
  isInGame = false;
  score = 0;
  setup();
}
