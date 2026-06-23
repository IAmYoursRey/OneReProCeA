window.initStarryNight = function() {
    const night = document.querySelector('.night');
    if (!night) return;
    night.innerHTML = '';
    
    night.style.opacity = "0"; 

    const colors = ['nebula-pink', 'nebula-blue', 'nebula-dark'];
    for (let i = 0; i < 3; i++) {
        let nebula = document.createElement('div');
        nebula.className = `nebula ${colors[i]}`;
        night.appendChild(nebula);
    }

    const isMobile = window.innerWidth <= 768;
    const totalStars = isMobile ? 70 : 250; 
    const starColors = ['#ffffff', '#ffffff', '#e0f0ff', '#ffddbb', '#ffb3c1']; 
    
    for (let i = 0; i < totalStars; i++) { 
        let star = document.createElement('div');
        star.className = 'bg-star';
        
        let color = starColors[Math.floor(Math.random() * starColors.length)];
        star.style.setProperty('--star-color', color);
        
        let endX = (Math.random() - 0.5) * 250; 
        let endY = -(Math.random() * 200) - 10; 
        
        star.style.setProperty('--tx', endX + 'vw');
        star.style.setProperty('--ty', endY + 'vh');
        
        let size = Math.random() * 2 + 0.5; 
        if (Math.random() > 0.98) {
            size += 3; 
        }
        
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        let burstDelay = 2.5 + (Math.random() * 1.5); 

        let speedA = isMobile ? 4 : 2.5; 
        let speedB = isMobile ? 8 : 4;   

        star.style.animation = `star-shoot ${speedA}s ${burstDelay}s cubic-bezier(0.25, 1, 0.5, 1) both, twinkle ${speedB}s ${burstDelay + 2.5}s infinite alternate ease-in-out`;
        
        night.appendChild(star);
    }

    const cancerHTML = `
        <div class="constellation-wrapper">
            <svg viewBox="0 0 200 200" class="cancer-svg">
                <line x1="100" y1="170" x2="100" y2="110" class="c-line" />
                <line x1="100" y1="110" x2="50" y2="90" class="c-line" />
                <line x1="100" y1="110" x2="130" y2="80" class="c-line" />
                <line x1="130" y1="80" x2="165" y2="30" class="c-line" />
                
                <circle cx="100" cy="170" r="2.5" class="c-star" /> 
                <circle cx="100" cy="110" r="3.0" class="c-star" /> 
                <circle cx="50" cy="90" r="2.5" class="c-star" />   
                <circle cx="130" cy="80" r="2.5" class="c-star" />  
                <circle cx="165" cy="30" r="3.0" class="c-star" />  
            </svg>
        </div>
    `;
    night.insertAdjacentHTML('beforeend', cancerHTML);
};

window.revealNightSky = function() {
    const night = document.querySelector('.night');
    if (!night) return;
    night.style.transition = "opacity 4s ease-in-out"; 
    night.style.opacity = "1";
};