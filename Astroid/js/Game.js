let backdrop = [];
let astroids = [];
let ship;
let level = 1;
let speed;

function setup() {
  createCanvas(1200, 800);
  frameRate(60);

  speed = level * .8;



  ship = new Ship();
}

function draw() {
  background(0);

  /*Backdrop*/
  if (floor(random(0, 3)) == 0) {
    backdrop.push(new Star(speed));
  }

  for (let star of backdrop) {
    star.update();
    star.display();
  }
  /*********/

  if (floor(random(0, 100)) == 0) {
    astroids.push(new Astroid(random(30, 60), random(1, 3), 2));
  }

  for (let astroid of astroids) {
    astroid.update();
    astroid.display();
  }

  moveShip();
  ship.display();

}

function moveShip() {
  if (keyIsDown(LEFT_ARROW)) {
    ship.move("left");
  } else if (keyIsDown(RIGHT_ARROW)) {
    ship.move("right");
  }
}
