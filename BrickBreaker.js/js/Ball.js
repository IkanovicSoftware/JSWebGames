function Ball(radius, speed) {
    
    this.r = radius * 2 + 1;
    this.pos = createVector(tank.pos.x + (tank.w / 2), tank.pos.y - this.r - 2);
    this.direction = createVector(1,  1);
    this.SP = speed;
    this.velocity = createVector(1, -1).mult(this.SP);
    this.health = 3;
    this.isPlaying = false;

    this.display = function() {
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    this.update = function() {   
        if (this.isPlaying) {
            this.pos.x += this.velocity.x * this.direction.x;
            this.pos.y += this.velocity.y * this.direction.y;
        } else {
            this.pos.x = tank.pos.x + (tank.w / 2);
            this.pos.y = tank.pos.y - this.r - 2;
        }
    }

    /*
    Change direction of the ball if hit the sides of the canvas.
    */
    this.checkEdges = function() {
        if(this.pos.x < this.r && this.direction.x < 0) {
            this.direction.x *= -1;
        }
        else if(this.pos.x > (canvasWidth - this.r) && this.direction.x > 0) {
            this.direction.x *= -1;
        }
        else if(this.pos.y < this.r && this.direction.y > 0) {
            this.direction.y *= -1;
        }
        else if(this.pos.y > (canvasHeight + this.r) && this.direction.y < 0) {
            this.health -= 1;
            this.isPlaying = false;
        }
    }

    /*
    Bounce the ball if touch the tank.
    */
    this.touchTank = function(tank) {
        
        if (this.pos.y < tank.pos.y + 15 &&
            this.pos.y > tank.pos.y - this.r &&
            this.pos.x > tank.pos.x - this.r &&
            this.pos.x < parseInt(tank.pos.x) + parseInt(tank.w) + parseInt(this.r) ) {
                return true;
        } else {
            return false;
        }
    }

    this.setSpeed = function(sp) {
        this.SP = sp;
        this.velocity = createVector(1, -1).mult(1);
        this.velocity = this.velocity.mult(parseInt(this.SP));
    }

    this.setSize = function(sz) {
        this.r = sz * 2 + 1;
        this.pos = createVector(tank.pos.x + (tank.w / 2), tank.pos.y - this.r);
    }

    this.setDirection = function() {
        if(this.isPlaying == false) {
            let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
            let dirX = (mouseX - this.pos.x) / d;
            let dirY = -(mouseY - this.pos.y) / d;
            this.direction = createVector(dirX, dirY);     
        }
    }

    this.getHealth = function() {
        return this.health;
    }

    this.launchBall = function() {      
        this.isPlaying = true;   
    }
}






