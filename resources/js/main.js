/* =============================================
   main.js — Portfolio scripts
   Path: resources/js/main.js
   ============================================= */

/* ── LANGUAGE TOGGLE ──────────────────────────
   How it works:
   - Every element that has text to translate carries
     two data attributes: data-en and data-pt.
   - When the user clicks the toggle button, this
     script reads those attributes and swaps the
     content of the element.
   - The current language is saved in localStorage
     so the choice persists between page loads.
   - The <html lang=""> attribute is also updated
     for accessibility / screen readers.
   ─────────────────────────────────────────── */

const btn = document.getElementById('lang-toggle');

// Read saved language, default to English
let lang = localStorage.getItem('lang') || 'en';

// Apply the saved language on page load
applyLang(lang);

// Toggle on button click
btn.addEventListener('click', () => {
  lang = (lang === 'en') ? 'pt' : 'en';
  localStorage.setItem('lang', lang);
  applyLang(lang);
});

function applyLang(l) {
  // Update <html lang="">
  document.documentElement.lang = (l === 'pt') ? 'pt-BR' : 'en';

  // Update button label to show the OTHER language (what you'll switch to)
  btn.textContent = (l === 'en') ? 'PT-BR' : 'EN';

  // Find every element with a data-en or data-pt attribute
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = (l === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-pt');
    if (text) el.innerHTML = text;
  });
}

/* ── TABS ─────────────────────────────────────
   How it works:
   - The right side of the home page is split into
     panels (About / Projects / Links). Only one is
     shown at a time, so the page fits in one box.
   - The open tab is mirrored in the URL hash
     (e.g. #projects) so it can be linked directly.
   - Arrow keys move between tabs, as screen readers
     expect for role="tablist".
   ─────────────────────────────────────────── */

const tabs = [...document.querySelectorAll('[role="tab"]')];

if (tabs.length) {
  // Open the tab named in the URL, if any
  const fromHash = () => tabs.find(t => '#' + t.getAttribute('aria-controls') === location.hash);
  selectTab(fromHash() || tabs[0]);
  window.addEventListener('hashchange', () => selectTab(fromHash() || tabs[0]));

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      selectTab(tab);
      history.replaceState(null, '', '#' + tab.getAttribute('aria-controls'));
    });

    tab.addEventListener('keydown', e => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      const next = tabs[(i + step + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });
}

function selectTab(tab) {
  tabs.forEach(t => {
    const active = (t === tab);
    t.setAttribute('aria-selected', active);
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
  });
}
