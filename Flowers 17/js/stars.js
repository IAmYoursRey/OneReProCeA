// file: js/stars.js

window.initStarryNight = function() {
    const night = document.querySelector('.night');
    if (!night) return;
    night.innerHTML = '';
    
    // Set menjadi transparan (0), TANPA transisi di awal
    night.style.opacity = "0"; 

    // ========================================================
    // 1. TAMBAHAN: MENCIPTAKAN EFEK NEBULA/AURORA BERGERAK
    // Kita membuat 3 lapisan warna blur yang luas untuk latar belakang
    // ========================================================
    const colors = ['nebula-blue', 'nebula-teal', 'nebula-purple'];
    for (let i = 0; i < 3; i++) {
        let nebula = document.createElement('div');
        nebula.className = `nebula ${colors[i]}`;
        night.appendChild(nebula);
    }

    // 2. Membangun 150 Bintang Latar Belakang (Seperti biasa)
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.className = 'bg-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        let size = Math.random() * 2 + 1; 
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = (Math.random() * 5) + 's'; 
        
        night.appendChild(star);
    }

    // 3. Melukis Rasi Bintang Cancer
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

// Fungsi ini dipanggil saat lilin ditiup
window.revealNightSky = function() {
    const night = document.querySelector('.night');
    if (!night) return;
    // Transisi baru diaktifkan di sini agar munculnya sangat smooth
    night.style.transition = "opacity 4s ease-in-out"; // Sedikit diperlama agar lebih dramatis
    night.style.opacity = "1";
};