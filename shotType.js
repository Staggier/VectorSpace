class ShotType {
    static aimedShot(bullet) {
        let angle = Math.atan2(bullet.endPoint[1] - bullet.startPoint[1], bullet.endPoint[0] - bullet.startPoint[0]);

        bullet.x += bullet.speed * Math.cos(angle);
        bullet.y += bullet.speed * Math.sin(angle);
    }

    static spiralShot(bullet) {
        let t = Date.now() / 1000;
        let linearTime = (t - bullet.startTime) / (bullet.endTime - bullet.startTime);

        bullet.x = bullet.startPoint[0] + 0.5 * Math.sin(bullet.startTime + t) * linearTime * 200;
        bullet.y = bullet.startPoint[1] - 0.5 * Math.cos(bullet.endTime + t) * linearTime * 200;
    }

    static twirlShot(bullet) {
        let t = Date.now() / 1000;
        let linearTime = (t - bullet.startTime) / (bullet.endTime - bullet.startTime);

        bullet.x = bullet.startPoint[0] + 40 * Math.sin(bullet.startTime + t * 2) + linearTime * 300;
        bullet.y = bullet.startPoint[1] - 40 * Math.cos(bullet.endTime + t * 2) + linearTime * 200;
    }

    static waveShot(bullet) {
        let t = Date.now() / 1000;
        let linearTime = (t - bullet.startTime) / (bullet.endTime - bullet.startTime);

        bullet.x = bullet.startPoint[0] + 20 * Math.sin(bullet.startTime + t * 2) + linearTime * 200;
        bullet.y = bullet.startPoint[1] - 40 * Math.cos(bullet.endTime + t) + linearTime;
    }
}