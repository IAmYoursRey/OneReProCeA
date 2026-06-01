// file: js/main.js
// Global variables agar bisa diakses oleh semua file JS lainnya
var canvas, ctx, width, height;
var sleep;
var isWaitingForClick = false;
var isTransitioning = false;
var stopCakeAnimation = false;
var isBlownOut = false; // VARIABEL BARU: Status lilin
var blowOutTime = 0;    // VARIABEL BARU: Waktu lilin ditiup

window.onload = () => {
    canvas = document.getElementById('rippleCanvas'); 
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    sleep = (ms) => ms <= 0 
        ? new Promise(resolve => requestAnimationFrame(resolve)) 
        : new Promise(resolve => setTimeout(resolve, ms));

    // 1. Mulai Scene Pertama (Memanggil fungsi dari cake.js)
    startCakeScene();

    async function startCakeScene() {
        document.body.classList.add("not-loaded");
        await window.drawCakeAnimated();
        isWaitingForClick = true;
    }

    // 2. Event Listener Klik
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    function handleInteraction() {
        if (isWaitingForClick && !isTransitioning) {
            isTransitioning = true;
            isWaitingForClick = false;
            transitionToFlowers();
        }
    }

    // 3. Animasi Transisi (Efek Tiup Lilin)
    async function transitionToFlowers() {
        // A. Matikan lilin (Efek Ditiup)
        window.isBlownOut = true;
        window.blowOutTime = Date.now(); // Catat waktunya untuk animasi asap

        // B. Tunggu 0.8 detik agar user bisa menikmati efek lilin mati
        await window.sleep(800); 

        // C. Layar mulai memudar
        window.canvas.style.transition = "opacity 1.5s ease-in-out";
        window.canvas.style.opacity = "0";
        
        await window.sleep(1500); 

        // D. Hentikan total memori animasi kue
        window.stopCakeAnimation = true; 

        window.ctx.clearRect(0, 0, window.width, window.height);
        window.canvas.style.transition = "none";
        window.canvas.style.opacity = "1";
        
        document.body.classList.remove("not-loaded"); 
        
        // Panggil fungsi dari particles.js & butterfly.js
        if(typeof window.initPoppingHearts === "function") window.initPoppingHearts(); 
        if(typeof window.initSmartButterflies === "function") window.initSmartButterflies(); 
    }
};