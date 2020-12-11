function normalizeVector(vector) {
    let magnitude = Math.sqrt(vector.map(x => x * x).reduce((x, y) => x + y));
    return vector[0] != 0 || vector[1] != 0 ? vector.map(x => x / magnitude) : vector;
}

function onScreen(x, y, w, h) {
    return (x + w >= 0 && x <= canvas.width) && (y + h >= 0 && y <= canvas.height);
}

function slope(p1, p2) {
    return (p2[0] - p1[0]) / (p2[1] - p1[1]);
}

function isShot(bullet, entity) {
    if (bullet.friendly == entity.friendly) {
        return false;
    }

    let now = Date.now();

    if (entity.friendly && now - entity.lastShot < 1500) {
        return false;
    }

    if (bullet.x > entity.x + entity.w || bullet.x + bullet.w < entity.x || bullet.y > entity.y + entity.h || bullet.y + bullet.h < entity.y) {
        return false;
    }
    else {
        if (entity.friendly) {
            entity.lastShot = Date.now();
            setTimeout(() => {
                entity.respawnTimer = entity.lastShot;
            }, 1500)
        }
        return true;
    }
}