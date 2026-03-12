// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navRight = document.getElementById('navRight');

mobileMenuBtn.addEventListener('click', () => {
    navRight.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-right a').forEach(link => {
    link.addEventListener('click', () => {
        navRight.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add scroll-animate class to elements
document.querySelectorAll('.review-Card, .placement-card, .ourPrograms-img, .bcText').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// Add staggered animation delays to review cards
document.querySelectorAll('.review-Card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Add staggered animation delays to placement cards
document.querySelectorAll('.placement-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Button hover effects
document.querySelectorAll('button, .btn-apply').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < 700) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
    }
});

// ==================== FAQ ACCORDION ====================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ==================== STATISTICS COUNTER ANIMATION ====================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };

                updateCount();
            });

            // Stop observing after animation starts
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Show success message (in production, you'd send to backend)
        alert(`Thank you, ${data.name}! Your message has been received. We will contact you at ${data.email} shortly.`);

        // Reset form
        contactForm.reset();
    });
}

// ==================== CLOSE MOBILE MENU ON CLICK OUTSIDE ====================
document.addEventListener('click', (e) => {
    const navRight = document.getElementById('navRight');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (navRight && navRight.classList.contains('active')) {
        if (!navRight.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navRight.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// ==================== SMOOTH SCROLL IMPROVEMENTS ====================
// Add offset for fixed header when scrolling to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
