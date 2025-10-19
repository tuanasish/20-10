// Global variables
let currentSection = 1;
let currentQuestion = 1;
const totalQuestions = 4;
let quizAnswers = {};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Start background music immediately
    startBackgroundMusic();
    
    // Show music instruction after a delay
    setTimeout(() => {
        showMusicInstruction();
    }, 2000);
    
    // Typing effect sẽ được gọi sau khi mở quà
    
    // Initialize effects
    if (typeof startFloatingHearts === 'function') {
        startFloatingHearts();
    }
    if (typeof startFallingFlowers === 'function') {
        startFallingFlowers();
    }
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Background music functions
function startBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!audio) {
        console.log('Audio element not found');
        return;
    }
    
    // Set audio properties
    audio.preload = 'auto';
    audio.loop = true;
    
    // Try to play audio with muted first (autoplay policy)
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Background music started (muted)');
            // Unmute after a short delay
            setTimeout(() => {
                audio.muted = false;
                audio.volume = 0.4;
                if (musicToggle) musicToggle.textContent = '🔊';
                console.log('Music unmuted successfully');
            }, 500);
        }).catch(error => {
            console.log('Autoplay blocked by browser:', error);
            // Fallback: wait for user interaction
            const startMusicOnInteraction = () => {
                audio.muted = false;
                audio.volume = 0.4;
                audio.play().then(() => {
                    console.log('Background music started after user interaction');
                    if (musicToggle) musicToggle.textContent = '🔊';
                    document.removeEventListener('click', startMusicOnInteraction);
                    document.removeEventListener('touchstart', startMusicOnInteraction);
                    document.removeEventListener('keydown', startMusicOnInteraction);
                }).catch(err => {
                    console.log('Still cannot play music:', err);
                });
            };
            
            document.addEventListener('click', startMusicOnInteraction, { once: true });
            document.addEventListener('touchstart', startMusicOnInteraction, { once: true });
            document.addEventListener('keydown', startMusicOnInteraction, { once: true });
        });
    }
}

function startTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    let currentElementIndex = 0;
    
    // Store original text for all elements
    const originalTexts = Array.from(typingElements).map(el => el.textContent);
    
    // Clear all text initially
    typingElements.forEach(element => {
        element.textContent = '';
        element.style.opacity = '1';
    });
    
    function typeNextElement() {
        if (currentElementIndex >= typingElements.length) {
            return; // All elements typed
        }
        
        const currentElement = typingElements[currentElementIndex];
        const currentText = originalTexts[currentElementIndex];
        
        // Add active class for cursor
        currentElement.classList.add('typing-active');
        
        typeText(currentElement, currentText, 0, () => {
            // Remove cursor when this element is done
            currentElement.classList.remove('typing-active');
            
            // Move to next element after a pause
            setTimeout(() => {
                currentElementIndex++;
                typeNextElement();
            }, 300); // 0.3 second pause between paragraphs
        });
    }
    
    // Start typing after initial delay
    setTimeout(() => {
        typeNextElement();
    }, 1000);
}

function typeText(element, text, index, onComplete) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        
        // Even faster typing speed between 15-35ms per character
        const typingSpeed = Math.random() * 20 + 15;
        setTimeout(() => {
            typeText(element, text, index, onComplete);
        }, typingSpeed);
    } else {
        // Typing complete for this element
        setTimeout(() => {
            if (onComplete) onComplete();
        }, 150);
    }
}

function showMusicInstruction() {
    const audio = document.getElementById('backgroundMusic');
    const musicStatus = document.getElementById('musicStatus');
    
    if (audio && audio.muted && musicStatus) {
        musicStatus.classList.add('show');
        
        // Hide instruction after 5 seconds
        setTimeout(() => {
            musicStatus.classList.remove('show');
        }, 5000);
    }
}

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicStatus = document.getElementById('musicStatus');
    
    if (!audio) return;
    
    if (audio.paused || audio.muted) {
        audio.muted = false;
        audio.volume = 0.4;
        audio.play().then(() => {
            if (musicToggle) musicToggle.textContent = '🔊';
            if (musicStatus) {
                musicStatus.textContent = 'Nhạc nền đã bật 🎵';
                musicStatus.classList.add('show');
                setTimeout(() => {
                    musicStatus.classList.remove('show');
                }, 2000);
            }
        }).catch(error => {
            console.log('Cannot play music:', error);
            if (musicStatus) {
                musicStatus.textContent = 'Không thể phát nhạc 😔';
                musicStatus.classList.add('show');
                setTimeout(() => {
                    musicStatus.classList.remove('show');
                }, 3000);
            }
        });
    } else {
        audio.pause();
        if (musicToggle) musicToggle.textContent = '🔇';
        if (musicStatus) {
            musicStatus.textContent = 'Nhạc nền đã tắt 🔇';
            musicStatus.classList.add('show');
            setTimeout(() => {
                musicStatus.classList.remove('show');
            }, 2000);
        }
    }
}

// Navigation functions
function nextSection(sectionId) {
    // Hide current section
    const currentSectionElement = document.querySelector('.section.active');
    if (currentSectionElement) {
        currentSectionElement.classList.remove('active');
    }
    
    // Show next section
    const nextSectionElement = document.getElementById(sectionId);
    if (nextSectionElement) {
        nextSectionElement.classList.add('active');
        
        // Update current section number
        const sectionNumber = getSectionNumber(sectionId);
        currentSection = sectionNumber;
        
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Trigger section-specific animations
        triggerSectionAnimations(sectionId);
    }
}

function getSectionNumber(sectionId) {
    const sections = {
        'letter-section': 1,
        'puzzle-section': 2,
        'album-section': 3,
        'timeline-section': 4,
        'quiz-section': 5
    };
    return sections[sectionId] || 1;
}

function triggerSectionAnimations(sectionId) {
    switch(sectionId) {
        case 'puzzle-section':
            // Khởi tạo puzzle game với delay để đảm bảo DOM đã sẵn sàng
            setTimeout(() => {
                if (typeof PuzzleGame !== 'undefined') {
                    if (window.puzzleGameInstance) {
                        window.puzzleGameInstance = null;
                    }
                    window.puzzleGameInstance = new PuzzleGame();
                } else {
                    console.error('PuzzleGame class not found');
                }
            }, 100);
            break;
        case 'album-section':
            animatePhotoGallery();
            break;
        case 'timeline-section':
            animateTimeline();
            break;
        case 'quiz-section':
            initializeQuiz();
            break;
    }
}

// Photo Gallery Animation
function animatePhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 300);
    });
}

// Quiz Functions
function initializeQuiz() {
    currentQuestion = 1;
    quizAnswers = {};
    showQuestion(1);
}

function showQuestion(questionNumber) {
    // Hide all questions
    const allQuestions = document.querySelectorAll('.quiz-question');
    allQuestions.forEach(q => q.classList.remove('active'));
    
    // Show current question
    const currentQuestionElement = document.querySelector(`[data-question="${questionNumber}"]`);
    if (currentQuestionElement) {
        currentQuestionElement.classList.add('active');
    }
}

function selectAnswer(questionNumber, answer) {
    // Store the answer
    quizAnswers[questionNumber] = answer;
    
    // Highlight selected answer
    const questionElement = document.querySelector(`[data-question="${questionNumber}"]`);
    const options = questionElement.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.style.background = 'linear-gradient(135deg, #ffc0cb, #ffb6c1)';
        option.style.color = '#333';
    });
    
    // Highlight selected option
    event.target.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';
    event.target.style.color = 'white';
    
    // Move to next question after a delay
    setTimeout(() => {
        if (questionNumber < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            showQuizResults();
        }
    }, 1000);
}

function showQuizResults() {
    // Hide all questions
    const allQuestions = document.querySelectorAll('.quiz-question');
    allQuestions.forEach(q => q.classList.remove('active'));
    
    // Show results
    const resultsElement = document.getElementById('quiz-results');
    if (resultsElement) {
        resultsElement.style.display = 'block';
        resultsElement.classList.add('active');
    }
    
    // Show restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.style.display = 'block';
    }
    
    // Scroll to results
    setTimeout(() => {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

function restartJourney() {
    // Reset quiz state
    currentQuestion = 1;
    quizAnswers = {};
    
    // Hide all sections
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show first section
    const firstSection = document.getElementById('letter-section');
    if (firstSection) {
        firstSection.classList.add('active');
        currentSection = 1;
    }
    
    // Reset quiz UI
    const resultsElement = document.getElementById('quiz-results');
    if (resultsElement) {
        resultsElement.style.display = 'none';
    }
    
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.style.display = 'none';
    }
    
    // Reset all quiz options
    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(option => {
        option.style.background = 'linear-gradient(135deg, #ffc0cb, #ffb6c1)';
        option.style.color = '#333';
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Allow navigation with arrow keys or Enter
    if (event.key === 'ArrowRight' || event.key === 'Enter') {
        if (currentSection === 1) {
            nextSection('puzzle-section');
        } else if (currentSection === 2) {
            nextSection('album-section');
        } else if (currentSection === 3) {
            nextSection('timeline-section');
        } else if (currentSection === 4) {
            nextSection('quiz-section');
        }
    } else if (event.key === 'ArrowLeft') {
        // Go back to previous section
        if (currentSection === 2) {
            nextSection('letter-section');
        } else if (currentSection === 3) {
            nextSection('puzzle-section');
        } else if (currentSection === 4) {
            nextSection('album-section');
        } else if (currentSection === 5) {
            nextSection('timeline-section');
        }
    } else if (event.key === 'Escape') {
        // Restart journey
        restartJourney();
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - go to previous section
            if (currentSection === 2) {
                nextSection('letter-section');
            } else if (currentSection === 3) {
                nextSection('puzzle-section');
            } else if (currentSection === 4) {
                nextSection('album-section');
            } else if (currentSection === 5) {
                nextSection('timeline-section');
            }
        } else {
            // Swipe left - go to next section
            if (currentSection === 1) {
                nextSection('puzzle-section');
            } else if (currentSection === 2) {
                nextSection('album-section');
            } else if (currentSection === 3) {
                nextSection('timeline-section');
            } else if (currentSection === 4) {
                nextSection('quiz-section');
            }
        }
    }
}

// Utility functions
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    document.getElementById('floatingHearts').appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

function createFlower() {
    const flower = document.createElement('div');
    flower.innerHTML = '🌸';
    flower.className = 'flower';
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = (Math.random() * 4 + 8) + 's';
    document.getElementById('fallingFlowers').appendChild(flower);
    
    // Remove flower after animation
    setTimeout(() => {
        flower.remove();
    }, 12000);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based animations here if needed
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
});

// Prevent context menu on long press (for better mobile experience)
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Carousel functionality - Auto-scroll only

// Add visual feedback for button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
});

// Mở quà tương tác với GSAP
function openGift() {
    const giftBox = document.getElementById('giftBox');
    const giftLid = document.getElementById('giftLid');
    const giftBow = document.querySelector('.gift-bow');
    const giftBody = document.querySelector('.gift-body');
    const loadingText = document.getElementById('loadingText');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Vô hiệu hóa click để tránh spam
    giftBox.style.pointerEvents = 'none';
    
    // Thay đổi text
    loadingText.textContent = 'Món quà đang được mở... 💖';
    
    // Tạo GSAP Timeline cho animation
    const tl = gsap.timeline();
    
    // 1. Shake hộp quà (0.5s)
    tl.to(giftBox, {
        x: [-5, 5, -3, 3, -1, 1, 0],
        duration: 0.5,
        ease: "power2.inOut"
    })
    
    // 2. Bow bay lên và tan biến (0.3s)
    .to(giftBow, {
        y: -50,
        rotation: 360,
        opacity: 0,
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out"
    }, "-=0.2")
    
    // 3. Lid mở với rotation 3D (0.8s)
    .to(giftLid, {
        rotationX: -90,
        y: -30,
        z: -20,
        opacity: 0.3,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.1")
    
    // 4. Body scale và fade out (0.5s)
    .to(giftBody, {
        scale: 1.3,
        rotationY: 180,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
    }, "-=0.3")
    
    // 5. Confetti bắn ra (1s)
    .call(() => {
        triggerConfetti();
    }, [], 0.4)
    
    // 6. Hearts particles bay lên
    .call(() => {
        createHeartsBurst();
    }, [], 0.6)
    
    // 7. Fade out loading overlay (0.5s)
    .to(loadingOverlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2")
    
    // 8. Bắt đầu typing effect
    .call(() => {
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            startTypingEffect();
        }, 100);
    });
}

// Confetti Effect với Canvas-Confetti
function triggerConfetti() {
    // Tạo confetti burst từ vị trí hộp quà
    const rect = document.getElementById('giftBox').getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    // Confetti burst chính
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: x, y: y },
        colors: ['#FF8896', '#FFB6C1', '#FFD700', '#FF69B4', '#C00000'],
        shapes: ['circle', 'heart'],
        scalar: 1.2
    });
    
    // Thêm confetti burst nhỏ hơn sau 200ms
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 50,
            origin: { x: x, y: y },
            colors: ['#FF8896', '#FFB6C1', '#FFD700', '#FF69B4'],
            shapes: ['circle'],
            scalar: 0.8
        });
    }, 200);
    
    // Confetti từ các góc màn hình
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 },
            colors: ['#FF8896', '#FFB6C1', '#FFD700']
        });
        
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 },
            colors: ['#FF8896', '#FFB6C1', '#FFD700']
        });
    }, 400);
}

// Hearts Burst Effect
function createHeartsBurst() {
    const giftBox = document.getElementById('giftBox');
    const rect = giftBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️'];
    const heartCount = 12;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = (Math.random() * 10 + 16) + 'px';
        
        document.body.appendChild(heart);
        
        // Animation với GSAP
        gsap.set(heart, {
            x: centerX,
            y: centerY,
            opacity: 1
        });
        
        gsap.to(heart, {
            x: centerX + (Math.random() - 0.5) * 400,
            y: centerY - Math.random() * 250 - 150,
            opacity: 0,
            scale: Math.random() * 0.8 + 0.2,
            rotation: Math.random() * 720,
            duration: 2.5 + Math.random() * 1,
            ease: "power2.out",
            delay: Math.random() * 0.3,
            onComplete: () => {
                heart.remove();
            }
        });
    }
}

// Ẩn hiệu ứng loading (backup function)
function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500); // Đợi animation fade out hoàn thành
    }
}
