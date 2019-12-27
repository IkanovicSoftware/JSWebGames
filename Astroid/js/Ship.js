class Ship {
  constructor() {
    this.location = createVector(width / 2, height - 80);
    this.r = 20;
    this.speed = 10;
  }

  display() {
    fill(255);
    push();
    translate(this.location.x, this.location.y);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r)
    pop();
  }

  move(dir) {
    // Moving left and right
    if (dir == "left") {
      this.location.x -= this.speed;
    } else {
      this.location.x += this.speed;
    }

    // Collide with edges
    if (this.location.x - this.r < 0) {
      this.location.x = this.r;
    } else if (this.location.x + this.r > width) {
      this.location.x = width - this.r;
    }
  }

}