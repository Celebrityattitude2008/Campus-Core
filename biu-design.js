/* ============================================================
   Campus Core — SHARED DESIGN SYSTEM JAVASCRIPT
   Lazy loading splash, theme, nav, ripple, animations
   ============================================================ */

(function () {
  'use strict';

  /* ---- 1. LAZY LOADING SPLASH SCREEN ---- */

  const VOXEL_LAYERS = [
    { color: '#1a0933', offset: 12 },
    { color: '#250d47', offset: 10 },
    { color: '#2f115a', offset:  8 },
    { color: '#3f19e6', offset:  6 },
    { color: '#5a2beb', offset:  4 },
    { color: '#6c3aed', offset:  2 },
    { color: '#7c3aed', offset:  1 },
  ];

  function buildSplash() {
    const splash = document.createElement('div');
    splash.id = 'biu-splash';
    splash.innerHTML = `
      <div class="splash-grid"></div>
      <div class="splash-orb-1"></div>
      <div class="splash-orb-2"></div>
      <div class="splash-content">
        <div id="splash-words"></div>
        <div class="splash-loading">
          <div class="splash-dots">
            <div class="splash-dot"></div>
            <div class="splash-dot"></div>
            <div class="splash-dot"></div>
          </div>
          <div class="splash-progress-bar">
            <div class="splash-progress-fill" id="splash-fill"></div>
          </div>
          <div class="splash-percent" id="splash-pct">0%</div>
        </div>
      </div>
    `;
    document.body.insertBefore(splash, document.body.firstChild);
    buildVoxelWords(['BIU', 'ARCHIVE']);
  }

  function buildVoxelWords(words) {
    const container = document.getElementById('splash-words');
    words.forEach((word, wi) => {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative;display:block;line-height:1;margin-bottom:4px;';

      // Shadow layers
      VOXEL_LAYERS.forEach(layer => {
        const el = document.createElement('div');
        el.className = 'splash-voxel-layer';
        el.style.color = layer.color;
        el.style.transform = `translate(${layer.offset}px,${layer.offset}px)`;
        el.dataset.word = word;
        wrap.appendChild(el);
      });

      // Front face
      const front = document.createElement('div');
      front.className = 'splash-voxel-front';
      front.dataset.word = word;
      wrap.appendChild(front);

      container.appendChild(wrap);

      // Animate chars with delay per word
      setTimeout(() => animateVoxelWord(word, wrap, wi), wi * 350);
    });
  }

  function buildChars(word, className) {
    return word.split('').map((ch, i) => {
      const s = document.createElement('span');
      s.className = 'splash-char' + (className ? ' ' + className : '');
      s.dataset.idx = i;
      s.textContent = ch;
      return s;
    });
  }

  function animateVoxelWord(word, wrap, wordIndex) {
    const layers = wrap.querySelectorAll('.splash-voxel-layer');
    const front = wrap.querySelector('.splash-voxel-front');

    // Build chars in all layers
    layers.forEach(layer => {
      layer.innerHTML = '';
      buildChars(word).forEach(s => layer.appendChild(s));
    });
    front.innerHTML = '';
    buildChars(word).forEach(s => front.appendChild(s));

    let visible = 0;
    const interval = setInterval(() => {
      if (visible >= word.length) {
        clearInterval(interval);
        front.classList.add('complete');
        return;
      }
      // Make char visible in all layers + front
      const idx = visible;
      wrap.querySelectorAll(`.splash-char[data-idx="${idx}"]`).forEach(s => s.classList.add('visible'));
      visible++;
    }, 80);
  }

  function runSplashProgress() {
    const fill = document.getElementById('splash-fill');
    const pct  = document.getElementById('splash-pct');
    if (!fill || !pct) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress++;
      if (fill) fill.style.width = progress + '%';
      if (pct)  pct.textContent = progress + '%';
      if (progress >= 100) clearInterval(interval);
    }, 30);
  }

  function hideSplash() {
    const splash = document.getElementById('biu-splash');
    if (splash) {
      splash.classList.add('hidden');
      setTimeout(() => splash.remove(), 700);
    }
  }

  /* ---- 2. THEME ---- */

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('biu-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.querySelector('.material-symbols-rounded').textContent =
        theme === 'dark' ? 'dark_mode' : 'light_mode';
    }
  }

  function initTheme() {
    const saved = localStorage.getItem('biu-theme') || 'light';
    applyTheme(saved);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.dataset.theme;
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  /* ---- 3. DROPDOWN MENU ---- */

  function initMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const dropdown = document.getElementById('nav-dropdown');
    if (!menuBtn || !dropdown) return;

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== menuBtn) {
        dropdown.classList.remove('open');
      }
    });
  }

  /* ---- 4. BOTTOM NAV ACTIVE STATE ---- */

  function initBottomNav() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      const pages = item.dataset.page.split(',');
      if (pages.some(p => filename === p || (filename === '' && p === 'index.html'))) {
        item.classList.add('active');
      }
    });
  }

  /* ---- 5. RIPPLE BUTTONS ---- */

  function addRipple(btn, e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size/2}px;top:${y - size/2}px;`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }

  function initRippleButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => addRipple(btn, e));
    });
  }

  /* ---- 6. CARD STAGGER ANIMATIONS ---- */

  function initCardAnimations() {
    document.querySelectorAll('.glass-card, .stat-card').forEach((card, i) => {
      if (!card.style.animationDelay) {
        card.style.animationDelay = (i * 0.08) + 's';
      }
    });
  }

  /* ---- INIT ---- */

  // Build splash immediately (before DOM ready)
  if (document.body) {
    buildSplash();
    runSplashProgress();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      buildSplash();
      runSplashProgress();
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMenu();
    initBottomNav();
    initRippleButtons();
    initCardAnimations();
  });

  // Hide splash when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(hideSplash, 800);
  });

  // Expose theme toggle globally for any inline usage
  window.biuToggleTheme = () => {
    const current = document.documentElement.dataset.theme;
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };

})();

