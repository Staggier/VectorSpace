const context = canvas.getContext('2d');
var player = new Player(400, 500, 30, 30, 3, '/images/playerShip2_orange.png', true);
var enemy = new Enemy(50, 100, 30, 30, 3, '/images/enemyBlack1.png')
var framesPerSecond = 60;

function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        enemy.display();
        enemy.move();

        player.display();
        player.move();
    }, 1000 / framesPerSecond);
}

function game() {
    animate();
}