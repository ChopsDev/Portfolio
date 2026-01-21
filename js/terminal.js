// Secret Terminal
const Terminal = {
  overlay: null,
  output: null,
  input: null,
  history: [],
  historyIndex: -1,
  accessBtn: null,

  // Commands are loaded from terminal-commands.js
  commands: TerminalCommands,

  init() {
    // Get nav button
    this.accessBtn = document.getElementById('terminal-nav-btn');
    if (this.accessBtn) {
      this.accessBtn.addEventListener('click', () => this.open());
    }

    // Create terminal overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'terminal-overlay';
    this.overlay.innerHTML = `
      <div class="terminal-container">
        <div class="terminal-header">
          <span>SECRET TERMINAL</span>
          <button class="terminal-close">&times;</button>
        </div>
        <div class="terminal-body">
          <div class="terminal-output"></div>
          <div class="terminal-input-line">
            <span class="terminal-prompt">$</span>
            <input type="text" class="terminal-input" placeholder="Type 'help' for commands..." autofocus>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.output = this.overlay.querySelector('.terminal-output');
    this.input = this.overlay.querySelector('.terminal-input');
    this.input.disabled = true; // Disabled until terminal is opened

    // Event listeners
    this.overlay.querySelector('.terminal-close').addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    this.input.addEventListener('keydown', (e) => {
      // Only process input when terminal is open
      if (!this.overlay.classList.contains('visible')) return;

      if (e.key === 'Enter') {
        this.execute(this.input.value);
        this.input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        } else {
          this.historyIndex = -1;
          this.input.value = '';
        }
      } else if (e.key === 'Escape') {
        this.close();
      }
    });

    // Show welcome message
    this.print('Welcome to the Secret Terminal!', 'info');
    this.print('Type "help" to see available commands.\n', 'response');
  },

  open() {
    this.overlay.classList.add('visible');
    this.input.disabled = false;
    this.input.focus();
    document.body.style.overflow = 'hidden';

    // Unlock achievement
    if (typeof Achievements !== 'undefined') {
      Achievements.unlock('console');
    }
  },

  close() {
    this.overlay.classList.remove('visible');
    this.input.blur();
    this.input.disabled = true;
    document.body.style.overflow = '';
  },

  print(text, className = 'response') {
    const line = document.createElement('div');
    line.className = className;
    line.textContent = text;
    this.output.appendChild(line);
    this.output.parentElement.scrollTop = this.output.parentElement.scrollHeight;
  },

  execute(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add to history
    this.history.push(trimmed);
    this.historyIndex = -1;

    // Show command
    this.print(`$ ${trimmed}`, 'command-line');

    // Parse command
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Execute
    if (this.commands[cmd]) {
      const result = this.commands[cmd].action(args);
      if (result !== null && result !== undefined) {
        this.print(result, 'response');
      }
    } else {
      this.print(`Command not found: ${cmd}`, 'error');
      this.print('Type "help" for available commands.', 'response');
    }
  },

  showAccessButton(show) {
    if (!this.accessBtn) return;
    if (show) {
      this.accessBtn.classList.add('visible');
    } else {
      this.accessBtn.classList.remove('visible');
      this.close();
    }
  }
};

// Initialize terminal
Terminal.init();
