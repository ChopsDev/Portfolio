// Cursor Trail Effect
let trailEnabled = false;
const trailParticles = [];

function toggleCursorTrail(enable) {
  trailEnabled = enable;
  if (!enable) {
    // Clean up existing particles
    trailParticles.forEach(p => p.remove());
    trailParticles.length = 0;
  }
}

document.addEventListener('mousemove', (e) => {
  if (!trailEnabled) return;

  const particle = document.createElement('div');
  particle.className = 'cursor-trail-particle';
  particle.style.left = e.clientX + 'px';
  particle.style.top = e.clientY + 'px';
  particle.style.setProperty('--dx', (Math.random() - 0.5) * 40 + 'px');
  particle.style.setProperty('--dy', (Math.random() - 0.5) * 40 + 'px');
  document.body.appendChild(particle);
  trailParticles.push(particle);

  setTimeout(() => {
    particle.remove();
    const idx = trailParticles.indexOf(particle);
    if (idx > -1) trailParticles.splice(idx, 1);
  }, 400);
});

// Click Confetti Effect - digital green particles
let confettiEnabled = false;
const confettiColors = ['#00ff00', '#00ff66', '#33ff33', '#00cc00', '#66ff66'];

function toggleClickConfetti(enable) {
  confettiEnabled = enable;
}

document.addEventListener('click', (e) => {
  if (!confettiEnabled) return;

  for (let i = 0; i < 15; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'click-confetti';
    confetti.style.left = e.clientX + 'px';
    confetti.style.top = e.clientY + 'px';
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.setProperty('--x', (Math.random() - 0.5) * 150 + 'px');
    confetti.style.setProperty('--y', (Math.random() - 0.5) * 150 + 'px');
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 500);
  }
});

// CRT Scanline Effect
let crtOverlay = null;
let crtAudioContext = null;
let crtOscillators = [];
let crtGainNode = null;
let crtGlitchInterval = null;

function createCRTHum() {
  if (crtAudioContext) return;

  crtAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  crtGainNode = crtAudioContext.createGain();
  crtGainNode.gain.value = 0;
  crtGainNode.connect(crtAudioContext.destination);

  // Low-pass filter to soften the hum
  const humFilter = crtAudioContext.createBiquadFilter();
  humFilter.type = 'lowpass';
  humFilter.frequency.value = 350;
  humFilter.Q.value = 0.7;
  humFilter.connect(crtGainNode);

  // LFO for subtle wobble effect
  const lfo = crtAudioContext.createOscillator();
  const lfoGain = crtAudioContext.createGain();
  lfo.type = 'sine';
  lfo.frequency.value = 0.3; // Slow wobble
  lfoGain.gain.value = 3; // Subtle frequency variation
  lfo.connect(lfoGain);
  lfo.start();
  crtOscillators.push(lfo);

  // 100Hz base hum - warmer frequency
  const hum100 = crtAudioContext.createOscillator();
  hum100.type = 'sine';
  hum100.frequency.value = 100;
  lfoGain.connect(hum100.frequency); // Add wobble
  const gain100 = crtAudioContext.createGain();
  gain100.gain.value = 0.18;
  hum100.connect(gain100);
  gain100.connect(humFilter);
  hum100.start();
  crtOscillators.push(hum100);

  // 200Hz harmonic - adds body
  const hum200 = crtAudioContext.createOscillator();
  hum200.type = 'sine';
  hum200.frequency.value = 200;
  const gain200 = crtAudioContext.createGain();
  gain200.gain.value = 0.1;
  hum200.connect(gain200);
  gain200.connect(humFilter);
  hum200.start();
  crtOscillators.push(hum200);

  // 50Hz sub bass - feels more like a real CRT
  const hum50 = crtAudioContext.createOscillator();
  hum50.type = 'sine';
  hum50.frequency.value = 50;
  const gain50 = crtAudioContext.createGain();
  gain50.gain.value = 0.12;
  hum50.connect(gain50);
  gain50.connect(humFilter);
  hum50.start();
  crtOscillators.push(hum50);

  // 150Hz mid tone for fullness
  const hum150 = crtAudioContext.createOscillator();
  hum150.type = 'sine';
  hum150.frequency.value = 150;
  const lfo2 = crtAudioContext.createOscillator();
  const lfo2Gain = crtAudioContext.createGain();
  lfo2.type = 'sine';
  lfo2.frequency.value = 0.5;
  lfo2Gain.gain.value = 2;
  lfo2.connect(lfo2Gain);
  lfo2Gain.connect(hum150.frequency);
  lfo2.start();
  crtOscillators.push(lfo2);
  const gain150 = crtAudioContext.createGain();
  gain150.gain.value = 0.08;
  hum150.connect(gain150);
  gain150.connect(humFilter);
  hum150.start();
  crtOscillators.push(hum150);
}

function toggleCRTEffect(enable) {
  if (enable) {
    if (!crtOverlay) {
      crtOverlay = document.createElement('div');
      crtOverlay.className = 'crt-overlay';
      document.body.appendChild(crtOverlay);
    }
    crtOverlay.classList.add('active');
    document.body.classList.add('crt-active');

    // Start CRT hum
    createCRTHum();
    if (crtAudioContext && crtAudioContext.state === 'suspended') {
      crtAudioContext.resume();
    }
    if (crtGainNode) {
      crtGainNode.gain.cancelScheduledValues(crtAudioContext.currentTime);
      crtGainNode.gain.setValueAtTime(crtGainNode.gain.value, crtAudioContext.currentTime);
      crtGainNode.gain.linearRampToValueAtTime(1, crtAudioContext.currentTime + 0.3);
    }

  } else {
    if (crtOverlay) crtOverlay.classList.remove('active');
    document.body.classList.remove('crt-active');

    // Fade out CRT hum
    if (crtGainNode && crtAudioContext) {
      crtGainNode.gain.cancelScheduledValues(crtAudioContext.currentTime);
      crtGainNode.gain.setValueAtTime(crtGainNode.gain.value, crtAudioContext.currentTime);
      crtGainNode.gain.linearRampToValueAtTime(0, crtAudioContext.currentTime + 0.3);
    }

    // Stop random glitches
    if (crtGlitchInterval) {
      clearTimeout(crtGlitchInterval);
      crtGlitchInterval = null;
    }
  }
}
