const context = canvas.getContext('2d');
const framesPerSecond = 60;

var score;
var player;

var entities;
var bullets;

var loseSound = new Audio('./audio/sfx_lose.ogg');
var soundtrack = new Audio('./audio/Six_Umbrellas_-_08_-_Stockholm.mp3');
var playerHit = new Audio('./audio/sfx_twoTone.ogg');

soundtrack.onended = () => {
    soundtrack.play();
}

function setGame() {
    window.onkeydown = window.onkeyup = keyPress;
    canvas.onclick = () => {};

    score = 0;
    player = new Player(400, 500);

    var enemy1 = new Enemy(300, 100, 0, './images/enemyBlack1.png');
    var enemy2 = new Enemy(100, 300, 6, './images/enemyBlack1.png');
    var enemy3 = new Enemy(200, 200, 2, './images/enemyBlack1.png');

    enemy1.setBehavior(300, 600, 100, 100, [1, 0], ShotType.waveShot);
    enemy2.setBehavior(100, 400, 100, 400, [1, 0.25], ShotType.aimedShot);
    enemy3.setBehavior(0, canvas.width, 0, 400, [0.5, 1], ShotType.spiralShot);

    entities = [enemy1, enemy2, player];
    bullets = [];
}

function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate);
        if (player.numLives != 0) {

            context.clearRect(0, 0, canvas.width, canvas.height);          
            let now = Date.now();

            for (var i = 0; i < entities.length; i++) {
                entities[i].move();

                let bullet = entities[i].shoot();    
                if (bullet != null) {
                    bullets.push(bullet);
                }

                if (!entities[i].friendly) {
                    entities[i].display();
                }
                else if (entities[i].respawnTimer == entities[i].lastShot || now - entities[i].respawnTimer > 150) {
                    entities[i].respawnTimer = now - entities[i].respawnTimer > 1500 ? entities[i].lastShot : now;
                    entities[i].display();
                }
            }

            for (var i = 0; i < bullets.length; i++) {
                if (onScreen(bullets[i].x, bullets[i].y, bullets[i].w, bullets[i].h)) {
                    bullets[i].update(bullets[i]);
                    bullets[i].display();
                }
                else {
                    bullets.splice(i, 1);
                }
            }

            for (var i = 0; i < bullets.length; i++) {
                for (var j = 0; j < entities.length; j++) {
                    if (isShot(bullets[i], entities[j])) {
                        if (entities[j].friendly) {
                            if (entities[j].numLives != 0) {
                                entities[j].numLives -= 1;

                            }
                        }
                        else {
                            entities[j].healthPoints -= 1;
                            if (!entities[j].healthPoints) {
                                entities.splice(j, 1);
                            }
                        }
                        bullets.splice(i, 1);
                    }
                }
            }
        }
        else {
            loseSound.play();
            gameOver();
        }

    }, 1000 / framesPerSecond);
}

function game() {
    soundtrack.play();
    setGame();
    animate();
}

function gameOver() {
    context.font = "100px myFont";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText("GAME OVER", 100, 200);
    context.fillText("PLAY AGAIN?", 70, 300);

    var buttonImg = new Image(222, 39);
    buttonImg.src = './images/buttonRed.png';

    context.drawImage(buttonImg, 300, 350);
    context.drawImage(buttonImg, 300, 400);

    context.font = "32px myFont";

    context.fillText("YES", 380, 380);
    context.fillText("NO", 390, 430);

    canvas.onclick = (click) => {
        const rect = canvas.getBoundingClientRect();
        if (click.clientX - rect.left >= 300 && click.clientX - rect.left <= 522) {
            if (click.clientY - rect.top >= 350 && click.clientY - rect.top <= 385) {
                setGame();
            }
            else if (click.clientY - rect.top >= 395 && click.clientY - rect.top <= 435) {
                location.reload();
            }
        }
    }
}