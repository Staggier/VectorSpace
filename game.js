const context = canvas.getContext('2d');
const framesPerSecond = 60;

var score;
var player;
var waveCount;

var gameStartTime;

var entities = [];
var bullets = [];
var powerups = [];

var levels = [wave1, wave2, wave3];
var wavetext = "";

var loseSound = new Audio('./audio/sfx_lose.ogg');
var inGameSoundtrack = new Audio('./audio/Six_Umbrellas_-_08_-_Stockholm.mp3');
var playerHit = new Audio('./audio/sfx_twoTone.ogg');
var victorySound = new Audio('./audio/zapsplat_multimedia_game_sound_digital_bright_positive_complete_55270.mp3');
var played = false;

var lifeup = new Image(10, 10);
lifeup.src = "./images/playerLife2_orange.png"

var backgrounds;

inGameSoundtrack.onended = () => {
    inGameSoundtrack.play();
}

function setGame() {
    window.onkeydown = window.onkeyup = keyPress;
    canvas.onclick = () => {};
    controller.space = false;

    score = 0;
    waveCount = 0;
    player = new Player(400, 500);

    entities = [player];
    bullets = [];
    powerups = [];

    played = false;
    gameStartTime = Date.now();

    setBackgrounds();

    inGameSoundtrack.currentTime = 0;
    inGameSoundtrack.play();
}

function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate);
        if (player.numLives > 0 && entities.length != 1) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBackgrounds();
            for (var i = 0; i < entities.length && wavetext == ""; i++) {
                entities[i].move();

                let bullet = entities[i].shoot();    
                if (bullet != null) {
                    bullets.push(bullet);
                }

                if (!entities[i].friendly || !entities[i].respawn) {
                    entities[i].display();
                }
            }

            for (var i = 0; i < bullets.length && wavetext == ""; i++) {
                if (onScreen(bullets[i].x, bullets[i].y, bullets[i].w, bullets[i].h)) {
                    bullets[i].update(bullets[i]);
                    bullets[i].display();
                }
                else {
                    bullets.splice(i, 1);
                }
            }

            for (var i = 0; i < bullets.length && wavetext == ""; i++) {
                for (var j = 0; j < entities.length && wavetext == ""; j++) {
                    if (typeof(bullets[i]) == typeof(undefined) || bullets[i].friendly == entities[j].friendly) {
                        continue;
                    }

                    var entity;

                    if (entities[j].friendly) {
                        entity = new Entity(entities[j].x + 10, entities[j].y, '', true);
                        entity.w = 1;
                        entity.h = 1
                    }
                    else {
                        entity = entities[j];
                    }
                    
                    if (isColliding(bullets[i], entity)) {
                        if (entities[j].friendly) {
                            let now = Date.now();
                            if (now - entities[j].lastHit > 1500) { 
                                entities[j].numLives -= 1;       
                                if (entities[j].numLives == 0) {
                                    inGameSoundtrack.pause();
                                    loseSound.play();
                                }
                                else {
                                    playerHit.play();
                                    entities[j].lastHit = now;
                                    var repeat = setInterval(() => { player.respawn = !player.respawn }, 75);
                                    setTimeout(() => {clearInterval(repeat); player.respawn = false;}, 1500);
                                }
                            }
                        }
                        else {
                            score += 25;
                            entities[j].healthPoints -= 1;
                            if (!entities[j].healthPoints) {
                                if (Math.random() > 0.75) {
                                    powerups.push(new PowerUp(entities[j].x, entities[j].y));               
                                }
                                entities.splice(j, 1);
                            }
                        }
                        bullets.splice(i, 1);
                    }
                }
            }

            for (var i = 0; i < powerups.length && wavetext == ""; i++) {
                powerups[i].update();

                if (isColliding(powerups[i], player)) {
                    powerups[i].apply()
                    powerups.splice(i, 1);
                }
                else {
                    powerups[i].display();
                }
            }

            context.font = "100px myFont";
            context.fillText(wavetext, 250, 250);
   
            context.font = "20px myFont";
            context.fillStyle = "white";
            context.fillText("Score: " + score, 1, 20);

            context.fillText("Lives: ", 640, 20);
            for (var i = 0; i < player.numLives; i++) {
                context.drawImage(lifeup, 700 + (10 * (i + 1)), 0);
            }
        }
        else if (player.numLives > 0) {
            if (waveCount == levels.length) {
                if (!played) {
                    victorySound.play();
                    score += 2000 * Math.pow(Math.E, -(((Date.now - gameStartTime) / 1000) | 0) / 500) | 0;
                    played = true;
                }
                victory();
            }
            else {            
                bullets = [];
                wavetext = "WAVE " + (waveCount + 1);
                entities = entities.concat(levels[waveCount]());
                waveCount += 1;
                player.respawn = false;
                setTimeout(() => {wavetext = ""}, 1000);
            }
        }
        else {
            gameOver();
        }

    }, 1000 / framesPerSecond);
}

function game() {
    menuSoundtrack.pause();
    setGame();
    animate();
}

function replay() {
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

function gameOver() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.font = "100px myFont";
    context.fillStyle = "black";
    context.fillText("GAME OVER", 100, 200);
    replay();
}

function victory() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.font = "100px myFont";
    context.fillText("YOU WIN!", 175, 100);
    context.fillText("SCORE: " + score, 100, 200);
    replay();
}