// file: js/stars.js

window.initStarryNight = function() {
    const night = document.querySelector('.night');
    night.innerHTML = '';
    night.style.opacity = "0"; // Layar malam awalnya gelap/transparan
    night.style.transition = "opacity 3s ease-in-out"; // Efek memudar muncul (fade-in)

    // 1. Membangun 150 Bintang Latar Belakang yang Acak & Berkelip
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.className = 'bg-star';
        // Posisi bintang tersebar acak di seluruh layar
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        let size = Math.random() * 2 + 1; // Ukuran bintang bervariasi 1px - 3px
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = (Math.random() * 5) + 's'; // Tempo kelip acak agar natural
        
        night.appendChild(star);
    }

    // 2. Melukis Rasi Bintang Cancer (Akurat Sesuai Referensi Gambar)
    const cancerHTML = `
        <div class="constellation-wrapper">
            <svg viewBox="0 0 200 200" class="cancer-svg">
                <line x1="100" y1="170" x2="100" y2="110" class="c-line" />
                <line x1="100" y1="110" x2="50" y2="90" class="c-line" />
                <line x1="100" y1="110" x2="130" y2="80" class="c-line" />
                <line x1="130" y1="80" x2="165" y2="30" class="c-line" />
                
                <circle cx="100" cy="170" r="2.5" class="c-star" /> <circle cx="100" cy="110" r="3.0" class="c-star" /> <circle cx="50" cy="90" r="2.5" class="c-star" />   <circle cx="130" cy="80" r="2.5" class="c-star" />  <circle cx="165" cy="30" r="3.0" class="c-star" />  </svg>
        </div>
    `;
    night.insertAdjacentHTML('beforeend', cancerHTML);
};

// Fungsi ini akan dipanggil saat lilin ditiup agar bintang perlahan muncul
window.revealNightSky = function() {
    document.querySelector('.night').style.opacity = "1";
};