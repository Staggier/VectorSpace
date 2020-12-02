const controller =  {
    up : false,
    down: false,
    left: false,
    right: false
};

window.onkeydown = window.onkeyup = key => {
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
        this.velocity = [0, 0];
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.speed = speed;
        this.src = src;
        this.friendly = friendly;
        this.move = () => {
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

            if (this.validMove(this.velocity[0], this.velocity[1])) {
                normalizeVector(this.velocity);
                player.x += player.speed * player.velocity[0];
                player.y += player.speed * player.velocity[1];
            }
        };
    }
}