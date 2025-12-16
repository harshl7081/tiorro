const form = document.querySelector('.contact__form');
const hero = document.querySelector('.hero');
const glows = document.querySelectorAll('.hero__glow');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.top-nav__links');

// Form submission
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name') || 'Friend';

  form.reset();
  alert(`Thank you, ${name}. Our concierge will respond shortly.`);
});

// Parallax effect for hero glows
function handleParallax(event) {
  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  glows.forEach((glow, index) => {
    const intensity = (index + 1) * 8;
    glow.style.transform = `translate(${x * intensity}px, ${y * intensity}px) scale(1.05)`;
  });
}

if (hero && glows.length) {
  hero.addEventListener('mousemove', handleParallax);
  hero.addEventListener('mouseleave', () => {
    glows.forEach((glow) => {
      glow.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const isActive = navLinks?.classList.contains('active');
  navLinks?.classList.toggle('active');
  mobileMenuToggle?.classList.toggle('active');
  mobileMenuToggle?.setAttribute('aria-expanded', !isActive);
  
  // Prevent body scroll when menu is open
  if (!isActive) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

mobileMenuToggle?.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    mobileMenuToggle?.classList.remove('active');
    mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close mobile menu on window resize (if it becomes desktop)
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navLinks?.classList.remove('active');
    mobileMenuToggle?.classList.remove('active');
    mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach((section) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});
