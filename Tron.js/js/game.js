let bike;

function setup() {
  createCanvas(1200, 800);
  frameRate(30);

  bike = new Bike(createVector(600, 300));
}

function draw() {
  background(200);
  bike.display();
  bike.move();
  console.log(bike.tail);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    bike.dir = "left";
  } else if (keyCode === UP_ARROW) {
    bike.dir = "up";
  } else if (keyCode === RIGHT_ARROW) {
    bike.dir = "right";
  } else if (keyCode === DOWN_ARROW) {
    bike.dir = "down";
  }
}
