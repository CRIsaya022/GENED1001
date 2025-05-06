document.addEventListener('DOMContentLoaded', () => {
    // Remove any classes that might affect visibility
    document.querySelectorAll('.fade-in, .stagger-fade').forEach(element => {
        element.classList.remove('fade-in', 'stagger-fade');
    });

    // Force all elements to be visible
    document.querySelectorAll('.narrative-text, .narrative-container, .chapter-title-container').forEach(element => {
        element.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; transform: none !important;';
    });
});

// Start with rain effect active
toggleRain.classList.add('active');

// Update chapter navigation based on scroll position
function updateChapterNav() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.chapter-nav-item');
    
    let currentSection = 0;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = index;
        }
    });
    
    navItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSection);
    });
}

// Animation setup
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chapter navigation
    document.querySelectorAll('.chapter-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const chapter = document.getElementById(item.dataset.chapter);
            if (chapter) {
                window.scrollTo({
                    top: chapter.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update chapter navigation on scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateChapterNav);
    });
    updateChapterNav(); // Initial update

    // Intro scene
    gsap.to('#intro .fade-in', {
        opacity: 1,
        duration: 2,
        stagger: 0.5,
        scrollTrigger: {
            trigger: '#intro',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    // Chapter 1 scene
    gsap.to('#chapter1 .chapter-title-container', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#chapter1',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fall of Regime scene
    gsap.to('#fall-of-regime .parallax-bg', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#fall-of-regime',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.to('#fall-of-regime .slide-in', {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#fall-of-regime',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    // Rumors scene
    gsap.to('#rumors .stagger-fade p', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '#rumors',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    // Inheritance scene
    gsap.to('#inheritance .fade-up', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: '#inheritance',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    // Smooth scroll for navigation (if we add navigation later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
