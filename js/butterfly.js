window.initSmartButterflies = function() {
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
        y: -250, 
        vx: 0,
        vy: -2,
        speed: 0.8, 
        angle: -90,
        wanderAngle: -90,
        time: 0,
        turnSpeed: 0.025 
    };

    const followers = [];
    butterflyElements.forEach((el) => {
        const isBoss = el.classList.contains('butterfly--boss');
        followers.push({
            el: el,
            scale: isBoss ? 1.0 : 0.3 + Math.random() * 0.4, 
            baseAngleOffset: (Math.random() - 0.5) * 20 
        });
    });

    function animateSmartButterflies() {
        if (!document.body.classList.contains("not-loaded")) {
            leader.time += 0.015; 

            leader.wanderAngle += (Math.random() - 0.5) * 10; 

            let halfWidth = window.innerWidth / 2;
            let screenHeight = window.innerHeight;
            
            let marginX = 60;        
            let marginYTop = 60;    
            let marginYBottom = 150; 

            let forceX = 0;
            let forceY = 0;

            if (leader.x < -halfWidth + marginX) forceX = 1;      
            if (leader.x > halfWidth - marginX) forceX = -1;       
            if (leader.y < -screenHeight + marginYTop) forceY = 1; 
            if (leader.y > -marginYBottom) forceY = -1;         

            if (forceX !== 0 || forceY !== 0) {
                let escapeAngle = Math.atan2(forceY, forceX) * (180 / Math.PI);
                let angleDiff = escapeAngle - leader.wanderAngle;
                angleDiff = (angleDiff + 540) % 360 - 180;
                leader.wanderAngle += angleDiff * 0.08; 
            }

            let flutterCycle = Math.sin(leader.time * 4); 
            let isFlapping = flutterCycle > 0; 
            let burstSpeed = isFlapping ? (flutterCycle * 1.2) : 0; 
            let currentSpeed = leader.speed + burstSpeed;

            let rad = leader.wanderAngle * (Math.PI / 180);
            
            leader.vx += (Math.cos(rad) * currentSpeed - leader.vx) * 0.04;
            leader.vy += (Math.sin(rad) * currentSpeed - leader.vy) * 0.04;

            leader.x += leader.vx;
            leader.y += leader.vy; 

            let targetAngle = Math.atan2(leader.vy, leader.vx) * (180 / Math.PI) + 90;
            
            let bodySway = Math.sin(leader.time * 1.5) * 15; 
            targetAngle += bodySway;

            let angleDiff2 = targetAngle - leader.angle;
            angleDiff2 = (angleDiff2 + 540) % 360 - 180; 
            leader.angle += angleDiff2 * leader.turnSpeed; 

            followers.forEach(f => {
                let renderAngle = leader.angle + f.baseAngleOffset;
                f.el.style.transform = `translate(calc(${leader.x}px - 50%), calc(${leader.y}px - 50%)) scale(${f.scale}) rotate(${renderAngle}deg)`; 
                f.el.style.opacity = "1";
            });
        }
        requestAnimationFrame(animateSmartButterflies);
    }
    animateSmartButterflies();
};