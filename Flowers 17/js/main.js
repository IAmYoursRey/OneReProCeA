var canvas, ctx, width, height;
var sleep;
var isWaitingForClick = false;
var isTransitioning = false;
var stopCakeAnimation = false;
var isBlownOut = false; 
var blowOutTime = 0;   

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
        window.blowOutTime = 0;   
    if(typeof window.initStarryNight === "function") window.initStarryNight();

    startCakeScene();

    async function startCakeScene() {
        document.body.classList.add("not-loaded");
        await window.drawCakeAnimated();
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
        window.isBlownOut = true;
        window.blowOutTime = Date.now(); 

        await window.sleep(800); 

        window.canvas.style.transition = "opacity 1.5s ease-in-out";
        window.canvas.style.opacity = "0";
        if(typeof window.revealNightSky === "function") window.revealNightSky();
        
        await window.sleep(1500); 

        window.stopCakeAnimation = true; 

        window.ctx.clearRect(0, 0, window.width, window.height);
        window.canvas.style.transition = "none";
        window.canvas.style.opacity = "1";
        
        document.body.classList.remove("not-loaded"); 

        if(typeof window.initPoppingHearts === "function") window.initPoppingHearts(); 
        if(typeof window.initSmartButterflies === "function") window.initSmartButterflies(); 
    }
};