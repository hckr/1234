((document, requestAnimationFrame, width, height, playerPosX, playerEnergy, jumpEnergy, playerVy, circleRadius, gravity, enemies) => {
    document.body.style.background='#333';
    document.body.innerHTML=`<canvas id="_" width="${width}" height="${height}" style="background:white;position:absolute;top:50%;left:50%;margin:-${height/2}px 0 0 -${width/2}px"></canvas>`;
    c = _.getContext('2d');
    document.onkeydown = (e) => {
        k[e.keyCode] = true;
    }
    document.onkeyup = (e) => {
        k[e.keyCode] = false;
    }
    k={}
    u = () => {
        k[37] && (playerPosX -= 1);
        k[38] && playerVy==0 && (playerEnergy = jumpEnergy);
        k[39] && (playerPosX += 1);
    }
    setInterval(u, 15);
    d = () => {
        _.width = _.width;
        c.arc(playerPosX, height-circleRadius, circleRadius, 0, 2 * Math.PI);
        c.fill();
        requestAnimationFrame(d);
    }
    d();
})(document, requestAnimationFrame, 800, 400, 400, 100, 100, 0, 20, 1, [])
