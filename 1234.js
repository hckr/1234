((document, requestAnimationFrame, width, height, playerPosX, playerPosY, playerVx, playerVy, jumpVy, gravity, circleRadius, enemies, startTimestamp) => {
    s = 0;
    setInterval(() => {
        s = parseInt((new Date() - startTimestamp) / 1000);
    }, 1000);
    document.body.style.background='#333';
    document.body.innerHTML=`<canvas id="_" width="${width}" height="${height}" style="background:white;position:absolute;top:50%;left:50%;margin:-${height/2}px 0 0 -${width/2}px"></canvas>`;
    c = _.getContext('2d');
    k={}
    document.onkeydown = (e) => {
        k[e.keyCode] = true;
    }
    document.onkeyup = (e) => {
        k[e.keyCode] = false;
    }
    /* top, right, bottom, left min/max circle positions */
    t = circleRadius;
    r = width - circleRadius;
    b = height - circleRadius;
    l = circleRadius;
    setInterval(() => {
        if(k[37]) {
            playerVx -= 1;
        }
        if(k[39]) {
            playerVx += 1
        }

        if(playerVx<-10) playerVx=-10;
        if(playerVy>10) playerVx=10;

        playerVx *= 0.9;
        playerPosX += playerVx;
        if(playerPosX <= l) {
            playerPosX = l;
            playerVx = -playerVx;
        }
        if(playerPosX >= r) {
            playerPosX = r;
            playerVx = -playerVx;
        }

        if(k[38] && playerPosY==b) {
            playerVy = jumpVy;
        }

        playerVy -= gravity;
        playerPosY -= playerVy;
        if(playerPosY >= b) {
            playerPosY = b;
            playerVy = 0.8 * -playerVy;
        }
    }, 15);
    f='fillStyle';
    d = () => {
        _.width = _.width;
        c[f] = '#8f8';
        c.arc(playerPosX, playerPosY, circleRadius, 0, 2 * Math.PI);
        c.fill();
        c.font = '24px monospace'
        c[f] = 'black';
        c.fillText(s, 10, 28);
        requestAnimationFrame(d);
    }
    d();
})(document, requestAnimationFrame, 800, 300, 400, 100, 0, 0, 10, 0.2, 20, [], +new Date())
