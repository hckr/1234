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
    enemies = [],
    startTimestamp = +new Date(),
    fullSecondsElapsed = 0,
    keyStates = {},
    context,
    drawingLoop;

setInterval(() => {
    fullSecondsElapsed = parseInt((new Date() - startTimestamp) / 1000);
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

setInterval(() => {
    if(keyStates[37]) {
        playerVx -= 1;
    }
    if(keyStates[39]) {
        playerVx += 1
    }

    if(playerVx < -10) playerVx = -10;
    if(playerVy > 10) playerVx = 10;

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
}, 15);

f='fillStyle';
drawingLoop = () => {
    _.width = _.width;
    context[f] = '#8f8';
    context.arc(playerPosX, playerPosY, circleRadius, 0, 2 * Math.PI);
    context.fill();
    context.font = '24px monospace'
    context[f] = 'black';
    context.fillText(fullSecondsElapsed, 10, 28);
    requestAnimationFrame(drawingLoop);
}
drawingLoop();
