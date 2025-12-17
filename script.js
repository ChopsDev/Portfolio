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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    
    while (content) {
      if (content.nodeName === "DIV" && content.classList.contains("content")) {
        content.classList.toggle("show");
        break; // Only toggle the first content div found
      }
      content = content.nextElementSibling;
    }
  });
}

// Dropdown functionality for section headers
var dropdownHeaders = document.getElementsByClassName("dropdown-header");

// Initialize all dropdowns as open by default
for (i = 0; i < dropdownHeaders.length; i++) {
  var targetId = dropdownHeaders[i].getAttribute("data-target");
  var dropdownContent = document.getElementById(targetId);
  if (dropdownContent) {
    dropdownContent.classList.add("show");
    dropdownHeaders[i].classList.add("active");
  }
}

for (i = 0; i < dropdownHeaders.length; i++) {
  dropdownHeaders[i].addEventListener("click", function(e) {
    // Prevent event bubbling to panel click handlers
    e.stopPropagation();

    // Remove focus to prevent outline
    this.blur();

    this.classList.toggle("active");

    var targetId = this.getAttribute("data-target");
    var dropdownContent = document.getElementById(targetId);

    if (dropdownContent) {
      dropdownContent.classList.toggle("show");
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
  "Some things are better left unzoomed."
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
