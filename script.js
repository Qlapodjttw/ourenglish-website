// scripts.js

// 1) Initialize AOS animations
AOS.init({
  duration: 600,
  once: true
});

// 2) Scroll-lock logic on the second slide (mission section)
const mission = document.getElementById('mission');
let delayActive = false;

window.addEventListener('scroll', () => {
  // Prevent rapid scrolling past the mission section
  if (!delayActive) {
    const rect = mission.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      delayActive = true;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        delayActive = false;
      }, 1000);
    }
  }

  // 3) Header text‐color toggle based on scroll position
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 4) Smooth scrolling for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});
