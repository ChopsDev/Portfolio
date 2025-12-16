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
leftPanel.addEventListener('click', () => {
  if (rightPanel.classList.contains('expanded')) {
    closeAll();
  } else if (!leftPanel.classList.contains('expanded')) {
    expandLeft();
  }
});

// Clicking "Photography" (right panel)
rightPanel.addEventListener('click', () => {
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
