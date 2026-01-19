// Dark mode toggle for middle section
const themeToggle = document.querySelector('.theme-toggle');

// Check for saved preference, default to dark mode
function getPreferredTheme() {
  const saved = localStorage.getItem('middle-theme');
  if (saved) return saved;
  return 'dark';
}

function setTheme(theme) {
  const middle = document.querySelector('.middle');
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
  const middle = document.querySelector('.middle');
  const isDark = middle.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
  playCRTThemeToggle(!isDark);

  // Handle disco mode easter egg
  handleDiscoClick();
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('middle-theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
