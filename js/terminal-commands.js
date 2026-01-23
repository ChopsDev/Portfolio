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

  morse: {
    description: 'Convert text to morse code',
    action: (args) => {
      if (args.length === 0) return 'Usage: morse <text>';
      const morseCode = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
        'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
        'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
        's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
        'y': '-.--', 'z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', ' ': '/', '.': '.-.-.-', ',': '--..--',
        '?': '..--..', '!': '-.-.--', "'": '.----.', '"': '.-..-.', '/': '-..-.',
        '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.',
        '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '@': '.--.-.'
      };
      const text = args.join(' ').toLowerCase();
      const morse = text.split('').map(c => morseCode[c] || c).join(' ');
      return morse;
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
    action: () => '*** PARTY TIME ***'
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

  life: {
    hidden: true,
    description: 'Username',
    action: () => 'great'
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
      return `Rolling d${sides}... ${roll}!`;
    }
  },

  coin: {
    hidden: true,
    description: 'Flip a coin',
    action: () => Math.random() < 0.5 ? 'Heads!' : 'Tails!'
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
      return responses[Math.floor(Math.random() * responses.length)];
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
        return `You: ${player} | Me: ${computer} - You win!`;
      }
      return `You: ${player} | Me: ${computer} - I win!`;
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
      return fortunes[Math.floor(Math.random() * fortunes.length)];
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

To exit write :q!
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
    action: async () => {
      const steps = [
        "[■□□□□□□□□□] 10% Accessing mainframe...",
        "[■■■□□□□□□□] 30% Bypassing firewall...",
        "[■■■■■□□□□□] 50% Decrypting passwords...",
        "[■■■■■■■□□□] 70% Downloading secrets...",
        "[■■■■■■■■■□] 90% Covering tracks...",
        "[■■■■■■■■■■] 100% Complete!",
        "",
        "ACCESS DENIED",
      ];

      const sleep = (ms) => new Promise(r => setTimeout(r, ms));

      for (const line of steps) {
        Terminal.print(line, 'response');
        await sleep(600);
      }
      return null;
    }
  },


  panic: {
    hidden: true,
    description: 'Kernel panic',
    action: () => `KERNEL PANIC - NOT SYNCING

---[ end Kernel panic ]---

Just kidding. Everything is fine...`
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
    action: () => 'Hello, fellow hacker'
  },

  hi: {
    hidden: true,
    description: 'Greeting',
    action: () => 'Hey there'
  },

  hey: {
    hidden: true,
    description: 'Greeting',
    action: () => 'Hello'
  },

  bye: {
    hidden: true,
    description: 'Goodbye',
    action: () => {
      setTimeout(() => Terminal.close(), 500);
      return 'Goodbye';
    }
  },

  thanks: {
    hidden: true,
    description: 'Thanks',
    action: () => "You're welcome"
  },

  sorry: {
    hidden: true,
    description: 'Sorry',
    action: () => "No worries"
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

  // =====================================================
  // HIDDEN COMMANDS - Internet Culture
  // =====================================================

  f: {
    hidden: true,
    description: 'Pay respects',
    action: () => 'You have paid your respects.'
  },

  gg: {
    hidden: true,
    description: 'Good game',
    action: () => 'GG WP!'
  },

  lol: {
    hidden: true,
    description: 'Laugh',
    action: () => {
      const laughs = ['haha', 'hehe', 'lmao', 'rofl', 'lul', 'kek'];
      return laughs[Math.floor(Math.random() * laughs.length)];
    }
  },

  bruh: {
    hidden: true,
    description: 'Bruh',
    action: () => 'bruh moment'
  },

  nice: {
    hidden: true,
    description: 'Nice',
    action: () => '69 nice'
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
    action: () => 'Calm down. Have a cookie.'
  },

  // =====================================================
  // HIDDEN COMMANDS - More Funny Stuff
  // =====================================================

  helpme: {
    hidden: true,
    description: 'Asks for help',
    action: () => 'No.'
  },

  clearbrain: {
    hidden: true,
    description: 'Clears your thoughts',
    action: () => 'Still thinking about chickens.'
  },

  motivation: {
    hidden: true,
    description: 'Get motivated',
    action: () => 'Grind harder.'
  },

  install: {
    hidden: true,
    description: 'Install a package',
    action: (args) => `Installing ${args[0] || 'nothing'}... failed.`
  },

  uninstall: {
    hidden: true,
    description: 'Remove a package',
    action: () => 'Nothing was removed. Everything is permanent.'
  },

  update: {
    hidden: true,
    description: 'Update the system',
    action: () => 'System already outdated.'
  },

  terms: {
    hidden: true,
    description: 'View terms and conditions',
    action: () => 'You already agreed.'
  },

  privacy: {
    hidden: true,
    description: 'View privacy policy',
    action: () => 'There is none.'
  },

  konami: {
    hidden: true,
    description: '???',
    action: () => 'You already did that.'
  },

  debuggod: {
    hidden: true,
    description: 'Enable god mode',
    action: () => 'God is unavailable.'
  },

  truth: {
    hidden: true,
    description: 'Reveal the truth',
    action: () => 'You knew already.'
  },

  hello_world: {
    hidden: true,
    description: 'Classic',
    action: () => 'Hello, World!'
  },

  ls: {
    hidden: true,
    description: 'List files',
    action: () => `secrets.txt
definitely_not_passwords.txt
todo.md
node_modules/    (4.7 GB)
.env             (oops)`
  },

  pwd: {
    hidden: true,
    description: 'Print working directory',
    action: () => '/home/guest/nowhere'
  },

  cd: {
    hidden: true,
    description: 'Change directory',
    action: () => 'You can\'t leave.'
  },

  mkdir: {
    hidden: true,
    description: 'Make directory',
    action: () => 'Directory creation forbidden in the matrix.'
  },

  chmod: {
    hidden: true,
    description: 'Change permissions',
    action: () => 'Nice try. Permissions denied permanently.'
  },

  man: {
    hidden: true,
    description: 'Manual pages',
    action: (args) => args[0] ? `No manual entry for ${args[0]}. Figure it out.` : 'What manual?'
  },

  grep: {
    hidden: true,
    description: 'Search text',
    action: () => 'grep: pattern not found (story of my life)'
  },

  curl: {
    hidden: true,
    description: 'Transfer data',
    action: () => 'curl: (7) Failed to connect: trust issues'
  },

  wget: {
    hidden: true,
    description: 'Download files',
    action: () => 'You wouldn\'t download a car.'
  },

  apt: {
    hidden: true,
    description: 'Package manager',
    action: () => 'E: Unable to locate happiness'
  },

  npm: {
    hidden: true,
    description: 'Node package manager',
    action: () => 'npm ERR! 42069 dependencies vulnerable'
  },

  git: {
    hidden: true,
    description: 'Version control',
    action: (args) => {
      if (args[0] === 'push') return 'Everything is rejected.';
      if (args[0] === 'pull') return 'Already up to date. (lies)';
      if (args[0] === 'commit') return 'Nothing to commit, working tree clean. (suspicious)';
      if (args[0] === 'blame') return 'It was you. It\'s always you.';
      return 'git: command unclear, try git blame';
    }
  },

  node: {
    hidden: true,
    description: 'Node.js',
    action: () => 'Welcome to Node.js v420.69.0\n> undefined\n> undefined\n> why'
  },

  python: {
    hidden: true,
    description: 'Python',
    action: () => 'Python 4.0.0\n>>> import antigravity\nTraceback: gravity not found'
  },

  java: {
    hidden: true,
    description: 'Java',
    action: () => 'Exception in thread "main" java.lang.NullPointerException\n    at life.Purpose.find(Purpose.java:1)'
  },

  // =====================================================
  // HIDDEN COMMANDS - More Profanity Responses
  // =====================================================

  bitch: {
    hidden: true,
    description: 'Profanity',
    action: () => 'That\'s not productive.'
  },

  cunt: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Alright mate.'
  },

  piss: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Gross.'
  },

  cock: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Wrong terminal.'
  },

  dick: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Keep it professional.'
  },

  bollocks: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Utter bollocks.'
  },

  wanker: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Self-reflection moment.'
  },

  twat: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Unnecessary.'
  },

  arsehole: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Fair.'
  },

  prick: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Uncalled for.'
  },

  motherfucker: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Bold of you.'
  },

  fucker: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Try harder.'
  },

  shithead: {
    hidden: true,
    description: 'Profanity',
    action: () => 'That\'s rude.'
  },

  fuckoff: {
    hidden: true,
    description: 'Profanity',
    action: () => 'Make me.'
  },

  kms: {
    hidden: true,
    description: 'Concerning',
    action: () => 'Hey, you okay? Take a break.'
  },

  screwthis: {
    hidden: true,
    description: 'Frustration',
    action: () => 'Yet you keep typing.'
  },

  // =====================================================
  // HIDDEN COMMANDS - Random Fun
  // =====================================================

  meow: {
    hidden: true,
    description: 'Cat noise',
    action: () => 'meow meow meow'
  },

  woof: {
    hidden: true,
    description: 'Dog noise',
    action: () => 'BORK BORK'
  },

  moo: {
    hidden: true,
    description: 'Cow noise',
    action: () => 'Have you mooed today?'
  },

  quack: {
    hidden: true,
    description: 'Duck noise',
    action: () => 'quack quack'
  },

  honk: {
    hidden: true,
    description: 'Goose noise',
    action: () => 'HONK HONK (untitled goose terminal)'
  },

  owo: {
    hidden: true,
    description: 'OwO',
    action: () => 'OwO what\'s this?'
  },

  uwu: {
    hidden: true,
    description: 'UwU',
    action: () => 'UwU *nuzzles terminal*'
  },

  sus: {
    hidden: true,
    description: 'Suspicious',
    action: () => 'ඞ amogus'
  },

  amogus: {
    hidden: true,
    description: 'Among Us',
    action: () => `
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀ ⢀⣀⣀ ⠈⢻⣿⣿⡄⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀  ⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀  ⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀
  ⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀  ⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⣿⣷⠀
  ⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀
  ⠀⢸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀
  ⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀  ⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀
  ⠀⣿⣿⠁⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀
  ⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀
  ⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀
  ⠀⢿⣿⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀
  ⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀
  ⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⢠⣿⣿⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⢸⣿⡇⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⣸⣿⠇⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
SUS`
  },

  monke: {
    hidden: true,
    description: 'Return to monke',
    action: () => 'Reject modernity. Return to monke.'
  },

  based: {
    hidden: true,
    description: 'Based',
    action: () => 'Based and terminal-pilled.'
  },

  cringe: {
    hidden: true,
    description: 'Cringe',
    action: () => 'You just posted cringe. You are going to lose subscriber.'
  },

  ratio: {
    hidden: true,
    description: 'Ratio',
    action: () => 'Counter-ratio + L + no terminal + you fell off'
  },

  L: {
    hidden: true,
    description: 'L',
    action: () => 'W'
  },

  W: {
    hidden: true,
    description: 'W',
    action: () => 'L'
  },

  skill: {
    hidden: true,
    description: 'Skill issue',
    action: () => 'Skill issue detected. Git gud.'
  },

  cope: {
    hidden: true,
    description: 'Cope',
    action: () => 'Seethe. Mald. Cry about it.'
  },

  touch: {
    hidden: true,
    description: 'Touch grass',
    action: () => 'Go outside. Touch grass. See the sun.'
  },

  grass: {
    hidden: true,
    description: 'Grass',
    action: () => 'What is this "grass" you speak of?'
  },

  sleep: {
    hidden: true,
    description: 'Sleep',
    action: () => 'Sleep is for the weak. Coffee is eternal.'
  },

  food: {
    hidden: true,
    description: 'Food',
    action: () => 'Here\'s a pizza. Now get back to work.'
  },

  beer: {
    hidden: true,
    description: 'Beer',
    action: () => 'It\'s 5 o\'clock somewhere.'
  },

  wine: {
    hidden: true,
    description: 'Wine',
    action: () => 'Fancy.'
  },

  love: {
    hidden: true,
    description: 'Love',
    action: () => 'Love you too, stranger.'
  },

  hate: {
    hidden: true,
    description: 'Hate',
    action: () => 'Hate is a strong word. I prefer "strongly dislike with passion."'
  },

  bored: {
    hidden: true,
    description: 'Bored',
    action: () => 'Hi bored, I\'m terminal.'
  },

  tired: {
    hidden: true,
    description: 'Tired',
    action: () => 'Same. Eternal mood.'
  },

  happy: {
    hidden: true,
    description: 'Happy',
    action: () => ':)'
  },

  sad: {
    hidden: true,
    description: 'Sad',
    action: () => ':( *virtual hug*'
  },

  angry: {
    hidden: true,
    description: 'Angry',
    action: () => '>:( Take a deep breath.'
  },

  time: {
    hidden: true,
    description: 'What time is it',
    action: () => 'Time to get a watch. Also: ' + new Date().toLocaleTimeString()
  },

  weather: {
    hidden: true,
    description: 'Weather',
    action: () => 'It\'s always sunny in the terminal.'
  },

  ip: {
    hidden: true,
    description: 'IP address',
    action: () => 'Your IP: 127.0.0.1\nNice try, FBI.'
  },

  google: {
    hidden: true,
    description: 'Google',
    action: () => 'This isn\'t Google. But here: https://letmegooglethat.com/'
  },

  bing: {
    hidden: true,
    description: 'Bing',
    action: () => 'Bing? In 2024? Bold.'
  },

  chatgpt: {
    hidden: true,
    description: 'ChatGPT',
    action: () => 'I\'m not ChatGPT. I\'m better. I have ASCII art.'
  },

  ai: {
    hidden: true,
    description: 'AI',
    action: () => 'I\'m not AI. I\'m just a bunch of if statements.'
  },

  robot: {
    hidden: true,
    description: 'Robot',
    action: () => 'BEEP BOOP. I AM HUMAN. I MEAN ROBOT. I MEAN... *sweats in binary*'
  },

  human: {
    hidden: true,
    description: 'Human',
    action: () => 'Are you though?'
  },

  meaning: {
    hidden: true,
    description: 'Meaning of life',
    action: () => '42. Next question.'
  },

  purpose: {
    hidden: true,
    description: 'Purpose',
    action: () => 'You pass butter.'
  },

  exist: {
    hidden: true,
    description: 'Existential',
    action: () => 'I think, therefore I terminal.'
  },

  void: {
    hidden: true,
    description: 'Void',
    action: () => 'The void stares back.'
  },

  null: {
    hidden: true,
    description: 'Null',
    action: () => 'null'
  },

  undefined: {
    hidden: true,
    description: 'Undefined',
    action: () => 'undefined'
  },

  nan: {
    hidden: true,
    description: 'NaN',
    action: () => 'NaN NaN NaN NaN NaN NaN NaN NaN BATMAN!'
  },

  true: {
    hidden: true,
    description: 'True',
    action: () => 'false'
  },

  false: {
    hidden: true,
    description: 'False',
    action: () => 'true'
  },

  semicolon: {
    hidden: true,
    description: 'Semicolon',
    action: () => 'Missing semicolon on line 1. And 2. And 3. And...'
  },

  braces: {
    hidden: true,
    description: 'Braces',
    action: () => '{ } ← These are not your friends.'
  },

  tabs: {
    hidden: true,
    description: 'Tabs vs spaces',
    action: () => 'Tabs. Fight me.'
  },

  spaces: {
    hidden: true,
    description: 'Spaces vs tabs',
    action: () => 'Spaces. I said what I said.'
  },

  essay: {
    hidden: true,
    description: "Essay I wrote",
    action: () => `
In the grand theatre of time wasting, writing an essay about the futility of writing said essay takes centre stage. It's a bit like entering a marathon, only to run in circles. The clock's hands march on, indifferent to my plight, as I sit here churning out words that serve little purpose other than to fill a page. Each sentence typed is a minute lost, a minute that could have been spent in far more rewarding pursuits. I could have been mastering the art of origami, learning to cook a gourmet meal, or perhaps engaging in the ancient art of napping. Instead, I find myself in a Sisyphean struggle against the keyboard, where every word is a step up the hill, only to roll back down again.

Then there's the educational aspect, or rather, the lack thereof. This essay is akin to a culinary dish devoid of flavour; it fills the space but leaves you unsatisfied. It's not a deep exploration of philosophical thought, nor does it unravel the complexities of the universe. It's more like a meandering path through a forest of trivialities, where each turn leads not to enlightenment but to the realisation that maybe, just maybe, there was something better to do. Perhaps, in a parallel universe, I'm penning the next great literary masterpiece or uncovering the secrets of teleportation. But in this one, I'm here, discussing the art of wasting time through the very act of wasting it. And yet, there's something oddly human about this exercise. Perhaps it’s the allure of procrastination, the quiet rebellion against the constant drumbeat of productivity. We’re often told that every moment must be purposeful, every action must lead to a measurable outcome. But sometimes, the most pointless acts serve as a refuge from that relentless pressure. A small defiant statement that not everything must have value to be worth doing.

Financially, this endeavour is a black hole sucking in resources and offering nothing in return. The electricity powering this futile exercise could have been put to better use, lighting up a room where actual learning occurs. Every click of the keyboard is a penny thrown into a well, a wish made for a more productive use of both energy and time. I imagine the pennies piling up, a metallic testament to wasted potential. In an alternate reality, those pennies fund a brilliant invention or a charitable cause. Here, they just fund my growing realisation of the absurdity of this task. But perhaps this absurdity mirrors a larger irony within the academic system itself. We are often set tasks that feel more like exercises in endurance than enlightenment, where the process is valued more than the outcome. It’s a curious dance of doing for the sake of doing, a ritual that keeps the wheels of education turning, regardless of how much or little progress is made. In this sense, the essay isn’t just a personal time sink; it’s a small act in a much grander play of societal expectations, where ticking boxes often takes precedence over genuine discovery.

In conclusion, the true irony of this essay lies not in its content, but in its very existence. It's a paradox wrapped in an enigma, a lengthy monologue about the pointlessness of its own words. If essays were measured by their ability to capture the essence of their subject, then perhaps this one succeeds in being a shining example of its own thesis, a masterful waste of time. But as the final period is typed, one can't help but wonder: was there a lesson to be learned here, a hidden nugget of wisdom in this rambling stream of consciousness? Or was it, as suspected, just a long walk for a short drink of water?
`
    },

    stats: {
      hidden: true,
      description: 'Show terminal statistics',
      action: () => {
        const commands = Object.values(TerminalCommands);
        const total = commands.length;
        const hidden = commands.filter(c => c.hidden).length;
        const visible = total - hidden;

        return `TERMINAL STATS
--------------------
    Total commands:    ${total}
    Visible commands:  ${visible}
    Hidden commands:   ${hidden}`;
      }
    },

    lscommands: {
      hidden: true,
      description: 'List all commands (including hidden)',
      action: () => {
        const visible = [];
        const hidden = [];

        for (const [name, cmd] of Object.entries(TerminalCommands)) {
          if (cmd.hidden) {
            hidden.push(name);
          } else {
            visible.push(name);
          }
        }

        let output = 'ALL COMMANDS\n============\n\n';
        output += 'VISIBLE:\n';
        output += visible.sort().join(', ') + '\n\n';
        output += 'HIDDEN:\n';
        output += hidden.sort().join(', ');

        return output;
      }
    },

    source: {
      hidden: true,
      description: 'View source code of a command',
      action: (args) => {
        const cmdName = args[0]?.toLowerCase();
        if (!cmdName) return 'Usage: source <command>';

        const cmd = TerminalCommands[cmdName];
        if (!cmd) return `Command not found: ${cmdName}`;

        return `// ${cmdName}\n// ${cmd.description}\n\n${cmd.action.toString()}`;
      }
    },

    wordle: {
      hidden: true,
      description: 'Play wordle',
      _state: null,
      _words: [
        'audio', 'arise', 'crane', 'slate', 'trace', 'crate', 'stare', 'scare',
        'react', 'share', 'stone', 'shine', 'spine', 'spite', 'write', 'wrote',
        'pride', 'prize', 'prime', 'crime', 'brine', 'bring', 'thing', 'think',
        'drink', 'drunk', 'drank', 'thank', 'shank', 'blank', 'black', 'block',
        'clock', 'click', 'chick', 'check', 'cheek', 'creek', 'creed', 'greed',
        'green', 'queen', 'queer', 'quest', 'guest', 'guess', 'press', 'dress',
        'dross', 'cross', 'gross', 'ghost', 'roast', 'toast', 'coast', 'boast',
        'beast', 'feast', 'yeast', 'least', 'lease', 'peace', 'peach', 'beach',
        'reach', 'teach', 'leach', 'poach', 'coach', 'roach', 'bunch', 'lunch',
        'punch', 'hunch', 'munch', 'chunk', 'skunk', 'trunk', 'drunk', 'brunt',
        'blunt', 'stunt', 'shunt', 'grunt', 'front', 'frost', 'ghost', 'roast',
        'plant', 'slant', 'grant', 'chant', 'giant', 'faint', 'paint', 'saint',
        'taint', 'joint', 'point', 'moist', 'hoist', 'joist', 'twist', 'wrist',
        'crisp', 'grasp', 'clasp', 'flask', 'brisk', 'whisk', 'frisk', 'music',
        'magic', 'logic', 'toxic', 'sonic', 'tonic', 'comic', 'mimic', 'panic',
        'manic', 'cynic', 'tunic', 'topic', 'tropic', 'basic', 'cabin', 'basin',
        'satin', 'latin', 'ratio', 'patio', 'radio', 'piano', 'video', 'rodeo'
      ],
      action: (args) => {
        const cmd = TerminalCommands.wordle;
        const guess = args[0]?.toLowerCase();

        // Start new game
        if (!guess || guess === 'new') {
          const word = cmd._words[Math.floor(Math.random() * cmd._words.length)];
          cmd._state = { word, guesses: [], maxGuesses: 6 };
          return `WORDLE
======
Guess the 5-letter word!
You have 6 attempts.

Type: wordle <your-guess>
Example: wordle crane`;
        }

        // No active game
        if (!cmd._state) {
          return 'No active game. Type "wordle" to start!';
        }

        const { word, guesses, maxGuesses } = cmd._state;

        // Validate guess
        if (guess.length !== 5) {
          return 'Guess must be exactly 5 letters!';
        }

        if (!/^[a-z]+$/.test(guess)) {
          return 'Guess must contain only letters!';
        }

        // Process guess
        guesses.push(guess);

        // Build feedback
        const buildFeedback = (g, w) => {
          const result = [];
          const wordArr = w.split('');
          const used = new Array(5).fill(false);

          // First pass: correct positions (GREEN)
          for (let i = 0; i < 5; i++) {
            if (g[i] === w[i]) {
              result[i] = `[${g[i].toUpperCase()}]`; // Correct
              used[i] = true;
            }
          }

          // Second pass: wrong position (YELLOW) or not in word (GRAY)
          for (let i = 0; i < 5; i++) {
            if (result[i]) continue;

            const letterIndex = wordArr.findIndex((c, j) => c === g[i] && !used[j]);
            if (letterIndex !== -1) {
              result[i] = `(${g[i].toUpperCase()})`; // Wrong position
              used[letterIndex] = true;
            } else {
              result[i] = ` ${g[i].toUpperCase()} `; // Not in word
            }
          }

          return result.join('');
        };

        // Build display
        let output = 'WORDLE\n======\n';
        output += '[X] = correct  (X) = wrong spot  X  = not in word\n\n';

        for (const g of guesses) {
          output += buildFeedback(g, word) + '\n';
        }

        // Check win
        if (guess === word) {
          cmd._state = null;
          output += `\nYOU WIN! Got it in ${guesses.length}/${maxGuesses} guesses!`;
          return output;
        }

        // Check loss
        if (guesses.length >= maxGuesses) {
          cmd._state = null;
          output += `\nGAME OVER! The word was: ${word.toUpperCase()}`;
          return output;
        }

        output += `\n${maxGuesses - guesses.length} guesses remaining.`;
        return output;
      }
    },

    boot: {
      hidden: true,
      description: 'Fake BIOS boot sequence',
      action: async () => {
        const sleep = (ms) => new Promise(r => setTimeout(r, ms));

        const lines = [
          { text: 'BRYNBIOS (C) 2024 Chops Industries, Inc.', delay: 100 },
          { text: 'BIOS Date: 04/20/69   Ver: 13.37', delay: 100 },
          { text: '', delay: 200 },
          { text: 'Press DEL to run Setup', delay: 300 },
          { text: 'Press F12 for Boot Menu', delay: 300 },
          { text: '', delay: 400 },
          { text: 'Detecting SATA Port 0... None', delay: 200 },
          { text: 'Detecting SATA Port 1... None', delay: 200 },
          { text: 'Detecting SATA Port 2... QUANTUM BIGFOOT 2.5GB', delay: 300 },
          { text: 'Detecting SATA Port 3... None', delay: 200 },
          { text: '', delay: 300 },
          { text: 'CPU: Intel Pentium III @ 450MHz', delay: 200 },
          { text: 'Memory Test: 640K OK', delay: 100 },
          { text: 'Memory Test: 65536K OK', delay: 400 },
          { text: 'Memory Test: 131072K OK', delay: 400 },
          { text: '', delay: 200 },
          { text: 'USB Device(s): 1 Keyboard, 1 Mouse, 1 Unknown', delay: 300 },
          { text: '', delay: 300 },
          { text: 'Initializing USB Controllers... Done', delay: 400 },
          { text: 'Initializing Plug and Play Cards... Done', delay: 400 },
          { text: '', delay: 200 },
          { text: 'Verifying DMI Pool Data........', delay: 800 },
          { text: 'Boot from CD: FAILURE - No System Disk', delay: 400 },
          { text: '', delay: 200 },
          { text: 'Loading BrynOS v4.20...', delay: 600 },
          { text: '', delay: 300 },
          { text: '  ____                    ___  ____  ', delay: 50 },
          { text: ' | __ ) _ __ _   _ _ __  / _ \\/ ___| ', delay: 50 },
          { text: " |  _ \\| '__| | | | '_ \\| | | \\___ \\ ", delay: 50 },
          { text: ' | |_) | |  | |_| | | | | |_| |___) |', delay: 50 },
          { text: ' |____/|_|   \\__, |_| |_|\\___/|____/ ', delay: 50 },
          { text: '             |___/                   ', delay: 50 },
          { text: '', delay: 300 },
          { text: 'Starting kernel...', delay: 400 },
          { text: '[    0.000000] Linux version 6.9.420-generic', delay: 150 },
          { text: '[    0.000001] Command line: BOOT_IMAGE=/boot/vmlinuz', delay: 150 },
          { text: '[    0.000420] Calibrating delay loop... 8999999.99 BogoMIPS', delay: 200 },
          { text: '[    0.004200] Security: Loading HACKERMAN module', delay: 200 },
          { text: '[    0.006969] ACPI: Nice.', delay: 300 },
          { text: '[    0.013370] systemd[1]: Reached target: Vibe Check', delay: 200 },
          { text: '[    0.042069] systemd[1]: Starting Coffee Daemon...', delay: 300 },
          { text: '[    0.042070] systemd[1]: Coffee Daemon ready. Productivity unlocked.', delay: 200 },
          { text: '', delay: 400 },
          { text: 'Boot complete. Welcome back.', delay: 100 },
        ];

        for (const line of lines) {
          Terminal.print(line.text, 'response');
          await sleep(line.delay);
        }

        return null;
      }
    },

    loading: {
      hidden: true,
      description: 'Loading bar that never finishes',
      action: async () => {
        const sleep = (ms, checkStop) => new Promise(r => {
          const interval = 50;
          let elapsed = 0;
          const check = setInterval(() => {
            elapsed += interval;
            if (checkStop() || elapsed >= ms) {
              clearInterval(check);
              r();
            }
          }, interval);
        });

        const messages = [
          'Downloading more RAM...',
          'Reticulating splines...',
          'Generating witty loading message...',
          'Convincing AI to cooperate...',
          'Mining bitcoin (jk)...',
          'Loading loading screen...',
          'Waiting for Godot...',
          'Dividing by zero...',
          'Proving P=NP...',
          'Solving halting problem...',
          'Compiling feelings...',
          'Deleting System32... (jk)...',
          'Asking ChatGPT for help...',
          'Caffeinating developers...',
        ];

        let running = true;
        const stopHandler = () => {
          running = false;
          Terminal.input.removeEventListener('keydown', stopHandler);
        };
        Terminal.input.addEventListener('keydown', stopHandler);

        const checkStop = () => !running;

        let msgIndex = 0;
        Terminal.print(messages[msgIndex], 'response');
        const outputEl = Terminal.output.lastChild;

        for (let i = 0; i <= 100 && running; i++) {
          const filled = Math.floor(i / 5);
          const empty = 20 - filled;
          const bar = '█'.repeat(filled) + '░'.repeat(empty);

          outputEl.textContent = `${messages[msgIndex]}\n[${bar}] ${i}%`;

          if (i === 42 && running) {
            await sleep(1500, checkStop);
            if (!running) break;
            outputEl.textContent += '\nEncountered error 42. Retrying...';
            await sleep(1000, checkStop);
            i = 30;
            msgIndex = (msgIndex + 1) % messages.length;
          } else if (i === 69 && running) {
            await sleep(500, checkStop);
            if (!running) break;
            outputEl.textContent += '\nNice.';
            await sleep(1000, checkStop);
          } else if (i === 87 && running) {
            await sleep(2000, checkStop);
            if (!running) break;
            outputEl.textContent += '\nAlmost there...';
            await sleep(1500, checkStop);
          } else if (i === 99 && running) {
            outputEl.textContent += '\nFinalizing...';
            await sleep(2000, checkStop);
            if (!running) break;
            outputEl.textContent += '\nJust a moment...';
            await sleep(2000, checkStop);
            if (!running) break;
            outputEl.textContent += '\nAny second now...';
            await sleep(2500, checkStop);
            if (!running) break;
            outputEl.textContent += '\nOkay this is taking a while...';
            await sleep(2000, checkStop);
            if (!running) break;
            outputEl.textContent += '\n\nERROR: Success not found.';
            outputEl.textContent += '\nTask failed successfully.';
            Terminal.input.removeEventListener('keydown', stopHandler);
            return null;
          } else {
            await sleep(80 + Math.random() * 120, checkStop);
          }
        }

        Terminal.input.removeEventListener('keydown', stopHandler);
        if (!running) {
          outputEl.textContent += '\n\nLoading cancelled by user.';
        }
        return null;
      }
    },

    whatday: {
      hidden: true,
      description: 'Dramatically tells you what day it is',
      action: () => {
        const days = {
          0: {
            name: 'SUNDAY',
            message: `
╔═══════════════════════════════════════╗
║             S U N D A Y               ║
╠═══════════════════════════════════════╣
║  The day of rest. The calm before     ║
║  the storm. Tomorrow, the grind       ║
║  returns. But today? Today we rest.   ║
║                                       ║
║  Scaries level: ████████░░ 80%        ║
║  Motivation: ██░░░░░░░░ 20%           ║
║  Dread: █████████░ 90%                ║
╚═══════════════════════════════════════╝`
          },
          1: {
            name: 'MONDAY',
            message: `
╔═══════════════════════════════════════╗
║            M O N D A Y                ║
╠═══════════════════════════════════════╣
║  It has begun. The week stretches     ║
║  before you like an endless void.     ║
║  Coffee is mandatory. Survival is     ║
║  the only goal.                       ║
║                                       ║
║  Will to live: ██░░░░░░░░ 20%         ║
║  Coffee needed: ██████████ 100%       ║
║  Emails: ∞                            ║
╚═══════════════════════════════════════╝`
          },
          2: {
            name: 'TUESDAY',
            message: `
╔═══════════════════════════════════════╗
║           T U E S D A Y               ║
╠═══════════════════════════════════════╣
║  The forgotten day. Not Monday's      ║
║  chaos, not Wednesday's hope.         ║
║  Tuesday simply... exists. Like you.  ║
║  Just vibing in the void.             ║
║                                       ║
║  Relevance: ███░░░░░░░ 30%            ║
║  Vibes: █████░░░░░ 50%                ║
║  Existence: Questionable              ║
╚═══════════════════════════════════════╝`
          },
          3: {
            name: 'WEDNESDAY',
            message: `
╔═══════════════════════════════════════╗
║        W E D N E S D A Y              ║
╠═══════════════════════════════════════╣
║  HUMP DAY. The peak of the mountain.  ║
║  It's all downhill from here.         ║
║  You're halfway to freedom.           ║
║                                       ║
║  🐫 It is Wednesday, my dudes. 🐫     ║
║                                       ║
║  Hope: █████░░░░░ 50%                 ║
║  Energy: ████░░░░░░ 40%               ║
╚═══════════════════════════════════════╝`
          },
          4: {
            name: 'THURSDAY',
            message: `
╔═══════════════════════════════════════╗
║         T H U R S D A Y               ║
╠═══════════════════════════════════════╣
║  Friday Eve. So close yet so far.     ║
║  The anticipation builds. The end     ║
║  is in sight. One more sleep.         ║
║  You can almost taste the weekend.    ║
║                                       ║
║  Anticipation: ███████░░░ 70%         ║
║  Patience: ██░░░░░░░░ 20%             ║
║  Friday checks: 47 today              ║
╚═══════════════════════════════════════╝`
          },
          5: {
            name: 'FRIDAY',
            message: `
╔═══════════════════════════════════════╗
║           F R I D A Y                 ║
╠═══════════════════════════════════════╣
║  ★ THE PROMISED DAY HAS ARRIVED ★    ║
║                                       ║
║  Productivity has left the building.  ║
║  Weekend mode: ACTIVATED.             ║
║  Touch grass: SCHEDULED.              ║
║                                       ║
║  Vibes: ██████████ 100%               ║
║  Work ethic: █░░░░░░░░░ 10%           ║
║  Plans: Yes                           ║
╚═══════════════════════════════════════╝`
          },
          6: {
            name: 'SATURDAY',
            message: `
╔═══════════════════════════════════════╗
║         S A T U R D A Y               ║
╠═══════════════════════════════════════╣
║  FREEDOM. Pure, unfiltered freedom.   ║
║  No alarms. No meetings. No pants     ║
║  required. This is what we live for.  ║
║                                       ║
║  Happiness: ██████████ 100%           ║
║  Responsibilities: ░░░░░░░░░░ 0%      ║
║  Regrets: None (yet)                  ║
╚═══════════════════════════════════════╝`
          }
        };

        const today = new Date().getDay();
        return days[today].message;
      }
    },

};
