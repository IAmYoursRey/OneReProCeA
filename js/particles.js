function initPoppingHearts() {
    const particles = [];
    const particleCount = 40; 

    function drawHeart(ctx, size, color) {
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight - size/2);
        ctx.bezierCurveTo(0, 0 - size/2, -size / 2, 0 - size/2, -size / 2, topCurveHeight - size/2);
        ctx.bezierCurveTo(-size / 2, size / 2 - size/2, 0, size * 0.8 - size/2, 0, size - size/2);
        ctx.bezierCurveTo(0, size * 0.8 - size/2, size / 2, size / 2 - size/2, size / 2, topCurveHeight - size/2);
        ctx.bezierCurveTo(size / 2, 0 - size/2, 0, 0 - size/2, 0, topCurveHeight - size/2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    class PoppingHeart {
        constructor() {
            this.reset();
            this.timer = Math.random() * 300; 
        }
        reset() {
            this.x = Math.random() * width; this.y = Math.random() * height;
            this.size = Math.random() * 20 + 10; 
            this.tilt = (Math.random() - 0.5) * 0.8; 
            this.ringRadius = 0; this.ringOpacity = 0; 
            this.ringGrowthRate = 1.2 + Math.random() * 0.8; 
            this.opacity = 0; this.phase = 'hidden'; this.timer = 0;
            this.popDelay = 150 + Math.random() * 300; 
        }
        update() {
            this.timer++;
            if (this.phase === 'hidden') {
                if (this.timer >= this.popDelay) { this.phase = 'appear'; this.timer = 0; }
            } else if (this.phase === 'appear') {
                this.opacity += 0.02; 
                if (this.opacity >= 0.8) { this.opacity = 0.8; this.phase = 'pop'; this.ringOpacity = 1.0; }
            } else if (this.phase === 'pop') {
                this.ringRadius += this.ringGrowthRate; 
                this.opacity -= 0.02; this.ringOpacity -= 0.015; 
                if (this.ringOpacity <= 0 && this.opacity <= 0) this.phase = 'disappear';
            } else if (this.phase === 'disappear') {
                this.reset();
            }
        }
        draw() {
            if (this.phase === 'hidden') return;
            ctx.save();
            ctx.translate(this.x, this.y); ctx.rotate(this.tilt);
            const pinkColor = '#ff6b81';
            if (this.opacity > 0) {
                ctx.globalAlpha = Math.max(0, this.opacity);
                drawHeart(ctx, this.size, pinkColor);
            }
            if (this.ringOpacity > 0 && this.phase === 'pop') {
                ctx.globalAlpha = Math.max(0, this.ringOpacity);
                ctx.beginPath();
                const outerRadius = this.size / 2 + this.ringRadius + 0.1;
                ctx.arc(0, 0, outerRadius, 0, Math.PI * 2); 
                let rippleGradient = ctx.createRadialGradient(0, 0, this.size / 2, 0, 0, outerRadius);
                rippleGradient.addColorStop(0, '#1c8488'); rippleGradient.addColorStop(1, '#ff6b81'); 
                ctx.strokeStyle = rippleGradient; ctx.lineWidth = 1.5; ctx.stroke();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new PoppingHeart());

    function animate() {
        ctx.clearRect(0, 0, width, height); 
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}