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
