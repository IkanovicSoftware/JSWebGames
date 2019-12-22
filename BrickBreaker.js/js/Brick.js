class Brick {
  /*
    Creates brick object
  */
  constructor(pos, width, health) {
    //--------------------- Brick Variables ---------------------
    this.pos = pos;
    this.width = width;
    this.health = health;

    //--------------------- Create Map Variables ---------------------
    this.isEditing = false;
  }

  /*
    Draws the brick
  */
  display() {
    if (this.isEditing) {
      fill(255, 165, 0);
    } else {
      fill(255, 165 - this.health * 50, 0, 100);
    }

    rectMode(CORNER);
    stroke(255);
    rect(this.pos.x, this.pos.y, this.width, this.width);

    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(15);
    text(this.health, this.pos.x + this.width * 0.5, this.pos.y + this.width * 0.6);
  }

  /*
    Checks if the brick is being collided with the ball
  */
  collideWith(ball) {
    if (
      ball.pos.y - ball.r <= this.pos.y + this.width &&
      ball.pos.y + ball.r >= this.pos.y &&
      ball.pos.x + ball.r >= this.pos.x &&
      ball.pos.x - ball.r <= this.pos.x + this.width
    ) {
      return true;
    }
  }

  //--------------------- Create Map Functions ---------------------

  /*
    To check if the mouse is within the brick
  */
  contains(x, y) {
    return x > this.pos.x && x < this.pos.x + this.width && y > this.pos.y && y < this.pos.y + this.width;
  }

  startEditingBrick() {
    this.isEditing = true;
  }

  stopEditingBrick() {
    this.isEditing = false;
  }

  getHealth() {
    return this.getHealth;
  }

  isEmpty() {
    return false;
  }

  isEditingBrick() {
    return this.isEditing;
  }

  editHealth(health) {
    this.health = health;
  }

  getHealth() {
    return this.health;
  }
}
