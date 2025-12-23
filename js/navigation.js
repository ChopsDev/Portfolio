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
