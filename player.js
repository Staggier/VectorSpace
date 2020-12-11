const controller =  {
    up : false,
    down: false,
    left: false,
    right: false,
    shift: false,
    space: false
};

function keyPress(key) {
    if (key.code == "Space") {
        if (key.type == 'keyup') {
            startTime = 0;
            controller.space = !controller.space;
        }
    }
    if (key.code == "ShiftLeft" || key.code == "ShiftRight") {
        controller.shift = key.type == 'keydown';
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
    constructor(x, y) {
        super();
        this.numLives = 3;
        this.velocity = [1, 0];
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        this.speed = 5;
        this.src = './images/playerShip2_orange.png';
        this.friendly = true;
        this.startTime = Date.now();
        this.lastShot = 0;
        this.respawnTimer = 0;
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

        this.update();
    };
    
    update() {
        let check1 = this.validXMove();
        let check2 = this.validYMove();

        if (check1 && check2) {
            this.x += (controller.shift? 0.6 : 1) * this.speed * this.velocity[0];
            this.y += (controller.shift? 0.6 : 1) * this.speed * this.velocity[1];
        }
        else if (check1 || check2) {
            this.velocity = normalizeVector(this.velocity);
            this.x += check1? (controller.shift? 0.6 : 1) * this.speed * this.velocity[0] : 0;
            this.y += check2? (controller.shift? 0.6 : 1) * this.speed * this.velocity[1] : 0;
        }
    };

    shoot() {
        let now = Date.now();
        if (controller.space && now - this.startTime > 250) {
            let bullet = new Bullet(player.x + (player.w / 2), player.y + player.h, this.friendly, [this.x, this.y], [this.x, -5]);
            bullet.assignBehavior(ShotType.aimedShot);
            this.startTime = now;
            return bullet;
        }
        return null;
    };
}