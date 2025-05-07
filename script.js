// Initialize AOS
AOS.init();

// Scroll-lock on the second slide
const mission = document.getElementById('mission');
let delayActive = false;

window.addEventListener('scroll', () => {
  // 1) Scroll-lock logic
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

  // 2) Header text toggle logic
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
