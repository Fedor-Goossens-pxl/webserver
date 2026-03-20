// ===== ANIMATED RED WAVE BACKGROUND =====
// Vloeiende rode sinusgolven als geanimeerde achtergrond
// Past bij het portfolio-kleurenschema: #e63946 (rood) op donkere achtergrond

(function () {

  // ── 1. Canvas aanmaken en stylen ─────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.id = 'wave-bg';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    display: block;
  `;
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');

  // ── 2. Canvasgrootte aanpassen aan venster ────────────────────────────────
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ── 3. Golf-configuratie ──────────────────────────────────────────────────
  // Elke golf heeft: amplitude, frequentie, snelheid, verticale positie, opaciteit, lijndikte
  const waves = [
    // Brede, trage achtergrondgolven (laag)
    { amp: 38,  freq: 0.008, speed: 0.0005, yRatio: 0.20, opacity: 0.45, width: 1.5 },
    { amp: 44,  freq: 0.006, speed: 0.0004, yRatio: 0.38, opacity: 0.38, width: 1.2 },
    { amp: 50,  freq: 0.005, speed: 0.0003, yRatio: 0.60, opacity: 0.35, width: 1.8 },
    { amp: 36,  freq: 0.007, speed: 0.0006, yRatio: 0.78, opacity: 0.42, width: 1.3 },

    // Middelste golven
    { amp: 26,  freq: 0.012, speed: 0.0008, yRatio: 0.15, opacity: 0.55, width: 1.2 },
    { amp: 30,  freq: 0.010, speed: 0.0007, yRatio: 0.33, opacity: 0.50, width: 1.0 },
    { amp: 24,  freq: 0.014, speed: 0.0009, yRatio: 0.50, opacity: 0.55, width: 1.1 },
    { amp: 28,  freq: 0.011, speed: 0.0008, yRatio: 0.68, opacity: 0.48, width: 1.0 },
    { amp: 22,  freq: 0.013, speed: 0.0010, yRatio: 0.85, opacity: 0.52, width: 1.2 },

    // Fijnere, snellere voorgrondgolven
    { amp: 14,  freq: 0.020, speed: 0.0014, yRatio: 0.10, opacity: 0.65, width: 0.8 },
    { amp: 16,  freq: 0.018, speed: 0.0013, yRatio: 0.27, opacity: 0.60, width: 0.7 },
    { amp: 12,  freq: 0.022, speed: 0.0015, yRatio: 0.45, opacity: 0.68, width: 0.8 },
    { amp: 15,  freq: 0.019, speed: 0.0014, yRatio: 0.62, opacity: 0.58, width: 0.7 },
    { amp: 13,  freq: 0.021, speed: 0.0016, yRatio: 0.80, opacity: 0.62, width: 0.8 },
    { amp: 18,  freq: 0.016, speed: 0.0012, yRatio: 0.93, opacity: 0.55, width: 0.9 },

    // Extra subtiele horizontale lijnen voor diepte
    { amp:  6,  freq: 0.030, speed: 0.0020, yRatio: 0.05, opacity: 0.75, width: 0.5 },
    { amp:  8,  freq: 0.028, speed: 0.0018, yRatio: 0.55, opacity: 0.70, width: 0.5 },
    { amp:  5,  freq: 0.032, speed: 0.0022, yRatio: 0.97, opacity: 0.68, width: 0.5 },
  ];

  // Fase-offset per golf (willekeurig voor variatie bij laden)
  const phases = waves.map(() => Math.random() * Math.PI * 2);

  // ── 4. Render loop ────────────────────────────────────────────────────────
  let lastTime = 0;

  function draw(timestamp) {
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const W = canvas.width;
    const H = canvas.height;

    waves.forEach((wave, i) => {
      // Fase opschuiven
      phases[i] += wave.speed * delta;

      const y0 = wave.yRatio * H;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(230, 57, 70, ${wave.opacity})`;
      ctx.lineWidth = wave.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Golf tekenen als polyline langs de breedte
      const step = 4; // pixels per punt — balans tussen vloeiend en prestatie
      for (let x = 0; x <= W + step; x += step) {
        const y = y0 + Math.sin(x * wave.freq + phases[i]) * wave.amp;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

})();
