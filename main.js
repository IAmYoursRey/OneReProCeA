onload = () => {
    const canvas = document.getElementById('rippleCanvas'); 
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const sleep = (ms) => ms <= 0 
        ? new Promise(resolve => requestAnimationFrame(resolve)) 
        : new Promise(resolve => setTimeout(resolve, ms));

    let isWaitingForClick = false;
    let isTransitioning = false;

    startCakeScene();

    async function startCakeScene() {
        document.body.classList.add("not-loaded");
        await drawCakeAnimated();

        await sleep(500); 
        ctx.font = `bold ${Math.min(20, width / 25)}px Arial`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.textAlign = "center";
        
        ctx.fillText("( Klik )", width / 2, height / 2 + (250 * Math.min(1, width / 600)));

        isWaitingForClick = true;
    }

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    function handleInteraction() {
        if (isWaitingForClick && !isTransitioning) {
            isTransitioning = true;
            isWaitingForClick = false;
            transitionToFlowers();
        }
    }

    async function transitionToFlowers() {
        canvas.style.transition = "opacity 1.5s ease-in-out";
        canvas.style.opacity = "0";
        await sleep(1500); 

        ctx.clearRect(0, 0, width, height);

        canvas.style.transition = "none";
        canvas.style.opacity = "1";
        
        document.body.classList.remove("not-loaded"); 
        initPoppingHearts(); 
    }

    async function drawCakeAnimated() {
        ctx.clearRect(0, 0, width, height);
        
        const scale = Math.min(1, width / 600); 
        const cx = width / 2;
        const cy = height / 2 + (100 * scale); 

        function tx(x) { return cx + (x * scale); }
        function ty(y) { return cy - (y * scale); } 
        function ex(w, deg) { return w * Math.cos(deg * Math.PI / 180); }
        function ey(h, deg) { return h * Math.sin(deg * Math.PI / 180); }

        async function drawTurtle(pts, strokecolor, fillcolor, drawSpeed = 4) {
            if (!pts || pts.length === 0) return;
            
            ctx.lineWidth = 3 * scale;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            
            let useStroke = (strokecolor && strokecolor !== "transparent");
            ctx.strokeStyle = useStroke ? strokecolor : fillcolor;
            ctx.fillStyle = fillcolor;
            
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            
            for (let i = 1; i < pts.length; i++) {
                ctx.lineTo(pts[i].x, pts[i].y);
                if (i % drawSpeed === 0) {
                    ctx.stroke();
                    await sleep(0); 
                }
            }
            ctx.stroke(); 
            
            if (fillcolor && fillcolor !== "transparent") {
                ctx.fill();
            }
            if (useStroke && strokecolor !== fillcolor) {
                ctx.stroke();
            }
        }

        async function animateEllipse(w, h, stroke, fill, yOff, step = 3) {
            let pts = [{x: tx(ex(w, 0)), y: ty(ey(h, 0) + yOff)}];
            for(let d=0; d<360; d+=step) pts.push({x: tx(ex(w, d)), y: ty(ey(h, d) + yOff)});
            pts.push({x: tx(ex(w, 0)), y: ty(ey(h, 0) + yOff)});
            await drawTurtle(pts, stroke, fill, 4);
        }

        await animateEllipse(150, 60, "white", "#c5e8c8", 0);

        let pts1 = [{x: tx(150), y: ty(0)}]; 
        for(let d=0; d<180; d+=3) pts1.push({x: tx(ex(150, -d)), y: ty(ey(70, -d))});
        for(let d=180; d<360; d+=3) pts1.push({x: tx(ex(150, d)), y: ty(ey(60, d))});
        await drawTurtle(pts1, "transparent", "#a3d2a7", 4);

        await animateEllipse(120, 48, "white", "#f7e8aa", 0);

        let pts2 = [{x: tx(120), y: ty(0)}];
        for(let d=0; d<540; d+=4) pts2.push({x: tx(ex(120, d)), y: ty(ey(48, d) + 70)});
        pts2.push({x: tx(-120), y: ty(0)});
        await drawTurtle(pts2, "#b0c4de", "#f7e8aa", 6);

        await animateEllipse(120, 48, "#f7e8aa", "#f7e8aa", 70);
        await animateEllipse(110, 44, "#fffceb", "#fffceb", 70);

        let pts3 = [{x: tx(120), y: ty(0)}];
        for(let d=0; d<180; d+=3) pts3.push({x: tx(ex(120, -d)), y: ty(ey(48, -d) + 10)});
        pts3.push({x: tx(-120), y: ty(0)});
        for(let d=180; d<360; d+=3) pts3.push({x: tx(ex(120, d)), y: ty(ey(48, d))});
        await drawTurtle(pts3, "transparent", "#87ceeb", 4);

        let pts4 = [{x: tx(120), y: ty(70)}];
        for(let i=0; i<1800; i+=20) pts4.push({x: tx(ex(120, 0.1*i)), y: ty(ey(-18, i) + 10)});
        pts4.push({x: tx(-120), y: ty(70)});
        for(let d=180; d<360; d+=3) pts4.push({x: tx(ex(120, d)), y: ty(ey(48, d) + 70)});
        await drawTurtle(pts4, "transparent", "#b0c4de", 6);

        let pts5 = [{x: tx(80), y: ty(70)}];
        pts5.push({x: tx(80), y: ty(120)});
        for(let d=0; d<180; d+=3) pts5.push({x: tx(ex(80, d)), y: ty(ey(32, d) + 120)});
        pts5.push({x: tx(-80), y: ty(70)});
        for(let d=180; d<360; d+=3) pts5.push({x: tx(ex(80, d)), y: ty(ey(32, d) + 70)});
        await drawTurtle(pts5, "transparent", "#8b5a2b", 4);

        await animateEllipse(80, 32, "#5e4425", "#5e4425", 120);
        await animateEllipse(70, 28, "#ffa500", "#ffa500", 120);

        let pts6 = [{x: tx(80), y: ty(120)}];
        for(let i=0; i<1800; i+=20) pts6.push({x: tx(ex(80, 0.1*i)), y: ty(ey(-12, i) + 80)});
        pts6.push({x: tx(-80), y: ty(120)});
        for(let d=180; d<360; d+=3) pts6.push({x: tx(ex(80, d)), y: ty(ey(32, d) + 120)});
        await drawTurtle(pts6, "transparent", "#5e4425", 6);

        const candles = [[60,120,50], [-60,120,50], [0,130,50], [30,110,50], [-30,110,50]];
        for (let c of candles) {
            let x_pos = c[0], y_base = c[1], h = c[2];
            let ptsC = [{x: tx(x_pos + 4), y: ty(y_base)}];
            for(let d=0; d<360; d+=15) ptsC.push({x: tx(ex(4, d) + x_pos), y: ty(ey(1, d) + y_base)});
            ptsC.push({x: tx(x_pos+4), y: ty(y_base+h)});
            for(let d=0; d<540; d+=15) ptsC.push({x: tx(ex(4, d) + x_pos), y: ty(ey(1, d) + y_base+h)});
            ptsC.push({x: tx(x_pos-4), y: ty(y_base)});
            ptsC.push({x: tx(x_pos+4), y: ty(y_base)});
            await drawTurtle(ptsC, "#66cccc", "#66cccc", 4);
            
            ctx.strokeStyle = "white"; ctx.lineWidth = 4 * scale;
            for(let i=1; i<=5; i++) {
                ctx.beginPath(); ctx.moveTo(tx(x_pos+4), ty(y_base + 10*i)); ctx.lineTo(tx(x_pos-4), ty(y_base + 10*i)); ctx.stroke();
                await sleep(10);
            }
            
            ctx.lineWidth = 3 * scale;
            ctx.beginPath(); ctx.moveTo(tx(x_pos), ty(y_base+h)); ctx.lineTo(tx(x_pos), ty(y_base+h+10)); ctx.stroke();
            await sleep(10);
            
            let ptsF = [{x: tx(ex(4, 0) + x_pos), y: ty(ey(10, 0) + y_base+h+20)}];
            for(let d=0; d<360; d+=20) ptsF.push({x: tx(ex(4, d) + x_pos), y: ty(ey(10, d) + y_base+h+20)});
            ptsF.push({x: tx(ex(4, 0) + x_pos), y: ty(ey(10, 0) + y_base+h+20)});
            await drawTurtle(ptsF, "transparent", "#ff6600", 2);
        }

        const confettiColors = ["#4CAF50", "#FFC107", "#2196F3", "#FF5722", "#9C27B0", "#3F51B5", "#00BCD4", "#009688"];
        const regions = [
            [80, -120, 120, -25, 30, 2, 5], [40, -90, 90, -35, 10, 2, 5],
            [40, -80, 80, 60, 90, 2, 5], [30, -50, 50, 45, 70, 2, 5],
            [50, -500, 500, 120, 300, 3, 5]
        ];
        
        let confettiBatch = [];
        regions.forEach(r => {
            for(let i=0; i<r[0]; i++) {
                let rx = Math.random()*(r[2]-r[1]) + r[1], ry = Math.random()*(r[4]-r[3]) + r[3], size = Math.random()*(r[6]-r[5]) + r[5];
                confettiBatch.push({x: tx(rx), y: ty(ry), size: size * scale, color: confettiColors[Math.floor(Math.random()*confettiColors.length)]});
            }
        });
        
        for(let i=0; i<confettiBatch.length; i++) {
            ctx.beginPath(); 
            ctx.arc(confettiBatch[i].x, confettiBatch[i].y, confettiBatch[i].size, 0, Math.PI*2);
            ctx.fillStyle = confettiBatch[i].color; 
            ctx.fill();
            if (i % 8 === 0) await sleep(5);
        }

        await sleep(300);
        ctx.font = `bold ${50 * scale}px 'Curlz MT', cursive, sans-serif`;
        ctx.fillStyle = "#ff6b81"; 
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 107, 129, 1)"; 
        ctx.textAlign = "center";
        ctx.fillText("Happy Birthday Test", tx(0), ty(270));
        ctx.shadowBlur = 0; 
    }

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
};