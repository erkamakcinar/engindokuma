// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Animated stat counters
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
let statsAnimated = false;

const animateStats = () => {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar || statsAnimated) return;

    const rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        statsAnimated = true;
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();

            const animate = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                num.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    num.textContent = target;
                }
            };
            requestAnimationFrame(animate);
        });
    }
};

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// Certificate lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const certItems = document.querySelectorAll('.cert-item img');
let currentCertIndex = 0;
const certSources = Array.from(certItems).map(img => img.src);

certItems.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentCertIndex = index;
        lightboxImg.src = certSources[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.getElementById('lightboxClose').addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.getElementById('lightboxPrev').addEventListener('click', () => {
    currentCertIndex = (currentCertIndex - 1 + certSources.length) % certSources.length;
    lightboxImg.src = certSources[currentCertIndex];
});

document.getElementById('lightboxNext').addEventListener('click', () => {
    currentCertIndex = (currentCertIndex + 1) % certSources.length;
    lightboxImg.src = certSources[currentCertIndex];
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
        currentCertIndex = (currentCertIndex - 1 + certSources.length) % certSources.length;
        lightboxImg.src = certSources[currentCertIndex];
    } else if (e.key === 'ArrowRight') {
        currentCertIndex = (currentCertIndex + 1) % certSources.length;
        lightboxImg.src = certSources[currentCertIndex];
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
