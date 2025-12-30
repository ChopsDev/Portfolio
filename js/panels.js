// Panel System
const htmlBody = document.querySelector("body");
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');
const leftHeading = leftPanel.querySelector('h1');
const rightHeading = rightPanel.querySelector('h1');
const leftContent = leftPanel.querySelector('.panel-content');
const rightContent = rightPanel.querySelector('.panel-content');
const middle = document.querySelector('.middle');

const HIDE_TEXT = "HIDE";

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

  rightHeading.textContent = "OTHER";
  leftHeading.textContent = "GAME DEV";
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

  rightHeading.textContent = HIDE_TEXT;
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

  leftHeading.textContent = HIDE_TEXT;
  rightContent.classList.add('visible');

  playPanelOpen();
}

function toggleScroll(toggle) {
  if (toggle) {
    htmlBody.classList.remove("no-scroll");
    htmlBody.classList.add("allow-scroll");
  } else {
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

// Collapsible functionality
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

// Project Filter System
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const noProjectsMessage = document.querySelector('.no-projects-message');

function filterProjects(engine) {
  let visibleCount = 0;

  projectItems.forEach(item => {
    const itemEngine = item.dataset.engine;

    if (engine === 'all' || itemEngine === engine) {
      item.classList.remove('filtered-out');
      visibleCount++;
    } else {
      item.classList.add('filtered-out');
    }
  });

  // Show/hide "no projects" message
  if (noProjectsMessage) {
    noProjectsMessage.classList.toggle('visible', visibleCount === 0);
  }
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter projects
    filterProjects(btn.dataset.filter);
  });
});
