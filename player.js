const controller =  {
    up : false,
    down: false,
    left: false,
    right: false,
    space: false
};

window.onkeydown = window.onkeyup = key => {
    if (key.code == "Space") {
        if (key.type == 'keyup') {
            startTime = 0;
        }
        controller.space = key.type == 'keydown';
    }
    if (key.code == "KeyW" || key.code == "ArrowUp") {
        controller.up = key.type == 'keydown';
    }
    else if (key.code == "KeyS" || key.code == "ArrowDown") {
        controller.down = key.type == 'keydown';
    }
    if (key.code == "KeyA" || key.code == "ArrowLeft") {
        controller.left = key.type == 'keydown';
    }
    else if (key.code == "KeyD" || key.code == "ArrowRight") {
        controller.right = key.type == 'keydown';
    }
};

class Player extends Entity {
    constructor(x, y, width, height, speed, src, friendly) {
        super();
        this.velocity = [1, 0];
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.speed = speed;
        this.src = src;
        this.friendly = friendly;
        this.bullets = [];
        this.startTime = Date.now();
    };
    move = () => {
        if (controller.up) {
            this.velocity[1] = -1;
        }
        else if (controller.down) {
            this.velocity[1] = 1;
        }
        else {
            this.velocity[1] = 0;
        }

        if (controller.left) {
            this.velocity[0] = -1;
        }
        else if (controller.right) {
            this.velocity[0] = 1;
        }
        else {
            this.velocity[0] = 0;
        }

        if (this.validMove()) {
            this.velocity = normalizeVector(this.velocity);
            this.x += this.speed * this.velocity[0];
            this.y += this.speed * this.velocity[1];
        }
    };
    shoot = () => {
        let now = Date.now();
        if (controller.space && now - this.startTime > 250) {
            player.bullets.push(new Bullet(player.x + (player.w / 2), player.y + player.h, 10, 15, 8, '/images/laserBlue16.png', player.friendly, [this.x, this.y], [this.x, -5]));
            this.startTime = now;
        }
    };
}