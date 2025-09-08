document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Initially hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // After boot sequence completes
    setTimeout(() => {
        // Fade out the boot sequence
        const terminalWelcome = document.querySelector('.terminal-welcome');
        terminalWelcome.style.opacity = '0';
        
        // After fade out, hide it completely and show content
        setTimeout(() => {
            terminalWelcome.style.display = 'none';
            
            // Show all sections immediately
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'block';
                section.classList.add('visible');
            });
            
            // Create matrix rain effect
            createMatrixRain();
            
            // Start typing effect for the last command line
            const commandLine = document.querySelector('.section:last-child .command');
            startTypingEffect(commandLine);
            
            // Set up hover effects after content is shown
            setupHoverEffects();
        }, 500); // Wait for fade out to complete
    }, 3500); // After boot sequence completes
    
    // Matrix rain effect
    function createMatrixRain() {
        const matrixRain = document.createElement('canvas');
        matrixRain.className = 'matrix-rain';
        document.body.appendChild(matrixRain);
        
        const ctx = matrixRain.getContext('2d');
        matrixRain.width = window.innerWidth;
        matrixRain.height = window.innerHeight;
        
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fontSize = 14;
        const columns = matrixRain.width / fontSize;
        
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
            ctx.fillRect(0, 0, matrixRain.width, matrixRain.height);
            
            ctx.fillStyle = '#58a6ff';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > matrixRain.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
        
        // Resize handler
        window.addEventListener('resize', () => {
            matrixRain.width = window.innerWidth;
            matrixRain.height = window.innerHeight;
        });
    }
    
    // Typing effect function
    function startTypingEffect(element) {
        const commands = [
            'echo "Thanks for visiting!"',
            'ls -la projects/',
            'cat skills.md',
            'whoami',
            'ping -c 1 contact@roshan.dev'
        ];
        let currentCommandIndex = 0;
        
        function typeCommand(command) {
            let i = 0;
            element.textContent = '';
            element.classList.remove('blink');
            
            const typing = setInterval(() => {
                if (i < command.length) {
                    element.textContent += command.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    element.classList.add('blink');
                    
                    // Schedule next command
                    setTimeout(() => {
                        currentCommandIndex = (currentCommandIndex + 1) % commands.length;
                        typeCommand(commands[currentCommandIndex]);
                    }, 3000);
                }
            }, 100);
        }
        
        // Start typing the first command
        typeCommand(commands[currentCommandIndex]);
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add terminal command effect before scrolling
                const commandLines = document.querySelectorAll('.command-line');
                const lastCommandLine = commandLines[commandLines.length - 1];
                const newCommand = document.createElement('div');
                newCommand.className = 'command-line';
                newCommand.innerHTML = `
                    <span class="prompt">roshan@portfolio:~$</span>
                    <span class="command">cd ${targetId.substring(1)}</span>
                `;
                
                lastCommandLine.parentNode.insertBefore(newCommand, lastCommandLine);
                
                // Scroll to the section
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
    
    // Set up all hover effects
    function setupHoverEffects() {
        // Removed title hover effects
        
        // Add hover effect to skill categories
        document.querySelectorAll('.skill-category').forEach(skill => {
            skill.addEventListener('mouseover', () => {
                skill.style.boxShadow = '0 0 15px rgba(88, 166, 255, 0.4)';
            });
            
            skill.addEventListener('mouseout', () => {
                skill.style.boxShadow = 'none';
            });
        });
        
        // Add hover effect to projects
        document.querySelectorAll('.project').forEach(project => {
            project.addEventListener('mouseover', () => {
                project.style.boxShadow = '0 0 15px rgba(88, 166, 255, 0.4)';
            });
            
            project.addEventListener('mouseout', () => {
                skill.style.boxShadow = 'none';
            });
        });
    }
    
    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                const matrixRain = document.querySelector('.matrix-rain');
                if (matrixRain) {
                    matrixRain.style.opacity = '0.3';
                }
                
                // Reset
                konamiIndex = 0;
                
                // Revert after a while
                setTimeout(() => {
                    if (matrixRain) {
                        matrixRain.style.opacity = '0.07';
                    }
                }, 10000);
            }
        } else {
            konamiIndex = 0;
        }
    });
});
