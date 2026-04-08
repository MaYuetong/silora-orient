/* ============================================================
   SILORA ORIENT — Main JavaScript
   Navigation · Scroll Animations · Form Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navigation: scroll state ---- */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Journal page has dark nav — keep it styled properly
  const isJournalPage = document.title.includes('Journal');
  if (!isJournalPage) {
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ---- Mobile hamburger menu ---- */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  let menuOpen = false;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      document.body.style.overflow = menuOpen ? 'hidden' : '';

      // Animate hamburger lines
      const lines = hamburger.querySelectorAll('span');
      if (menuOpen) {
        lines[0].style.transform = 'translateY(6px) rotate(45deg)';
        lines[1].style.opacity   = '0';
        lines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        lines[0].style.transform = '';
        lines[1].style.opacity   = '';
        lines[2].style.transform = '';
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        const lines = hamburger.querySelectorAll('span');
        lines.forEach(l => { l.style.transform = ''; l.style.opacity = ''; });
      });
    });
  }

  /* ---- Scroll reveal (Intersection Observer) ---- */
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ---- Collections nav: active state on scroll ---- */
  const collectionNavItems = document.querySelectorAll('.collections-nav-item');

  if (collectionNavItems.length > 0) {
    const sections = ['eye-color', 'orchid', 'memory', 'wedding'].map(id => document.getElementById(id)).filter(Boolean);

    function updateCollectionNav() {
      let current = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 160) current = section.id;
      });

      collectionNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
          item.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateCollectionNav, { passive: true });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 80;
      const top       = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- Hero parallax (subtle) ---- */
  const heroImage = document.querySelector('.hero-image');

  if (heroImage) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* ---- Teaser card hover: cursor effect ---- */
  document.querySelectorAll('.teaser-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.querySelector('img').style.transitionDuration = '0.8s';
    });
  });

  /* ---- Gallery items: stagger on scroll ---- */
  const galleryItems = document.querySelectorAll('.gallery-item, .gm-a, .gm-b, .gm-c, .gm-d');

  if (galleryItems.length > 0) {
    const galleryObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 80);
          galleryObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    galleryItems.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      galleryObserver.observe(item);
    });
  }

  /* ---- Newsletter form — Mailchimp API ---- */
  const newsletterForm = document.querySelector('.newsletter-form');
  const newsletterBtn  = document.querySelector('.newsletter-btn');

  if (newsletterForm && newsletterBtn) {
    newsletterBtn.addEventListener('click', async function () {
      const input = newsletterForm.querySelector('input[type="email"]');
      const email = input ? input.value.trim() : '';

      if (!email.includes('@')) {
        if (input) {
          input.style.border = '1px solid var(--gold)';
          input.placeholder = 'Please enter a valid email · 请输入有效邮箱';
        }
        return;
      }

      const originalText  = newsletterBtn.textContent;
      newsletterBtn.textContent = '...';
      newsletterBtn.disabled    = true;

      try {
        const res = await fetch('/api/subscribe', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ email })
        });

        if (res.ok) {
          newsletterBtn.textContent    = '✓ Thank you · 感谢订阅';
          newsletterBtn.style.background = '#A8B89C';
          if (input) {
            input.value       = '';
            input.placeholder = "You're on the list · 已加入订阅列表";
            input.style.border = '';
          }
          /* GA4 conversion event */
          if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', { event_category: 'engagement' });
          }
        } else {
          throw new Error('subscription failed');
        }
      } catch {
        newsletterBtn.textContent = 'Try again · 请重试';
        newsletterBtn.disabled    = false;
      }
    });
  }

  /* ---- GA4: contact form submission ---- */
  const contactForm = document.querySelector('form[action*="formspree"]');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', { event_category: 'engagement' });
      }
    });
  }

  /* ---- Custom form: color chip labels ---- */
  const colorChips = document.querySelectorAll('.color-chip');

  colorChips.forEach(chip => {
    chip.addEventListener('click', function () {
      this.classList.toggle('selected');
    });
  });

  /* ---- Cursor dot (optional subtle effect) ---- */
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--gold, #BF9D6A);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s;
    opacity: 0;
    mix-blend-mode: multiply;
  `;
  document.body.appendChild(cursor);

  const cursorRing = document.createElement('div');
  cursorRing.style.cssText = `
    position: fixed;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(191, 157, 106, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s;
    opacity: 0;
  `;
  document.body.appendChild(cursorRing);

  let cx = 0, cy = 0;

  document.addEventListener('mousemove', function (e) {
    cx = e.clientX;
    cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    cursor.style.opacity = '1';
    cursorRing.style.left = cx + 'px';
    cursorRing.style.top  = cy + 'px';
    cursorRing.style.opacity = '0.6';
  });

  document.querySelectorAll('a, button, .teaser-card, .eye-card, .collection-card, .article-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      cursorRing.style.width  = '48px';
      cursorRing.style.height = '48px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '6px';
      cursor.style.height = '6px';
      cursorRing.style.width  = '30px';
      cursorRing.style.height = '30px';
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  /* ---- Page load fade in ---- */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);

});

/* ============================================================
   ADDONS — Language Switch · Pricing Modal · Clip-on Lightbox
   ============================================================ */

/* ---- Load translations and init language system ---- */
let translations = {};
let currentLang = localStorage.getItem('silora-lang') || 'en';

async function loadTranslations() {
  try {
    const res  = await fetch('/content/translations.json');
    const data = await res.json();
    translations = data;
    applyLanguage(currentLang);
  } catch (e) {
    // Translations file not available — silently skip
  }
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('silora-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key    = el.getAttribute('data-i18n');
    const parts  = key.split('.');
    let value    = translations;
    for (const part of parts) {
      if (!value) break;
      value = value[part];
    }
    if (value && value[lang]) {
      el.textContent = value[lang];
    }
  });

  // Update lang switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Wire up all lang switchers on page
function initLangSwitchers() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });
}

/* ---- Inject global modals into page ---- */
function injectModals() {
  // Pricing inquiry modal
  const pricingModal = document.createElement('div');
  pricingModal.className = 'modal-overlay';
  pricingModal.id = 'pricingModal';
  pricingModal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" id="pricingModalClose">✕</button>
      <p class="modal-product-name" id="pricingProductName"></p>
      <h2 class="modal-title" data-i18n="pricing_modal.title">Request Pricing</h2>
      <p class="modal-note" data-i18n="pricing_modal.note">
        Because each piece is handmade and may vary by customization, production time, and delivery location, pricing is shared individually.
      </p>
      <div class="modal-form" id="pricingForm">
        <div class="form-field">
          <label class="form-label">Your Name</label>
          <input type="text" class="form-input" id="pricingName" placeholder="Your name" />
        </div>
        <div class="form-field">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="pricingEmail" placeholder="your@email.com" />
        </div>
        <div class="form-field">
          <label class="form-label">Preferred Colors (optional)</label>
          <input type="text" class="form-input" id="pricingColors" placeholder="e.g. ivory, blush, sage…" />
        </div>
        <div class="form-field">
          <label class="form-label">Notes (optional)</label>
          <textarea class="form-textarea" id="pricingNotes" placeholder="Any customization ideas, occasion, or questions…" style="min-height:80px;"></textarea>
        </div>
        <div style="display:flex; justify-content:flex-end; margin-top:1rem;">
          <button class="btn btn-primary" id="pricingSend" data-i18n="pricing_modal.send">Send Inquiry</button>
        </div>
      </div>
      <div class="modal-success" id="pricingSuccess">
        <div class="modal-success-icon">✿</div>
        <p style="font-family:var(--font-serif); font-size:1.1rem; font-weight:300; margin-bottom:0.5rem;">
          Thank you. We will reply with pricing within 2–3 days.
        </p>
        <p style="font-size:0.8rem; color:var(--text-light);">— Silora Orient</p>
      </div>
    </div>`;
  document.body.appendChild(pricingModal);

  // Clip-on lightbox
  const cliponLightbox = document.createElement('div');
  cliponLightbox.className = 'lightbox-overlay';
  cliponLightbox.id = 'cliponLightbox';
  cliponLightbox.innerHTML = `
    <div class="lightbox-box">
      <button class="lightbox-close" id="cliponClose">✕</button>
      <img class="lightbox-img" src="images/white-orchid-earrings.jpg"
           alt="Clip-on earring style — Silora Orient" />
      <p style="font-family:var(--font-serif); font-size:1rem; margin-bottom:0.5rem;">
        Clip-on Earring Style
      </p>
      <p class="clip-on-note">
        All earring designs can be made as clip-on versions. The silk flower and hardware remain identical — only the fastening changes. Mention this in your custom order or contact us to request clip-on conversion.
      </p>
      <div style="display:flex; gap:1rem; justify-content:center; margin-top:1.5rem; flex-wrap:wrap;">
        <a href="custom.html" class="btn btn-primary" style="font-size:0.7rem; padding:0.7rem 1.4rem;">
          Request Clip-on →
        </a>
        <a href="contact.html" class="btn btn-ghost" style="font-size:0.7rem; padding:0.7rem 1.4rem;">
          Ask a Question
        </a>
      </div>
    </div>`;
  document.body.appendChild(cliponLightbox);

  // Pricing modal: open
  document.querySelectorAll('.btn-pricing').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.dataset.product || '';
      document.getElementById('pricingProductName').textContent = productName;
      document.getElementById('pricingModal').classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Pricing modal: close
  document.getElementById('pricingModalClose').addEventListener('click', closePricingModal);
  pricingModal.addEventListener('click', e => {
    if (e.target === pricingModal) closePricingModal();
  });

  function closePricingModal() {
    document.getElementById('pricingModal').classList.remove('open');
    document.body.style.overflow = '';
    // Reset form
    setTimeout(() => {
      document.getElementById('pricingForm').style.display = '';
      document.getElementById('pricingSuccess').classList.remove('active');
    }, 400);
  }

  // Pricing modal: send (Formspree)
  document.getElementById('pricingSend').addEventListener('click', async () => {
    const name    = document.getElementById('pricingName').value.trim();
    const email   = document.getElementById('pricingEmail').value.trim();
    const product = document.getElementById('pricingProductName').textContent;
    const colors  = document.getElementById('pricingColors').value;
    const notes   = document.getElementById('pricingNotes').value;

    if (!name || !email) {
      document.getElementById('pricingName').style.borderColor = name ? '' : 'var(--blush-deep)';
      document.getElementById('pricingEmail').style.borderColor = email ? '' : 'var(--blush-deep)';
      return;
    }

    const formData = new FormData();
    formData.append('name',    name);
    formData.append('email',   email);
    formData.append('_subject',`Silora Orient Pricing Request — ${product}`);
    formData.append('message', `Product: ${product}\nColors: ${colors}\nNotes: ${notes}`);

    try {
      const res = await fetch('https://formspree.io/f/xlgopzqb', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        document.getElementById('pricingForm').style.display = 'none';
        document.getElementById('pricingSuccess').classList.add('active');
      }
    } catch (e) {
      alert('Please email us at hello@siloraorient.com');
    }
  });

  // Clip-on lightbox: open
  document.querySelectorAll('.clip-on-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('cliponLightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Clip-on lightbox: close
  document.getElementById('cliponClose').addEventListener('click', closeClipon);
  cliponLightbox.addEventListener('click', e => {
    if (e.target === cliponLightbox) closeClipon();
  });

  function closeClipon() {
    document.getElementById('cliponLightbox').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ESC key closes any modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePricingModal();
      closeClipon();
    }
  });
}

/* ---- Init on DOM ready ---- */
function buildUploadPreview(inpId,prevId){var inp=document.getElementById(inpId),prev=document.getElementById(prevId);if(!inp||!prev)return;inp.addEventListener('change',function(){prev.innerHTML='';Array.from(this.files).forEach(function(f){var d=document.createElement('div');d.className='upload-preview-item';var ck='<div class="upload-preview-check">\u2713</div>';if(f.type.startsWith('image/')){var r=new FileReader();r.onload=function(e){d.innerHTML='<img src="'+e.target.result+'" alt="preview"/>'+ck;};r.readAsDataURL(f);}else{d.innerHTML='<div class="upload-preview-name">'+f.name+'</div>'+ck;}prev.appendChild(d);});});}

document.addEventListener('DOMContentLoaded', function () {
  injectModals();
  initLangSwitchers();
  loadTranslations();
  buildUploadPreview('eyePhotoInput','eyePhotoPreview');
  buildUploadPreview('inspirationInput','inspirationPreview');
  buildUploadPreview('reviewPhotoInput','reviewPhotoPreview');
});
