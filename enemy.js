class Enemy extends Entity {
    constructor(x, y, speed, src) {
        super();
        this.healthPoints = 10;
        this.x = x;
        this.y = y;
        this.velocity = [1, 0];
        this.w = 30;
        this.h = 30;
        this.speed = speed;
        this.src = src;
        this.friendly = false;
        this.startTime = 0;
        this.lastShot;
        this.updateVelocity;
        this.xMin = 0;
        this.xMax = canvas.width;
        this.yMin = 0;
        this.yMax = canvas.height;
        this.bulletBehavior;
    };

    setBehavior(x1, x2, y1, y2, velocity, shotType) {
        this.xMin = x1;
        this.xMax = x2;
        this.yMin = y1;
        this.yMax = y2;
        this.velocity = velocity;
        this.bulletBehavior = shotType;
    }

    update() {
        if (!this.validXMove()) {
            this.velocity[0] *= -1;
        }

        if (!this.validYMove()) {
            this.velocity[1] *= -1;
        }

        normalizeVector(this.velocity);
        this.x += this.velocity[0] * this.speed;
        this.y += this.velocity[1] * this.speed;
    }

    move() {
        this.update();
    };

    shoot() {
        let now = Date.now();
        if (now - this.startTime > 250) {
            let bullet = new Bullet(this.x + (this.w / 2) - 2.5 | 0, this.y + this.h, this.friendly, [this.x + (this.w / 2) | 0, this.y + this.h], [player.x + (player.w / 2) | 0, player.y + (player.h / 2) | 0]);
            bullet.assignBehavior(this.bulletBehavior);
            
            this.startTime = now;
            return bullet;
        }
        return null;
    };
}