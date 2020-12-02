function normalizeVector(vector) {
    let magnitude = Math.sqrt(vector.map(x => x * x).reduce((x, y) => x + y));
    return vector.map(x => x / magnitude)
}