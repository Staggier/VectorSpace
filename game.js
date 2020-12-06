const context = canvas.getContext('2d');
var player = new Player(400, 500, 30, 30, 5, '/images/playerShip2_orange.png', true);
var enemy1 = new Enemy(300, 250, 30, 30, 0, '/images/enemyBlack1.png', false);
var enemy2 = new Enemy(250, 300, 30, 30, 3, '/images/enemyBlack1.png', false);
var enemy3 = new Enemy(200, 200, 30, 30, 1, '/images/enemyBlack1.png', false);

var framesPerSecond = 60;

function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);

        enemy1.move();
        enemy1.display();
        enemy1.shoot();

        enemy2.move();
        enemy2.display();
        enemy2.shoot();

        enemy3.move();
        enemy3.display();
        enemy3.shoot();

        player.move();
        player.display();     
        player.shoot();

        for (var i = 0; i < player.bullets.length; i++) {
            if (onScreen(player.bullets[i].x, player.bullets[i].y)) {              
                player.bullets[i].aimedShot();
                player.bullets[i].display();
            }
            else {
                player.bullets.splice(i, 1);
            }
        }

        for (var i = 0; i < enemy1.bullets.length; i++) {
            if (onScreen(enemy1.bullets[i].x, enemy1.bullets[i].y)) {     
                enemy1.bullets[i].spiralShot(); 
                enemy1.bullets[i].display();
            }
            else {
                enemy1.bullets.splice(i, 1);
            }
        }

        for (var i = 0; i < enemy2.bullets.length; i++) {
            if (onScreen(enemy2.bullets[i].x, enemy2.bullets[i].y)) {     
                enemy2.bullets[i].aimedShot(); 
                enemy2.bullets[i].display();
            }
            else {
                enemy2.bullets.splice(i, 1);
            }
        }

        for (var i = 0; i < enemy3.bullets.length; i++) {
            if (onScreen(enemy3.bullets[i].x, enemy3.bullets[i].y)) {     
                enemy3.bullets[i].waveShot(); 
                enemy3.bullets[i].display();
            }
            else {
                enemy3.bullets.splice(i, 1);
            }
        }

    }, 1000 / framesPerSecond);
}

function game() {
    animate();
}