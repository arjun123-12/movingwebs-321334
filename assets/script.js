/* ═══════════════════════════════════════════════════════════════
   main.js — Moving Champs Australia
   Loaded once via footer.php (deferred)
═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Reveal ──────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Truck Selector ─────────────────────────────────────── */
  window.selectTruck = function(card) {
    document.querySelectorAll('.truck-card').forEach(c => {
      c.classList.remove('active');
    });

    card.classList.add('active');
  };

  /* ── Counter Animation ──────────────────────────────────── */
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step  = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start) + suffix;
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  const statsEl = document.getElementById('statsStrip');
  if (statsEl) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounter(document.getElementById('counter1'),   8, '+',  1600);
        animateCounter(document.getElementById('counter2'), 500, '+',  1600);
        animateCounter(document.getElementById('counter3'), 100, '%',  1600);
        counterObserver.disconnect();
      }
    }, { threshold: 0.5 });

    counterObserver.observe(statsEl);
  }

  /* ── Navbar Scroll Shadow ───────────────────────────────── */
  const nav     = document.getElementById('siteNav');
  const ctaBtn  = document.getElementById('stickyCta');

  window.addEventListener('scroll', () => {
    if (nav)    nav.classList.toggle('scrolled', window.scrollY > 30);
    if (ctaBtn) ctaBtn.classList.toggle('show',  window.scrollY > 420);
  }, { passive: true });

  /* ── Reviews Carousel Scroll ──────────────────────────────── */
  const slider = document.querySelector('.reviews-slider-row');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.carousel-dot');

  if (slider) {
    const getCardWidth = () => {
      const card = slider.querySelector('.review-slide-card');
      return card ? card.offsetWidth + 24 : 300; // card width + gap
    };

    let currentIndex = 0;

    const scrollToActive = () => {
      const cardWidth = getCardWidth();
      slider.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        
        if (slider.scrollLeft <= 5) {
          // If at start, loop to end
          slider.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        
        if (slider.scrollLeft >= maxScroll - 5) {
          // If at end, loop to start
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      });
    }

    // Update active dot indicators based on scroll position
    slider.addEventListener('scroll', () => {
      const scrollPos = slider.scrollLeft;
      const cardWidth = getCardWidth();
      const index = Math.round(scrollPos / cardWidth);
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
    });

    // Make dots clickable to jump to slide
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        slider.scrollTo({ left: idx * getCardWidth(), behavior: 'smooth' });
      });
    });
  }

  /* ── Cross-page Anchor Scrolling ────────────────────────── */
  document.querySelectorAll('#mainNav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) {
          e.preventDefault();
          window.location.href = 'index.php' + targetId;
        }
      }
    });
  });

});