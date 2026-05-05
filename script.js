// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showMessage('Please fill out all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show success message
        showMessage('Thank you for your message! I will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Optionally, you could send this data to a backend or email service
        // For now, we'll just show the success message and clear the form
    });

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project cards and skill categories
    const elements = document.querySelectorAll(
        '.project-card, .skill-category, .edu-item, .stat, .cert-card'
    );

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '';
            }
        });
    });

    // Scroll to top button functionality
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        }
    });

    // Animate counter numbers on page load
    const stats = document.querySelectorAll('.stat h3');
    const animateCounters = () => {
        stats.forEach(stat => {
            const finalValue = parseFloat(stat.textContent);
            const isDecimal = stat.textContent.includes('.');
            let currentValue = 0;
            const increment = finalValue / 30;

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(counter);
                }
                if (isDecimal) {
                    stat.textContent = currentValue.toFixed(1);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 50);
        });
    };

    // Trigger counter animation when section is in view
    const statsSection = document.querySelector('.about');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);

    // Skill tags hover effect
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Project card click effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-10px) scale(0.98)';
        });
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;

        const typeWriter = setInterval(() => {
            if (index < text.length) {
                heroTitle.textContent += text[index];
                index++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }
});

// Prevent body scroll when mobile menu is open
function preventScroll(e) {
    if (document.querySelector('.nav-menu.active')) {
        e.preventDefault();
    }
}

document.addEventListener('wheel', preventScroll, { passive: false });
document.addEventListener('touchmove', preventScroll, { passive: false });
