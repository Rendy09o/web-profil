// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const snowContainer = document.getElementById('snow-container');
const contactForm = document.getElementById('contact-form');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click event to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});



// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.about-content',
        '.project-card',
        '.skill-item',
        '.contact-content'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('fade-in');
        });
    });
    
    // Initial check
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Skills Progress Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const progressFill = bar.querySelector('.progress-fill');
        
        const barTop = bar.getBoundingClientRect().top;
        
        if (barTop < window.innerHeight - 100) {
            setTimeout(() => {
                progressFill.style.width = progress + '%';
            }, 500);
        }
    });
}

window.addEventListener('scroll', animateSkillBars);

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Mohon lengkapi semua field!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Pesan sedang dikirim...', 'info');
    
    setTimeout(() => {
        showNotification('Pesan berhasil dikirim! Terima kasih.', 'success');
        contactForm.reset();
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});



// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add ice crack effect
            const crackEffect = document.createElement('div');
            crackEffect.classList.add('ice-crack');
            crackEffect.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, 
                    transparent 30%, 
                    rgba(184, 230, 255, 0.3) 50%, 
                    transparent 70%);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            card.appendChild(crackEffect);
            
            setTimeout(() => {
                crackEffect.style.opacity = '1';
            }, 100);
        });
        
        card.addEventListener('mouseleave', () => {
            const crackEffect = card.querySelector('.ice-crack');
            if (crackEffect) {
                crackEffect.style.opacity = '0';
                setTimeout(() => {
                    if (crackEffect.parentNode) {
                        crackEffect.parentNode.removeChild(crackEffect);
                    }
                }, 300);
            }
        });
    });
});

// Skill Snowflake Interaction
document.addEventListener('DOMContentLoaded', () => {
    const skillSnowflakes = document.querySelectorAll('.skill-snowflake');
    
    skillSnowflakes.forEach(snowflake => {
        snowflake.addEventListener('click', () => {
            // Create sparkle effect
            for (let i = 0; i < 6; i++) {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 1rem;
                    color: #87CEEB;
                    pointer-events: none;
                    animation: sparkle 1s ease-out forwards;
                    animation-delay: ${i * 0.1}s;
                `;
                
                snowflake.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
            }
        });
    });
});

// Add sparkle animation CSS
const sparkleCSS = `
@keyframes sparkle {
    0% {
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Typewriter Effect Enhancement
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after page load
        setTimeout(typeWriter, 1000);
    }
});

// Frost Effect on Form Focus
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 20px rgba(135, 206, 235, 0.5), inset 0 0 20px rgba(184, 230, 255, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            input.style.boxShadow = 'none';
        });
    });
});

// Performance Optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    animateOnScroll();
    animateSkillBars();
}, 100));

console.log('❄️ Ice & Snow Portfolio loaded successfully! ❄️');

