document.addEventListener('DOMContentLoaded', function() {
  // Check if lazy loader is available
  if (typeof LazyLoader !== 'undefined') {
    // Initialize lazy loading for all data-src images
    const lazyLoader = new LazyLoader({
      imageSelector: 'img[data-src]',
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    // Store reference for potential reloads
    window.lazyLoaderInstance = lazyLoader;
  }
});

// Expose a function to reload lazy loading if content is added dynamically
window.reinitializeLazyLoading = function() {
  if (window.lazyLoaderInstance && typeof window.lazyLoaderInstance.reload === 'function') {
    window.lazyLoaderInstance.reload();
  }
};

// Utility: Convert all img src to data-src for lazy loading
window.convertToLazyImages = function(containerSelector) {
  const container = containerSelector ? 
    document.querySelector(containerSelector) : 
    document;
  
  container.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && !img.hasAttribute('data-src')) {
      img.setAttribute('data-src', src);
      img.removeAttribute('src');
      // Optional: Set a small placeholder
      img.style.backgroundColor = 'var(--icon-bg)';
    }
  });
  
  // Reinitialize lazy loading
  window.reinitializeLazyLoading();
};

/* ============================================
   GLASSMORPHISM & ANIMATION SUPPORT
   ============================================ */

// Initialize animation classes on elements
window.initializeAnimations = function() {
  // Add fade-in animation to cards on page load
  const cards = document.querySelectorAll(
    '.card, .news-card, .course-card, .stat-card, .feed-card, .glass-card, .glass-card-elevated'
  );
  
  cards.forEach((card, index) => {
    // Stagger animation
    card.style.animationDelay = `${index * 0.1}s`;
    if (!card.classList.contains('animate-fadeIn')) {
      card.classList.add('animate-fadeIn');
    }
  });

  // Add ripple effect capability
  document.querySelectorAll('.ripple').forEach(element => {
    element.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      this.appendChild(ripple);
      
      // Remove after animation
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Animate floating blobs
  const blobs = document.querySelectorAll('.animated-blob');
  blobs.forEach((blob, index) => {
    blob.style.animationDelay = `${index * 0.5}s`;
  });

  // Intersection Observer for scroll animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }
};

// Initialize theme-aware transitions
window.initializeThemeTransitions = function() {
  const root = document.documentElement;
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon();
  
  // Listen for system theme changes
  mediaQuery.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    root.setAttribute('data-theme', newTheme);
    updateThemeIcon();
  });
};

// Update theme icon
window.updateThemeIcon = function() {
  const themeIcon = document.getElementById('themeIcon');
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (themeIcon) {
    if (currentTheme === 'dark') {
      themeIcon.textContent = 'light_mode';
    } else {
      themeIcon.textContent = 'dark_mode';
    }
  }
};

// Toggle theme with smooth transition
window.toggleThemeSmooth = function() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Add transition class
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
  
  // Remove transition after complete
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
};

// Initialize liquid wave animation
window.initializeLiquidWave = function() {
  const waves = document.querySelectorAll('.liquid-wave');
  waves.forEach(wave => {
    const svg = wave.querySelector('svg');
    if (svg) {
      svg.style.animation = 'liquidWaveShift 4s ease-in-out infinite';
    }
  });
};

// Performance: Disable animations on low-end devices
window.initializePerformanceMode = function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-base', '0.05s ease');
    document.documentElement.style.setProperty('--transition-slow', '0.1s ease');
    document.documentElement.style.setProperty('--transition-fast', '0.02s ease');
  }
};

// Call all initialization functions on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  window.initializeAnimations();
  window.initializeThemeTransitions();
  window.initializeLiquidWave();
  window.initializePerformanceMode();
});
