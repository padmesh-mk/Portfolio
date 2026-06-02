/**
 * Modern Cybersecurity & Discord Bot Developer Portfolio - Main JS
 * Powered by ES6 JavaScript and Lucide Icons
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Theme Configuration & Core Initializations ---
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initMatrixRain();
  initTypewriter();
  initSkillsAnimation();
  initTerminalEmulator();
});

/* ==========================================================================
   1. NAVBAR EFFECTS (Scroll & Glow)
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. MOBILE HAMBURGER NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item, .nav-cta');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking nav items
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* ==========================================================================
   3. SCROLL SPY & ACTIVE SECTION NAV HIGHLIGHTS
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies mid-viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
}

/* ==========================================================================
   4. MATRIX CODE DIGITAL RAIN BACKGROUND
   ========================================================================== */
function initMatrixRain() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Set Canvas Dimension
  function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Characters used for rain effect (binary & hex keys)
  const chars = '01ABCDEF0123456789🛡️💻🔒📡📶⚡🤖'.split('');
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  
  // Array to track drops y-position for each column
  let drops = [];
  function initializeDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Offset start heights for visual organic flow
    }
  }
  
  initializeDrops();
  window.addEventListener('resize', initializeDrops);

  // Draw loop
  function draw() {
    // Semi-transparent background creates trailing blur effect
    ctx.fillStyle = 'rgba(5, 8, 17, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set custom glowing matrix green/cyan colors
    ctx.fillStyle = '#00e5ff';
    ctx.font = `bold ${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      // Pick random character
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      // Draw character
      ctx.fillText(char, x, y);
      
      // Reset drop to top randomly once it exceeds viewport height
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Increment drop position
      drops[i] += 0.85;
    }
    
    requestAnimationFrame(draw);
  }
  
  // Delay slightly to let initial page load complete smoothly
  setTimeout(() => {
    draw();
  }, 100);
}

/* ==========================================================================
   5. DYNAMIC TYPEWRITER EFFECT (Hero Subtitle)
   ========================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typewriterText');
  if (!targetElement) return;

  const phrases = [
    '> B.E. CSE with Specialization in Cybersecurity',
    '> Python Developer',
    '> Penetration Tester & HTB Player',
    '> Embedded Systems Enthusiast',
    '> Securing API Handshakes'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30; // Faster deletion speed
    } else {
      targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80; // Standard typing speed
    }

    // Caret simulation blinking at end
    targetElement.textContent += '|';

    // Handle typing phases switches
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Fully typed, pause before deletion
      isDeleting = true;
      typingSpeed = 2000; // Pause duration
    } else if (isDeleting && charIndex === 0) {
      // Fully deleted, move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing new word
    }

    // Strip trailing caret bar when starting erase to avoid double bar representation
    if (charIndex === 0 && !isDeleting) {
      targetElement.textContent = '';
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   6. SKILLS PROGRESS BARS & COUNT-UP ANIMATION
   ========================================================================== */
function initSkillsAnimation() {
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar');
  const percentTextList = document.querySelectorAll('.skill-percentage');
  
  if (!skillsSection) return;

  const options = {
    threshold: 0.15 // Trigger animation when 15% of section is visible
  };

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        
        // 1. Animate skill bars widths
        skillBars.forEach(bar => {
          const widthVal = bar.getAttribute('data-width');
          bar.style.width = widthVal;
        });

        // 2. Count-up skill percentages text
        percentTextList.forEach(item => {
          const target = parseInt(item.getAttribute('data-target'), 10);
          let count = 0;
          const duration = 1500; // Align with CSS transitions
          const stepTime = Math.abs(Math.floor(duration / target));
          
          const timer = setInterval(() => {
            count++;
            item.textContent = `${count}%`;
            if (count >= target) {
              clearInterval(timer);
            }
          }, stepTime);
        });
      }
    });
  }, options);

  observer.observe(skillsSection);
}



/* ==========================================================================
   8. SECURE TERMINAL EMULATOR (Contact State Machine)
   ========================================================================== */
function initTerminalEmulator() {
  const terminalWindow = document.getElementById('terminalWindow');
  const terminalContent = document.getElementById('terminalContent');
  const terminalInput = document.getElementById('terminalInput');
  const terminalCursor = document.getElementById('terminalCursor');
  
  if (!terminalInput || !terminalContent) return;

  // Secure Message Input Handler States
  // State 0: Default shell prompt
  // State 1: Awaiting E-mail Address for contact flow
  // State 2: Awaiting message details
  let contactState = 0;
  let contactDetails = {
    email: '',
    message: ''
  };

  // Focus terminal input when clicking anywhere on the terminal window
  terminalWindow.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Track standard typing to position matching mock caret blinking
  terminalInput.addEventListener('input', () => {
    // Keep custom cursor active
  });

  // Listen to keystrokes
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = terminalInput.value.trim();
      terminalInput.value = '';
      
      if (value !== '' || contactState > 0) {
        handleTerminalCommand(value);
      }
    }
  });

  // Default welcome ASCII banner
  const asciiBanner = `
   ________.__         .__               
  /  _____/|__|_____  |  |__   ____  ___ 
 /   \\  ___|  \\____ \\ |  |  \\_/ __ \\/ __\\
 \\    \\_\\  \\  |  |_> >|   Y  \\  ___/\\  __
  \\______  /__|   __/ |___|  /\\___  \\___ 
         \\/   |__|         \\/     \\/    \\/
* GUEST PORTAL GATEWAY CONNECTED SUCCESSFULLY *
`;

  function printLine(text, styleClass = '') {
    const line = document.createElement('div');
    line.className = `terminal-log ${styleClass}`;
    line.innerHTML = text;
    terminalContent.appendChild(line);
    
    // Auto Scroll bottom
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  function handleTerminalCommand(input) {
    // Echo current input line back to stdout first
    const prompt = contactState > 0 ? '>' : 'guest@cybershield:~$';
    printLine(`<span class="terminal-prompt">${prompt}</span> <span class="terminal-user-cmd">${escapeHTML(input)}</span>`);

    // --- State 1: Awaiting E-mail ---
    if (contactState === 1) {
      if (input.includes('@') && input.includes('.')) {
        contactDetails.email = input;
        contactState = 2;
        printLine(`[SYSTEM] E-mail cached. Encrypted session bound.`, 'terminal-sys-msg');
        printLine(`[SYSTEM] Enter your transmission payload (secure message):`, 'terminal-sys-msg');
      } else {
        printLine(`[!] Error: Invalid e-mail signature format. Re-enter:`, 'terminal-error-msg');
      }
      return;
    }

    // --- State 2: Awaiting Message Content ---
    if (contactState === 2) {
      if (input.length < 5) {
        printLine(`[!] Error: Payload size too small. Re-enter message:`, 'terminal-error-msg');
      } else {
        contactDetails.message = input;
        contactState = 0; // Reset shell state
        
        printLine(`[SYSTEM] Constructing secure cipher envelope...`, 'terminal-sys-msg');
        
        setTimeout(() => {
          printLine(`[SYSTEM] Routing message payload via secure tunnel...`, 'terminal-sys-msg');
        }, 600);
        
        setTimeout(() => {
          printLine(`[SYSTEM] Performing Diffie-Hellman Key Exchange [SUCCESS]`, 'terminal-sys-msg');
        }, 1200);

        setTimeout(() => {
          printLine(`===================================================`, 'terminal-sys-msg');
          printLine(`[SUCCESS] Encryption handshake validated!`, 'terminal-success-msg');
          printLine(`[SUCCESS] Secure envelope delivered successfully.`, 'terminal-success-msg');
          printLine(`Thank you, PADMESH MK will respond soon.`, 'terminal-success-msg');
          printLine(`===================================================`, 'terminal-sys-msg');

          // Trigger Web3Forms silent background email dispatcher (with Mailto fallback)
          const accessKey = "eac6af6a-7d08-4041-acbd-84e462fff8d6"; // <-- Paste your free key from web3forms.com here
          
          const triggerMailtoFallback = () => {
            const subject = encodeURIComponent("[Portfolio Secure Handshake] Message from Guest");
            const body = encodeURIComponent(`Sender Signature: ${contactDetails.email}\n\nMessage Payload:\n${contactDetails.message}`);
            window.location.href = `mailto:padmeshmk@gmail.com?subject=${subject}&body=${body}`;
          };

          if (accessKey === "YOUR_ACCESS_KEY_HERE" || accessKey.trim() === "") {
            // No access key configured yet, gracefully use local mailto trigger directly
            triggerMailtoFallback();
          } else {
            printLine(`[SYSTEM] Initializing background secure transfer...`, 'terminal-sys-msg');
            
            fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                access_key: accessKey,
                name: "Portfolio Handshake Guest",
                email: contactDetails.email,
                message: contactDetails.message,
                subject: "[Secure Handshake] New Contact Message!"
              })
            })
            .then(res => res.json())
            .then(data => {
              if (data && data.success) {
                printLine(`[SYSTEM] Transmission verified and accepted by remote node.`, 'terminal-sys-msg');
                printLine(`[SUCCESS] Message successfully delivered to PADMESH MK.`, 'terminal-success-msg');
              } else {
                printLine(`[!] Gateway Alert: Silent routing failed. Falling back...`, 'terminal-error-msg');
                setTimeout(triggerMailtoFallback, 1200);
              }
            })
            .catch(() => {
              printLine(`[!] Connection Alert: Endpoint unreachable. Falling back...`, 'terminal-error-msg');
              setTimeout(triggerMailtoFallback, 1200);
            });
          }
        }, 1800);
      }
      return;
    }

    // --- Default Shell State (State 0) ---
    const cmd = input.toLowerCase().split(' ')[0];
    
    switch (cmd) {
      case 'help':
        printLine(`Available Cyber Commands:`);
        printLine(`  <span class="terminal-user-cmd">about</span>     - Verify developer identities`);
        printLine(`  <span class="terminal-user-cmd">skills</span>    - Retrieve core technical skills matrix`);
        printLine(`  <span class="terminal-user-cmd">projects</span>  - Review active deployed repositories`);
        printLine(`  <span class="terminal-user-cmd">contact</span>   - Initiate secure contact transmission protocol`);
        printLine(`  <span class="terminal-user-cmd">banner</span>    - Print initial gateway security seal`);
        printLine(`  <span class="terminal-user-cmd">clear</span>     - Wipe terminal logs screen buffer`);
        break;
        
      case 'about':
        printLine(`[IDENTITY RECORD]`);
        printLine(`Name: PADMESH MK`);
        printLine(`Role: B.E. Computer Science Student (Cybersecurity Specialization)`);
        printLine(`Focus: Ethical Hacking, Embedded Systems, Machine Learning Object Detection, Secure MFA`);
        printLine(`Education: Sathyabama Institute of Science and Technology, Expected 2026 (CGPA: 6.68/10)`);
        break;
        
      case 'skills':
        printLine(`[TECHNICAL MATRIX LOADED]`);
        printLine(`- Cybersecurity Concepts: Penetration Testing, VAPT, Multi-Factor Authentication (MFA), TOTP, Network Security`);
        printLine(`- Frameworks & Tools: Flask, FastAPI, PyTorch (Vision Transformers), OpenCV, WebSocket, Arduino IDE`);
        printLine(`- Arsenal Tools: Kali Linux, Metasploitable, Burp Suite, Hack The Box (HTB)`);
        break;
        
      case 'projects':
        printLine(`[ACTIVE SYSTEMS IN RANGE]`);
        printLine(`1. <span class="terminal-user-cmd">VisionTransformer</span>  - ViT-Based Object Detection with Real-Time Alerts [PyTorch/FastAPI]`);
        printLine(`2. <span class="terminal-user-cmd">MFASecurity</span>        - Two-Factor MFA System with TOTP QR Enrollment [Flask/PyOTP]`);
        printLine(`3. <span class="terminal-user-cmd">GasSmokeSensor</span>     - Smoke and Gas Detector using MQ-5 & Arduino [Arduino UNO/MQ-5/Python]`);
        break;
        
      case 'contact':
        contactState = 1;
        printLine(`[HANDSHAKE REQ] Initiating contact handshake...`, 'terminal-sys-msg');
        printLine(`[SYSTEM] Enter your secure return E-mail address:`, 'terminal-sys-msg');
        break;
        
      case 'banner':
        printLine(asciiBanner);
        break;
        
      case 'clear':
        terminalContent.innerHTML = '';
        printLine(`Gateway logs wiped. Type <span class="terminal-user-cmd">help</span> for commands.`, 'terminal-sys-msg');
        break;
        
      default:
        printLine(`[!] Access Error: Command '${escapeHTML(cmd)}' not found in system registers.`, 'terminal-error-msg');
        printLine(`Type <span class="terminal-user-cmd">help</span> to list active registers.`, 'terminal-sys-msg');
    }
  }

  // Escape input helper to prevent terminal XSS simulations
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}
