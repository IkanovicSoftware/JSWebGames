function Tank(width, speed) {
    this.w = width;
    this.h = 10;
    this.moveSpeed = speed;
    this.isMovingLeft = false;
    this.isMovingRight = false;

    this.pos = createVector(canvasWidth / 2, canvasHeight - 30);

    this.display = function() {
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    /*
    Move the tank.
    */
    this.move = function(step) {
        this.pos.x += step;
    }

    /*
    Move the tank and make sure it doesn't go of the canvas.
    */
    this.update = function() {
        if(this.isMovingLeft) {
            if(this.pos.x > 0) {
                this.move(-this.moveSpeed / 10);
            }
        }
        else if(this.isMovingRight) {
            if(this.pos.x < canvasWidth - this.w) {
                this.move(this.moveSpeed / 10);
            }
            
        }
    }

    this.setWidth = function(width) {
        this.w = width;
    }

    this.setSpeed = function(sp) {
        this.moveSpeed = sp;
    }


}

