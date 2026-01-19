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
const scrollCooldown = 500; // ms between scroll switches

function getCurrentTabIndex() {
  const activeBtn = document.querySelector('.page-btn.active[data-target]');
  return navigableBtns.indexOf(activeBtn);
}

function switchToTabByIndex(index) {
  if (index >= 0 && index < navigableBtns.length) {
    const targetPage = navigableBtns[index].dataset.target;
    switchPage(targetPage);
  }
}

// Listen for wheel events on the middle section
const middleSection = document.querySelector('.middle');
if (middleSection) {
  middleSection.addEventListener('wheel', (e) => {
    // Don't interfere if user is scrolling inside a scrollable element
    const scrollableParent = e.target.closest('.page-content, .scrollable, [data-scrollable]');
    if (scrollableParent && scrollableParent.scrollHeight > scrollableParent.clientHeight) {
      return;
    }

    // Prevent rapid switching
    if (isScrolling) return;

    const currentIndex = getCurrentTabIndex();

    if (e.deltaY > 0) {
      // Scrolling down - go to next tab (right)
      if (currentIndex < navigableBtns.length - 1) {
        e.preventDefault();
        isScrolling = true;
        switchToTabByIndex(currentIndex + 1);
        setTimeout(() => { isScrolling = false; }, scrollCooldown);
      }
    } else if (e.deltaY < 0) {
      // Scrolling up - go to previous tab (left)
      if (currentIndex > 0) {
        e.preventDefault();
        isScrolling = true;
        switchToTabByIndex(currentIndex - 1);
        setTimeout(() => { isScrolling = false; }, scrollCooldown);
      }
    }
  }, { passive: false });
}
