// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all content is visible immediately
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('active');
    });
    
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
        el.classList.add('revealed');
    });
    
    // Smooth scrolling for navigation links (only for internal anchors)
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for internal anchor links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // Let external links (like about.html) work normally
        });
    });

    // Add active class to current section
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Add navbar scroll effect
    window.addEventListener('scroll', throttledNavbarScroll);
    window.addEventListener('scroll', throttledFadeIn);

    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navbar.classList.toggle('mobile-menu-open');
        });
    }

    // Navbar scroll effect (now using throttled version)
    // This is handled by throttledNavbarScroll function above

    // Add scroll effect for about page sections
    if (document.querySelector('.about-main')) {
        const aboutSections = document.querySelectorAll('.skills-section, .technical-skills, .random-facts, .contact-section');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        aboutSections.forEach(section => {
            section.classList.add('section-animate');
            sectionObserver.observe(section);
        });
    }
});

// Social media links functionality
function openSocialMedia(platform) {
    const socialLinks = {
        linkedin: 'https://www.linkedin.com/in/rtw-profile',
        facebook: 'https://www.facebook.com/rtw-profile',
        instagram: 'https://www.instagram.com/rtw-profile'
    };
    
    if (socialLinks[platform]) {
        window.open(socialLinks[platform], '_blank');
    }
}

// Utility function for smooth animations with throttling
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.active)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Throttled scroll event
const throttledFadeIn = throttle(fadeInOnScroll, 100);
const throttledNavbarScroll = throttle(function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

// Portfolio card animations
function animatePortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 100;
        
        if (cardTop < window.innerHeight - cardVisible) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Initialize portfolio cards
function initPortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
}

// Initialize animations on scroll with throttling
window.addEventListener('scroll', throttledFadeIn);
window.addEventListener('scroll', throttledNavbarScroll);

// Initialize fade-in animation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initial check for fade-in elements
    fadeInOnScroll();
    
    // Initialize portfolio cards
    initPortfolioCards();
    
    // Animate cards on load
    setTimeout(animatePortfolioCards, 500);
    
    // Initialize scroll reveal
    initScrollReveal();
    
    // Add intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Fallback: Immediately show elements that are already visible
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('active');
            }
        });
    }, 500);
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'assets/logo rtw putih.png',
        'assets/poto diri.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preload
preloadImages();

// ========== ENHANCED SCROLL EFFECTS ==========

// Scroll progress bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) {
        // Create scroll progress bar if it doesn't exist
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Parallax effect for hero section
function updateParallax() {
    const heroSection = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.hero-parallax');
    
    if (!heroSection || parallaxElements.length === 0) return;
    
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
    });
    
    // Background parallax effect
    const bgParallax = document.querySelector('.bg-parallax');
    if (bgParallax) {
        const bgRate = scrolled * -0.3;
        bgParallax.style.transform = `translateY(${bgRate}px)`;
    }
}

// Scroll direction detection
let lastScrollTop = 0;
let scrollDirection = 'down';

function detectScrollDirection() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > lastScrollTop) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    
    // Add classes based on scroll direction
    document.body.classList.toggle('scrolling-up', scrollDirection === 'up');
    document.body.classList.toggle('scrolling-down', scrollDirection === 'down');
    
    return scrollDirection;
}

// Enhanced scroll event handler
function handleEnhancedScroll() {
    updateScrollProgress();
    updateParallax();
    detectScrollDirection();
}

// Initialize all scroll effects
function initAllScrollEffects() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Add smooth scroll class to body
    document.body.classList.add('smooth-scroll');
    
    // Add event listeners
    const throttledEnhancedScroll = throttle(handleEnhancedScroll, 16); // ~60fps
    window.addEventListener('scroll', throttledEnhancedScroll);
    
    // Initial calls
    updateScrollProgress();
    detectScrollDirection();
}

// Initialize enhanced scroll effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initAllScrollEffects();
        initScrollReveal();
    }, 200);
});

// ========== SCROLL REVEAL FUNCTIONALITY ==========

// Initialize scroll reveal
function initScrollReveal() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .text-reveal');
    
    // Create intersection observer for scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add revealed class with a small delay for better animation
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 100);
                
                // Handle text reveal specifically
                if (entry.target.classList.contains('text-reveal')) {
                    revealText(entry.target);
                }
                
                // Unobserve after revealing
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all scroll reveal elements
    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Immediately reveal elements that are already in view
    setTimeout(() => {
        scrollRevealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('revealed');
                if (element.classList.contains('text-reveal')) {
                    revealText(element);
                }
            }
        });
    }, 300);
}

// Text reveal animation
function revealText(element) {
    const text = element.textContent;
    const words = text.split(' ');
    
    element.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
    
    const spans = element.querySelectorAll('span');
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

