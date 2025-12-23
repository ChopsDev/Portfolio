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

// Easter egg quotes for zoom
const easterEggMessages = [
  "There's nothing out here.",
  "Looking for something?",
  "The void thanks you for visiting.",
  "Some things are better left unzoomed.",
  "You went too far.",
  "There's no reason to be zoomed out here.",
  "This is not part of the experience.",
  "You found the quiet place.",
  "You're not meant to be out this far.",
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

// Disco mode easter egg - click theme toggle 10 times rapidly
let discoClickCount = 0;
let discoClickTimer = null;
let discoActive = false;

function handleDiscoClick() {
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
}

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

  const middle = document.querySelector('.middle');

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

// Name click easter egg (Rick Roll)
function initNameClickEasterEgg() {
  const nameHeading = document.querySelector('.landing-left h1');
  if (!nameHeading) return;

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
}
