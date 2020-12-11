class Entity {
    constructor(x, y, src, friendly) {
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
        this.speed = 0;
        this.src = src;
        this.friendly = friendly;
        this.velocity = [0, 0];
        this.xMin = 0;
        this.xMax = canvas.width;
        this.yMin = 0;
        this.yMax = canvas.height;
    }

    display() {
        var img = new Image(this.w, this.h);
        img.src = this.src;

        context.drawImage(img, this.x, this.y, this.w, this.h);
    }

    validXMove() {
        return this.x + (this.speed * this.velocity[0]) >= this.xMin && (this.x + this.w) + (this.speed * this.velocity[0]) <= this.xMax; 
    }

    validYMove() {
        return this.y + (this.speed * this.velocity[1]) >= this.yMin && (this.y + this.h) + (this.speed * this.velocity[1]) <= this.yMax;
    }
}