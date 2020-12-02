class Enemy extends Entity {
    constructor(x, y, width, height, speed, src, friendly) {
        super();
        this.x = x;
        this.y = y;
        this.velocity = [1, 0];
        this.w = width;
        this.h = height;
        this.speed = speed;
        this.src = src;
        this.friendly = friendly;
    }

    move() {
        if (this.validMove(this.velocity)) {
            normalizeVector(this.velocity);
            this.x += this.speed * this.velocity[0];
        }
        else {
            this.velocity = this.velocity.map(x => x * -1);
            normalizeVector(this.velocity);
            this.x += this.speed * this.velocity[0];
        }
    }
}