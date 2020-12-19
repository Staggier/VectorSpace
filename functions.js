function onScreen(x, y, width, height) {
    return (x + width >= 0 && x <= canvas.width) && (y + height >= 0 && y <= canvas.height);
}

function slope(point1, point2) {
    return (point2[0] - point1[0]) / (point2[1] - point1[1]);
}

function isColliding(entity1, entity2) {
    if (entity1.x > entity2.x + entity2.w || entity1.x + entity1.w < entity2.x || entity1.y > entity2.y + entity2.h || entity1.y + entity1.h < entity2.y) {
        return false;
    }
    return true;
}

function addVector(vector1, vector2) {
    return [vector1[0] + vector2[0], vector1[1] + vector2[1]];
}

function subVector(vector1, vector2) {
    return addVector(vector1, flipVector(vector2));
}

function multScalarVector(scalar, vector) {
    return [scalar * vector[0], scalar * vector[1]];
}

function flipVector(vector) {
    return multScalarVector(-1, vector);
}

function lengthVector(vector) {
	return Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1]));
}

function normalizeVector(vector) {
    let length = lengthVector(vector);
    if (length < 0.001)
        return vector;
	return multScalarVector(1.0 / length, vector);
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
