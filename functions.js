function normalizeVector(vector) {
    let magnitude = Math.sqrt(vector.map(x => x * x).reduce((x, y) => x + y));
    return vector[0] != 0 || vector[1] != 0 ? vector.map(x => x / magnitude) : vector;
}

function onScreen(x, y) {
    return (x >= 0 && x <= canvas.width) && (y >= 0 && y <= canvas.height);
}

function slope(p1, p2) {
    return (p2[0] - p1[0]) / (p2[1] - p1[1]);
}