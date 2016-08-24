let d = document,
    width = 800,
    height = 300,
    playerPosX = 400,
    playerPosY = 100,
    circleRadius = 20,
    maxPosTop = circleRadius,
    maxPosRight = width - circleRadius,
    maxPosBottom = height - circleRadius,
    maxPosLeft = circleRadius,
    playerVx = 0,
    playerVy = 0,
    jumpVy = 10,
    gravity = 0.2,
    enemies = [], // { x: posX, h: height, v: speed }
    fullSecondsElapsed = 0,
    keyStates = {},
    context,
    drawingLoop,
    enemyLoop,
    paused = false,
    newEnemyInterval = 3000,
    random=Math.random,
    abs=Math.abs,
    timeout=setTimeout,
    interval=setInterval;


onblur = () => { paused = true; }
onfocus = () => { paused = false; }

interval(() => {
    if(paused) return;
    fullSecondsElapsed += 1;
    if(fullSecondsElapsed % 5 == 0 && newEnemyInterval > 100) {
        newEnemyInterval -= 100;
    }
}, 1000);

d.body.style.background='#333';
d.body.innerHTML=`<canvas id="_" width="${width}" height="${height}" style="background:white;position:absolute;top:50%;left:50%;margin:-${height/2}px 0 0 -${width/2}px"></canvas>`;
context = _.getContext('2d');

d.onkeydown = (e) => {
    keyStates[e.keyCode] = true;
}
d.onkeyup = (e) => {
    keyStates[e.keyCode] = false;
}

enemyLoop = () => {
    timeout(enemyLoop, newEnemyInterval);
    if(paused) return;
    let randomV = random() * 2 + 2,
        randomH = random() * 100 + 100;
    if(random() < 0.5) {
        enemies.push({ x: width, h: randomH, v: -randomV });
    } else {
        enemies.push({ x: 0, h: randomH, v: randomV });
    }
};
timeout(enemyLoop, newEnemyInterval);

interval(() => {
    if(paused) return;

    if(keyStates[37]) {
        if((playerVx -= 1) < -10) {
            playerVx = -10;
        }
    }
    if(keyStates[39]) {
        if((playerVx += 1) > 10) {
            playerVx = 10;
        }
    }

    playerVx *= 0.9;
    playerPosX += playerVx;
    if(playerPosX <= maxPosLeft) {
        playerPosX = maxPosLeft;
        playerVx = -playerVx;
    }
    if(playerPosX >= maxPosRight) {
        playerPosX = maxPosRight;
        playerVx = -playerVx;
    }

    if(keyStates[38] && playerPosY == maxPosBottom) {
        playerVy = jumpVy;
    }

    playerVy -= gravity;
    playerPosY -= playerVy;
    if(playerPosY >= maxPosBottom) {
        playerPosY = maxPosBottom;
        playerVy = 0.8 * -playerVy;
    }

    enemies.filter((e) => {
        if(abs(e.x - playerPosX) < circleRadius &&
           ((height - e.h - playerPosY < circleRadius && Math.sqrt(abs(e.x - playerPosX) + abs(height - e.h - playerPosY)) < circleRadius) ||
            (playerPosY >= height - e.h && playerPosY >= height - e.h)))
        {
            paused = true;
            drawingLoop();
            alert('You lost.');
            location.reload();
        }
        e.x += e.v;
        return 0 < e.x && e.x < width;
    });
}, 15);

f='fillStyle';
drawingLoop = () => {
    _.width = _.width;
    context[f] = '#5f5';
    context.arc(playerPosX, playerPosY, circleRadius, 0, 2 * Math.PI);
    context.fill();
    context.font = '24px monospace'
    context[f] = '#000';
    context.fillText(fullSecondsElapsed, 10, 28);
    context[f] = '#f55';
    for(let e of enemies) {
        context.fillRect(e.x - 1, height - e.h, 3, e.h);
    }
    requestAnimationFrame(drawingLoop);
}
drawingLoop();
