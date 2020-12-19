var ship = new Entity(250, 250, './images/playerShip2_orange.png', true);

ship.w = 35;
ship.h = 30;

ship.yMax = 400;
ship.xMax = 500;

const pointBias = 0.2;
const meteorBias = 100000.0;
const falloff = 2.0;

var time = Date.now();
var meteors = [];

var bigMeteorImages = ['./images/meteorBrown_big1.png', './images/meteorBrown_big2.png', './images/meteorBrown_big3.png', './images/meteorBrown_big4.png'];
var mediumMeteorImages = ['./images/meteorBrown_med1.png', './images/meteorBrown_med2.png'];
var smallMeteorImages = ['./images/meteorBrown_small1.png', './images/meteorBrown_small2.png'];

function spawnMeteorCheck()
{
	let now = Date.now();
	if (now - time > 500) {
		let size = (Math.random() * 66 | 0) + 15;
		let x = (Math.random() * (canvas.width - size));
		let speed = Math.random() * 6 + 3 | 0;
		let meteor = new Entity(x, -100, size < 20 ? smallMeteorImages[Math.random() * 2 | 0] : size < 40 ? mediumMeteorImages[Math.random() * 2 | 0] : bigMeteorImages[Math.random() * 4 | 0], false);

		meteor.w = size;
		meteor.h = size;
		meteor.speed = speed;

		meteors.push(meteor);
		time = now;
	}
}

function drawMeteors()
{
	for (var i = 0; i < meteors.length; i++) {
		meteors[i].y += meteors[i].speed;
		
		if (onScreen(meteors[i].x, meteors[i].y, meteors[i].w, meteors[i].h)) {
			meteors[i].display();
		}
		else if (meteors[i].y > 0) {
			meteors.splice(i, 1);
		}
	}
}

function titleScreenAnimation() {
    setTimeout(() => {
        if (!titleScreen.hidden) {
            requestAnimationFrame(titleScreenAnimation);
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawBackgrounds();
        spawnMeteorCheck();
        drawMeteors();
        
        let now = Date.now();
		
        let velocity = [0, 0];
        let point = [250 + (50 * Math.cos(now / 1000)), 200 + (50 * Math.sin(now / 1000))];

        let playerToPoint = subVector(point, [ship.x, ship.y]);
        let toPointVelocity = multScalarVector(pointBias, playerToPoint);

        velocity = addVector(velocity, toPointVelocity);

        for (var i = 0; i < meteors.length; i++)
        {
            let playerToMeteor = subVector([meteors[i].x, meteors[i].y], [ship.x, ship.y]);
            let meteorDistance = lengthVector(playerToMeteor);
            let awayFromMeteor = flipVector(normalizeVector(playerToMeteor));
            let awayVelocity = multScalarVector(meteorBias / Math.pow(meteorDistance, falloff), awayFromMeteor);

            velocity = addVector(velocity, awayVelocity);
        }

        let vector = addVector([ship.x, ship.y], velocity);

        if (vector[0] >= 0 && vector[0] + ship.w <= 500) {
            ship.x = vector[0];
        }
        if (vector[1] >= 0 && vector[1] + ship.h <= 400) {
            ship.y = vector[1];
        }

        ship.display();
    }, 1000 / framesPerSecond);
}
