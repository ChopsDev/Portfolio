// Page Navigation
const pageNav = document.querySelector('.page-nav');
const pages = document.querySelectorAll('.page');
const pageBtns = document.querySelectorAll('.page-btn');

// Get navigable tabs (those with data-target attribute, excludes terminal)
const navigableBtns = Array.from(pageBtns).filter(btn => btn.dataset.target);

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

// Scroll-based tab navigation
let isScrolling = false;
let accumulatedScroll = 0;
let lastScrollDirection = 0;
let scrollResetTimer = null;

const scrollCooldown = 600; // ms between scroll switches
const scrollThreshold = 5; // pixels from edge to trigger
const requiredOverscroll = 500; // accumulated scroll needed to trigger switch

function getCurrentTabIndex() {
  const activeBtn = document.querySelector('.page-btn.active[data-target]');
  return navigableBtns.indexOf(activeBtn);
}

function switchToTabByIndex(index) {
  if (index < 0 || index >= navigableBtns.length) return;
  const targetPage = navigableBtns[index].dataset.target;
  switchPage(targetPage);
}

// Find the scrollable element within the active page
function getScrollableElement() {
  const activePage = document.querySelector('.page.active');
  if (!activePage) return null;

  // Check if the middle section itself is scrollable
  const middle = document.querySelector('.middle');
  if (middle && middle.scrollHeight > middle.clientHeight) {
    return middle;
  }

  // Check for scrollable content within the page
  const scrollable = activePage.querySelector('.page-content, .scrollable, [data-scrollable]');
  if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
    return scrollable;
  }

  return null;
}

function isAtTop(el) {
  if (!el) return true;
  return el.scrollTop <= scrollThreshold;
}

function isAtBottom(el) {
  if (!el) return true;
  return el.scrollTop + el.clientHeight >= el.scrollHeight - scrollThreshold;
}

function resetScrollAccumulator() {
  accumulatedScroll = 0;
  lastScrollDirection = 0;
}

// Listen for wheel events on the middle section
const middleSection = document.querySelector('.middle');
if (middleSection) {
  middleSection.addEventListener('wheel', (e) => {
    // Prevent rapid switching
    if (isScrolling) return;

    const scrollable = getScrollableElement();
    const currentIndex = getCurrentTabIndex();
    const direction = e.deltaY > 0 ? 1 : -1;

    // Reset accumulator if direction changed or after timeout
    if (direction !== lastScrollDirection) {
      resetScrollAccumulator();
    }
    lastScrollDirection = direction;

    // Clear and reset the timeout
    clearTimeout(scrollResetTimer);
    scrollResetTimer = setTimeout(resetScrollAccumulator, 300);

    if (e.deltaY > 0) {
      // Scrolling down - only accumulate if at bottom
      if (isAtBottom(scrollable)) {
        accumulatedScroll += Math.abs(e.deltaY);

        if (accumulatedScroll >= requiredOverscroll) {
          e.preventDefault();
          isScrolling = true;
          resetScrollAccumulator();
          switchToTabByIndex(currentIndex + 1);
          setTimeout(() => { isScrolling = false; }, scrollCooldown);
        }
      } else {
        resetScrollAccumulator();
      }
    } else if (e.deltaY < 0) {
      // Scrolling up - only accumulate if at top
      if (isAtTop(scrollable)) {
        accumulatedScroll += Math.abs(e.deltaY);

        if (accumulatedScroll >= requiredOverscroll) {
          e.preventDefault();
          isScrolling = true;
          resetScrollAccumulator();
          switchToTabByIndex(currentIndex - 1);
          setTimeout(() => { isScrolling = false; }, scrollCooldown);
        }
      } else {
        resetScrollAccumulator();
      }
    }
  }, { passive: false });
}
