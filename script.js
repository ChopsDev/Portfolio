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

  if (reloadCount >= 6) {
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

// Show middle content on page load
middle.classList.add('ready');

// Mark intro animations as complete after they finish
setTimeout(() => {
  middle.classList.add('intro-done');
}, 1000);

// Function to close all panels and reset
function closeAll(keepMiddleShrunk = false) {
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

  if (isZoomedWayOut && !easterEggShown) {
    createEasterEggOverlay();
    // Force reflow to enable fade-in transition on first show
    void easterEggOverlay.offsetWidth;
    easterEggOverlay.classList.add('visible');
    easterEggShown = true;
  } else if (!isZoomedWayOut && easterEggShown) {
    if (easterEggOverlay) {
      easterEggOverlay.classList.remove('visible');
    }
    easterEggShown = false;
  } else if (isZoomedWayOut && easterEggShown && widthChanged) {
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
    if (document.querySelector('.lightbox-overlay.visible')) return;

    if (leftPanel.classList.contains('expanded') || rightPanel.classList.contains('expanded')) {
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

document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
  if (konamiSequence.length > 10) konamiSequence.shift();

  if (konamiSequence.join(',') === konamiCode) {
    konamiSequence.length = 0;
    triggerKonamiEasterEgg();
  }
});

function triggerKonamiEasterEgg() {
  const overlay = document.createElement('div');
  overlay.className = 'konami-overlay';
  overlay.innerHTML = `
    <div class="konami-content">
      <div class="konami-text">CHEAT ACTIVATED</div>
      <p class="konami-sub">// you weren't supposed to find this</p>
    </div>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 500);
  }, 2500);
}

// ========================================
// Image Lightbox
// ----------------------------------------
// Add class "lightbox-img" to any <img> to
// make it clickable and open in a lightbox.
// Images in the same parent container form
// a gallery with arrow navigation.
// ========================================

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
