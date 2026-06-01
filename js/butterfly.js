function initSmartButterflies() {
    const butterflyElements = document.querySelectorAll('.butterfly');
    if (!butterflyElements.length) return;

    butterflyElements.forEach(el => {
        el.style.position = 'absolute';
        el.style.left = '50%';   
        el.style.bottom = '0px'; 
        el.style.top = 'auto';
        el.style.margin = '0px';
        el.style.opacity = '0'; 
    });

    let leader = {
        x: 0,
        y: -150, 
        vx: 0,
        vy: -2,
        targetX: 0,
        targetY: -250,
        speed: 1.5, 
        angle: 0,
        time: 0,
        wobbleSpeed: 0.025, 
        wobbleAmpX: 1.5,    
        wobbleAmpY: 0.8,    
        turnSpeed: 0.05
    };

    const followers = [];
    butterflyElements.forEach((el) => {
        const isBoss = el.classList.contains('butterfly--boss');
        followers.push({
            el: el,
            scale: isBoss ? 1.0 : 0.3 + Math.random() * 0.4, 
            baseAngleOffset: (Math.random() - 0.5) * 15 
        });
    });

    function animateSmartButterflies() {
        if (!document.body.classList.contains("not-loaded")) {
            leader.time += leader.wobbleSpeed;

            let flowerCenterX = 0;
            let flowerCenterY = -250; 

            let dx = leader.targetX - leader.x;
            let dy = leader.targetY - leader.y;
            
            let distToTarget = Math.sqrt(dx * dx + dy * dy) || 1; 

            if (distToTarget < 60) {
                leader.targetX = flowerCenterX + (Math.random() * 400 - 200);
                leader.targetY = flowerCenterY + (Math.random() * 300 - 150);
            }

            let ax = (dx / distToTarget) * 0.015;
            let ay = (dy / distToTarget) * 0.015;

            let swayX = Math.sin(leader.time) * leader.wobbleAmpX;
            let swayY = Math.cos(leader.time * 0.8) * leader.wobbleAmpY;

            let boundX = 0, boundY = 0;
            let distFromCenter = Math.sqrt(Math.pow(leader.x - flowerCenterX, 2) + Math.pow(leader.y - flowerCenterY, 2)) || 1;
            
            if (distFromCenter > 250) {
                boundX += (flowerCenterX - leader.x) * 0.01;
                boundY += (flowerCenterY - leader.y) * 0.01;
            }

            leader.vx += ax + boundX;
            leader.vy += ay + boundY;

            let currentSpeed = Math.sqrt(leader.vx * leader.vx + leader.vy * leader.vy) || 1;
            if (currentSpeed > leader.speed) {
                leader.vx = (leader.vx / currentSpeed) * leader.speed;
                leader.vy = (leader.vy / currentSpeed) * leader.speed;
            }

            leader.x += leader.vx;
            leader.y += leader.vy;

            let finalX = leader.x + swayX;
            let finalY = leader.y + swayY;

            let targetAngle = Math.atan2(leader.vy + (swayY * 0.2), leader.vx + (swayX * 0.2)) * (180 / Math.PI) + 90;
            let angleDiff = targetAngle - leader.angle;
            angleDiff = (angleDiff + 540) % 360 - 180; 
            leader.angle += angleDiff * leader.turnSpeed; 

            followers.forEach(f => {
                let renderAngle = leader.angle + f.baseAngleOffset;
                f.el.style.transform = `translate(calc(${finalX}px - 50%), calc(${finalY}px - 50%)) scale(${f.scale}) rotate(${renderAngle}deg)`; 
                f.el.style.opacity = "1";
            });
        }
        requestAnimationFrame(animateSmartButterflies);
    }
    animateSmartButterflies();
}