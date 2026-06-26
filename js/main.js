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

    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');

    if (startBtn && startScreen) {
        startBtn.addEventListener('click', () => {
            const docElm = document.documentElement;
            if (docElm.requestFullscreen) docElm.requestFullscreen();
            else if (docElm.webkitRequestFullscreen) docElm.webkitRequestFullscreen(); 
            else if (docElm.msRequestFullscreen) docElm.msRequestFullscreen(); 

            startScreen.classList.add('hidden');

            const cakeAudio = document.getElementById('cake-audio');
            if (cakeAudio) {
                cakeAudio.currentTime = 0; 
                cakeAudio.volume = 0.8;    
                cakeAudio.play().catch(e => console.log("Browser memblokir audio:", e));
            }

            setTimeout(() => {
                startCakeScene();
            }, 300);
        });
    } else {
        startCakeScene();
    }

    async function startCakeScene() {
        document.body.classList.add("not-loaded");
        await window.drawCakeAnimated();

        setTimeout(() => {
            isWaitingForClick = true;
        }, 1500);
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

        const cakeAudio = document.getElementById('cake-audio');
        if (cakeAudio) {
            let fadeOut = setInterval(() => {
                if (cakeAudio.volume > 0.05) {
                    cakeAudio.volume -= 0.05;
                } else {
                    clearInterval(fadeOut);
                    cakeAudio.pause();
                }
            }, 100); 
        }

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

        setTimeout(() => {
            if(typeof window.initPoppingHearts === "function") window.initPoppingHearts(); 
            if(typeof window.initSmartButterflies === "function") window.initSmartButterflies(); 

            const garden = document.querySelector('.flowers');
            if (garden) garden.classList.remove('garden-hidden');

            setTimeout(() => {
                const flowerAudio = document.getElementById('flower-audio');
                if (flowerAudio) {
                    flowerAudio.currentTime = 118; 
                    flowerAudio.volume = 0.8;
                    flowerAudio.play().catch(e => console.log("Browser memblokir audio:", e));
                }
            }, 1000); 

            // Aktifkan amplop surat
            setTimeout(() => {
                const envelopeWrapper = document.getElementById('envelope-wrapper');
                if (envelopeWrapper) envelopeWrapper.dataset.clickable = "true";
            }, 10500); 
            
        }, 3500); 

        const envelopeWrapper = document.getElementById('envelope-wrapper');
        const replayBtn = document.getElementById('replay-msg-btn'); 

        if (envelopeWrapper) {
            let currentPage = 0;
            
            function updatePages() {
                const pages = document.querySelectorAll('.paper-page');
                const isOpened = envelopeWrapper.classList.contains('is-opened');

                pages.forEach((page, index) => {
                    page.classList.remove('active-page');
                    
                    if (index < currentPage) {
                        page.style.transform = `translate(-40vmin, 5vmin) rotate(-10deg)`;
                        page.style.opacity = '0';
                        page.style.visibility = 'hidden'; 
                        page.style.zIndex = '11'; 
                        
                    } else if (index === currentPage) {
                        page.classList.add('active-page');
                        page.style.transform = `translate(0, 0)`; 
                        page.style.zIndex = '10';
                        page.style.opacity = '1';
                        page.style.visibility = 'visible';
                        
                    } else if (index > currentPage && index <= currentPage + 4) {
                        let offset = index - currentPage;
                        if (isOpened) {
                            page.style.transform = `translate(${offset * 1.5}vmin, ${offset * 1.5}vmin)`;
                            page.style.opacity = 1 - (offset * 0.15); 
                            page.style.visibility = 'visible';
                        } else {
                            page.style.transform = `translate(0, 0)`;
                            page.style.opacity = '0'; 
                            page.style.visibility = 'hidden';
                        }
                        page.style.zIndex = 10 - offset;
                        
                    } else {
                        page.style.transform = `translate(0, 0)`;
                        page.style.opacity = '0';
                        page.style.visibility = 'hidden';
                    }
                });
            }
            updatePages(); 

            let startX = 0; 

            envelopeWrapper.addEventListener('pointerdown', function(e) {
                if (this.dataset.clickable !== "true" || this.dataset.animating === "true") return;
                startX = e.clientX;
            });

            envelopeWrapper.addEventListener('pointerup', function(e) {
                if (this.dataset.clickable !== "true") return; 
                if (this.dataset.animating === "true") return;

                const pages = document.querySelectorAll('.paper-page');
                
                let endX = e.clientX;
                let deltaX = endX - startX; 

                if (!this.classList.contains('is-opened')) {
                    this.classList.add('is-opened'); 
                    document.body.classList.add('is-reading-letter'); 

                    setTimeout(() => document.body.classList.add('pause-1'), 50);   
                    setTimeout(() => document.body.classList.add('pause-2'), 250);  
                    setTimeout(() => document.body.classList.add('pause-3'), 450);  

                    this.dataset.animating = "true";
                    setTimeout(() => { 
                        this.dataset.animating = "false"; 
                        this.classList.add('is-readable');
                    }, 6000);

                    setTimeout(() => { updatePages(); }, 400);
                } else if (!this.classList.contains('is-hidden')) {
                    
                    if (deltaX > 50) {
                        if (currentPage > 0) {
                            currentPage--; 
                            updatePages();
                        }
                    } else {
                        if (currentPage < pages.length - 1) {
                            currentPage++; 
                            updatePages();
                        } else {
                            this.classList.add('is-hidden'); 
                            
                            document.body.classList.remove('is-reading-letter', 'pause-1', 'pause-2', 'pause-3');
                            if (replayBtn) replayBtn.classList.add('show-btn');
                            
                            const finalMsg = document.getElementById('final-sky-message');
                            if (finalMsg) finalMsg.classList.add('show-message');
                        } 
                    }
                }
            });

            if (replayBtn) {
                replayBtn.addEventListener('click', function() {
                    this.classList.remove('show-btn'); 
                    
                    const finalMsg = document.getElementById('final-sky-message');
                    if (finalMsg) finalMsg.classList.remove('show-message');
                    
                    currentPage = 0; 
                    updatePages();
                    
                    envelopeWrapper.classList.add('instant-read');
                    envelopeWrapper.classList.remove('is-hidden');
                    document.body.classList.add('is-reading-letter'); 
                    setTimeout(() => document.body.classList.add('pause-1'), 50);  
                    setTimeout(() => document.body.classList.add('pause-2'), 250);  
                    setTimeout(() => document.body.classList.add('pause-3'), 450);  
                    envelopeWrapper.dataset.animating = "false";
                });
            }
        }
    }
};