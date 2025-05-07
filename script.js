document.addEventListener('DOMContentLoaded', function() {
  // 1) Header transparency toggle
  const header = document.querySelector('header');
  function checkScroll() {
    if (window.scrollY < 50) header.classList.add('transparent');
    else header.classList.remove('transparent');
  }
  checkScroll();
  window.addEventListener('scroll', checkScroll);

  // 2) Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  menuToggle.addEventListener('click', () => nav.classList.toggle('active'));

  // 3) AOS animations
  AOS.init();

  // 4) Programs tab navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // 5) Scroll-lock on second intro slide
  let lock = false;
  const missionSlide = document.querySelector('.slide-mission');
  const lockDuration = 1000; // milliseconds
  window.addEventListener('scroll', () => {
    if (lock) return;
    const rect = missionSlide.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom > window.innerHeight) {
      lock = true;
      window.scrollTo({ top: missionSlide.offsetTop, behavior: 'smooth' });
      setTimeout(() => { lock = false; }, lockDuration);
    }
  });
});
