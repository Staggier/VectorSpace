function onScreen(x, y, w, h) {
    return (x + w >= 0 && x <= canvas.width) && (y + h >= 0 && y <= canvas.height);
}

function slope(p1, p2) {
    return (p2[0] - p1[0]) / (p2[1] - p1[1]);
}

function isColliding(entity1, entity2) {
    if (entity1.x > entity2.x + entity2.w || entity1.x + entity1.w < entity2.x || entity1.y > entity2.y + entity2.h || entity1.y + entity1.h < entity2.y) {
        return false;
    }
    return true;
}

function addVector(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
}

function subVector(v1, v2) {
    return addVector(v1, flipVector(v2));
}

function multScalarVector(scalar, vect) {
    return [scalar * vect[0], scalar * vect[1]];
}

function flipVector(vect) {
    return multScalarVector(-1, vect);
}

function lengthVector(vect) {
	return Math.sqrt((vect[0] * vect[0]) + (vect[1] * vect[1]));
}

function normalizeVector(vect) {
    let length = lengthVector(vect);
    if (length < 0.001)
        return vect;
	return multScalarVector(1.0 / length, vect);
}

function getNewX() {
    return -(Math.random() * (1024 - canvas.width) | 0);
}

function setBackgrounds() {
    backgrounds = [];
    for (var i = 0; i < 4; i++) {
        backgrounds.push([getNewX(), canvas.height - ((i + 1) * 256)]);
    }
}

function drawBackgrounds() {
    for (var i = 0; i < backgrounds.length; i++) {
        backgrounds[i][1] += 8;

        context.drawImage(backgroundImage, backgrounds[i][0], backgrounds[i][1]);

        if (backgrounds[i][1] > canvas.height) {
            backgrounds[i] = [getNewX(), canvas.height - (backgrounds.length * 256) + 8];
        }
    }
}
