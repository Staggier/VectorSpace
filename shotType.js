class ShotType {
    static aimedShot(bullet) {
        let angle = Math.atan2(bullet.endPoint[1] - bullet.startPoint[1] - (bullet.w / 2), bullet.endPoint[0] - bullet.startPoint[0] - (bullet.h / 2));

        bullet.x += bullet.speed * Math.cos(angle);
        bullet.y += bullet.speed * Math.sin(angle);
    }

    static spiralShot(bullet) {
        let seconds = Date.now() / 1000;
        let linearTime = (seconds - bullet.startTime) / (bullet.endTime - bullet.startTime);

        bullet.x = bullet.startPoint[0] + 0.5 * Math.sin(bullet.startTime + seconds) * linearTime * 200;
        bullet.y = bullet.startPoint[1] - 0.5 * Math.cos(bullet.endTime + seconds) * linearTime * 200;
    }

    static twirlShot(bullet) {
        let seconds = Date.now() / 1000;
        let linearTime = (seconds - bullet.startTime) / (bullet.endTime - bullet.startTime);

        bullet.x = bullet.startPoint[0] + 40 * Math.sin(bullet.startTime + seconds * 2) + linearTime * 300;
        bullet.y = bullet.startPoint[1] - 40 * Math.cos(bullet.endTime + seconds * 2) + linearTime * 200;
    }
}