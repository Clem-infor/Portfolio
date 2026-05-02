// ============================
// LOADING SCREEN
// ============================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 600);
    }, 600);
  }
});

// ============================
// NAVBAR SCROLL EFFECT
// ============================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// ============================
// HAMBURGER MENU
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    function toggleMenu() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      overlay.classList.toggle('show');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Don't close if it's a dropdown parent
        if (link.closest('.dropdown') && link.parentElement.classList.contains('dropdown')) {
          return;
        }
        if (navLinks.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

    // Mobile dropdown toggle
    navLinks.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
      dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdownLink.parentElement.classList.toggle('open');
        }
      });
    });
  }
});

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================
// SCROLL TO TOP
// ============================
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.pageYOffset > 400);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================
// TYPEWRITER EFFECT
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.typewriter-text');
  if (!element) return;

  const phrases = JSON.parse(element.getAttribute('data-phrases'));
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
});

// ============================
// SEE MORE BUTTONS
// ============================
document.querySelectorAll('.see-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const moreText = button.nextElementSibling;
    moreText.classList.toggle('open');
    button.textContent = moreText.classList.contains('open') ? 'Voir moins' : 'Voir plus';
  });
});

// ============================
// SKILL BARS ANIMATION
// ============================
function animateSkillBars() {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width;
    }, 200);
  });
}

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillsObserver.observe(skillsSection);
}

// ============================
// PARTICLES.JS (if available)
// ============================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 900 } },
        color: { value: '#6366f1' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 2.5, random: true },
        line_linked: {
          enable: true,
          distance: 130,
          color: '#6366f1',
          opacity: 0.25,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false },
          resize: true
        },
        modes: {
          grab: { distance: 120, line_linked: { opacity: 0.4 } }
        }
      },
      retina_detect: true
    });
  }
});

// ============================
// INTERSECTION OBSERVER - FADE IN
// ============================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.about-card, .projet, .skills-layout').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });
});
