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
        this.shotDelay;
    };

    setBehavior(x1, x2, y1, y2, shotDelay, velocity, movement) {
        this.xMin = x1;
        this.xMax = x2;
        this.yMin = y1;
        this.yMax = y2;
        this.shotDelay = shotDelay;
        this.velocity = velocity;
        this.bulletBehavior = movement;
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
        if (now - this.startTime > this.shotDelay) {
            let bullet = new Bullet(this.x, this.y + 5, this.friendly, [this.x, this.y + 5], [player.x + 10, player.y + 10], this.bulletBehavior);
            this.startTime = now;
            return bullet;
        }
        return null;
    };
}