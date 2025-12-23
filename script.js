// Console Easter Egg
console.log(`
%c  ____                        ____           _
 | __ ) _ __ _   _ _ __      / ___|__ _ _ __| |_ ___ _ __
 |  _ \\| '__| | | | '_ \\    | |   / _\` | '__| __/ _ \\ '__|
 | |_) | |  | |_| | | | |   | |__| (_| | |  | ||  __/ |
 |____/|_|   \\__, |_| |_|    \\____\\__,_|_|   \\__\\___|_|
             |___/
`, 'color: #888; font-family: monospace;');
console.log('%cChur bro you found the console', 'font-size: 14px; font-weight: bold;');
console.log('%cSince you\'re here... try out the Konami code', 'color: #666; font-style: italic;');

// Matrix Rain Easter Egg - reload 5 times to trigger
(function() {
  const reloadCount = parseInt(localStorage.getItem('reload-count') || '0') + 1;
  localStorage.setItem('reload-count', reloadCount);

  // Reset after 30 seconds of no reloads
  setTimeout(() => {
    localStorage.setItem('reload-count', '0');
  }, 30000);

  if (reloadCount >= 5) {
    localStorage.setItem('reload-count', '0');
    triggerMatrixRain();
  }
})();

function triggerMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  // Fade in
  canvas.style.opacity = '0';
  requestAnimationFrame(() => canvas.style.opacity = '1');

  // Track which columns are still active
  const activeColumns = Array(columns).fill(true);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      if (!activeColumns[i]) continue;

      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Bright green leading character with glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00ff00';
      ctx.fillStyle = '#7fff7f';
      ctx.fillText(char, x, y);

      // Dimmer green trail
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#00cc00';

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const interval = setInterval(draw, 33);

  // Stop after 10 seconds - columns fade individually over 2-4 seconds
  setTimeout(() => {
    for (let i = 0; i < columns; i++) {
      const delay = 2000 + Math.random() * 2000;
      setTimeout(() => {
        activeColumns[i] = false;
      }, delay);
    }

    // Remove canvas after all columns have stopped + trail fade time
    setTimeout(() => {
      clearInterval(interval);
      canvas.style.opacity = '0';
      setTimeout(() => canvas.remove(), 500);
    }, 5000);
  }, 10000);

  // Handle resize
  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', handleResize);

  // Cleanup resize listener when done
  setTimeout(() => {
    window.removeEventListener('resize', handleResize);
  }, 10500);
}

const htmlBody = document.querySelector("body")
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');
const leftHeading = leftPanel.querySelector('h1');
const rightHeading = rightPanel.querySelector('h1');
const leftContent = leftPanel.querySelector('.panel-content');
const rightContent = rightPanel.querySelector('.panel-content')
const middle = document.querySelector('.middle');

const HIDE_TEXT = "HIDE"

// UI Sound Effects System
let uiAudioContext = null;

function getUIAudioContext() {
  if (!uiAudioContext) {
    uiAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (uiAudioContext.state === 'suspended') {
    uiAudioContext.resume();
  }
  return uiAudioContext;
}

function playKonamiDeactivate() {
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // Power-down sequence - descending tones
  const frequencies = [1000, 800, 600, 450, 300, 150];
  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.07, now + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.09);
  });

  // Final low thump
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = 'sine';
  thump.frequency.setValueAtTime(80, now + 0.65);
  thump.frequency.exponentialRampToValueAtTime(30, now + 0.9);
  thumpGain.gain.setValueAtTime(0.15, now + 0.65);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
  thump.connect(thumpGain);
  thumpGain.connect(ctx.destination);
  thump.start(now + 0.65);
  thump.stop(now + 0.9);

  // Static fadeout
  const bufferSize = ctx.sampleRate * 0.3;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.setValueAtTime(4000, now + 0.5);
  noiseFilter.frequency.exponentialRampToValueAtTime(200, now + 0.8);
  noiseGain.gain.setValueAtTime(0.06, now + 0.5);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now + 0.5);
  noise.stop(now + 0.8);
  } catch (e) {}
}

function playCRTThemeToggle(toDark) {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // Electric switch click
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = 'square';
  click.frequency.setValueAtTime(toDark ? 400 : 600, now);
  click.frequency.setValueAtTime(toDark ? 200 : 800, now + 0.02);
  clickGain.gain.setValueAtTime(0.1, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  click.connect(clickGain);
  clickGain.connect(ctx.destination);
  click.start(now);
  click.stop(now + 0.04);

  // Power surge hum
  const hum = ctx.createOscillator();
  const humGain = ctx.createGain();
  hum.type = 'sawtooth';
  hum.frequency.setValueAtTime(toDark ? 80 : 120, now + 0.02);
  hum.frequency.exponentialRampToValueAtTime(toDark ? 50 : 150, now + 0.12);
  humGain.gain.setValueAtTime(0.06, now + 0.02);
  humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  hum.connect(humGain);
  humGain.connect(ctx.destination);
  hum.start(now + 0.02);
  hum.stop(now + 0.12);

  // Confirmation blip
  const blip = ctx.createOscillator();
  const blipGain = ctx.createGain();
  blip.type = 'square';
  blip.frequency.value = toDark ? 300 : 900;
  blipGain.gain.setValueAtTime(0.07, now + 0.08);
  blipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  blip.connect(blipGain);
  blipGain.connect(ctx.destination);
  blip.start(now + 0.08);
  blip.stop(now + 0.12);

  // Static crackle
  const bufferSize = ctx.sampleRate * 0.05;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 2000;
  noiseGain.gain.setValueAtTime(0.04, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.05);
  } catch (e) {}
}

function playCRTPageSwitch() {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // Channel change static burst
  const bufferSize = ctx.sampleRate * 0.12;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(3000, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(800, now + 0.1);
  noiseGain.gain.setValueAtTime(0.12, now);
  noiseGain.gain.setValueAtTime(0.08, now + 0.03);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.12);

  // Tuning blip
  const blip = ctx.createOscillator();
  const blipGain = ctx.createGain();
  blip.type = 'square';
  blip.frequency.setValueAtTime(600, now + 0.02);
  blip.frequency.setValueAtTime(900, now + 0.05);
  blip.frequency.setValueAtTime(750, now + 0.08);
  blipGain.gain.setValueAtTime(0.06, now + 0.02);
  blipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  blip.connect(blipGain);
  blipGain.connect(ctx.destination);
  blip.start(now + 0.02);
  blip.stop(now + 0.1);

  // Confirmation tone
  const confirm = ctx.createOscillator();
  const confirmGain = ctx.createGain();
  confirm.type = 'square';
  confirm.frequency.value = 1200;
  confirmGain.gain.setValueAtTime(0.05, now + 0.1);
  confirmGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  confirm.connect(confirmGain);
  confirmGain.connect(ctx.destination);
  confirm.start(now + 0.1);
  confirm.stop(now + 0.15);
  } catch (e) {}
}

function playCRTEscape() {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // Quick descending blip
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.1);

  // Static pop
  const bufferSize = ctx.sampleRate * 0.04;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 1500;
  noiseGain.gain.setValueAtTime(0.06, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.04);
  } catch (e) {}
}

function playPanelOpen() {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // CRT power-on sweep - rising square wave
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.setValueAtTime(0.06, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);

  // Digital blip accent
  const blip = ctx.createOscillator();
  const blipGain = ctx.createGain();
  blip.type = 'square';
  blip.frequency.setValueAtTime(1200, now + 0.05);
  blip.frequency.setValueAtTime(1400, now + 0.07);
  blip.frequency.setValueAtTime(1800, now + 0.09);
  blipGain.gain.setValueAtTime(0.04, now + 0.05);
  blipGain.gain.setValueAtTime(0.05, now + 0.07);
  blipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  blip.connect(blipGain);
  blipGain.connect(ctx.destination);
  blip.start(now + 0.05);
  blip.stop(now + 0.12);

  // Static burst
  const bufferSize = ctx.sampleRate * 0.08;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 2000;
  noiseGain.gain.setValueAtTime(0.04, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.08);
  } catch (e) {}
}

function playCRTClick() {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // CRT-style click - short electronic blip
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);

  // Add a tiny bit of noise for texture
  const bufferSize = ctx.sampleRate * 0.02;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();

  noise.buffer = noiseBuffer;
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 3000;
  noiseFilter.Q.value = 1;

  noiseGain.gain.setValueAtTime(0.07, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.02);
  } catch (e) {}
}

function playCRTCollapsible(opening) {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // Mechanical relay click
  const click1 = ctx.createOscillator();
  const click1Gain = ctx.createGain();
  click1.type = 'square';
  click1.frequency.setValueAtTime(opening ? 1500 : 1200, now);
  click1.frequency.setValueAtTime(opening ? 800 : 600, now + 0.015);
  click1Gain.gain.setValueAtTime(0.1, now);
  click1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
  click1.connect(click1Gain);
  click1Gain.connect(ctx.destination);
  click1.start(now);
  click1.stop(now + 0.03);

  // Second click for relay feel
  const click2 = ctx.createOscillator();
  const click2Gain = ctx.createGain();
  click2.type = 'square';
  click2.frequency.setValueAtTime(opening ? 2000 : 1000, now + 0.02);
  click2Gain.gain.setValueAtTime(0.08, now + 0.02);
  click2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  click2.connect(click2Gain);
  click2Gain.connect(ctx.destination);
  click2.start(now + 0.02);
  click2.stop(now + 0.04);

  // Tiny mechanical noise
  const bufferSize = ctx.sampleRate * 0.025;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 2000;
  noiseFilter.Q.value = 2;
  noiseGain.gain.setValueAtTime(0.04, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.025);
  } catch (e) {}
}

function playCRTType() {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // Randomize pitch slightly for variety
  const basePitch = 1800 + Math.random() * 400;

  // Key click
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = 'square';
  click.frequency.setValueAtTime(basePitch, now);
  click.frequency.exponentialRampToValueAtTime(basePitch * 0.5, now + 0.02);
  clickGain.gain.setValueAtTime(0.06, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  click.connect(clickGain);
  clickGain.connect(ctx.destination);
  click.start(now);
  click.stop(now + 0.025);

  // Tiny mechanical noise
  const bufferSize = ctx.sampleRate * 0.015;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 5000;
  noiseGain.gain.setValueAtTime(0.025, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.015);
  } catch (e) {}
}

function playCRTHover() {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // Quick electronic tick
  const tick = ctx.createOscillator();
  const tickGain = ctx.createGain();
  tick.type = 'square';
  tick.frequency.setValueAtTime(2400, now);
  tick.frequency.setValueAtTime(1800, now + 0.01);
  tickGain.gain.setValueAtTime(0.03, now);
  tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  tick.connect(tickGain);
  tickGain.connect(ctx.destination);
  tick.start(now);
  tick.stop(now + 0.025);

  // Tiny static
  const bufferSize = ctx.sampleRate * 0.015;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 4000;
  noiseGain.gain.setValueAtTime(0.015, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.015);
  } catch (e) {}
}

function playPanelClose() {
  if (!cheatsEnabled) return;
  try {
  const ctx = getUIAudioContext();
  const now = ctx.currentTime;

  // CRT power-down sweep - falling square wave
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(500, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.setValueAtTime(0.05, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.2);

  // Descending digital blips
  const blip = ctx.createOscillator();
  const blipGain = ctx.createGain();
  blip.type = 'square';
  blip.frequency.setValueAtTime(1600, now);
  blip.frequency.setValueAtTime(1200, now + 0.03);
  blip.frequency.setValueAtTime(800, now + 0.06);
  blipGain.gain.setValueAtTime(0.04, now);
  blipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  blip.connect(blipGain);
  blipGain.connect(ctx.destination);
  blip.start(now);
  blip.stop(now + 0.1);

  // Static crackle
  const bufferSize = ctx.sampleRate * 0.1;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noise.buffer = noiseBuffer;
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 1500;
  noiseFilter.Q.value = 0.5;
  noiseGain.gain.setValueAtTime(0.02, now + 0.05);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now + 0.05);
  noise.stop(now + 0.15);

  // Low thump at the end
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = 'sine';
  thump.frequency.setValueAtTime(50, now + 0.12);
  thump.frequency.exponentialRampToValueAtTime(30, now + 0.2);
  thumpGain.gain.setValueAtTime(0.08, now + 0.12);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  thump.connect(thumpGain);
  thumpGain.connect(ctx.destination);
  thump.start(now + 0.12);
  thump.stop(now + 0.22);
  } catch (e) {}
}

// Show middle content on page load
middle.classList.add('ready');

// Mark intro animations as complete after they finish
setTimeout(() => {
  middle.classList.add('intro-done');
}, 1000);

// Function to close all panels and reset
function closeAll(keepMiddleShrunk = false) {
  // Check if a panel was actually open before closing
  const wasOpen = leftPanel.classList.contains('expanded') || rightPanel.classList.contains('expanded');

  toggleScroll(false);

  leftPanel.classList.remove('expanded', 'expanding');
  rightPanel.classList.remove('expanded', 'expanding');
  leftHeading.classList.remove('slide-left');
  rightHeading.classList.remove('slide-right');
  leftContent.classList.remove('visible');
  rightContent.classList.remove('visible');

  if (!keepMiddleShrunk) {
    middle.classList.remove('shrink');
    // Delay showing content until layout has settled
    setTimeout(() => {
      if (!middle.classList.contains('shrink')) {
        middle.classList.add('ready');
        // Mark intro animations as complete after they finish
        setTimeout(() => {
          middle.classList.add('intro-done');
        }, 1000);
      }
    }, 150);

    // Play close sound only when actually closing (not switching panels)
    if (wasOpen) {
      playPanelClose();
    }
  }

  rightHeading.textContent = "OTHER"
  leftHeading.textContent = "GAME DEV"
}

// Expand the left panel and shrink the middle
function expandLeft() {
  middle.classList.remove('ready', 'intro-done');
  middle.classList.add('shrink');
  closeAll(true);
  toggleScroll(true);
  leftHeading.classList.add('slide-left');
  leftPanel.classList.add('expanding', 'expanded');

  // Hide hint for this panel after first interaction
  leftPanel.classList.add('hint-hidden');

  rightHeading.textContent = HIDE_TEXT
  leftContent.classList.add('visible');

  playPanelOpen();
}

// Expand the right panel and shrink the middle
function expandRight() {
  middle.classList.remove('ready', 'intro-done');
  middle.classList.add('shrink');
  closeAll(true);
  toggleScroll(true);
  rightHeading.classList.add('slide-right');
  rightPanel.classList.add('expanding', 'expanded');

  // Hide hint for this panel after first interaction
  rightPanel.classList.add('hint-hidden');

  leftHeading.textContent = HIDE_TEXT
  rightContent.classList.add('visible');

  playPanelOpen();
}

function toggleScroll(toggle){
    if (toggle){
        htmlBody.classList.remove("no-scroll");
        htmlBody.classList.add("allow-scroll");
    }else {
        htmlBody.classList.remove("allow-scroll");
        htmlBody.classList.add("no-scroll");
    }
}

// Clicking "Game Dev" (left panel)
leftPanel.addEventListener('click', (e) => {
  // Don't trigger panel expansion when clicking on content inside
  if (e.target.closest('.collapsible, .dropdown-header, .content')) return;

  if (rightPanel.classList.contains('expanded')) {
    closeAll();
  } else if (!leftPanel.classList.contains('expanded')) {
    expandLeft();
  }
});

// Clicking "Other Projects" (right panel)
rightPanel.addEventListener('click', (e) => {
  // Don't trigger panel expansion when clicking on content inside
  if (e.target.closest('.collapsible, .dropdown-header, .content')) return;

  if (leftPanel.classList.contains('expanded')) {
    closeAll();
  } else if (!rightPanel.classList.contains('expanded')) {
    expandRight();
  }
});

const coll = document.getElementsByClassName("collapsible");

// Toggle collapsible function
function toggleCollapsible(element) {
  element.classList.toggle("active");
  const isExpanded = element.classList.contains("active");
  element.setAttribute("aria-expanded", isExpanded);

  // Play relay click sound
  playCRTCollapsible(isExpanded);

  let content = element.nextElementSibling;

  while (content) {
    if (content.nodeName === "DIV" && content.classList.contains("content")) {
      content.classList.toggle("show");
      content.setAttribute("aria-hidden", !isExpanded);
      break;
    }
    content = content.nextElementSibling;
  }
}

for (let i = 0; i < coll.length; i++) {
  // Add accessibility attributes
  coll[i].setAttribute("role", "button");
  coll[i].setAttribute("tabindex", "0");
  coll[i].setAttribute("aria-expanded", "false");

  coll[i].addEventListener("click", function() {
    toggleCollapsible(this);
  });

  // Keyboard accessibility - Enter and Space to toggle
  coll[i].addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCollapsible(this);
    }
  });
}

// Dropdown functionality for section headers
const dropdownHeaders = document.getElementsByClassName("dropdown-header");

// Toggle dropdown function
function toggleDropdown(header) {
  header.classList.toggle("active");
  const isExpanded = header.classList.contains("active");
  header.setAttribute("aria-expanded", isExpanded);

  // Play relay click sound
  playCRTCollapsible(isExpanded);

  const targetId = header.getAttribute("data-target");
  const dropdownContent = document.getElementById(targetId);

  if (dropdownContent) {
    dropdownContent.classList.toggle("show");
  }
}

// Initialize all dropdowns as open by default
for (let i = 0; i < dropdownHeaders.length; i++) {
  const targetId = dropdownHeaders[i].getAttribute("data-target");
  const dropdownContent = document.getElementById(targetId);
  if (dropdownContent) {
    dropdownContent.classList.add("show");
    dropdownHeaders[i].classList.add("active");
    dropdownHeaders[i].setAttribute("aria-expanded", "true");
  }
}

// Add click and keyboard event listeners
for (let i = 0; i < dropdownHeaders.length; i++) {
  dropdownHeaders[i].addEventListener("click", function(e) {
    e.stopPropagation();
    this.blur();
    toggleDropdown(this);
  });

  // Keyboard accessibility - Enter and Space to toggle
  dropdownHeaders[i].addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(this);
    }
  });
}

// Easter egg quotes
const easterEggMessages = [
  "There's nothing out here.",
  "Looking for something?",
  "The void thanks you for visiting.",
  "Some things are better left unzoomed.",
  "You went too far.",
  "There’s no reason to be zoomed out here.",
  "This is not part of the experience.",
  "You found the quiet place.",
  "You’re not meant to be out this far.",
];

let easterEggOverlay = null;
let easterEggShown = false;
let lastWidth = window.innerWidth;

function createEasterEggOverlay() {
  if (easterEggOverlay) return;

  easterEggOverlay = document.createElement('div');
  easterEggOverlay.id = 'zoom-easter-egg';
  easterEggOverlay.innerHTML = `
    <div class="easter-egg-content">
      <p class="easter-egg-message">${easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)]}</p>
      <p class="easter-egg-hint">Zoom in to return</p>
    </div>
  `;
  document.body.appendChild(easterEggOverlay);
}

function triggerReactivePulse() {
  if (!easterEggOverlay) return;
  const message = easterEggOverlay.querySelector('.easter-egg-message');

  easterEggOverlay.classList.remove('reactive');
  void easterEggOverlay.offsetWidth;
  easterEggOverlay.classList.add('reactive');

  if (message) {
    message.classList.remove('reactive');
    void message.offsetWidth;
    message.classList.add('reactive');
  }
}

function checkZoomLevel() {
  // At 30% zoom, innerWidth becomes ~3.3x larger
  // Your screen: 1920px at 100% → 6400px at 30%
  // Trigger when innerWidth > 3800 (catches ~50% zoom on 1920px screens)
  const isZoomedWayOut = window.innerWidth > 3800;
  const widthChanged = Math.abs(window.innerWidth - lastWidth) > 50;

  // Don't show on contact page (form inputs need zoom)
  const activePage = document.querySelector('.page.active');
  const isContactPage = activePage && activePage.dataset.page === 'contact';

  if (isZoomedWayOut && !easterEggShown && !isContactPage) {
    createEasterEggOverlay();
    // Force reflow to enable fade-in transition on first show
    void easterEggOverlay.offsetWidth;
    easterEggOverlay.classList.add('visible');
    easterEggShown = true;
  } else if ((!isZoomedWayOut || isContactPage) && easterEggShown) {
    if (easterEggOverlay) {
      easterEggOverlay.classList.remove('visible');
    }
    easterEggShown = false;
  } else if (isZoomedWayOut && easterEggShown && widthChanged && !isContactPage) {
    triggerReactivePulse();
  }

  lastWidth = window.innerWidth;
}

// Check zoom on resize (debounced for performance)
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkZoomLevel, 30);
});

// Initial check
checkZoomLevel();

// Escape key to close panels (but not if lightbox is open)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Skip if lightbox is open - let the lightbox handler deal with it
    if (document.querySelector('.lightbox-overlay.visible')) {
      playCRTEscape();
      return;
    }

    if (leftPanel.classList.contains('expanded') || rightPanel.classList.contains('expanded')) {
      playCRTEscape();
      closeAll();
    }
  }
});

// Add keyboard support for panels
leftPanel.setAttribute('tabindex', '0');
rightPanel.setAttribute('tabindex', '0');

leftPanel.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target.closest('.collapsible, .dropdown-header, .content')) return;
    e.preventDefault();
    if (rightPanel.classList.contains('expanded')) {
      closeAll();
    } else if (!leftPanel.classList.contains('expanded')) {
      expandLeft();
    }
  }
});

rightPanel.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target.closest('.collapsible, .dropdown-header, .content')) return;
    e.preventDefault();
    if (leftPanel.classList.contains('expanded')) {
      closeAll();
    } else if (!rightPanel.classList.contains('expanded')) {
      expandRight();
    }
  }
});

// Dark mode toggle for middle section
const themeToggle = document.querySelector('.theme-toggle');

// Check for saved preference or system preference
function getPreferredTheme() {
  const saved = localStorage.getItem('middle-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  if (theme === 'dark') {
    middle.classList.add('dark-mode');
    document.body.classList.add('middle-dark');
  } else {
    middle.classList.remove('dark-mode');
    document.body.classList.remove('middle-dark');
  }
  localStorage.setItem('middle-theme', theme);
}

// Initialize theme and remove pending class
setTheme(getPreferredTheme());
document.documentElement.classList.remove('middle-dark-pending');

// Toggle on click
themeToggle.addEventListener('click', () => {
  const isDark = middle.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
  playCRTThemeToggle(!isDark);
});

// Disco mode easter egg - click theme toggle 10 times rapidly
let discoClickCount = 0;
let discoClickTimer = null;
let discoActive = false;

themeToggle.addEventListener('click', () => {
  if (discoActive) return;

  discoClickCount++;

  clearTimeout(discoClickTimer);
  discoClickTimer = setTimeout(() => {
    discoClickCount = 0;
  }, 500);

  if (discoClickCount >= 10) {
    discoClickCount = 0;
    triggerDiscoMode();
  }
});

function triggerDiscoMode() {
  discoActive = true;

  const discoOverlay = document.createElement('div');
  discoOverlay.className = 'disco-overlay';
  document.body.appendChild(discoOverlay);

  const colors = [
    '#ff0055', '#ff00ff', '#00ffff', '#00ff00',
    '#ffff00', '#ff8800', '#0088ff', '#ff0055'
  ];
  let colorIndex = 0;
  let beatCount = 0;
  const totalBeats = 24;

  const discoInterval = setInterval(() => {
    discoOverlay.style.background = colors[colorIndex % colors.length];
    colorIndex++;
    beatCount++;

    // Alternate theme rapidly
    if (beatCount % 2 === 0) {
      middle.classList.toggle('dark-mode');
    }

    if (beatCount >= totalBeats) {
      clearInterval(discoInterval);
      discoOverlay.classList.add('fade-out');
      setTimeout(() => {
        discoOverlay.remove();
        setTheme(getPreferredTheme());
        discoActive = false;
      }, 500);
    }
  }, 150);
}

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('middle-theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Page Navigation
const pageNav = document.querySelector('.page-nav');
const pages = document.querySelectorAll('.page');
const pageBtns = document.querySelectorAll('.page-btn');

function switchPage(targetPage) {
  const currentPage = document.querySelector('.page.active');
  const targetEl = document.querySelector(`.page[data-page="${targetPage}"]`);

  if (!targetEl || currentPage === targetEl) return;

  // Play page switch sound
  playCRTPageSwitch();

  // Switch active states
  currentPage.classList.remove('active');
  targetEl.classList.add('active');

  // Update button states
  pageBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetPage);
  });
}

// Event delegation for page buttons
pageNav.addEventListener('click', (e) => {
  const btn = e.target.closest('.page-btn');
  if (btn && btn.dataset.target) {
    switchPage(btn.dataset.target);
  }
});

// Konami Code Easter Egg
const konamiSequence = [];
const konamiCode = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a';
let cheatsEnabled = false;

document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
  if (konamiSequence.length > 10) konamiSequence.shift();

  if (konamiSequence.join(',') === konamiCode) {
    konamiSequence.length = 0;
    toggleKonamiCheats();
  }
});

function decryptText(element, finalText, onComplete) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>';
  const duration = 1500;
  const startTime = Date.now();

  function scramble() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    let result = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ') {
        result += ' ';
      } else if (progress > (i / finalText.length) * 0.8 + 0.2) {
        result += finalText[i];
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = result;

    if (progress < 1) {
      requestAnimationFrame(scramble);
    } else {
      element.textContent = finalText;
      if (onComplete) onComplete();
    }
  }

  scramble();
}

function playErrorBeep() {
  try {
    const ctx = getUIAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.setValueAtTime(400, now + 0.05);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {}
}

function playWarningBeep() {
  try {
    const ctx = getUIAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(600, now + 0.08);
    osc.frequency.setValueAtTime(400, now + 0.16);
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {}
}

function playCriticalBeep() {
  try {
    const ctx = getUIAudioContext();
    const now = ctx.currentTime;

    // Rapid beeping
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 1000;
      gain.gain.setValueAtTime(0.04, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.05);
    }
  } catch (e) {}
}

function playCorruptionNoise() {
  try {
    const ctx = getUIAudioContext();
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.8;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    noise.buffer = noiseBuffer;
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2000, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(500, now + 0.8);
    noiseGain.gain.setValueAtTime(0.06, now);
    noiseGain.gain.linearRampToValueAtTime(0.03, now + 0.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.8);

    // Glitchy tones
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 200 + Math.random() * 800;
      const startTime = now + i * 0.15 + Math.random() * 0.05;
      gain.gain.setValueAtTime(0.025, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.08);
    }
  } catch (e) {}
}

function playShutdownSound() {
  try {
    const ctx = getUIAudioContext();
    const now = ctx.currentTime;

    // Power down sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);

    // Final thump
    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(60, now + 0.3);
    thump.frequency.exponentialRampToValueAtTime(20, now + 0.6);
    thumpGain.gain.setValueAtTime(0.08, now + 0.3);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    thump.connect(thumpGain);
    thumpGain.connect(ctx.destination);
    thump.start(now + 0.3);
    thump.stop(now + 0.6);
  } catch (e) {}
}

function corruptedShutdown(container, overlay, onComplete) {
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`█▓▒░╔╗╚╝║═';

  container.innerHTML = '';
  container.style.textAlign = 'left';
  container.style.fontFamily = 'monospace';
  container.style.fontSize = 'clamp(0.8rem, 2vw, 1rem)';

  const lines = [];

  function addLine(text, color = '#f00', isError = true) {
    const line = document.createElement('div');
    line.textContent = text;
    line.style.color = color;
    line.style.marginBottom = '0.3rem';
    line.style.textShadow = isError ? '0 0 5px rgba(255, 0, 0, 0.5)' : 'none';
    container.appendChild(line);
    lines.push(line);
    return line;
  }

  function corruptLine(line) {
    const original = line.textContent;
    let corrupted = '';
    for (let i = 0; i < original.length; i++) {
      if (Math.random() > 0.5) {
        corrupted += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        corrupted += original[i];
      }
    }
    line.textContent = corrupted;
  }

  function corruptAllLines() {
    lines.forEach(line => {
      if (Math.random() > 0.3) corruptLine(line);
    });
  }

  function screenFlicker() {
    overlay.style.opacity = Math.random() > 0.5 ? '1' : '0.7';
  }

  // Timeline with synced audio
  setTimeout(() => { addLine('ERROR: CHEAT_MODULE failed to respond'); playErrorBeep(); }, 0);
  setTimeout(() => { addLine('ERROR: Memory corruption detected at 0x7F3A'); playErrorBeep(); }, 200);
  setTimeout(() => { addLine('WARNING: Unstable state detected'); playWarningBeep(); }, 400);
  setTimeout(() => { addLine('ERROR: Stack overflow in EFFECT_HANDLER'); playErrorBeep(); }, 600);
  setTimeout(() => { addLine('CRITICAL: System integrity compromised'); playCriticalBeep(); }, 800);

  // Start corruption with noise
  let corruptInterval;
  let flickerInterval;

  setTimeout(() => {
    addLine('ATTEMPTING RECOVERY...', '#ff0', false);
    playCorruptionNoise();
    corruptInterval = setInterval(corruptAllLines, 80);
    flickerInterval = setInterval(screenFlicker, 100);
  }, 1000);

  setTimeout(() => { addLine('█▓▒░ RECOVERY FAILED ░▒▓█', '#f00'); playCriticalBeep(); }, 1300);

  setTimeout(() => {
    addLine('FORCING SHUTDOWN...', '#f80', false);
    playWarningBeep();
  }, 1600);

  // Final corruption burst
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      addLine(Array(30).fill().map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)]).join(''), '#600');
    }
  }, 1900);

  // Clear and show final message
  setTimeout(() => {
    clearInterval(corruptInterval);
    clearInterval(flickerInterval);
    overlay.style.opacity = '1';
    playShutdownSound();

    container.innerHTML = '';
    container.style.textAlign = 'center';

    const finalLine = document.createElement('div');
    finalLine.textContent = 'SYSTEM TERMINATED';
    finalLine.style.color = '#f00';
    finalLine.style.fontSize = 'clamp(1.5rem, 5vw, 2.5rem)';
    finalLine.style.textShadow = '0 0 20px rgba(255, 0, 0, 0.8)';
    container.appendChild(finalLine);

    if (onComplete) onComplete();
  }, 2300);
}

function toggleKonamiCheats() {
  cheatsEnabled = !cheatsEnabled;

  // Show overlay
  const overlay = document.createElement('div');
  overlay.className = 'konami-overlay';

  if (cheatsEnabled) {
    // Activation - decrypt animation
    overlay.innerHTML = `
      <div class="konami-content">
        <div class="konami-text"></div>
        <p class="konami-sub">// nice one</p>
      </div>
    `;

    document.body.appendChild(overlay);

    const textElement = overlay.querySelector('.konami-text');
    const subElement = overlay.querySelector('.konami-sub');

    decryptText(textElement, 'CHEAT ACTIVATED', () => {
      subElement.classList.add('visible');
    });

    setTimeout(() => {
      overlay.classList.add('fade-out');
      setTimeout(() => overlay.remove(), 500);
    }, 2500);
  } else {
    // Deactivation - corrupted shutdown
    overlay.innerHTML = `<div class="konami-content"></div>`;

    document.body.appendChild(overlay);

    const content = overlay.querySelector('.konami-content');

    corruptedShutdown(content, overlay, () => {
      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 500);
      }, 1000);
    });
  }

  // Toggle all cheats
  toggleCursorTrail(cheatsEnabled);
  toggleClickConfetti(cheatsEnabled);
  toggleCRTEffect(cheatsEnabled);
  if (typeof Terminal !== 'undefined') Terminal.showAccessButton(cheatsEnabled);

  // =====================================================
  // ADD MORE CHEATS HERE:
  // Just call your function with cheatsEnabled, e.g.:
  // toggleBigHeadMode(cheatsEnabled);
  // toggleRainbowText(cheatsEnabled);
  // =====================================================
}

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

// Image Lightbox

let lightboxOverlay = null;
let currentGallery = [];
let currentIndex = 0;

function createLightbox() {
  if (lightboxOverlay) return;

  lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox"></button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous image"></button>
    <img src="" alt="">
    <button class="lightbox-nav lightbox-next" aria-label="Next image"></button>
    <span class="lightbox-counter"></span>
    <span class="lightbox-hint">Click anywhere or press ESC to close</span>
  `;
  document.body.appendChild(lightboxOverlay);

  // Close on overlay click
  lightboxOverlay.addEventListener('click', closeLightbox);

  // Prevent closing when clicking the image or nav buttons
  lightboxOverlay.querySelector('img').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Navigation buttons
  lightboxOverlay.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  lightboxOverlay.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });
}

function updateLightboxImage() {
  const img = lightboxOverlay.querySelector('img');
  const counter = lightboxOverlay.querySelector('.lightbox-counter');
  const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
  const nextBtn = lightboxOverlay.querySelector('.lightbox-next');

  const currentImg = currentGallery[currentIndex];
  img.src = currentImg.src;
  img.alt = currentImg.alt || '';

  // Update counter
  if (currentGallery.length > 1) {
    counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    counter.style.display = '';
    prevBtn.style.display = '';
    nextBtn.style.display = '';

    // Disable buttons at ends
    prevBtn.classList.toggle('disabled', currentIndex === 0);
    nextBtn.classList.toggle('disabled', currentIndex === currentGallery.length - 1);
  } else {
    // Single image - hide nav
    counter.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
}

function navigateLightbox(direction) {
  const newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < currentGallery.length) {
    currentIndex = newIndex;
    updateLightboxImage();
  }
}

function openLightbox(img) {
  createLightbox();

  // Find gallery (all lightbox images in the same parent container)
  const parent = img.closest('.content') || img.parentElement;
  currentGallery = Array.from(parent.querySelectorAll('.lightbox-img'));
  currentIndex = currentGallery.indexOf(img);

  updateLightboxImage();

  // Force reflow for transition
  void lightboxOverlay.offsetWidth;
  lightboxOverlay.classList.add('visible');

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxOverlay) return;

  lightboxOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

// Initialize lightbox for all images with the class
function initLightbox() {
  document.querySelectorAll('.lightbox-img').forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img);
    });
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightboxOverlay?.classList.contains('visible')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  }
});

// Initialize on load
initLightbox();

// Name click easter egg (Rick Roll)
const nameHeading = document.querySelector('.landing-left h1');
let nameClickCount = 0;
let nameClickTimer = null;

nameHeading.addEventListener('click', () => {
  nameClickCount++;

  // Reset count if too slow between clicks
  clearTimeout(nameClickTimer);
  nameClickTimer = setTimeout(() => {
    nameClickCount = 0;
  }, 800);

  if (nameClickCount >= 3) {
    nameClickCount = 0;
    window.open('https://youtu.be/23e4r2VL0gY?si=EyRaLlF4zjYuOI_f', '_blank');
  }
});

// CRT click sound on any click (only in cheat mode)
document.addEventListener('click', () => {
  if (!cheatsEnabled) return;
  playCRTClick();
});

// CRT hover sound on interactive elements (only in cheat mode)
document.addEventListener('mouseover', (e) => {
  if (!cheatsEnabled) return;

  const interactive = e.target.closest('a, button, .collapsible, .dropdown-header, .page-btn, .contact-link, .game-link, .theme-toggle, .lightbox-img, .panel');
  if (interactive && !interactive.dataset.hovered) {
    interactive.dataset.hovered = 'true';
    playCRTHover();
  }
});

document.addEventListener('mouseout', (e) => {
  const interactive = e.target.closest('a, button, .collapsible, .dropdown-header, .page-btn, .contact-link, .game-link, .theme-toggle, .lightbox-img, .panel');
  if (interactive) {
    delete interactive.dataset.hovered;
  }
});

// CRT typing sound on input fields (only in cheat mode)
document.addEventListener('input', (e) => {
  if (!cheatsEnabled) return;

  const tagName = e.target.tagName.toLowerCase();
  if (tagName === 'input' || tagName === 'textarea') {
    playCRTType();
  }
}, true);

// =====================================================
// SECRET TERMINAL
// =====================================================

const Terminal = {
  overlay: null,
  output: null,
  input: null,
  history: [],
  historyIndex: -1,
  accessBtn: null,

  // =====================================================
  // ADD YOUR COMMANDS HERE - Easy to extend!
  // Format: 'commandname': { description: '...', action: (args) => '...' }
  // Return a string, or use Terminal.print() for colored output
  // =====================================================
  commands: {
    help: {
      description: 'Show available commands',
      action: () => {
        let output = 'Available commands:\n\n';
        for (const [name, cmd] of Object.entries(Terminal.commands)) {
          output += `  ${name.padEnd(12)} - ${cmd.description}\n`;
        }
        output += '\nType a command and press Enter.';
        return output;
      }
    },

    clear: {
      description: 'Clear the terminal',
      action: () => {
        Terminal.output.innerHTML = '';
        return null;
      }
    },

    about: {
      description: 'About this terminal',
      action: () => {
        return `SECRET TERMINAL v1.0
--------------------
You found the secret terminal!
This is a hidden feature unlocked by the Konami Code.

Type 'help' to see available commands.`;
      }
    },

    whoami: {
      description: 'Display current user',
      action: () => 'guest@bryncarter.dev'
    },

    date: {
      description: 'Show current date/time',
      action: () => new Date().toString()
    },

    echo: {
      description: 'Echo a message',
      action: (args) => args.join(' ') || ''
    },

    games: {
      description: 'List my games',
      action: () => {
        return `MY GAMES
--------
1. Stepping Stones  - Minimalist 2D platformer
2. Tilting Game     - Physics-based labyrinth
3. Asteroid Overcharge - Roguelike shooter
4. Sync Or Sink     - Rhythm game (team project)

Type 'open <number>' to visit the game page.`;
      }
    },

    open: {
      description: 'Open a game page (1-4)',
      action: (args) => {
        const urls = {
          '1': 'https://chopsdev.itch.io/stepping-stones',
          '2': 'https://chopsdev.itch.io/some-tilting-game',
          '3': 'https://chopsdev.itch.io/asteroid-overcharge',
          '4': 'https://kaylienufo.itch.io/sync-or-sink'
        };
        const num = args[0];
        if (urls[num]) {
          window.open(urls[num], '_blank');
          return `Opening game ${num}...`;
        }
        return 'Usage: open <1-4>';
      }
    },

    socials: {
      description: 'Show social links',
      action: () => {
        return `SOCIALS
-------
GitHub:  github.com/ChopsDev
Itch.io: chopsdev.itch.io
YouTube: youtube.com/@chops.
Email:   contact@chopsdev.com`;
      }
    },

    matrix: {
      description: 'Enter the matrix',
      action: () => {
        triggerMatrixRain();
        Terminal.close();
        return null;
      }
    },

    exit: {
      description: 'Close the terminal',
      action: () => {
        setTimeout(() => Terminal.close(), 100);
        return 'Goodbye...';
      }
    },

    // =====================================================
    // ADD MORE COMMANDS BELOW:
    //
    // example: {
    //   description: 'Example command',
    //   action: (args) => {
    //     return 'This is the output';
    //   }
    // },
    // =====================================================
  },

  init() {
    // Create access button
    this.accessBtn = document.createElement('button');
    this.accessBtn.className = 'terminal-access-btn';
    this.accessBtn.textContent = '> Terminal';
    this.accessBtn.addEventListener('click', () => this.open());
    document.body.appendChild(this.accessBtn);

    // Create terminal overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'terminal-overlay';
    this.overlay.innerHTML = `
      <div class="terminal-container">
        <div class="terminal-header">
          <span>SECRET TERMINAL - bryncarter.dev</span>
          <button class="terminal-close">&times;</button>
        </div>
        <div class="terminal-body">
          <div class="terminal-output"></div>
          <div class="terminal-input-line">
            <span class="terminal-prompt">$</span>
            <input type="text" class="terminal-input" placeholder="Type 'help' for commands..." autofocus>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.output = this.overlay.querySelector('.terminal-output');
    this.input = this.overlay.querySelector('.terminal-input');

    // Event listeners
    this.overlay.querySelector('.terminal-close').addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.execute(this.input.value);
        this.input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        } else {
          this.historyIndex = -1;
          this.input.value = '';
        }
      } else if (e.key === 'Escape') {
        this.close();
      }
    });

    // Show welcome message
    this.print('Welcome to the Secret Terminal!', 'info');
    this.print('Type "help" to see available commands.\n', 'response');
  },

  open() {
    this.overlay.classList.add('visible');
    this.input.focus();
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.overlay.classList.remove('visible');
    document.body.style.overflow = '';
  },

  print(text, className = 'response') {
    const line = document.createElement('div');
    line.className = className;
    line.textContent = text;
    this.output.appendChild(line);
    this.output.parentElement.scrollTop = this.output.parentElement.scrollHeight;
  },

  execute(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add to history
    this.history.push(trimmed);
    this.historyIndex = -1;

    // Show command
    this.print(`$ ${trimmed}`, 'command-line');

    // Parse command
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Execute
    if (this.commands[cmd]) {
      const result = this.commands[cmd].action(args);
      if (result !== null && result !== undefined) {
        this.print(result, 'response');
      }
    } else {
      this.print(`Command not found: ${cmd}`, 'error');
      this.print('Type "help" for available commands.', 'response');
    }
  },

  showAccessButton(show) {
    if (show) {
      this.accessBtn.classList.add('visible');
    } else {
      this.accessBtn.classList.remove('visible');
      this.close();
    }
  }
};

// Initialize terminal
Terminal.init();
