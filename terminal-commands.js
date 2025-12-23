// =====================================================
// TERMINAL COMMANDS
// =====================================================
// Commands are organized into categories.
// Hidden commands don't appear in the help menu.
// =====================================================

const TerminalCommands = {

  // =====================================================
  // CORE COMMANDS (Always visible in help)
  // =====================================================

  help: {
    description: 'Show available commands',
    action: () => {
      let output = 'Available commands:\n\n';
      for (const [name, cmd] of Object.entries(TerminalCommands)) {
        if (cmd.hidden) continue;
        output += `  ${name.padEnd(12)} - ${cmd.description}\n`;
      }
      output += '\nThere are also hidden commands to discover...';
      return output;
    }
  },

  clear: {
    description: 'Clear the terminal',
    action: () => {
      Terminal.output.innerHTML = '';
      return null;
    }
  },

  about: {
    description: 'About this terminal',
    action: () => {
      return `SECRET TERMINAL v1.0
--------------------
You found the secret terminal!
Unlocked via the Konami Code.

Type 'help' to see commands.
Type 'secrets' for hints.`;
    }
  },

  exit: {
    description: 'Close the terminal',
    action: () => {
      setTimeout(() => Terminal.close(), 100);
      return 'Goodbye...';
    }
  },

  // =====================================================
  // INFORMATION COMMANDS
  // =====================================================

  whoami: {
    description: 'Display current user',
    action: () => 'guest@bryncarter.dev'
  },

  date: {
    description: 'Show current date/time',
    action: () => new Date().toString()
  },

  uptime: {
    description: 'System uptime',
    action: () => {
      const start = performance.timing?.navigationStart || Date.now();
      const seconds = Math.floor((Date.now() - start) / 1000);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `Session uptime: ${mins}m ${secs}s`;
    }
  },

  status: {
    description: 'Show system status',
    action: () => `SYSTEM STATUS
-------------
Terminal: Online
Cheats: Enabled
Vibe: Immaculate`
  },

  version: {
    description: 'Show version',
    action: () => 'Secret Terminal v1.0.0'
  },

  // =====================================================
  // SITE COMMANDS
  // =====================================================

  games: {
    description: 'List my games',
    action: () => {
      return `MY GAMES
--------
1. Stepping Stones   - Minimalist 2D platformer
2. Tilting Game      - Physics-based labyrinth
3. Asteroid Overcharge - Roguelike shooter
4. Sync Or Sink      - Rhythm game (team project)

Type 'open <number>' to visit a game.`;
    }
  },

  open: {
    description: 'Open a game (1-4)',
    action: (args) => {
      const urls = {
        '1': 'https://chopsdev.itch.io/stepping-stones',
        '2': 'https://chopsdev.itch.io/some-tilting-game',
        '3': 'https://chopsdev.itch.io/asteroid-overcharge',
        '4': 'https://kaylienufo.itch.io/sync-or-sink'
      };
      const num = args[0];
      if (urls[num]) {
        window.open(urls[num], '_blank');
        return `Opening game ${num}...`;
      }
      return 'Usage: open <1-4>';
    }
  },

  socials: {
    description: 'Show social links',
    action: () => {
      return `SOCIALS
-------
GitHub:   github.com/ChopsDev
Itch.io:  chopsdev.itch.io
YouTube:  youtube.com/@chops.
Email:    contact@chopsdev.com`;
    }
  },

  credits: {
    description: 'Show credits',
    action: () => {
      return `CREDITS
-------
Design & Code: Bryn Carter
Terminal: Too much free time
Coffee consumed: Yes`;
    }
  },

  source: {
    description: 'View source code',
    action: () => {
      window.open('https://github.com/ChopsDev', '_blank');
      return 'Opening GitHub...';
    }
  },

  // =====================================================
  // UTILITY COMMANDS
  // =====================================================

  echo: {
    description: 'Echo a message',
    action: (args) => args.join(' ') || ''
  },

  matrix: {
    description: 'Enter the matrix',
    action: () => {
      if (typeof triggerMatrixRain === 'function') {
        triggerMatrixRain();
        Terminal.close();
      }
      return 'Follow the white rabbit...';
    }
  },

  // =====================================================
  // FAKE SYSTEM COMMANDS (Visible but don't really work)
  // =====================================================

  sudo: {
    description: 'Run as superuser',
    action: (args) => {
      if (args.length === 0) return 'Usage: sudo <command>';
      if (args.join(' ').toLowerCase().includes('make me a sandwich')) {
        return 'Okay.';
      }
      return 'Nice try, but you\'re not root here.';
    }
  },

  ping: {
    description: 'Ping a host',
    action: (args) => {
      const host = args[0] || 'localhost';
      return `PING ${host}: 64 bytes, time=42ms
PING ${host}: 64 bytes, time=69ms
PING ${host}: packet lost
--- ${host} ping statistics ---
3 packets transmitted, 2 received, 33% loss`;
    }
  },

  // =====================================================
  // HIDDEN COMMANDS - Hints
  // =====================================================

  secrets: {
    description: 'Hints for hidden commands',
    hidden: true,
    action: () => {
      return `HIDDEN COMMAND HINTS
--------------------
- Try common terminal commands
- Think ASCII art animals
- Classic internet culture
- Text manipulation tricks
- Games and randomness
- Profanity has responses too

There are 50+ hidden commands!`;
    }
  },

  secret: {
    description: 'You found one',
    hidden: true,
    action: () => 'You found a hidden command! There are many more...'
  },

  // =====================================================
  // HIDDEN COMMANDS - ASCII Art
  // =====================================================

  cat: {
    hidden: true,
    description: 'Show a cat',
    action: () => `
  /\\_/\\
 ( o.o )
  > ^ <
 /|   |\\
(_|   |_)`
  },

  dog: {
    hidden: true,
    description: 'Show a dog',
    action: () => `
    / \\__
   (    @\\___
   /         O
  /   (_____/
 /_____/   U`
  },

  fish: {
    hidden: true,
    description: 'Show a fish',
    action: () => '<><'
  },

  duck: {
    hidden: true,
    description: 'Show a duck',
    action: () => `
  __
<(o )___
 ( ._> /
  \`---'`
  },

  cowsay: {
    hidden: true,
    description: 'Cow says something',
    action: (args) => {
      const msg = args.join(' ') || 'Moo!';
      const line = '-'.repeat(msg.length + 2);
      return `
 ${line}
< ${msg} >
 ${line}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    }
  },

  nyan: {
    hidden: true,
    description: 'Nyan cat',
    action: () => `
+      o     +              o
    +             o     +       +
o          +
    o  +           +        +
+        o     o       +        o
-_-_-_-_-_-_-_,------,      o
_-_-_-_-_-_-_-|   /\\_/\\
-_-_-_-_-_-_-~|__( ^ .^)  +     +
_-_-_-_-_-_-_-""  ""
+      o         o   +       o`
  },

  doge: {
    hidden: true,
    description: 'Such terminal',
    action: () => `
        wow
                    such terminal
    much secret
                            very hack
        wow
                    so hidden`
  },

  party: {
    hidden: true,
    description: 'Party time',
    action: () => '🎉🎊🥳 PARTY TIME! 🥳🎊🎉'
  },

  // =====================================================
  // HIDDEN COMMANDS - Text Faces
  // =====================================================

  shrug: {
    hidden: true,
    description: 'Shrug',
    action: () => '¯\\_(ツ)_/¯'
  },

  lenny: {
    hidden: true,
    description: 'Lenny face',
    action: () => '( ͡° ͜ʖ ͡°)'
  },

  flip: {
    hidden: true,
    description: 'Flip table',
    action: () => '(╯°□°)╯︵ ┻━┻'
  },

  unflip: {
    hidden: true,
    description: 'Unflip table',
    action: () => '┬─┬ノ( º _ ºノ)'
  },

  fight: {
    hidden: true,
    description: 'Fight',
    action: () => '(ง\'̀-\'́)ง'
  },

  disapprove: {
    hidden: true,
    description: 'Look of disapproval',
    action: () => 'ಠ_ಠ'
  },

  sparkle: {
    hidden: true,
    description: 'Sparkles',
    action: () => '✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧'
  },

  // =====================================================
  // HIDDEN COMMANDS - Games & Random
  // =====================================================

  dice: {
    hidden: true,
    description: 'Roll a dice',
    action: (args) => {
      const sides = parseInt(args[0]) || 6;
      const roll = Math.floor(Math.random() * sides) + 1;
      return `🎲 Rolling d${sides}... ${roll}!`;
    }
  },

  coin: {
    hidden: true,
    description: 'Flip a coin',
    action: () => Math.random() < 0.5 ? '🪙 Heads!' : '🪙 Tails!'
  },

  '8ball': {
    hidden: true,
    description: 'Magic 8 ball',
    action: (args) => {
      const responses = [
        'It is certain.', 'Without a doubt.', 'Yes, definitely.',
        'Most likely.', 'Outlook good.', 'Yes.',
        'Reply hazy, try again.', 'Ask again later.',
        'Cannot predict now.', 'Concentrate and ask again.',
        "Don't count on it.", 'My reply is no.',
        'Outlook not so good.', 'Very doubtful.'
      ];
      if (args.length === 0) return 'Ask me a question!';
      return '🎱 ' + responses[Math.floor(Math.random() * responses.length)];
    }
  },

  rps: {
    hidden: true,
    description: 'Rock paper scissors',
    action: (args) => {
      const choices = ['rock', 'paper', 'scissors'];
      const player = args[0]?.toLowerCase();
      const computer = choices[Math.floor(Math.random() * 3)];

      if (!choices.includes(player)) {
        return 'Usage: rps <rock|paper|scissors>';
      }

      if (player === computer) return `You: ${player} | Me: ${computer} - Tie!`;
      const wins = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
      if (wins[player] === computer) {
        return `You: ${player} | Me: ${computer} - You win! 🎉`;
      }
      return `You: ${player} | Me: ${computer} - I win! 😎`;
    }
  },

  random: {
    hidden: true,
    description: 'Random number',
    action: (args) => {
      const max = parseInt(args[0]) || 100;
      return `Random (1-${max}): ${Math.floor(Math.random() * max + 1)}`;
    }
  },

  fortune: {
    hidden: true,
    description: 'Fortune cookie',
    action: () => {
      const fortunes = [
        'Your code will compile on the first try.',
        'A merge conflict is in your future.',
        'The bug you seek is on line 42.',
        'Stack Overflow has the answer you need.',
        'Today is a good day to refactor.',
        'Documentation? Where we\'re going, we don\'t need documentation.',
        'A goose watches you.',
        'Clear cache and try again.'
      ];
      return '🥠 ' + fortunes[Math.floor(Math.random() * fortunes.length)];
    }
  },

  joke: {
    hidden: true,
    description: 'Tell a joke',
    action: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Light attracts bugs.",
        "There are 10 types of people: those who understand binary and those who don't.",
        "A SQL query walks into a bar, walks up to two tables and asks 'Can I join you?'",
        "Why do Java developers wear glasses? They don't C#.",
        "Why did the developer go broke? He used up all his cache.",
        "There's no place like 127.0.0.1",
        "I'd tell you a UDP joke, but you might not get it."
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
  },

  // =====================================================
  // HIDDEN COMMANDS - Text Manipulation
  // =====================================================

  leet: {
    hidden: true,
    description: 'Convert to 1337',
    action: (args) => {
      const text = args.join(' ') || 'leet';
      const leet = { a: '4', e: '3', i: '1', o: '0', s: '5', t: '7' };
      return text.toLowerCase().split('').map(c => leet[c] || c).join('');
    }
  },

  reverse: {
    hidden: true,
    description: 'Reverse text',
    action: (args) => args.join(' ').split('').reverse().join('')
  },

  upside: {
    hidden: true,
    description: 'Flip text upside down',
    action: (args) => {
      const text = args.join(' ');
      const flip = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ',
        'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l',
        'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
        's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
        'y': 'ʎ', 'z': 'z', '?': '¿', '!': '¡', '.': '˙'
      };
      return text.toLowerCase().split('').map(c => flip[c] || c).reverse().join('');
    }
  },

  // =====================================================
  // HIDDEN COMMANDS - Classic References
  // =====================================================

  answer: {
    hidden: true,
    description: 'The answer',
    action: () => '42\n\n(The answer to life, the universe, and everything)'
  },

  xyzzy: {
    hidden: true,
    description: 'Magic word',
    action: () => 'Nothing happens.'
  },

  plugh: {
    hidden: true,
    description: 'Another magic word',
    action: () => 'A hollow voice says "Plugh".'
  },

  rickroll: {
    hidden: true,
    description: 'Never gonna give you up',
    action: () => {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      return 'Never gonna let you down...';
    }
  },

  coffee: {
    hidden: true,
    description: 'Make coffee',
    action: () => `
      ( (
       ) )
    ........
    |      |]
    \\      /
     '----'

418 I'm a teapot`
  },

  // =====================================================
  // HIDDEN COMMANDS - Terminal Jokes
  // =====================================================

  vim: {
    hidden: true,
    description: 'Open vim',
    action: () => `You are now trapped in vim.

Just kidding. But the exit is :q!
...or is it :wq? Or ZZ? Or :x?`
  },

  emacs: {
    hidden: true,
    description: 'Open emacs',
    action: () => 'Emacs is a great operating system, lacking only a decent editor.'
  },

  nano: {
    hidden: true,
    description: 'Open nano',
    action: () => 'Ah, a person of culture. Simple and effective.'
  },

  sl: {
    hidden: true,
    description: 'Steam locomotive',
    action: () => `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |

You meant 'ls', didn't you?`
  },

  rm: {
    hidden: true,
    description: 'Remove files',
    action: (args) => {
      if (args.join(' ').includes('-rf /')) {
        return 'Nice try. I\'m not falling for that one.\n\n(╯°□°)╯︵ ┻━┻';
      }
      return 'rm: permission denied';
    }
  },

  hack: {
    hidden: true,
    description: 'Hack the mainframe',
    action: () => {
      return `[■□□□□□□□□□] 10% Accessing mainframe...
[■■■□□□□□□□] 30% Bypassing firewall...
[■■■■■□□□□□] 50% Decrypting passwords...
[■■■■■■■□□□] 70% Downloading secrets...
[■■■■■■■■■□] 90% Covering tracks...
[■■■■■■■■■■] 100% Complete!

ACCESS DENIED

Just kidding. This is a portfolio website.`;
    }
  },

  panic: {
    hidden: true,
    description: 'Kernel panic',
    action: () => `KERNEL PANIC - NOT SYNCING

---[ end Kernel panic ]---

Just kidding. Everything is fine. Probably.`
  },

  reboot: {
    hidden: true,
    description: 'Reboot system',
    action: () => {
      setTimeout(() => location.reload(), 2000);
      return 'Rebooting in 2 seconds...';
    }
  },

  shutdown: {
    hidden: true,
    description: 'Shutdown system',
    action: () => 'Permission denied. Nice try though.'
  },

  // =====================================================
  // HIDDEN COMMANDS - Greetings & Reactions
  // =====================================================

  hello: {
    hidden: true,
    description: 'Greeting',
    action: () => 'Hello, fellow hacker! 👋'
  },

  hi: {
    hidden: true,
    description: 'Greeting',
    action: () => 'Hey there! 👋'
  },

  hey: {
    hidden: true,
    description: 'Greeting',
    action: () => 'Hello! 👋'
  },

  bye: {
    hidden: true,
    description: 'Goodbye',
    action: () => {
      setTimeout(() => Terminal.close(), 500);
      return 'Goodbye! 👋';
    }
  },

  thanks: {
    hidden: true,
    description: 'Thanks',
    action: () => "You're welcome! 😊"
  },

  sorry: {
    hidden: true,
    description: 'Sorry',
    action: () => "No worries! 🍁"
  },

  pls: {
    hidden: true,
    description: 'Please',
    action: () => "Please doesn't work here. Try sudo."
  },

  please: {
    hidden: true,
    description: 'Please',
    action: () => "Since you asked nicely... still no."
  },

  yes: {
    hidden: true,
    description: 'Yes',
    action: () => 'No.'
  },

  no: {
    hidden: true,
    description: 'No',
    action: () => 'Yes.'
  },

  why: {
    hidden: true,
    description: 'Why',
    action: () => {
      const responses = ['Why not?', 'Because.', '42.', 'The world may never know.'];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  },

  pong: {
    hidden: true,
    description: 'Pong',
    action: () => 'ping'
  },

  // =====================================================
  // HIDDEN COMMANDS - Internet Culture
  // =====================================================

  f: {
    hidden: true,
    description: 'Pay respects',
    action: () => 'You have paid your respects. 🙏'
  },

  gg: {
    hidden: true,
    description: 'Good game',
    action: () => 'GG WP! 🎮'
  },

  lol: {
    hidden: true,
    description: 'Laugh',
    action: () => {
      const laughs = ['haha', 'hehe', 'lmao', 'rofl', '😂', 'kek'];
      return laughs[Math.floor(Math.random() * laughs.length)];
    }
  },

  bruh: {
    hidden: true,
    description: 'Bruh',
    action: () => 'bruh moment 💀'
  },

  nice: {
    hidden: true,
    description: 'Nice',
    action: () => '69 nice 😏'
  },

  scream: {
    hidden: true,
    description: 'Scream',
    action: () => 'AAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHH!!!'
  },

  b: {
    hidden: true,
    description: 'IT Crowd',
    action: () => 'Have you tried turning it off and on again?'
  },

  // =====================================================
  // HIDDEN COMMANDS - Math
  // =====================================================

  pi: {
    hidden: true,
    description: 'Show pi',
    action: () => '3.14159265358979323846264338327950288...'
  },

  e: {
    hidden: true,
    description: 'Show e',
    action: () => '2.71828182845904523536028747135266249...'
  },

  // =====================================================
  // HIDDEN COMMANDS - Profanity Responses
  // =====================================================

  fuck: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Fuck you too, buddy.'
  },

  shit: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Well... yeah.'
  },

  ass: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Grow up.'
  },

  damn: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Damn indeed.'
  },

  hell: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Welcome. You\'re already here.'
  },

  fml: {
    hidden: true,
    description: 'Frustration',
    action: () => 'Relatable.'
  },

  rage: {
    hidden: true,
    description: 'Anger',
    action: () => 'Calm down. Have a cookie. 🍪'
  }

};
