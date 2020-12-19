class Bullet extends Entity {
    constructor(x, y, friendly, startPoint, endPoint, movement) {
        super();
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 15;
        this.speed = (friendly? 10: 5);
        this.src = friendly? './images/laserBlue16.png' : './images/laserRed16.png';
        this.friendly = friendly;
        this.startTime = Date.now() / 1000;
        this.endTime = this.startTime + 10;
        this.startPoint = [...startPoint];
        this.endPoint = [...endPoint];
        this.update = movement;
    }
    
    display() {
        let img = new Image(this.w, this.h);
        img.src = this.src;

        if (!this.friendly) {
            context.save();
            context.translate(this.x + (this.w / 2), this.y + this.h / 2);
            context.rotate(180 * (Math.PI / 180));
            context.translate(-(this.x + (this.w / 2)), -(this.y + this.h / 2));
        }
        context.drawImage(img, this.x, this.y, -this.w, -this.h);
        context.restore();
    };

}