// Achievement Tracker System
const Achievements = (function() {
  const STORAGE_KEY = 'portfolio-achievements';

  // Define all achievements
  const achievements = {
    console: {
      id: 'console',
      title: 'Console Curious',
      description: 'Opened the secret terminal',
      icon: '>'
    },
    konami: {
      id: 'konami',
      title: 'Cheat Activated',
      description: 'Entered the Konami code',
      icon: '~'
    },
    matrix: {
      id: 'matrix',
      title: 'Digital Rain',
      description: 'Triggered the Matrix effect',
      icon: '#'
    },
    disco: {
      id: 'disco',
      title: 'Party Mode',
      description: 'Started a disco party',
      icon: '*'
    },
    void: {
      id: 'void',
      title: 'The Void',
      description: 'Zoomed into the void',
      icon: '0'
    },
    rickroll: {
      id: 'rickroll',
      title: "Rick'd",
      description: 'Never gonna give you up',
      icon: '!'
    },
    clicker: {
      id: 'clicker',
      title: 'Secret Gamer',
      description: 'Found the dev journal',
      icon: '+'
    },
    clickergame: {
      id: 'clickergame',
      title: 'Wait What',
      description: 'This is not a dev journal...',
      icon: '?'
    },
    dvdbounce: {
      id: 'dvdbounce',
      title: 'Freedom!',
      description: 'Set the headshot free',
      icon: '@'
    }
  };

  // Load unlocked achievements from localStorage
  function getUnlocked() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  // Save unlocked achievements
  function saveUnlocked(unlocked) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
  }

  // Check if achievement is unlocked
  function isUnlocked(id) {
    return getUnlocked().includes(id);
  }

  // Unlock an achievement
  function unlock(id) {
    if (!achievements[id]) return false;
    if (isUnlocked(id)) return false;

    const unlocked = getUnlocked();
    unlocked.push(id);
    saveUnlocked(unlocked);

    showToast(achievements[id]);

    // Check for 100% completion
    if (unlocked.length === Object.keys(achievements).length) {
      setTimeout(() => {
        showCompletionToast();
      }, 4500); // Show after the achievement toast fades
    }

    return true;
  }

  // Special completion toast
  function showCompletionToast() {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast completion-toast';
    toast.innerHTML = `
      <div class="achievement-icon">*</div>
      <div class="achievement-info">
        <div class="achievement-label">100% Complete</div>
        <div class="achievement-title">Secret Theme Unlocked</div>
        <div class="achievement-desc">Toggle your theme to find it</div>
      </div>
      <div class="achievement-progress">9/9</div>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  }

  // Show achievement toast notification
  function showToast(achievement) {
    // Remove existing toast if present
    const existingToast = document.querySelector('.achievement-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-info">
        <div class="achievement-label">Secret Found</div>
        <div class="achievement-title">${achievement.title}</div>
        <div class="achievement-desc">${achievement.description}</div>
      </div>
      <div class="achievement-progress">${getUnlocked().length}/${Object.keys(achievements).length}</div>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    // Auto-hide after delay
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // Get achievement stats
  function getStats() {
    const unlocked = getUnlocked();
    return {
      unlocked: unlocked.length,
      total: Object.keys(achievements).length,
      list: Object.values(achievements).map(a => ({
        ...a,
        unlocked: unlocked.includes(a.id)
      }))
    };
  }

  // Reset all achievements (for testing)
  function reset() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // Rick roll achievement - show when returning from YouTube
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && pendingRickRoll) {
      pendingRickRoll = false;
      setTimeout(() => unlock('rickroll'), 500);
    }
  });

  window.addEventListener('focus', () => {
    if (pendingRickRoll) {
      pendingRickRoll = false;
      setTimeout(() => unlock('rickroll'), 500);
    }
  });

  // Also trigger on window focus (backup for visibility change)
  window.addEventListener('focus', () => {
    if (consoleDetected && !consoleAchievementGiven) {
      consoleAchievementGiven = true;
      setTimeout(() => unlock('console'), 500);
    }
    if (pendingRickRoll) {
      pendingRickRoll = false;
      setTimeout(() => unlock('rickroll'), 500);
    }
  });

  // Rick roll pending flag
  let pendingRickRoll = false;
  function setPendingRickRoll() {
    pendingRickRoll = true;
  }

  return {
    unlock,
    isUnlocked,
    getStats,
    setPendingRickRoll,
    reset,
    list: achievements
  };
})();
