function wave1() {
    var enemy1 = new Enemy(300, 100, 0, './images/enemyBlack1.png'); 
    var enemy2 = new Enemy(50, 200, 3, './images/enemyBlack2.png');
    var enemy3 = new Enemy(720, 200, 3, './images/enemyBlack2.png');
    
    enemy1.setBehavior(400, 400, 100, 100, 300, [1, 0], ShotType.aimedShot);
    enemy2.setBehavior(50, 350, 200, 200, 300, [1, 0], ShotType.aimedShot);
    enemy3.setBehavior(450, 750, 200, 200, 300, [1, 0], ShotType.aimedShot);

    return [enemy1, enemy2, enemy3];
}

function wave2() {
    var enemy1 = new Enemy(400, 250, 0, './images/enemyBlue1.png')
    var enemy2 = new Enemy(100, 300, 3, './images/enemyBlue2.png');
    var enemy3 = new Enemy(700, 300, 3, './images/enemyBlue2.png');
    var enemy4 = new Enemy(250, 275, 3, './images/enemyBlue2.png');

    enemy1.setBehavior(400, 400, 250, 250, 300, [1, 0], ShotType.spiralShot)
    enemy2.setBehavior(0, canvas.width, 0, 350, 300, [1, 0.5], ShotType.aimedShot);
    enemy3.setBehavior(0, canvas.width, 0, 350, 300, [1, 0.5], ShotType.aimedShot);
    enemy4.setBehavior(0, canvas.width, 0, 350, 300, [1, 0.5], ShotType.aimedShot);

    return [enemy1, enemy2, enemy3, enemy4];
}

function wave3() {
    var enemy1 = new Enemy(201, 300, 3, './images/enemyRed1.png');
    var enemy2 = new Enemy(101, 100, 4, './images/enemyRed2.png');
    var enemy3 = new Enemy(670, 100, 4, './images/enemyRed2.png');
    var enemy4 = new Enemy(400, 200, 4, './images/enemyRed2.png');
    var enemy5 = new Enemy(401, 250, 0, './images/enemyRed2.png');

    enemy1.setBehavior(200, 600, 300, 300, 300, [1, 0], ShotType.twirlShot);
    enemy2.setBehavior(100, 400, 100, 100, 300, [1, 0], ShotType.aimedShot);
    enemy3.setBehavior(400, 700, 100, 100, 300, [1, 0], ShotType.aimedShot);
    enemy4.setBehavior(100, 700, 200, 200, 300, [1, 0], ShotType.aimedShot);
    enemy5.setBehavior(400, 400, 250, 250, 300, [1, 0], ShotType.spiralShot);

    return [enemy1, enemy2, enemy3, enemy4, enemy5];
}