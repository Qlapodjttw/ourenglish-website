// Initialize AOS (animations on scroll)
AOS.init();

// Scroll-lock on the second slide (.slide-mission)
const mission = document.getElementById('mission');
let delayActive = false;

window.addEventListener('scroll', () => {
  if (delayActive) return;
  const rect = mission.getBoundingClientRect();
  const fullyInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

  if (fullyInView) {
    delayActive = true;
    // Temporarily prevent further scrolling
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      delayActive = false;
    }, 1000);  // hold for 1 second
  }
});
