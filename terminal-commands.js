// =====================================================
// TERMINAL COMMANDS
// =====================================================
// Add your commands here! They will automatically appear in the terminal.
//
// FORMAT:
//   commandname: {
//     description: 'Shows in help menu',
//     hidden: false,  // Set to true to hide from help
//     action: (args) => {
//       // args = array of words after the command
//       // Return a string to display, or null for no output
//       return 'Output text';
//     }
//   },
//
// =====================================================

const TerminalCommands = {

  // =====================================================
  // STANDARD COMMANDS
  // =====================================================

  help: {
    description: 'Show available commands',
    action: () => {
      let output = 'Available commands:\n\n';
      for (const [name, cmd] of Object.entries(TerminalCommands)) {
        if (cmd.hidden) continue;
        output += `  ${name.padEnd(12)} - ${cmd.description}\n`;
      }
      output += '\nType a command and press Enter.';
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
This is a hidden feature unlocked by the Konami Code.

Type 'help' to see available commands.`;
    }
  },

  whoami: {
    description: 'Display current user',
    action: () => 'guest@bryncarter.dev'
  },

  date: {
    description: 'Show current date/time',
    action: () => new Date().toString()
  },

  echo: {
    description: 'Echo a message',
    action: (args) => args.join(' ') || ''
  },

  games: {
    description: 'List my games',
    action: () => {
      return `MY GAMES
--------
1. Stepping Stones  - Minimalist 2D platformer
2. Tilting Game     - Physics-based labyrinth
3. Asteroid Overcharge - Roguelike shooter
4. Sync Or Sink     - Rhythm game (team project)

Type 'open <number>' to visit the game page.`;
    }
  },

  open: {
    description: 'Open a game page (1-4)',
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
GitHub:  github.com/ChopsDev
Itch.io: chopsdev.itch.io
YouTube: youtube.com/@chops.
Email:   contact@chopsdev.com`;
    }
  },

  matrix: {
    description: 'Enter the matrix',
    action: () => {
      triggerMatrixRain();
      Terminal.close();
      return null;
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
  // HIDDEN COMMANDS (Easter eggs - not shown in help)
  // =====================================================

  sudo: {
    description: 'Superuser do',
    hidden: true,
    action: (args) => {
      if (args.length === 0) return 'Usage: sudo <command>';
      if (args.join(' ').toLowerCase().includes('make me a sandwich')) {
        return 'Okay.';
      }
      return 'Nice try, but you\'re not root here.';
    }
  },

  rickroll: {
    description: 'Never gonna give you up',
    hidden: true,
    action: () => {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      return 'Never gonna let you down...';
    }
  },

  coffee: {
    description: 'Make coffee',
    hidden: true,
    action: () => {
      return `
      ( (
       ) )
    ........
    |      |]
    \\      /
     '----'

418 I'm a teapot`;
    }
  },

  hello: {
    description: 'Secret greeting',
    hidden: true,
    action: () => 'Hello, fellow hacker!'
  },

  secret: {
    description: 'Find the secrets',
    hidden: true,
    action: () => {
      return `You found one of the hidden commands!

There are more secrets in this terminal...
There are over 50 hidden commands. Good luck finding them all.`;
    }
  },

  // Classic terminal jokes
  'rm': {
    hidden: true,
    description: 'Remove files',
    action: (args) => {
      if (args.join(' ').includes('-rf /')) {
        return `Nice try. I'm not falling for that one.

(╯°□°)╯︵ ┻━┻`;
      }
      return 'rm: missing operand';
    }
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
  |/ |   |-----------I_____I [][] []  D   |=======|__

You meant 'ls', didn't you?`
  },

  vim: {
    hidden: true,
    description: 'Open vim',
    action: () => `You are now trapped in vim.

Just kidding. But seriously, the exit is :q!

Or is it :wq? Or ZZ? Or :x?
Nobody knows.`
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

  ping: {
    hidden: true,
    description: 'Ping',
    action: () => 'pong'
  },

  pong: {
    hidden: true,
    description: 'Pong',
    action: () => 'ping'
  },

  // ASCII art responses
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

  // Fun responses
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
+      o         o   +       o
    +         +
o      o  +          o          +`
  },

  party: {
    hidden: true,
    description: 'Party time',
    action: () => `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▄▄▄▄▄▄▄░░░░░░░░░
░░░░░░░░░▄▀▀▀░░░░░░░▀▄░░░░░░░
░░░░░░░▄▀░░░░░░░░░░░░▀▄░░░░░░
░░░░░░▄▀░░░░░░░░░░▄▀▀▄▀▄░░░░░
░░░░▄▀░░░░░░░░░░▄▀░░██▄▀▄░░░░
░░░▄▀░░▄▀▀▀▄░░░░█░░░▀▀░█▀▄░░░
░░░█░░█▄▄░░░█░░░▀▄░░░░░▐░█░░░
░░▐▌░░█▀▀░░▄▀░░░░░▀▄▄▄▄▀░░█░░
░░▐▌░░█░░░▄▀░░░░░░░░░░░░░░█░░
░░▐▌░░░▀▀▀░░░░░░░░░░░░░░░░▐▌░
░░▐▌░░░░░░░░░░░░░░░▄░░░░░░▐▌░
░░▐▌░░░░░░░░░▄░░░░░█░░░░░░▐▌░
░░░█░░░░░░░░░▀█▄░░▄█░░░░░░▐▌░
░░░▐▌░░░░░░░░░░▀▀▀▀░░░░░░░▐▌░
░░░░█░░░░░░░░░░░░░░░░░░░░░█░░
░░░░▐▌▀▄░░░░░░░░░░░░░░░░░▐▌░░
░░░░░█░░▀░░░░░░░░░░░░░░░░▀░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
🎉 PARTY TIME! 🎉`
  },

  // Internet culture
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
      const laughs = ['haha', 'hehe', 'lmao', 'rofl', '😂', 'kek', 'lul'];
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

  // Classic references
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

  hello_world: {
    hidden: true,
    description: 'Classic',
    action: () => 'Hello, World!'
  },

  // System spoofs
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

  panic: {
    hidden: true,
    description: 'Kernel panic',
    action: () => `
KERNEL PANIC - NOT SYNCING: VFS: Unable to mount root fs

---[ end Kernel panic - not syncing: VFS: Unable to mount root fs ]---

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

  // Utility fun
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
    action: () => {
      return Math.random() < 0.5 ? '🪙 Heads!' : '🪙 Tails!';
    }
  },

  '8ball': {
    hidden: true,
    description: 'Magic 8 ball',
    action: (args) => {
      const responses = [
        'It is certain.',
        'Without a doubt.',
        'Yes, definitely.',
        'You may rely on it.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        "Don't count on it.",
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
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

      if (player === computer) return `You: ${player} | Me: ${computer}\nIt's a tie!`;

      const wins = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
      if (wins[player] === computer) {
        return `You: ${player} | Me: ${computer}\nYou win! 🎉`;
      }
      return `You: ${player} | Me: ${computer}\nI win! 😎`;
    }
  },

  random: {
    hidden: true,
    description: 'Random number',
    action: (args) => {
      const max = parseInt(args[0]) || 100;
      return Math.floor(Math.random() * max + 1).toString();
    }
  },

  // Math
  pi: {
    hidden: true,
    description: 'Show pi',
    action: () => '3.14159265358979323846264338327950288419716939937510...'
  },

  e: {
    hidden: true,
    description: 'Show e',
    action: () => '2.71828182845904523536028747135266249775724709369995...'
  },

  // Greetings
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
    action: () => "No worries, eh! 🍁"
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

  why: {
    hidden: true,
    description: 'Why',
    action: () => {
      const responses = [
        'Why not?',
        'Because I said so.',
        '42.',
        'The world may never know.',
        "That's a great question. Next question.",
        'Have you tried turning it off and on again?',
        '*shrugs in binary*'
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  },

  no: {
    hidden: true,
    description: 'No',
    action: () => 'Yes.'
  },

  yes: {
    hidden: true,
    description: 'Yes',
    action: () => 'No.'
  },

  // More fun
  scream: {
    hidden: true,
    description: 'Scream',
    action: () => 'AAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHH!!!'
  },

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
    action: (args) => {
      return args.join(' ').split('').reverse().join('');
    }
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
        'y': 'ʎ', 'z': 'z', '?': '¿', '!': '¡', '.': '˙', ',': "'"
      };
      return text.toLowerCase().split('').map(c => flip[c] || c).reverse().join('');
    }
  },

  joke: {
    hidden: true,
    description: 'Tell a joke',
    action: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "There are only 10 types of people: those who understand binary and those who don't.",
        "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
        "Why do Java developers wear glasses? Because they don't C#.",
        "What's a programmer's favorite hangout place? Foo Bar.",
        "Why did the developer go broke? Because he used up all his cache.",
        "What do you call 8 hobbits? A hobbyte.",
        "There's no place like 127.0.0.1",
        "I would tell you a UDP joke, but you might not get it.",
        "A programmer's wife tells him: 'Go to the store and get a loaf of bread. If they have eggs, get a dozen.' He comes back with 12 loaves of bread."
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
  },

  fortune: {
    hidden: true,
    description: 'Fortune cookie',
    action: () => {
      const fortunes = [
        "A beautiful, smart, and loving person will be coming into your life.",
        "A dubious friend may be an enemy in camouflage.",
        "A faithful friend is a strong defense.",
        "A fresh start will put you on your way.",
        "A golden egg of opportunity falls into your lap this month.",
        "Your code will compile on the first try.",
        "A merge conflict is in your future.",
        "The bug you seek is on line 42.",
        "Stack Overflow has the answer you need.",
        "Your next commit will break the build.",
        "Today is a good day to refactor.",
        "Documentation? Where we're going, we don't need documentation."
      ];
      return '🥠 ' + fortunes[Math.floor(Math.random() * fortunes.length)];
    }
  },

  b: {
    hidden: true,
    description: 'IT Crowd reference',
    action: () => 'Have you tried turning it off and on again?'
  },

  helpme: {
  description: 'Asks the terminal for help',
  hidden: false,
  action: () => 'No.'
},

clearbrain: {
  description: 'Clears your thoughts',
  hidden: true,
  action: () => 'Still thinking about chickens.'
},

status: {
  description: 'Shows system status',
  hidden: false,
  action: () => 'All systems operational. Morals offline.'
},

date: {
  description: 'Shows current date',
  hidden: false,
  action: () => new Date().toString()
},

uptime: {
  description: 'How long the system has been running',
  hidden: true,
  action: () => 'Too long.'
},

ping: {
  description: 'Ping the server',
  hidden: false,
  action: (args) => `Pinging ${args[0] || 'localhost'}... no response.`
},

motivation: {
  description: 'Get motivated',
  hidden: true,
  action: () => 'Grind harder.'
},

fortune: {
  description: 'Displays a fortune',
  hidden: true,
  action: () => 'A goose watches you.'
},

// =====================================================
// FAKE SYSTEM COMMANDS
// =====================================================

reboot: {
  description: 'Reboot the system',
  hidden: false,
  action: () => 'Reboot failed. Try again later.'
},

shutdown: {
  description: 'Shutdown the system',
  hidden: false,
  action: () => 'Permission denied.'
},

sudo: {
  description: 'Run command as superuser',
  hidden: false,
  action: () => 'You are not trusted.'
},

install: {
  description: 'Install a package',
  hidden: false,
  action: (args) => `Installing ${args[0] || 'nothing'}... failed.`
},

uninstall: {
  description: 'Remove a package',
  hidden: false,
  action: () => 'Nothing was removed. Everything is permanent.'
},

update: {
  description: 'Update the system',
  hidden: false,
  action: () => 'System already outdated.'
},

// =====================================================
// TENDER-THEMED COMMANDS
// =====================================================

grind: {
  description: 'Grind a chicken',
  hidden: true,
  action: () => 'Chicken processed.'
},

// =====================================================
// META / FOURTH WALL COMMANDS
// =====================================================

credits: {
  description: 'Show credits',
  hidden: false,
  action: () => 'Made with poor decisions.'
},

source: {
  description: 'View source code',
  hidden: false,
  action: () => 'Nice try.'
},

version: {
  description: 'Show version',
  hidden: false,
  action: () => 'v0.0.1-alpha-broken'
},

terms: {
  description: 'View terms and conditions',
  hidden: false,
  action: () => 'You already agreed.'
},

privacy: {
  description: 'View privacy policy',
  hidden: false,
  action: () => 'There is none.'
},

panic: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Too late.'
},

konami: {
  description: '???',
  hidden: true,
  action: () => 'Nothing happens.'
},

debuggod: {
  description: 'Enable god mode',
  hidden: true,
  action: () => 'God is unavailable.'
},

truth: {
  description: 'Reveal the truth',
  hidden: true,
  action: () => 'You knew already.'
},

fuck: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Fuck you too.'
},

shit: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Well… yeah.'
},

ass: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Grow up.'
},

bitch: {
  description: 'Do not use',
  hidden: true,
  action: () => 'That’s not productive.'
},

cunt: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Alright mate.'
},

damn: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Damn indeed.'
},

piss: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Gross.'
},

cock: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Wrong terminal.'
},

dick: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Keep it professional.'
},

motherfucker: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Bold of you.'
},

fucker: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Try harder.'
},

bollocks: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Utter bollocks.'
},

wanker: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Self-reflection moment.'
},

twat: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Unnecessary.'
},

arsehole: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Fair.'
},

prick: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Uncalled for.'
},

shithead: {
  description: 'Do not use',
  hidden: true,
  action: () => 'That’s rude.'
},

fuckoff: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Make me.'
},

fml: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Relatable.'
},

kms: {
  description: 'Do not use',
  hidden: true,
  action: () => 'No.'
},

hell: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Already here.'
},

screwthis: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Yet you keep typing.'
},

rage: {
  description: 'Do not use',
  hidden: true,
  action: () => 'Calm down.'
},

why: {
  description: 'Do not use',
  hidden: true,
  action: () => 'No answer.'
},

  // Example - Simple command:
  //
  // mycommand: {
  //   description: 'Does something cool',
  //   action: () => 'Hello from my command!'
  // },
  //
  // Example - Command with arguments:
  //
  // greet: {
  //   description: 'Greet someone',
  //   action: (args) => 'Hello, ' + (args[0] || 'stranger') + '!'
  // },
  //
  // Example - Hidden command:
  //
  // secretcmd: {
  //   description: 'A secret',
  //   hidden: true,
  //   action: () => 'You found me!'
  // },
  //


};
