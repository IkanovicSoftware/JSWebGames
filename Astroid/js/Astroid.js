class Astroid {

  constructor(size, speed, health) {
    this.size = size;
    this.speed = speed;
    this.health = health;
    this.location = createVector(random() * width, random(-150, -100));
    this.points = floor(random(5, 15));
    this.offset = [];
    
    for (let i = 0; i < this.points; i++) {
      this.offset[i] = random(-10, 10);
    }
  }

  display() {
    
    push();

    stroke(255);
    fill(100, 100, 100, 200);
    translate(this.location.x, this.location.y);

    beginShape();
    for (var i = 0; i < this.points; i++) {
      var angle = map(i, 0, this.points, 0, TWO_PI);
      var r = this.size + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }

  update() {
    this.location.y += this.speed;

    if (this.location.y - this.size > height) {
      let index = astroids.indexOf(this);
      astroids.splice(index, 1);
    }
  }

}