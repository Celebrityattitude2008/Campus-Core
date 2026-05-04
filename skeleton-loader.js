/**
 * Skeleton Loader & Lazy Loading Utility
 * Provides skeleton placeholders and lazy image loading
 */

// ========== SKELETON LOADING ==========
class SkeletonLoader {
  // Create skeleton placeholder for app cards
  static createAppCardSkeleton() {
    return `
      <div class="skeleton-card">
        <div class="skeleton skeleton-icon"></div>
        <div class="skeleton skeleton-text" style="margin: 10px 0; width: 70%;"></div>
        <div class="skeleton skeleton-text" style="width: 90%;"></div>
        <div class="skeleton skeleton-text" style="width: 60%; margin: 10px 0;"></div>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <div class="skeleton" style="flex: 1; height: 30px;"></div>
          <div class="skeleton" style="flex: 1; height: 30px;"></div>
        </div>
      </div>
    `;
  }

  // Create skeleton for profile section
  static createProfileSkeleton() {
    return `
      <div class="skeleton-profile">
        <div class="skeleton skeleton-avatar"></div>
        <div class="skeleton skeleton-text" style="width: 60%; margin: 15px auto;"></div>
        <div class="skeleton skeleton-text" style="width: 80%; margin: 10px auto;"></div>
        <div class="skeleton skeleton-text" style="width: 70%; margin: 10px auto;"></div>
      </div>
    `;
  }

  // Create skeleton for reviews
  static createReviewSkeleton() {
    return `
      <div class="skeleton-review">
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div class="skeleton skeleton-avatar" style="width: 40px; height: 40px;"></div>
          <div style="flex: 1;">
            <div class="skeleton skeleton-text" style="width: 50%; margin-bottom: 5px;"></div>
            <div class="skeleton skeleton-text" style="width: 30%;"></div>
          </div>
        </div>
        <div class="skeleton skeleton-text" style="width: 100%; height: 60px;"></div>
      </div>
    `;
  }

  // Show skeletons for a grid
  static showSkeletons(containerId, count = 4, type = 'card') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const skeleton = type === 'card' ? 
        this.createAppCardSkeleton() : 
        type === 'profile' ? 
        this.createProfileSkeleton() :
        this.createReviewSkeleton();
      
      container.insertAdjacentHTML('beforeend', skeleton);
    }
  }

  // Hide skeletons
  static hideSkeletons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const skeletons = container.querySelectorAll('.skeleton-card, .skeleton-profile, .skeleton-review');
    skeletons.forEach(el => {
      el.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => el.remove(), 300);
    });
  }
}

// ========== LAZY LOADING ==========
class LazyLoader {
  constructor(options = {}) {
    this.imageSelector = options.imageSelector || 'img[data-src]';
    this.containerSelector = options.containerSelector || null;
    this.threshold = options.threshold || 0.1;
    this.rootMargin = options.rootMargin || '50px';
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      this.loadAllImages(); // Fallback for older browsers
    }
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const container = this.containerSelector ? 
      document.querySelector(this.containerSelector) : 
      document;
    
    const images = container.querySelectorAll(this.imageSelector);
    images.forEach(img => observer.observe(img));
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    const srcset = img.getAttribute('data-srcset');

    if (src) {
      img.setAttribute('src', src);
      img.removeAttribute('data-src');
    }

    if (srcset) {
      img.setAttribute('srcset', srcset);
      img.removeAttribute('data-srcset');
    }

    img.addEventListener('load', () => {
      img.classList.add('lazy-loaded');
    });

    img.addEventListener('error', () => {
      img.classList.add('lazy-error');
      // Optional: Set a placeholder error image
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23eee" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3EFailed to load%3C/text%3E%3C/svg%3E';
    });
  }

  loadAllImages() {
    const container = this.containerSelector ? 
      document.querySelector(this.containerSelector) : 
      document;
    
    const images = container.querySelectorAll(this.imageSelector);
    images.forEach(img => this.loadImage(img));
  }

  // Reload lazy images (useful after dynamic content insertion)
  reload() {
    this.init();
  }
}

// ========== CONTENT PLACEHOLDER ==========
class ContentLoader {
  static showLoadingState(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.classList.add('loading');
  }

  static hideLoadingState(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.classList.remove('loading');
  }

  static showEmptyState(elementId, message = 'No content found', icon = '📭') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
        <div style="font-size: 48px; margin-bottom: 10px;">${icon}</div>
        <div style="color: var(--text-muted);">${message}</div>
      </div>
    `;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SkeletonLoader, LazyLoader, ContentLoader };
}
