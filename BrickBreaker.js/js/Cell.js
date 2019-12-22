class Cell {
    /*
      Creates a cell object
      Cell is empty spot in create map screen for bricks 
    */
    constructor(x, y, w) {
      this.x = x;
      this.y = y;
      this.w = w;
    }
  
    /*
      Draws the cell object
    */
    display() {
      stroke(255);
      fill(200);
      rect(this.x, this.y, this.w, this.w);
    }
  
    /*
      Check if the mouse is within the cell object
    */
    contains(x, y) {
      return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
    }
  
    isEmpty() {
      return true;
    }
  }
  