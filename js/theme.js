// Dark mode toggle for middle section
const themeToggle = document.querySelector('.theme-toggle');

// Check for saved preference, default to dark mode
function getPreferredTheme() {
  const saved = localStorage.getItem('middle-theme');
  if (saved) return saved;
  return 'dark';
}

// Check if secret theme is unlocked (all achievements found)
function isSecretThemeUnlocked() {
  if (typeof Achievements === 'undefined') return false;
  const stats = Achievements.getStats();
  return stats.unlocked >= stats.total;
}

function setTheme(theme) {
  const middle = document.querySelector('.middle');

  // Remove all theme classes
  middle.classList.remove('dark-mode', 'secret-mode');
  document.body.classList.remove('middle-dark', 'middle-secret');

  if (theme === 'dark') {
    middle.classList.add('dark-mode');
    document.body.classList.add('middle-dark');
  } else if (theme === 'secret') {
    middle.classList.add('secret-mode');
    document.body.classList.add('middle-secret');
  }
  // light mode = no classes added

  localStorage.setItem('middle-theme', theme);

  // Update toggle button title
  if (themeToggle) {
    if (theme === 'secret') {
      themeToggle.title = 'Secret theme active';
    } else {
      themeToggle.title = 'Toggle theme';
    }
  }
}

// Get next theme in cycle
function getNextTheme(currentTheme) {
  const secretUnlocked = isSecretThemeUnlocked();

  if (secretUnlocked) {
    // Cycle: light → dark → secret → light
    if (currentTheme === 'light') return 'dark';
    if (currentTheme === 'dark') return 'secret';
    return 'light';
  } else {
    // Cycle: light → dark → light
    return currentTheme === 'dark' ? 'light' : 'dark';
  }
}

// Initialize theme and remove pending class
setTheme(getPreferredTheme());
document.documentElement.classList.remove('middle-dark-pending');

// Toggle on click
themeToggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('middle-theme') || 'dark';
  const nextTheme = getNextTheme(currentTheme);
  setTheme(nextTheme);
  playCRTThemeToggle(nextTheme === 'dark' || nextTheme === 'secret');

  // Handle disco mode easter egg
  handleDiscoClick();
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('middle-theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
