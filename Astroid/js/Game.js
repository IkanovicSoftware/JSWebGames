let stars = [];

function setup() {
  createCanvas(1200, 800);
  frameRate(30);
}

function draw() {
  background(0);
  
  /* Create background stars */
  // for (let i = 0; i < 1; i++) {
  //   stars.push(new star());
  // }

  if (floor(random(0, 2)) == 0) {
    stars.push(new star());
  }

  for (let star of stars) {
    star.update();
    star.display();
  }
  /* ----------------- */

}

/**
 * For background stars
 */
function star() {
  this.location = createVector(random() * width, random(-50, 0));
  this.size = random(2, 4);

  this.update = function() {
    this.location.y += pow(this.size, 1.2);

    if (this.location.y > height) {
      let index = stars.indexOf(this);
      stars.splice(index, 1);
    }
  }

  this.display = function() {
    ellipse(this.location.x, this.location.y, this.size);
  }
  
}