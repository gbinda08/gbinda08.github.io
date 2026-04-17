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
