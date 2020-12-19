var powerupImg = ['./images/playerLife2_orange.png', './images/star_silver.png'];

class PowerUp extends Entity {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.src = powerupImg[Math.random() * 2 | 0];
        this.w = 10;
        this.h = 10;
        this.speed = 2;
    }

    update() {
        this.y += this.speed;
        this.display();
    }

    apply() {
        if (this.src == powerupImg[0]) {
            player.numLives += 1;
        }
        else {
            score += 50;
        }
    }
}