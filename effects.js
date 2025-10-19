// Visual Effects for Luxury Romantic Website
// This file handles all the beautiful visual effects with Particles.js integration

let heartInterval;
let flowerInterval;
let isEffectsActive = false;
let particlesInstance = null;

// Initialize Particles.js with luxury romantic theme (DISABLED for performance)
function initializeParticles() {
    // Disabled for performance - particles cause lag
    console.log('Particles.js disabled for performance optimization');
    startFloatingHearts();
}

// Start floating hearts animation (legacy fallback)
function startFloatingHearts() {
    if (isEffectsActive) return;
    
    isEffectsActive = true;
    
    // Create hearts much less frequently for performance
    heartInterval = setInterval(() => {
        createFloatingHeart();
    }, 8000); // Every 8 seconds for better performance
    
    // Create only 1 initial heart for performance
    setTimeout(() => {
        createFloatingHeart();
    }, 1000);
}

// Create a single elegant floating heart with SVG
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'elegant-heart';
    
    // Create SVG heart with gradient
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 24 24');
    
    // Define gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'heartGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#8B0000;stop-opacity:0.8');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', 'stop-color:#B76E79;stop-opacity:0.6');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Create heart path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z');
    path.setAttribute('fill', 'url(#heartGradient)');
    path.setAttribute('filter', 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))');
    
    svg.appendChild(path);
    heart.appendChild(svg);
    
    // Random starting position
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.opacity = Math.random() * 0.4 + 0.3; // 0.3-0.7 opacity
    
    // Random size
    const size = Math.random() * 20 + 20; // 20-40px
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    
    // Random animation duration
    const duration = Math.random() * 6 + 8; // 8-14 seconds (slower, more elegant)
    heart.style.animationDuration = duration + 's';
    
    // Add to container
    const container = document.getElementById('floatingHearts');
    if (container) {
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, duration * 1000);
    }
}

// Remove falling flowers animation completely
function startFallingFlowers() {
    // Disabled for elegant design
    return;
}

// Create a single falling flower
function createFallingFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    
    // Random flower emojis
    const flowerEmojis = ['🌸'];
    const randomFlower = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.innerHTML = randomFlower;
    
    // Random starting position
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.fontSize = (Math.random() * 10 + 12) + 'px';
    
    // Random animation duration
    const duration = Math.random() * 5 + 10; // 10-15 seconds
    flower.style.animationDuration = duration + 's';
    
    // Random rotation and sway
    const sway = Math.random() * 50 - 25; // -25 to 25 degrees
    flower.style.setProperty('--sway', sway + 'deg');
    
    // Add to container
    const container = document.getElementById('fallingFlowers');
    if (container) {
        container.appendChild(flower);
        
        // Remove flower after animation
        setTimeout(() => {
            if (flower.parentNode) {
                flower.remove();
            }
        }, duration * 1000);
    }
}

// Create elegant glow effect instead of sparkles
function createSparkle(x, y) {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    glow.style.width = '20px';
    glow.style.height = '20px';
    glow.style.borderRadius = '50%';
    glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '1000';
    glow.style.animation = 'elegantGlow 2s ease-out forwards';
    
    document.body.appendChild(glow);
    
    // Remove glow after animation
    setTimeout(() => {
        glow.remove();
    }, 2000);
}

// Add sparkle animation to CSS dynamically
function addSparkleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleEffect {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0.8) rotate(360deg);
            }
        }
        
        @keyframes heartFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) rotate(var(--rotation, 360deg));
                opacity: 0;
            }
        }
        
        @keyframes elegantGlow {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            50% {
                opacity: 1;
                transform: scale(1.2);
            }
            100% {
                opacity: 0;
                transform: scale(1.5);
            }
        }
        
        .elegant-heart {
            animation: heartFloat 12s linear infinite;
            filter: blur(0.5px);
        }
        
        @keyframes flowerFall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.9;
            }
            90% {
                opacity: 0.9;
            }
            100% {
                transform: translateY(100vh) rotate(var(--sway, 360deg));
                opacity: 0;
            }
        }
        
        .elegant-heart {
            animation: heartFloat 12s linear infinite;
            filter: blur(0.5px);
        }
        
        .flower {
            animation: flowerFall 12s linear infinite;
        }
    `;
    document.head.appendChild(style);
}

// Add click sparkle effect
function addClickSparkles() {
    document.addEventListener('click', function(event) {
        // Only create sparkles for certain elements
        const sparkleElements = ['button', '.photo-item', '.timeline-item'];
        const target = event.target;
        
        let shouldSparkle = false;
        sparkleElements.forEach(selector => {
            if (target.matches(selector) || target.closest(selector)) {
                shouldSparkle = true;
            }
        });
        
        if (shouldSparkle) {
            createSparkle(event.clientX, event.clientY);
        }
    });
}

// Create particle burst effect
function createParticleBurst(x, y, color = '#ff69b4') {
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        // Random direction
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const deltaX = Math.cos(angle) * velocity;
        const deltaY = Math.sin(angle) * velocity;
        
        particle.style.animation = `particleBurst 1s ease-out forwards`;
        particle.style.setProperty('--deltaX', deltaX + 'px');
        particle.style.setProperty('--deltaY', deltaY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Add particle burst animation
function addParticleBurstAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleBurst {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--deltaX), var(--deltaY)) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Create floating text effect
function createFloatingText(text, x, y, color = '#d63384') {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.position = 'fixed';
    floatingText.style.left = x + 'px';
    floatingText.style.top = y + 'px';
    floatingText.style.color = color;
    floatingText.style.fontSize = '18px';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.fontFamily = 'Dancing Script, cursive';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.zIndex = '1000';
    floatingText.style.animation = 'floatText 3s ease-out forwards';
    
    document.body.appendChild(floatingText);
    
    setTimeout(() => {
        floatingText.remove();
    }, 3000);
}

// Add floating text animation
function addFloatingTextAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatText {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(1.2);
            }
        }
    `;
    document.head.appendChild(style);
}

// Remove random quotes for elegant design
function addRandomQuotes() {
    // Disabled for elegant design
    return;
}

// Stop all effects
function stopAllEffects() {
    if (heartInterval) {
        clearInterval(heartInterval);
        heartInterval = null;
    }
    if (flowerInterval) {
        clearInterval(flowerInterval);
        flowerInterval = null;
    }
    isEffectsActive = false;
}

// Resume all effects
function resumeAllEffects() {
    if (!isEffectsActive) {
        startFloatingHearts();
        startFallingFlowers();
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS animations
    addSparkleAnimation();
    addParticleBurstAnimation();
    addFloatingTextAnimation();
    
    // Initialize Particles.js (primary effect)
    initializeParticles();
    
    // Fallback to legacy effects if particles fail
    if (!particlesInstance) {
        startFloatingHearts();
        startFallingFlowers();
    }
    
    addClickSparkles();
    addRandomQuotes();
    
    // Add special effects for continue buttons
    const continueButtons = document.querySelectorAll('.continue-btn');
    continueButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            createSparkle(event.clientX, event.clientY);
            // Trigger particles burst if available
            if (particlesInstance) {
                triggerParticlesBurst(event.clientX, event.clientY);
            }
        });
    });
    
    // Add effects for quiz options
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            createSparkle(event.clientX, event.clientY);
            // Trigger particles burst if available
            if (particlesInstance) {
                triggerParticlesBurst(event.clientX, event.clientY);
            }
        });
    });
});

// Trigger particles burst effect
function triggerParticlesBurst(x, y) {
    if (particlesInstance && particlesInstance.pJSDom) {
        // Create temporary burst effect
        const burstConfig = {
            particles: {
                number: { value: 20 },
                color: { value: ["#A8324E", "#E8B4BC", "#D4AF37"] },
                shape: { type: "circle" },
                opacity: { value: 0.8 },
                size: { value: 3 },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: false },
                    onclick: { enable: false }
                }
            }
        };
        
        // Apply burst effect temporarily
        particlesInstance.pJSDom[0].pJS.particles.move.speed = 5;
        particlesInstance.pJSDom[0].pJS.particles.number.value = 30;
        
        // Reset after 2 seconds
        setTimeout(() => {
            if (particlesInstance && particlesInstance.pJSDom) {
                particlesInstance.pJSDom[0].pJS.particles.move.speed = 1;
                particlesInstance.pJSDom[0].pJS.particles.number.value = 80;
            }
        }, 2000);
    }
}

// Pause effects when page is not visible (for performance)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAllEffects();
    } else {
        resumeAllEffects();
    }
});

// Add special effect for section transitions
function addSectionTransitionEffect(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Create burst effect at the center of the section
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setTimeout(() => {
            createParticleBurst(centerX, centerY, '#ff69b4');
        }, 300);
    }
}

// Export functions for use in other scripts
window.startFloatingHearts = startFloatingHearts;
window.startFallingFlowers = startFallingFlowers;
window.createSparkle = createSparkle;
window.createParticleBurst = createParticleBurst;
window.createFloatingText = createFloatingText;
window.addSectionTransitionEffect = addSectionTransitionEffect;
