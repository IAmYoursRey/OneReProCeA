function initPoppingHearts() {
    const particles = [];
    const colors = ['#ff4d6d', '#ffd166', '#06d6a0', '#118ab2', '#073b4c', '#ffffff', '#ff9f1c'];
    
    let isBursting = false;
    let flashOpacity = 0;

    setTimeout(() => {
        isBursting = true;
        flashOpacity = 0.8;
        
        let vmin = Math.min(width, height) / 100;
        let boxY = height / 2; 

        const isMobile = window.innerWidth <= 768;
        const totalParticles = isMobile ? 40 : 120;

        for (let i = 0; i < totalParticles; i++) {
            particles.push({
                x: width / 2, y: boxY,
                vx: (Math.random() - 0.5) * 15, 
                vy: -(Math.random() * 15 + 5), 
                size: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                life: 1.0, decay: 0.005 + Math.random() * 0.01 
            });
        }
    }, 100); 

    let fps = 30; 
    let now;
    let then = Date.now();
    let interval = 1000 / fps;
    let delta;

    function animate() {
        requestAnimationFrame(animate);
        
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);

            ctx.clearRect(0, 0, width, height);

            if (isBursting) {
                if (flashOpacity > 0) {
                    ctx.save();
                    ctx.globalAlpha = flashOpacity;
                    let vmin = Math.min(width, height) / 100;
                    let grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 40*vmin);
                    grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
                    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                    
                    flashOpacity -= 0.03; 
                }

                for (let i = particles.length - 1; i >= 0; i--) {
                    let p = particles[i];
                    p.vy += 0.2; 
                    p.x += p.vx;
                    p.y += p.vy;
                    p.rot += p.rotSpeed; 
                    p.life -= p.decay;

                    if (p.life <= 0) {
                        particles.splice(i, 1);
                        continue;
                    }

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot * Math.PI / 180);
                    ctx.globalAlpha = Math.max(0, p.life);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size/2, -p.size/3, p.size, p.size * 0.6);
                    ctx.restore();
                }
            }
        } 
    }
    animate();
}