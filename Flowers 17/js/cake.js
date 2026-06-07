// file: js/cake.js

async function drawCakeAnimated() {
    window.ctx.clearRect(0, 0, window.width, window.height);
    
    const scale = Math.min(1, window.width / 600); 
    const cx = window.width / 2;
    const cy = window.height / 2 + (100 * scale); 

    function tx(x) { return cx + (x * scale); }
    function ty(y) { return cy - (y * scale); } 
    function ex(w, deg) { return w * Math.cos(deg * Math.PI / 180); }
    function ey(h, deg) { return h * Math.sin(deg * Math.PI / 180); }

    async function drawTurtle(pts, strokecolor, fillcolor, drawSpeed = 4) {
        if (!pts || pts.length === 0) return;
        window.ctx.lineWidth = 3 * scale;
        window.ctx.lineJoin = "round";
        window.ctx.lineCap = "round";
        let useStroke = (strokecolor && strokecolor !== "transparent");
        window.ctx.strokeStyle = useStroke ? strokecolor : fillcolor;
        window.ctx.fillStyle = fillcolor;
        window.ctx.beginPath();
        window.ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
            window.ctx.lineTo(pts[i].x, pts[i].y);
            if (i % drawSpeed === 0) { window.ctx.stroke(); await window.sleep(0); }
        }
        window.ctx.stroke(); 
        if (fillcolor && fillcolor !== "transparent") window.ctx.fill();
        if (useStroke && strokecolor !== fillcolor) window.ctx.stroke();
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
    pts2.push({x: tx(120), y: ty(70)});
    for(let d=0; d<=180; d+=3) pts2.push({x: tx(ex(120, d)), y: ty(ey(48, d) + 70)});
    pts2.push({x: tx(-120), y: ty(0)});
    for(let d=180; d<=360; d+=3) pts2.push({x: tx(ex(120, d)), y: ty(ey(48, d))});
    await drawTurtle(pts2, "#b0c4de", "#f7e8aa", 6);

    await animateEllipse(120, 48, "#f7e8aa", "#f7e8aa", 70);
    await animateEllipse(110, 44, "#fffceb", "#fffceb", 70);

    let pts3 = [{x: tx(120), y: ty(0)}];
    for(let d=0; d<=180; d+=3) pts3.push({x: tx(ex(120, -d)), y: ty(ey(48, -d) + 10)});
    pts3.push({x: tx(-120), y: ty(0)});
    for(let d=180; d<=360; d+=3) pts3.push({x: tx(ex(120, d)), y: ty(ey(48, d))});
    await drawTurtle(pts3, "transparent", "#87ceeb", 4);

    let pts4 = [{x: tx(120), y: ty(70)}];
    for(let d=0; d<=180; d+=2) pts4.push({x: tx(ex(120, d)), y: ty(35 - ey(48, d) + ey(-14, d*10))});
    pts4.push({x: tx(-120), y: ty(70)});
    for(let d=180; d<=360; d+=3) pts4.push({x: tx(ex(120, d)), y: ty(ey(48, d) + 70)});
    await drawTurtle(pts4, "transparent", "#b0c4de", 6);

    let pts5 = [{x: tx(80), y: ty(70)}];
    pts5.push({x: tx(80), y: ty(120)});
    for(let d=0; d<=180; d+=3) pts5.push({x: tx(ex(80, d)), y: ty(ey(32, d) + 120)});
    pts5.push({x: tx(-80), y: ty(70)});
    for(let d=180; d<=360; d+=3) pts5.push({x: tx(ex(80, d)), y: ty(ey(32, d) + 70)});
    await drawTurtle(pts5, "transparent", "#8b5a2b", 4);

    await animateEllipse(80, 32, "#5e4425", "#5e4425", 120);
    await animateEllipse(70, 28, "#ffa500", "#ffa500", 120);

    let pts6 = [{x: tx(80), y: ty(120)}];
    for(let d=0; d<=180; d+=2) pts6.push({x: tx(ex(80, d)), y: ty(95 - ey(32, d) + ey(-10, d*10))});
    pts6.push({x: tx(-80), y: ty(120)});
    for(let d=180; d<=360; d+=3) pts6.push({x: tx(ex(80, d)), y: ty(ey(32, d) + 120)});
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
        
        window.ctx.strokeStyle = "white"; window.ctx.lineWidth = 4 * scale;
        for(let i=1; i<=5; i++) {
            window.ctx.beginPath(); window.ctx.moveTo(tx(x_pos+4), ty(y_base + 10*i)); window.ctx.lineTo(tx(x_pos-4), ty(y_base + 10*i)); window.ctx.stroke();
            await window.sleep(10);
        }
        
        window.ctx.lineWidth = 3 * scale;
        window.ctx.beginPath(); window.ctx.moveTo(tx(x_pos), ty(y_base+h)); window.ctx.lineTo(tx(x_pos), ty(y_base+h+10)); window.ctx.stroke();
        await window.sleep(10);
    }

    const staticCakeCanvas = document.createElement('canvas');
    staticCakeCanvas.width = window.width;
    staticCakeCanvas.height = window.height;
    staticCakeCanvas.getContext('2d').drawImage(window.canvas, 0, 0);

    const confettiColors = ["#4CAF50", "#FFC107", "#2196F3", "#FF5722", "#9C27B0", "#3F51B5", "#00BCD4", "#009688"];
    let confettiBatch = [];
    
    for(let i = 0; i < 250; i++) {
        let size = Math.random() * 3 + 2; 
        confettiBatch.push({
            baseX: Math.random() * window.width, 
            y: Math.random() * window.height,    
            size: size * scale,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            vy: Math.random() * 1.5 + 0.5, sway: Math.random() * 20, swaySpeed: Math.random() * 0.05 + 0.02, angle: Math.random() * Math.PI * 2
        });
    }

    let fadeInAlpha = 0; 

    function animateIdle() {
        if (window.stopCakeAnimation) return; 
        
        window.ctx.clearRect(0, 0, window.width, window.height);
        window.ctx.drawImage(staticCakeCanvas, 0, 0);

        const time = Date.now() * 0.005;
        if (fadeInAlpha < 1) fadeInAlpha += 0.005; 

        let elapsed = window.isBlownOut ? (Date.now() - window.blowOutTime) : 0;

        // ==========================================
        // LOGIKA API LILIN (Menyala vs Padam Smooth)
        // ==========================================
        candles.forEach((c, index) => {
            let x_pos = c[0], y_base = c[1], h = c[2];
            let flicker = Math.sin(time + index * 2); 
            let fx = tx(x_pos) + flicker * scale * 1.5;
            let fy = ty(y_base + h + 20); 

            let fw = (4 + Math.random() * 0.5) * scale;
            let fh = (10 + Math.random() * 1.5) * scale;

            if (!window.isBlownOut) {
                // Api menyala normal
                window.ctx.beginPath(); window.ctx.ellipse(fx, fy, fw, fh, 0, 0, Math.PI*2); window.ctx.fillStyle = "#ff6600"; window.ctx.fill();
                window.ctx.beginPath(); window.ctx.ellipse(fx, fy + fh*0.2, fw*0.6, fh*0.6, 0, 0, Math.PI*2); window.ctx.fillStyle = "#ffcc00"; window.ctx.fill();
            } else {
                // Api Padam dengan Smooth (Mengecil dan Memudar)
                if (elapsed < 600) { // Efek berlangsung selama 0.6 detik
                    let shrinkProgress = 1 - (elapsed / 600); // Nilai dari 1 mengecil ke 0
                    
                    window.ctx.save();
                    window.ctx.globalAlpha = shrinkProgress; // Semakin transparan
                    
                    // Posisi Y api sedikit turun menyesuaikan ukurannya yang mengecil
                    window.ctx.beginPath(); 
                    window.ctx.ellipse(fx, fy + (fh * (1 - shrinkProgress) * 0.5), fw * shrinkProgress, fh * shrinkProgress, 0, 0, Math.PI*2); 
                    window.ctx.fillStyle = "#ff6600"; 
                    window.ctx.fill();
                    
                    window.ctx.beginPath(); 
                    window.ctx.ellipse(fx, fy + (fh * (1 - shrinkProgress) * 0.5) + (fh * shrinkProgress)*0.2, (fw*0.6) * shrinkProgress, (fh*0.6) * shrinkProgress, 0, 0, Math.PI*2); 
                    window.ctx.fillStyle = "#ffcc00"; 
                    window.ctx.fill();
                    
                    window.ctx.restore();
                }
            }
        });

        // ==========================================
        // KONFETI DAN TEKS
        // ==========================================
        window.ctx.globalAlpha = fadeInAlpha;
        confettiBatch.forEach(c => {
            c.y += c.vy; c.angle += c.swaySpeed; 
            let currentX = c.baseX + Math.sin(c.angle) * c.sway * scale; 
            if (c.y > window.height + 20) { c.y = -20; c.baseX = Math.random() * window.width; }
            window.ctx.beginPath(); window.ctx.arc(currentX, c.y, c.size, 0, Math.PI*2); window.ctx.fillStyle = c.color; window.ctx.fill();
        });

        window.ctx.font = `bold ${50 * scale}px 'Curlz MT', cursive, sans-serif`;
        window.ctx.fillStyle = "#ff6b81"; window.ctx.shadowBlur = 15; window.ctx.shadowColor = "rgba(255, 107, 129, 1)"; 
        window.ctx.textAlign = "center"; window.ctx.fillText("Happy Birthday Test", tx(0), ty(270)); window.ctx.shadowBlur = 0; 

        if (!window.isBlownOut) {
            let blink = Math.abs(Math.sin(time * 0.5));
            window.ctx.font = `bold ${Math.min(20, window.width / 25)}px Arial`;
            window.ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + blink * 0.7})`;
            window.ctx.fillText("( Klik Atau Sentuh Layar Untuk Meniup Lilin )", window.width / 2, window.height / 2 + (250 * Math.min(1, window.width / 600)));
        }
        
        window.ctx.globalAlpha = 1.0; 
        requestAnimationFrame(animateIdle);
    }
    animateIdle();
}