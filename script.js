/* =====================================================
   ZARA ZAHOOR — PORTFOLIO JAVASCRIPT
   ===================================================== */

/* ---- Navbar scroll effect & active link ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky nav style
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on section in view
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ---- Mobile hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

/* ---- Portfolio filter ---- */
const filterBtns    = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hide');
        card.style.animation = 'fadeInUp 0.4s ease both';
      } else {
        card.classList.add('hide');
      }
    });
  });
});

/* ---- Scroll reveal animation ---- */
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio-card, .timeline-item, .process-step, .skill-tag, .client-logo'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger delay
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ---- Contact form submit ---- */
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate async send
  setTimeout(() => {
    contactForm.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    formSuccess.classList.add('show');

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

/* ---- Smooth progress on skill tags (visual pulse on hover) ---- */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.boxShadow = '0 0 14px rgba(255,44,117,0.35)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = '';
  });
});

/* ---- Typing effect for hero title ---- */
(function typeEffect() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const fullHTML = titleEl.innerHTML;  // keep accent span
  titleEl.style.visibility = 'visible';
  // Simple approach: fade in from opacity already handled by CSS animation
})();

/* ---- Back to top on logo click ---- */
document.querySelectorAll('.nav-logo').forEach(logo => {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ---- Close nav menu on outside click ---- */
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  }
});

/* ---- Year update in footer ---- */
const yearEls = document.querySelectorAll('.footer-copy');
yearEls.forEach(el => {
  el.textContent = el.textContent.replace(/\d{4}/, new Date().getFullYear());
});
