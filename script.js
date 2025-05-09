// scripts.js (Refactored & Optimized)

// Utility: throttle function to limit how often a callback runs
function throttle(fn, wait) {
  let isCalled = false;
  return function(...args) {
    if (!isCalled) {
      fn.apply(this, args);
      isCalled = true;
      setTimeout(() => isCalled = false, wait);
    }
  };
}

// 1) Initialize AOS animations
AOS.init({ duration: 600, once: true });

// 2) Cache DOM references
const header = document.querySelector('header.site-header');
const missionSection = document.getElementById('mission');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
let scrollLockActive = false;

// 3) Scroll handler (throttled)
function onScroll() {
  const scrollY = window.scrollY;

  // Header color toggle
  header.classList.toggle('scrolled', scrollY > 0);

  // Scroll-lock logic for mission section
  if (missionSection && !scrollLockActive) {
    const rect = missionSection.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      scrollLockActive = true;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.body.style.overflow = '';
        scrollLockActive = false;
      }, 1000);
    }
  }
}
window.addEventListener('scroll', throttle(onScroll, 200));

// 4) Smooth scrolling for internal links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// 5) Mobile navigation toggle
function setupNavToggle() {
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
      // Update ARIA attribute
      const expanded = siteNav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }
}

// Initialize all behaviors when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  setupNavToggle();
});
