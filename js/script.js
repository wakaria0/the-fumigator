document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.reset();
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';

      setTimeout(function () {
        formSuccess.style.display = 'none';
        contactForm.style.display = 'block';
      }, 5000);
    });
  }

  const statNumbers = document.querySelectorAll('.stat-number');

  function animateStats() {
    statNumbers.forEach(function (stat) {
      const target = parseInt(stat.getAttribute('data-target'));
      const suffix = stat.closest('.stat').querySelector('.stat-label').textContent.includes('%') ? '+' : '+';
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          stat.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current).toLocaleString();
        }
      }, 30);
    });
  }

  const statsSection = document.querySelector('.stats');
  if (statsSection && statNumbers.length > 0) {
    let animated = false;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateStats();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }
});
