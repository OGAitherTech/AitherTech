(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* AitherTech UI layer: progressive enhancement only. */
  const style = document.createElement('style');
  style.textContent = `
    :root{--aither-accent:#69adff;--aither-purple:#8b7cff;--aither-glow:rgba(105,173,255,.22)}
    body{overflow-x:hidden}
    ::selection{background:var(--aither-accent);color:#06101d}
    .aither-progress{position:fixed;top:0;left:0;width:0;height:3px;background:linear-gradient(90deg,var(--aither-accent),var(--aither-purple));z-index:9999;box-shadow:0 0 14px var(--aither-accent);transition:width .08s linear}
    .aither-reveal{opacity:0;transform:translateY(18px);transition:opacity .55s ease,transform .55s ease}
    .aither-reveal.is-visible{opacity:1;transform:none}
    .aither-top{position:fixed;right:18px;bottom:18px;z-index:80;width:42px;height:42px;border:1px solid #29405e;border-radius:50%;background:#0d1624eF;color:#fff;backdrop-filter:blur(14px);cursor:pointer;opacity:0;transform:translateY(10px);pointer-events:none;transition:.2s}
    .aither-top.show{opacity:1;transform:none;pointer-events:auto}
    .aither-theme{display:inline-grid;place-items:center;width:40px;height:40px;padding:0}
    .aither-light{--bg:#f5f8fc;--p:#fff;--p2:#f4f7fb;--t:#101827;--m:#536276;--l:#d9e1ec;background:var(--bg)!important;color:var(--t)!important}
    .aither-light .top{background:rgba(255,255,255,.86)!important}
    .aither-light .card,.aither-light .dashboard,.aither-light .sidebar,.aither-light .domain,.aither-light .faq details{background:var(--p)!important;color:var(--t)}
    .aither-light .alt{background:#edf2f8!important}.aither-light .head p,.aither-light .card p,.aither-light .lead{color:var(--m)!important}
    .aither-light .btn:not(.primary),.aither-light .icon{background:#fff;color:#101827;border-color:#d5deea}
    .aither-live-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#44d19a;box-shadow:0 0 0 4px rgba(68,209,154,.12);margin-right:6px}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation:none!important;transition:none!important}.aither-reveal{opacity:1;transform:none}}
  `;
  document.head.appendChild(style);

  const progress = document.createElement('div');
  progress.className = 'aither-progress';
  document.body.prepend(progress);

  const topButton = document.createElement('button');
  topButton.className = 'aither-top';
  topButton.type = 'button';
  topButton.setAttribute('aria-label', 'Back to top');
  topButton.textContent = '↑';
  document.body.appendChild(topButton);
  topButton.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

  // Reveal sections/cards as they enter the viewport.
  $$('.card,.head,.portal,.cta,.domains,.faq,.mock,.hero > div').forEach((el, i) => {
    if (!el.classList.contains('aither-reveal')) {
      el.classList.add('aither-reveal');
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 45}ms`;
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .08, rootMargin: '0px 0px -35px'});
  $$('.aither-reveal').forEach(el => observer.observe(el));

  function updateScrollUI() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
    topButton.classList.toggle('show', window.scrollY > 550);
  }
  window.addEventListener('scroll', updateScrollUI, {passive: true});
  updateScrollUI();

  // Add a theme button without changing the existing HTML structure.
  const tools = $('.tools') || $('.navtools');
  if (tools && !$('.aither-theme', tools)) {
    const theme = document.createElement('button');
    theme.className = 'icon aither-theme';
    theme.type = 'button';
    theme.title = 'Toggle theme';
    theme.setAttribute('aria-label', 'Toggle light and dark theme');
    theme.textContent = '☼';
    tools.insertBefore(theme, tools.firstChild);

    const saved = localStorage.getItem('aither-theme');
    if (saved === 'light') document.body.classList.add('aither-light');
    theme.addEventListener('click', () => {
      const light = document.body.classList.toggle('aither-light');
      localStorage.setItem('aither-theme', light ? 'light' : 'dark');
      theme.textContent = light ? '☾' : '☼';
    });
    theme.textContent = document.body.classList.contains('aither-light') ? '☾' : '☼';
  }

  // Make dashboard controls feel like a real product demo.
  const panels = {
    overview: ['Overview', 'AitherTech platform overview and system status.'],
    devices: ['My Devices', 'Manage connected Aither devices, firmware, and status.'],
    cloud: ['Aither Cloud', 'Review storage, backups, media, logs, and cloud services.'],
    security: ['Security Settings', 'Manage authentication, two-factor protection, API keys, and audit controls.'],
    billing: ['Billing', 'Manage plans, invoices, licenses, and payment settings.']
  };
  $$('[data-panel]').forEach(button => {
    button.addEventListener('click', () => {
      $$('.side button').forEach(x => x.classList.remove('active'));
      button.classList.add('active');
      const [title, copy] = panels[button.dataset.panel] || panels.overview;
      const titleEl = $('#dash-title');
      const copyEl = $('#dash-copy');
      if (titleEl) titleEl.textContent = title;
      if (copyEl) copyEl.textContent = copy;
    });
  });

  // Keyboard accessibility for common overlays.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      $$('.modal.open,.search.open,.drawer.open').forEach(el => el.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

  // Upgrade external script-driven modals when the older IDs are present.
  const modal = $('#modal');
  const modalTitle = $('#modal-title');
  const modalText = $('#modal-text');
  const closeModal = $('#close-modal');
  const showModal = (title, text) => {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalText) modalText.textContent = text;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  closeModal?.addEventListener('click', () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  });
  modal?.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  $$('[data-modal]').forEach(button => {
    button.addEventListener('click', () => showModal(button.dataset.modal, button.dataset.message || 'This AitherTech feature is ready for the next integration step.'));
  });

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
