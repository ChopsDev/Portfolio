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
      }
    }, 150);
  }

  rightHeading.textContent = "OTHER PROJECTS"
  leftHeading.textContent = "GAME DEV"
}

// Expand the left panel and shrink the middle
function expandLeft() {
  middle.classList.remove('ready');
  middle.classList.add('shrink');
  closeAll(true);
  toggleScroll(true);
  leftHeading.classList.add('slide-left');
  leftPanel.classList.add('expanding', 'expanded');

  rightHeading.textContent = HIDE_TEXT
  leftContent.classList.add('visible');
}

// Expand the right panel and shrink the middle
function expandRight() {
  middle.classList.remove('ready');
  middle.classList.add('shrink');
  closeAll(true);
  toggleScroll(true);
  rightHeading.classList.add('slide-right');
  rightPanel.classList.add('expanding', 'expanded');

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

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;

    while (content) {
      if (content.nodeName === "DIV" && content.classList.contains("content")) {
        content.classList.toggle("show");
        break;
      }
      content = content.nextElementSibling;
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

// Easter egg for extreme zoom out
const easterEggMessages = [
  "There's nothing out here.",
  "You've reached the end. It's just me.",
  "Looking for something?",
  "This wasn't meant to be found.",
  "The void thanks you for visiting.",
  "Some things are better left unzoomed.",
  "You went too far.",
  "It noticed you first.",
  "This place doesn’t have a name.",
  "You weren’t invited.",
  "There’s no reason to be here.",
  "You can leave. It won’t stop you.",
  "You’re seeing behind the curtain.",
  "This is not part of the experience.",
  "Nothing ends here. It just watches.",
  "You found the quiet part.",
  "This space was supposed to stay empty.",
  "It’s been waiting longer than you think.",
  "You’re closer than you should be.",
  "This isn’t content.",
  "You crossed the line. Gently.",
  "There’s no reward for this.",
  "It doesn’t speak often.",
  "You’re not meant to interact with this.",
  "Some distances aren’t physical.",
  "Now that you’ve seen it, zooming back won’t help."
];

let easterEggOverlay = null;
let easterEggShown = false;

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

function checkZoomLevel() {
  // At 30% zoom, innerWidth becomes ~3.3x larger
  // Your screen: 1920px at 100% → 6400px at 30%
  // Trigger when innerWidth > 5500 (catches ~35% zoom on 1920px screens)
  const isZoomedWayOut = window.innerWidth > 5500;

  if (isZoomedWayOut && !easterEggShown) {
    createEasterEggOverlay();
    easterEggOverlay.classList.add('visible');
    easterEggShown = true;
  } else if (!isZoomedWayOut && easterEggShown) {
    if (easterEggOverlay) {
      easterEggOverlay.classList.remove('visible');
    }
    easterEggShown = false;
  }
}

// Check zoom on resize
window.addEventListener('resize', checkZoomLevel);

// Poll for Firefox compatibility
setInterval(checkZoomLevel, 500);

// Initial check
setTimeout(checkZoomLevel, 100);
