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
        this.bullets = [];
        this.startTime = 0;
    }

    move = () => {
        if (this.validMove()) {
            this.velocity = normalizeVector(this.velocity);
            this.x += this.speed * this.velocity[0];
        }
        else {
            this.velocity = this.velocity.map(x => x * -1);
            this.velocity = normalizeVector(this.velocity);
            this.x += this.speed * this.velocity[0];
        }
    };
    shoot = () => {
        let now = Date.now();
        if (now - this.startTime > 500) {
            this.bullets.push(new Bullet(this.x + (this.w / 2) | 0, this.y + this.h, 10, 15, 8, '/images/laserBlue16.png', false, [this.x + (this.w / 2) | 0, this.y + this.h], [player.x + (player.w / 2) | 0, player.y + (player.h / 2) | 0]));
            this.startTime = Date.now();
        }
    }
}