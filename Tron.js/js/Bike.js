class Bike {
  constructor(location, player) {
    this.size = 15;
    this.location = location;
    this.player = player;
    this.dir;
    this.tail = [];
    this.end = false;
  }

  display() {
    if (!this.end) {
      rectMode(CENTER);
      fill(200, 50, 50);
      strokeWeight(2);
      stroke(255);
      rect(this.location.x, this.location.y, this.size + 2, this.size + 2);

      this.displayTail();
    }
  }

  move() {
    if (this.dir == "left") {
      this.tail.push(createVector(this.location.x, this.location.y));
      this.location.x -= this.size;
    } else if (this.dir == "up") {
      this.tail.push(createVector(this.location.x, this.location.y));
      this.location.y -= this.size;
    } else if (this.dir == "right") {
      this.tail.push(createVector(this.location.x, this.location.y));
      this.location.x += this.size;
    } else if (this.dir == "down") {
      this.tail.push(createVector(this.location.x, this.location.y));
      this.location.y += this.size;
    }
    this.checkHit();

    this.deleteSegments();
  }

  displayTail() {
    if (this.tail.length > 0) {
      for (let i = 0; i < this.tail.length; i++) {
        var segment = this.tail[i];
        noStroke();
        fill(200, 50, 50, 200);
        rect(segment.x, segment.y, this.size, this.size);
      }
    }
  }

  deleteSegments() {
    if (this.tail.length > 55) {
      this.tail.splice(0, 1);
    }
  }

  checkHit() {
    for (let i = 0; i < this.tail.length; i++) {
      var segment = this.tail[i];
      if (this.location.x == segment.x && this.location.y == segment.y) {
        this.end = true;
      }
    }
  }
}
