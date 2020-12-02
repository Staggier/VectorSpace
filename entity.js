class Entity {
    constructor(x, y, width, height, speed, src, friendly) {
        this.velocity = [0, 0];
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.speed = speed;
        this.src = src;
        this.friendly = friendly;
    }

    display() {
        var img = new Image(this.w, this.h);
        img.src = this.src;

        context.clearRect(this.x, this.y, this.w, this.h);
        context.drawImage(img, this.x, this.y, this.w, this.h);
    }

    validMove() {
        return (this.x + (this.velocity[0] * this.speed) + this.w <= canvas.width && this.x + (this.velocity[0] * this.speed) >= 0) && (this.y + (this.velocity[1] * this.speed) + this.h <= canvas.height && this.y + (this.velocity[1] * this.speed) >= 0);
    }
}