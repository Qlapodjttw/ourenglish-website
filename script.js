// scroll feature
function throttle(fn, wait) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= wait) {
      fn.apply(this, args);
      last = now;
    }
  };
}

// ai assisted code for scroll and guide bar
AOS.init({ duration: 600, once: true });

const header = document.querySelector('header.site-header');
const mission = document.getElementById('mission');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
let lastY = window.scrollY;
let lock = false;

// Scroll handler 
function onScroll() {
  const y = window.scrollY;
 
  header.classList.toggle('scrolled', y > 0);
  // guide bar hide thingy
  if (y > lastY) header.classList.add('hidden');
  else header.classList.remove('hidden');
  lastY = y;
 
  if (!lock && mission) {
    const r = mission.getBoundingClientRect();
    if (r.top <= 0 && r.bottom >= window.innerHeight) {
      lock = true;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.body.style.overflow = '';
        lock = false;
      }, 1000);
    }
  }
}
window.addEventListener('scroll', throttle(onScroll, 200));

// Smooth scroll for anchors
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior:'smooth' });
    });
  });
  // mobile nav toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', ()=>{
      siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', siteNav.classList.contains('open'));
    });
  }
});
