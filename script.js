
window.onscroll = function () {
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  };
  
  // Remonte en haut quand on clique
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  // Effet de fade-in au chargement
window.addEventListener("load", () => {
    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("loaded");
    });
  });
  
  window.addEventListener("scroll", () => {
    const bars = document.querySelectorAll(".bar > div");
    bars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0"; // reset
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }, { once: true });
  
  document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
  
    // Temps minimum affiché (en millisecondes)
    const MIN_DISPLAY_TIME = 2000;
  
    const startTime = Date.now();
  
    window.addEventListener("load", () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(MIN_DISPLAY_TIME - elapsedTime, 0);
  
      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
  
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 1000); // le temps de la transition CSS (1s)
      }, remainingTime);
    });
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target); // déclenche qu’une fois
      }
    });
  });
  
  document.querySelectorAll(".reveal-on-scroll").forEach(el => {
    observer.observe(el);
  });
  