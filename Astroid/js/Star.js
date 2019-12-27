class Star {
  constructor(speed) {
    this.location = createVector(random() * width, random(-50, 0));
    this.size = random(2, 4);
    this.speed = speed;
  }

  display() {
    ellipse(this.location.x, this.location.y, this.size);
  }

  update() {
    this.location.y += pow(this.size, this.speed);

    if (this.location.y > height) {
      let index = backdrop.indexOf(this);
      backdrop.splice(index, 1);
    }
  }
}