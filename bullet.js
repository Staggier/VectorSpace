class Bullet extends Entity {
    constructor(x, y, width, height, speed, src, friendly, startPoint, endPoint) {
        super();
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.speed = speed;
        this.src = src
        this.friendly = friendly;
        this.startTime = Date.now() / 1000;
        this.endTime = this.startTime + 10;
        this.startPoint = [...startPoint];
        this.endPoint = [...endPoint];
    }

    linearTime() {
        let seconds = Date.now() / 1000;
        return (seconds - this.startTime) / (this.endTime - this.startTime);
    }

    aimedShot() {
        let angle = Math.atan2(this.endPoint[1] - this.startPoint[1], this.endPoint[0] - this.startPoint[0]);

        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);
    }

    spiralShot() {
        let t = Date.now() / 1000;
        let linearTime = this.linearTime();

        this.velocity.splice(0, 2, 3, 4)

        this.x = this.startPoint[0] + 0.5 * Math.sin(this.startTime + t) * linearTime * 200;
        this.y = this.startPoint[1] - 0.5 * Math.cos(this.endTime + t) * linearTime * 200;
    }

    twirlShot() {
        let t = Date.now() / 1000;
        let linearTime = this.linearTime();

        this.x = this.startPoint[0] + 40 * Math.sin(this.startTime + t * 2) + linearTime * 300;
        this.y = this.startPoint[1] - 40 * Math.cos(this.endTime + t * 2) + linearTime * 200;
    }

    waveShot() {
        let t = Date.now() / 1000;
        let linearTime = this.linearTime();

        this.x = this.startPoint[0] + 20 * Math.sin(this.startTime + t * 2) + linearTime * 200;
        this.y = this.startPoint[1] - 40 * Math.cos(this.endTime + t) + linearTime;
    }
}