/**
 * Apollo Carpet & Upholstery Cleaning - Main JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. Header & Navigation ---
  const header = document.querySelector('.main-header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header shadow
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    if (menuToggle) menuToggle.classList.toggle('active');
    if (mobileNav) mobileNav.classList.toggle('open');
    if (drawerOverlay) drawerOverlay.classList.toggle('active');
    document.body.style.overflow = (mobileNav && mobileNav.classList.contains('open')) ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (menuToggle) menuToggle.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  // --- Multilingual i18n Controller ---
  const langButtons = document.querySelectorAll('.lang-flag-btn');
  let currentLanguage = localStorage.getItem('apollo_lang') || 'en';

  function applyLanguage(lang) {
    currentLanguage = lang;
    try {
      localStorage.setItem('apollo_lang', lang);
    } catch (e) {}

    document.documentElement.lang = lang;

    // Atualiza botões ativos
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const dict = (window.APOLLO_TRANSLATIONS && window.APOLLO_TRANSLATIONS[lang]) 
      ? window.APOLLO_TRANSLATIONS[lang] 
      : (window.APOLLO_TRANSLATIONS ? window.APOLLO_TRANSLATIONS.en : null);

    if (!dict) return;

    // 1. Top Bar
    const topBarArea = document.querySelector('.top-bar-service-area span');
    if (topBarArea) {
      topBarArea.innerHTML = `${lang === 'pt' ? 'Atendendo' : lang === 'es' ? 'Atendiendo' : 'Serving'} <strong>Orlando, Kissimmee, Winter Park, Davenport, Windermere, Ocoee, Dr. Phillips, Lake Nona, Celebration & Clermont</strong>`;
    }

    // 2. Navigation
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
    if (navLinks.length >= 4) {
      navLinks[0].textContent = dict.nav.services;
      const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
      if (dropdownToggle) {
        dropdownToggle.innerHTML = `${dict.nav.ourWork} <i class="bi bi-chevron-down" style="font-size: 0.75rem; margin-left: 2px;"></i>`;
      }
      const dropItems = document.querySelectorAll('.nav-dropdown-menu .dropdown-item');
      if (dropItems.length >= 2) {
        dropItems[0].innerHTML = `<i class="bi bi-images"></i> ${dict.nav.verifiedResults}`;
        dropItems[1].innerHTML = `<i class="bi bi-camera-fill"></i> ${dict.nav.realJobPhotos}`;
      }
      navLinks[2].textContent = dict.nav.whyChooseUs;
      navLinks[3].textContent = dict.nav.serviceAreas;
      if (navLinks[4]) navLinks[4].textContent = dict.nav.faq;
    }

    const phoneLabel = document.querySelector('.phone-meta .phone-label');
    if (phoneLabel) phoneLabel.textContent = dict.nav.callDirect;

    const navQuoteBtn = document.querySelector('.header-actions .btn-accent');
    if (navQuoteBtn) {
      navQuoteBtn.innerHTML = `<i class="bi bi-clipboard-check"></i> <span>${dict.nav.getFreeQuote}</span>`;
    }

    // Mobile Drawer Links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link span');
    if (mobileLinks.length >= 6) {
      mobileLinks[0].textContent = 'Home';
      mobileLinks[1].textContent = dict.nav.services;
      mobileLinks[2].textContent = dict.nav.verifiedResults;
      mobileLinks[3].textContent = dict.nav.realJobPhotos;
      mobileLinks[4].textContent = dict.nav.whyChooseUs;
      mobileLinks[5].textContent = dict.nav.serviceAreas;
      if (mobileLinks[6]) mobileLinks[6].textContent = dict.nav.faq;
    }

    const drawerQuoteBtn = document.querySelector('.mobile-drawer-contact .btn-accent');
    if (drawerQuoteBtn) {
      drawerQuoteBtn.innerHTML = `<i class="bi bi-clipboard-check"></i> ${dict.hero.btnQuote}`;
    }

    // 3. Hero Section
    const heroBadge = document.querySelector('.hero-badge span');
    if (heroBadge) heroBadge.textContent = dict.hero.badge;

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = `${dict.hero.titlePrefix} <span>${dict.hero.titleHighlight}</span> ${dict.hero.titleSuffix}`;
    }

    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
      heroDesc.innerHTML = `${dict.hero.descP1}<br><br>${dict.hero.descP2}<br><br><strong>${dict.hero.descP3}</strong>`;
    }

    const heroQuoteBtn = document.querySelector('.hero-cta-group .btn-primary');
    if (heroQuoteBtn) {
      heroQuoteBtn.innerHTML = `<i class="bi bi-calculator"></i> ${dict.hero.btnQuote}`;
    }

    // 4. Ticker Items
    const tickerItems = document.querySelectorAll('.ticker-item');
    if (tickerItems.length > 0 && dict.ticker) {
      tickerItems.forEach((item, idx) => {
        const text = dict.ticker[idx % dict.ticker.length];
        item.innerHTML = `<i class="bi bi-sparkles"></i> ${text}`;
      });
    }

    // 5. Services Section
    const servicesTag = document.querySelector('#services .section-tag span');
    if (servicesTag) servicesTag.textContent = dict.servicesSection.tag;

    const servicesTitle = document.querySelector('#services .section-title');
    if (servicesTitle) servicesTitle.textContent = dict.servicesSection.title;

    const servicesSubtitle = document.querySelector('#services .section-subtitle');
    if (servicesSubtitle) servicesSubtitle.textContent = dict.servicesSection.subtitle;

    const serviceCards = document.querySelectorAll('#services .service-card');
    if (dict.servicesSection.services) {
      serviceCards.forEach((card, idx) => {
        const sData = dict.servicesSection.services[idx];
        if (!sData) return;
        const badge = card.querySelector('.service-badge');
        if (badge) badge.textContent = sData.badge;
        const title = card.querySelector('.service-card-title');
        if (title) title.textContent = sData.title;
        const desc = card.querySelector('.service-desc');
        if (desc) desc.textContent = sData.desc;
        const featureLis = card.querySelectorAll('.service-features li');
        if (featureLis.length >= 3 && sData.features) {
          featureLis[0].innerHTML = `<i class="bi bi-check2-circle"></i> <span>${sData.features[0]}</span>`;
          featureLis[1].innerHTML = `<i class="bi bi-check2-circle"></i> <span>${sData.features[1]}</span>`;
          featureLis[2].innerHTML = `<i class="bi bi-check2-circle"></i> <span>${sData.features[2]}</span>`;
        }
        const btnSelect = card.querySelector('.btn-select-service');
        if (btnSelect) {
          btnSelect.innerHTML = `<i class="bi bi-plus-circle"></i> <span>${dict.servicesSection.btnSelect}</span>`;
        }
      });
    }

    // House Cleaning Card
    const houseCard = document.querySelector('.house-cleaning-card');
    if (houseCard && dict.servicesSection.houseCard) {
      const hData = dict.servicesSection.houseCard;
      const hBadge = houseCard.querySelector('.house-badge');
      if (hBadge) hBadge.textContent = hData.badge;
      const hTitle = houseCard.querySelector('.house-card-title');
      if (hTitle) hTitle.textContent = hData.title;
      const hDesc = houseCard.querySelector('.house-card-desc');
      if (hDesc) hDesc.textContent = hData.desc;
      const hLis = houseCard.querySelectorAll('.house-features li');
      if (hLis.length >= 3 && hData.features) {
        hLis[0].innerHTML = `<i class="bi bi-check2-circle"></i> <span>${hData.features[0]}</span>`;
        hLis[1].innerHTML = `<i class="bi bi-check2-circle"></i> <span>${hData.features[1]}</span>`;
        hLis[2].innerHTML = `<i class="bi bi-check2-circle"></i> <span>${hData.features[2]}</span>`;
      }
      const hBtn = houseCard.querySelector('.btn-select-house');
      if (hBtn) {
        hBtn.innerHTML = `<i class="bi bi-plus-circle"></i> <span>${hData.btnSelect}</span>`;
      }
    }

    // 6. Verified Results
    const resTag = document.querySelector('#before-after .section-tag span');
    if (resTag) resTag.textContent = dict.resultsSection.tag;

    const resTitle = document.querySelector('#before-after .section-title');
    if (resTitle) resTitle.textContent = dict.resultsSection.title;

    const resSubtitle = document.querySelector('#before-after .section-subtitle');
    if (resSubtitle) resSubtitle.textContent = dict.resultsSection.subtitle;

    const resSlides = document.querySelectorAll('.results-slide-card');
    if (dict.resultsSection.slides) {
      resSlides.forEach((slide, idx) => {
        const rData = dict.resultsSection.slides[idx];
        if (!rData) return;
        const badge = slide.querySelector('.slide-badge-clean');
        if (badge) badge.textContent = rData.badge;
        const cat = slide.querySelector('.slide-category-tag span');
        if (cat) cat.textContent = rData.category;
        const heading = slide.querySelector('.slide-heading');
        if (heading) heading.textContent = rData.heading;
        const desc = slide.querySelector('.slide-description');
        if (desc) desc.textContent = rData.desc;
        const tag1 = slide.querySelector('.slide-tag-group .slide-tag:nth-child(1) span');
        if (tag1) tag1.textContent = rData.tag1;
        const tag2 = slide.querySelector('.slide-tag-group .slide-tag:nth-child(2) span');
        if (tag2) tag2.textContent = rData.tag2;
      });
    }

    // 7. Real Job Gallery
    const galTag = document.querySelector('#gallery .section-tag span');
    if (galTag) galTag.textContent = dict.gallerySection.tag;

    const galTitle = document.querySelector('#gallery .section-title');
    if (galTitle) galTitle.textContent = dict.gallerySection.title;

    const galSubtitle = document.querySelector('#gallery .section-subtitle');
    if (galSubtitle) galSubtitle.textContent = dict.gallerySection.subtitle;

    const galSlides = document.querySelectorAll('.gallery-slide-item');
    if (dict.gallerySection.slides) {
      galSlides.forEach((slide, idx) => {
        const gData = dict.gallerySection.slides[idx];
        if (!gData) return;
        const cap = slide.querySelector('.gallery-caption-title');
        if (cap) cap.textContent = gData.title;
      });
    }

    // 8. Why Choose Apollo
    const whyTag = document.querySelector('#why-us .section-tag span');
    if (whyTag) whyTag.textContent = dict.whySection.tag;

    const whyTitle = document.querySelector('#why-us .section-title');
    if (whyTitle) whyTitle.textContent = dict.whySection.title;

    const whySubtitle = document.querySelector('#why-us .section-subtitle');
    if (whySubtitle) whySubtitle.textContent = dict.whySection.subtitle;

    const whyCards = document.querySelectorAll('.why-card');
    if (dict.whySection.cards) {
      whyCards.forEach((card, idx) => {
        const wData = dict.whySection.cards[idx];
        if (!wData) return;
        const title = card.querySelector('.why-card-title');
        if (title) title.textContent = wData.title;
        const desc = card.querySelector('.why-card-desc');
        if (desc) desc.textContent = wData.desc;
      });
    }

    // 9. Service Areas
    const areasTag = document.querySelector('#areas .section-tag span');
    if (areasTag) areasTag.textContent = dict.areasSection.tag;

    const areasTitle = document.querySelector('#areas .section-title');
    if (areasTitle) areasTitle.textContent = dict.areasSection.title;

    const areasSubtitle = document.querySelector('#areas .section-subtitle');
    if (areasSubtitle) areasSubtitle.textContent = dict.areasSection.subtitle;

    // 10. FAQ Section
    const faqTag = document.querySelector('#faq .section-tag span');
    if (faqTag) faqTag.textContent = dict.faqSection.tag;

    const faqTitle = document.querySelector('#faq .section-title');
    if (faqTitle) faqTitle.textContent = dict.faqSection.title;

    const faqSubtitle = document.querySelector('#faq .section-subtitle');
    if (faqSubtitle) faqSubtitle.textContent = dict.faqSection.subtitle;

    const faqItems = document.querySelectorAll('.faq-item');
    if (dict.faqSection.items) {
      faqItems.forEach((item, idx) => {
        const fData = dict.faqSection.items[idx];
        if (!fData) return;
        const q = item.querySelector('.faq-question span');
        if (q) q.textContent = fData.q;
        const a = item.querySelector('.faq-answer p');
        if (a) a.textContent = fData.a;
      });
    }

    // 11. Quote Estimator Section
    const quoteTag = document.querySelector('#quote .section-tag span');
    if (quoteTag) quoteTag.textContent = dict.quoteSection.tag;

    const quoteTitle = document.querySelector('#quote .section-title');
    if (quoteTitle) quoteTitle.textContent = dict.quoteSection.title;

    const quoteSubtitle = document.querySelector('#quote .section-subtitle');
    if (quoteSubtitle) quoteSubtitle.textContent = dict.quoteSection.subtitle;

    const stepHeaders = document.querySelectorAll('.form-step-header h3');
    if (stepHeaders.length >= 3) {
      stepHeaders[0].textContent = dict.quoteSection.step1;
      stepHeaders[1].textContent = dict.quoteSection.step2;
      stepHeaders[2].textContent = dict.quoteSection.step3;
    }

    // Service Option Checkboxes Labels
    const optLabels = {
      'optCarpet': dict.quoteSection.serviceNames.carpet,
      'optSofas': dict.quoteSection.serviceNames.sofas,
      'optRugs': dict.quoteSection.serviceNames.rugs,
      'optMattresses': dict.quoteSection.serviceNames.mattresses,
      'optChairs': dict.quoteSection.serviceNames.chairs,
      'optHouse': dict.quoteSection.serviceNames.house,
    };

    Object.keys(optLabels).forEach(optId => {
      const el = document.getElementById(optId);
      if (el) {
        const card = el.closest('.service-option-card');
        const span = card ? card.querySelector('.service-option-info span') : null;
        if (span) span.textContent = optLabels[optId];
      }
    });

    // Form inputs and placeholders
    const notesInput = document.getElementById('clientNotes');
    if (notesInput) {
      notesInput.placeholder = dict.quoteSection.fields.notesPlaceholder;
    }

    const quoteSummaryTitle = document.querySelector('.quote-summary-card h4');
    if (quoteSummaryTitle) {
      quoteSummaryTitle.innerHTML = `<i class="bi bi-receipt"></i> ${dict.quoteSection.summary.title}`;
    }

    const quoteSubmitBtn = document.querySelector('#quoteForm button[type="submit"]');
    if (quoteSubmitBtn) {
      quoteSubmitBtn.innerHTML = `<i class="bi bi-whatsapp"></i> <span>${dict.quoteSection.summary.btnSubmit}</span>`;
    }

    // 12. Success Modal
    const modalTitle = document.querySelector('#successModal .modal-header h3');
    if (modalTitle) modalTitle.textContent = dict.modal.title;

    const modalDesc = document.querySelector('#successModal .modal-body > p');
    if (modalDesc) modalDesc.textContent = dict.modal.desc;

    const modalBtnContinue = document.getElementById('sendWhatsappQuoteBtn');
    if (modalBtnContinue) {
      modalBtnContinue.innerHTML = `<i class="bi bi-whatsapp"></i> ${dict.modal.btnContinue}`;
    }

    const modalBtnEdit = document.getElementById('closeModalBtn');
    if (modalBtnEdit) modalBtnEdit.textContent = dict.modal.btnEdit;

    // 13. Footer
    const footerAbout = document.querySelector('.footer-brand-col p');
    if (footerAbout) footerAbout.textContent = dict.footer.about;

    const footerColTitles = document.querySelectorAll('.footer-col h4');
    if (footerColTitles.length >= 3) {
      footerColTitles[0].textContent = dict.footer.quickLinks;
      footerColTitles[1].textContent = dict.footer.servicesTitle;
      footerColTitles[2].textContent = dict.footer.contactTitle;
    }

    const footerRights = document.querySelector('.footer-bottom-inner > div:first-child');
    if (footerRights) {
      footerRights.innerHTML = `&copy; ${new Date().getFullYear()} ${dict.footer.rights}`;
    }

    // 14. Mobile Sticky Bottom Bar
    const mobileBarCall = document.querySelector('.mobile-sticky-bar a[href^="tel"]');
    if (mobileBarCall) {
      mobileBarCall.innerHTML = `<i class="bi bi-telephone-fill"></i> ${lang === 'pt' ? 'Ligue Agora' : lang === 'es' ? 'Llamar Ahora' : 'Call Now'}`;
    }

    const mobileBarQuote = document.querySelector('.mobile-sticky-bar a[href="#quote"]');
    if (mobileBarQuote) {
      mobileBarQuote.innerHTML = `<i class="bi bi-calculator"></i> ${lang === 'pt' ? 'Orçamento Grátis' : lang === 'es' ? 'Cotización Gratis' : 'Free Quote'}`;
    }

    // Atualiza resumo de orçamento se a função existir
    if (typeof updateQuoteSummary === 'function') {
      updateQuoteSummary();
    }
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const selected = this.getAttribute('data-lang');
      if (selected) {
        applyLanguage(selected);
      }
    });
  });

  applyLanguage(currentLanguage);

  // --- 2. Verified Work Results Automatic Slider (2-second interval & manual controls) ---
  const resultsCarousel = document.getElementById('resultsCarousel');
  const resultsSlides = document.querySelectorAll('.results-slide-card');
  const resultsDots = document.querySelectorAll('.results-dot');
  const resultsPrevBtn = document.getElementById('resultsPrevBtn');
  const resultsNextBtn = document.getElementById('resultsNextBtn');
  
  let currentResultIndex = 0;
  let resultsAutoTimer = null;
  const slideIntervalMs = 2000; // 2 segundos automático

  function showResultSlide(index) {
    if (resultsSlides.length === 0) return;
    
    // Normalizar índice circular
    if (index >= resultsSlides.length) {
      currentResultIndex = 0;
    } else if (index < 0) {
      currentResultIndex = resultsSlides.length - 1;
    } else {
      currentResultIndex = index;
    }

    resultsSlides.forEach((slide, idx) => {
      if (idx === currentResultIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    resultsDots.forEach((dot, idx) => {
      if (idx === currentResultIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startResultsAutoSlide() {
    stopResultsAutoSlide();
    resultsAutoTimer = setInterval(function () {
      showResultSlide(currentResultIndex + 1);
    }, slideIntervalMs);
  }

  function stopResultsAutoSlide() {
    if (resultsAutoTimer) {
      clearInterval(resultsAutoTimer);
      resultsAutoTimer = null;
    }
  }

  if (resultsCarousel && resultsSlides.length > 0) {
    // Inicializar slide
    showResultSlide(0);
    startResultsAutoSlide();

    // Eventos dos botões
    if (resultsNextBtn) {
      resultsNextBtn.addEventListener('click', function () {
        showResultSlide(currentResultIndex + 1);
        startResultsAutoSlide();
      });
    }

    if (resultsPrevBtn) {
      resultsPrevBtn.addEventListener('click', function () {
        showResultSlide(currentResultIndex - 1);
        startResultsAutoSlide();
      });
    }

    // Eventos dos dots
    resultsDots.forEach(dot => {
      dot.addEventListener('click', function () {
        const targetIndex = parseInt(this.getAttribute('data-index'), 10);
        showResultSlide(targetIndex);
        startResultsAutoSlide();
      });
    });

    // Pausar no hover e suporte a gesto de swipe touch no mobile
    resultsCarousel.addEventListener('mouseenter', stopResultsAutoSlide);
    resultsCarousel.addEventListener('mouseleave', startResultsAutoSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    resultsCarousel.addEventListener('touchstart', function (e) {
      stopResultsAutoSlide();
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    resultsCarousel.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 45) { // Swipe threshold
          if (diffX > 0) {
            // Swipe para a esquerda -> Próximo slide
            showResultSlide(currentResultIndex + 1);
          } else {
            // Swipe para a direita -> Slide anterior
            showResultSlide(currentResultIndex - 1);
          }
        }
      }
      startResultsAutoSlide();
    }, { passive: true });
  }

  // --- 4. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // --- 5. Interactive Quote Form ---
  const serviceCards = document.querySelectorAll('.service-option-card');
  const detailBlocks = {
    carpet: document.getElementById('detailCarpet'),
    sofas: document.getElementById('detailSofas'),
    rugs: document.getElementById('detailRugs'),
    mattresses: document.getElementById('detailMattresses'),
    chairs: document.getElementById('detailChairs'),
    house: document.getElementById('detailHouse')
  };
  const quoteSummaryEl = document.getElementById('quoteSummaryText');
  const quoteForm = document.getElementById('apolloQuoteForm');
  const phoneInput = document.getElementById('clientPhone');

  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  }

  serviceCards.forEach(card => {
    card.addEventListener('click', function () {
      const checkbox = card.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      card.classList.toggle('selected', checkbox.checked);

      const serviceKey = card.dataset.service;
      if (detailBlocks[serviceKey]) {
        if (checkbox.checked) {
          detailBlocks[serviceKey].classList.add('visible');
        } else {
          detailBlocks[serviceKey].classList.remove('visible');
        }
      }
      updateQuoteSummary();
    });
  });

  window.selectServiceInQuote = function (serviceKey) {
    const targetCard = document.querySelector(`.service-option-card[data-service="${serviceKey}"]`);
    if (targetCard) {
      const checkbox = targetCard.querySelector('input[type="checkbox"]');
      if (!checkbox.checked) {
        checkbox.checked = true;
        targetCard.classList.add('selected');
        if (detailBlocks[serviceKey]) {
          detailBlocks[serviceKey].classList.add('visible');
        }
      }
      updateQuoteSummary();
    }
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (quoteForm) {
    quoteForm.addEventListener('change', updateQuoteSummary);
    quoteForm.addEventListener('input', updateQuoteSummary);
  }

  function updateQuoteSummary() {
    if (!quoteSummaryEl) return;
    const selected = [];
    const dict = (window.APOLLO_TRANSLATIONS && window.APOLLO_TRANSLATIONS[currentLanguage])
      ? window.APOLLO_TRANSLATIONS[currentLanguage]
      : (window.APOLLO_TRANSLATIONS ? window.APOLLO_TRANSLATIONS.en : null);

    const isEs = currentLanguage === 'es';
    const isPt = currentLanguage === 'pt';

    const carpetCheck = document.querySelector('#optCarpet:checked');
    if (carpetCheck) {
      const rooms = document.getElementById('carpetRooms')?.value || '1';
      const stairs = document.getElementById('carpetStairs')?.value || '0';
      const stains = document.getElementById('carpetStains')?.checked;
      const pet = document.getElementById('carpetPet')?.checked;
      let notes = [];
      if (parseInt(stairs) > 0) {
        notes.push(isEs ? `${stairs} tramos de escaleras` : isPt ? `${stairs} lances de escada` : `${stairs} flights of stairs`);
      }
      if (stains) {
        notes.push(isEs ? 'Tratamiento de manchas' : isPt ? 'Tratamento de manchas' : 'Stain treatment');
      }
      if (pet) {
        notes.push(isEs ? 'Tratamiento de olor de mascotas' : isPt ? 'Tratamento de odores pet' : 'Pet odor removal');
      }
      const sName = dict ? dict.quoteSection.serviceNames.carpet : 'Carpet Cleaning';
      const rLabel = isEs ? `${rooms} habitación(es)` : isPt ? `${rooms} cômodo(s)` : `${rooms} room(s)`;
      selected.push(`• ${sName} (${rLabel}${notes.length ? ', ' + notes.join(', ') : ''})`);
    }

    const sofasCheck = document.querySelector('#optSofas:checked');
    if (sofasCheck) {
      const standardSofas = document.getElementById('sofaCount')?.value || '0';
      const sectionals = document.getElementById('sectionalCount')?.value || '0';
      const recliners = document.getElementById('reclinerCount')?.value || '0';
      let sofaDetails = [];
      if (parseInt(standardSofas) > 0) {
        sofaDetails.push(isEs ? `${standardSofas} Sofá(s) Estándar` : isPt ? `${standardSofas} Sofá(s) Padrão` : `${standardSofas} Standard Sofa(s)`);
      }
      if (parseInt(sectionals) > 0) {
        sofaDetails.push(isEs ? `${sectionals} Seccional(es) en L` : isPt ? `${sectionals} Sofá(s) em L` : `${sectionals} Sectional(s)`);
      }
      if (parseInt(recliners) > 0) {
        sofaDetails.push(isEs ? `${recliners} Sillón(es) / Reclinable(s)` : isPt ? `${recliners} Poltrona(s) / Reclinável(is)` : `${recliners} Recliner/Armchair(s)`);
      }
      const sName = dict ? dict.quoteSection.serviceNames.sofas : 'Sofas & Sectionals';
      selected.push(`• ${sName} (${sofaDetails.length ? sofaDetails.join(', ') : (isEs ? 'Seleccionado' : isPt ? 'Selecionado' : 'Selected')})`);
    }

    const rugsCheck = document.querySelector('#optRugs:checked');
    if (rugsCheck) {
      const rugCount = document.getElementById('rugCount')?.value || '1';
      const rugType = document.getElementById('rugType')?.value || 'Standard';
      const sName = dict ? dict.quoteSection.serviceNames.rugs : 'Area Rugs';
      const rUnit = isEs ? `${rugCount} tapete(s)` : isPt ? `${rugCount} tapete(s)` : `${rugCount} rug(s)`;
      selected.push(`• ${sName} (${rUnit} - ${rugType})`);
    }

    const mattressesCheck = document.querySelector('#optMattresses:checked');
    if (mattressesCheck) {
      const kingQueen = document.getElementById('mattressKing')?.value || '0';
      const twinFull = document.getElementById('mattressTwin')?.value || '0';
      const totalM = parseInt(kingQueen) + parseInt(twinFull);
      const sName = dict ? dict.quoteSection.serviceNames.mattresses : 'Mattresses';
      const mLabel = isEs ? `${totalM} colchón(es) a sanitizar` : isPt ? `${totalM} colchão(ões) para higienizar` : `${totalM} item(s) to sanitize`;
      selected.push(`• ${sName} (${mLabel})`);
    }

    const chairsCheck = document.querySelector('#optChairs:checked');
    if (chairsCheck) {
      const diningCount = document.getElementById('diningChairCount')?.value || '0';
      const accentCount = document.getElementById('accentChairCount')?.value || '0';
      const sName = dict ? dict.quoteSection.serviceNames.chairs : 'Dining Chairs';
      const cLabel = isEs ? `${diningCount} Comedor, ${accentCount} Acento` : isPt ? `${diningCount} Jantar, ${accentCount} Destaque` : `${diningCount} Dining, ${accentCount} Accent`;
      selected.push(`• ${sName} (${cLabel})`);
    }

    const houseCheck = document.querySelector('#optHouse:checked');
    if (houseCheck) {
      const houseType = document.getElementById('houseCleaningType')?.value || 'One-Time Deep Clean';
      const beds = document.getElementById('houseBeds')?.value || '3';
      const baths = document.getElementById('houseBaths')?.value || '2';
      const sName = dict ? dict.quoteSection.serviceNames.house : 'House Cleaning';
      const bLabel = isEs ? `${beds} Hab. / ${baths} Baños` : isPt ? `${beds} Quartos / ${baths} Banheiros` : `${beds} Beds / ${baths} Baths`;
      selected.push(`• ${sName} (${houseType} - ${bLabel})`);
    }

    if (selected.length === 0) {
      const noServicesMsg = dict ? dict.quoteSection.summary.noServices : 'No services selected yet. Please select at least one service above to customize your quote request.';
      quoteSummaryEl.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">${noServicesMsg}</span>`;
    } else {
      quoteSummaryEl.innerHTML = selected.join('<br>');
    }
  }

  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalSummaryDetails = document.getElementById('modalSummaryDetails');
  const sendWhatsappBtn = document.getElementById('sendWhatsappQuoteBtn');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const isPt = currentLanguage === 'pt';
      const isEs = currentLanguage === 'es';

      const anyService = document.querySelectorAll('.service-option-card.selected');
      if (anyService.length === 0) {
        const msg = isPt 
          ? 'Por favor, selecione pelo menos um serviço para solicitar o orçamento.' 
          : isEs 
          ? 'Por favor, seleccione al menos un servicio para solicitar la cotización.' 
          : 'Please select at least one service to request a quote.';
        alert(msg);
        const optionsGrid = document.querySelector('.service-options-grid');
        if (optionsGrid) optionsGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const clientName = document.getElementById('clientName').value.trim();
      const clientPhone = document.getElementById('clientPhone').value.trim();
      const clientEmail = document.getElementById('clientEmail').value.trim();
      const clientCity = document.getElementById('clientCity').value.trim();
      const clientNotes = document.getElementById('clientNotes').value.trim();

      if (!clientName || !clientPhone || !clientEmail || !clientCity) {
        const msg = isPt 
          ? 'Por favor, preencha seu Nome, Telefone, E-mail e Cidade/CEP.' 
          : isEs 
          ? 'Por favor, complete su Nombre, Teléfono, Correo y Ciudad/Código Postal.' 
          : 'Please fill in your Name, Phone, Email, and City/ZIP Code.';
        alert(msg);
        return;
      }

      const summaryText = quoteSummaryEl.innerText;
      const quotePayload = {
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        city: clientCity,
        notes: clientNotes,
        services: summaryText,
        language: currentLanguage,
        timestamp: new Date().toISOString(),
        destination: 'contact@apollocarpetcleaning.com'
      };

      try {
        const history = JSON.parse(localStorage.getItem('apollo_quotes') || '[]');
        history.push(quotePayload);
        localStorage.setItem('apollo_quotes', JSON.stringify(history));
      } catch (err) {
        console.warn('Storage unavailable', err);
      }

      if (modalSummaryDetails) {
        const clientLbl = isPt ? 'Cliente' : isEs ? 'Cliente' : 'Client';
        const locLbl = isPt ? 'Localização' : isEs ? 'Ubicación' : 'Location';
        const emailLbl = isPt ? 'E-mail' : isEs ? 'Correo' : 'Email';
        const servLbl = isPt ? 'Serviços Solicitados' : isEs ? 'Servicios Solicitados' : 'Requested Services';

        modalSummaryDetails.innerHTML = `
          <strong>${clientLbl}:</strong> ${clientName} (${clientPhone})<br>
          <strong>${locLbl}:</strong> ${clientCity}<br>
          <strong>${emailLbl}:</strong> ${clientEmail}<br>
          <strong>${servLbl}:</strong><br>
          ${summaryText.replace(/•/g, '&bull;')}
        `;
      }

      if (successModal) {
        successModal.classList.add('show');
      }

      if (sendWhatsappBtn) {
        const headerTitle = isPt 
          ? '*Apollo Carpet Cleaning - Pedido de Orçamento*' 
          : isEs 
          ? '*Apollo Carpet Cleaning - Solicitud de Cotización*' 
          : '*Apollo Carpet Cleaning - Quote Request*';

        const nameLbl = isPt ? '*Nome:*' : isEs ? '*Nombre:*' : '*Name:*';
        const phoneLbl = isPt ? '*Telefone:*' : isEs ? '*Teléfono:*' : '*Phone:*';
        const locLbl = isPt ? '*Localização:*' : isEs ? '*Ubicación:*' : '*Location:*';
        const emailLbl = isPt ? '*E-mail:*' : isEs ? '*Correo:*' : '*Email:*';
        const servLbl = isPt ? '*Serviços Solicitados:*' : isEs ? '*Servicios Solicitados:*' : '*Services Requested:*';
        const notesLbl = isPt ? '*Observações:*' : isEs ? '*Notas:*' : '*Notes:*';

        const waMsg = encodeURIComponent(
          `${headerTitle}\n\n` +
          `${nameLbl} ${clientName}\n` +
          `${phoneLbl} ${clientPhone}\n` +
          `${locLbl} ${clientCity}\n` +
          `${emailLbl} ${clientEmail}\n\n` +
          `${servLbl}\n${summaryText}\n\n` +
          (clientNotes ? `${notesLbl} ${clientNotes}\n\n` : '') +
          `_Enviado via apollocarpetcleaning.com_`
        );
        sendWhatsappBtn.href = `https://wa.me/13212725560?text=${waMsg}`;
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
      successModal.classList.remove('show');
      quoteForm.reset();
      serviceCards.forEach(c => {
        c.classList.remove('selected');
        c.querySelector('input[type="checkbox"]').checked = false;
      });
      Object.values(detailBlocks).forEach(block => {
        if (block) block.classList.remove('visible');
      });
      updateQuoteSummary();
    });
  }

  // Hero Video Sound & Autoplay Controller
  const heroVideo = document.getElementById('heroVideo');
  const heroAudioToggle = document.getElementById('heroAudioToggle');
  const heroAudioIcon = document.getElementById('heroAudioIcon');
  const heroAudioLabel = document.getElementById('heroAudioLabel');

  if (heroVideo) {
    // Attempt automatic playback
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Hero video autoplay muted fallback:', error);
        heroVideo.muted = true;
        heroVideo.play();
      });
    }

    if (heroAudioToggle) {
      heroAudioToggle.addEventListener('click', function () {
        if (heroVideo.muted) {
          heroVideo.muted = false;
          heroAudioIcon.className = 'bi bi-volume-up-fill';
          if (heroAudioLabel) heroAudioLabel.textContent = 'Mute';
        } else {
          heroVideo.muted = true;
          heroAudioIcon.className = 'bi bi-volume-mute-fill';
          if (heroAudioLabel) heroAudioLabel.textContent = 'Unmute';
        }
      });
    }
  }

  // --- 6. Services Carousel Controller ---
  const servicesWrap = document.getElementById('servicesCarouselWrap');
  const servicesTrack = document.getElementById('servicesCarouselTrack');
  const servicesPrevBtn = document.getElementById('servicesPrevBtn');
  const servicesNextBtn = document.getElementById('servicesNextBtn');
  const servicesDotsRow = document.getElementById('servicesDotsRow');

  if (servicesWrap && servicesTrack) {
    const slides = servicesTrack.querySelectorAll('.service-slide-item');
    let currentServiceIndex = 0;
    let isServicesHovered = false;

    function getItemsPerView() {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function updateServicesCarousel() {
      const itemsPerView = getItemsPerView();
      const maxIndex = Math.max(0, slides.length - itemsPerView);
      if (currentServiceIndex > maxIndex) {
        currentServiceIndex = maxIndex;
      }
      const itemWidthPercent = 100 / itemsPerView;
      servicesTrack.style.transform = `translateX(-${currentServiceIndex * itemWidthPercent}%)`;

      // Update dots
      if (servicesDotsRow) {
        servicesDotsRow.innerHTML = '';
        const dotCount = maxIndex + 1;
        for (let i = 0; i < dotCount; i++) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = `services-dot-btn ${i === currentServiceIndex ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to service slide ${i + 1}`);
          dot.addEventListener('click', () => {
            currentServiceIndex = i;
            updateServicesCarousel();
          });
          servicesDotsRow.appendChild(dot);
        }
      }
    }

    if (servicesPrevBtn) {
      servicesPrevBtn.addEventListener('click', () => {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, slides.length - itemsPerView);
        currentServiceIndex = currentServiceIndex <= 0 ? maxIndex : currentServiceIndex - 1;
        updateServicesCarousel();
      });
    }

    if (servicesNextBtn) {
      servicesNextBtn.addEventListener('click', () => {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, slides.length - itemsPerView);
        currentServiceIndex = currentServiceIndex >= maxIndex ? 0 : currentServiceIndex + 1;
        updateServicesCarousel();
      });
    }

    // Touch swipe support
    let touchStartX = 0;
    servicesWrap.addEventListener('touchstart', (e) => {
      isServicesHovered = true;
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    servicesWrap.addEventListener('touchend', (e) => {
      isServicesHovered = false;
      if (e.changedTouches && e.changedTouches[0]) {
        const diffX = touchStartX - e.changedTouches[0].clientX;
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, slides.length - itemsPerView);
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) {
            currentServiceIndex = currentServiceIndex >= maxIndex ? 0 : currentServiceIndex + 1;
          } else {
            currentServiceIndex = currentServiceIndex <= 0 ? maxIndex : currentServiceIndex - 1;
          }
          updateServicesCarousel();
        }
      }
    }, { passive: true });

    servicesWrap.addEventListener('mouseenter', () => { isServicesHovered = true; });
    servicesWrap.addEventListener('mouseleave', () => { isServicesHovered = false; });

    // Auto-slide interval
    setInterval(() => {
      if (!isServicesHovered) {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, slides.length - itemsPerView);
        currentServiceIndex = currentServiceIndex >= maxIndex ? 0 : currentServiceIndex + 1;
        updateServicesCarousel();
      }
    }, 3500);

    window.addEventListener('resize', updateServicesCarousel);
    updateServicesCarousel();
  }

  // --- 7. Real Job Gallery Carousel Controller ---
  const galleryWrap = document.getElementById('galleryCarouselWrap');
  const galleryTrack = document.getElementById('galleryCarouselTrack');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');
  const galleryDotsRow = document.getElementById('galleryDotsRow');

  if (galleryWrap && galleryTrack) {
    const gallerySlides = galleryTrack.querySelectorAll('.gallery-slide-item');
    let currentGalleryIndex = 0;
    let isGalleryHovered = false;

    function getGalleryItemsPerView() {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function updateGalleryCarousel() {
      const itemsPerView = getGalleryItemsPerView();
      const maxIndex = Math.max(0, gallerySlides.length - itemsPerView);
      if (currentGalleryIndex > maxIndex) {
        currentGalleryIndex = maxIndex;
      }
      const itemWidthPercent = 100 / itemsPerView;
      galleryTrack.style.transform = `translateX(-${currentGalleryIndex * itemWidthPercent}%)`;

      // Update dots
      if (galleryDotsRow) {
        galleryDotsRow.innerHTML = '';
        const dotCount = maxIndex + 1;
        for (let i = 0; i < dotCount; i++) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = `gallery-dot-btn ${i === currentGalleryIndex ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to gallery slide ${i + 1}`);
          dot.addEventListener('click', () => {
            currentGalleryIndex = i;
            updateGalleryCarousel();
          });
          galleryDotsRow.appendChild(dot);
        }
      }
    }

    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', () => {
        const itemsPerView = getGalleryItemsPerView();
        const maxIndex = Math.max(0, gallerySlides.length - itemsPerView);
        currentGalleryIndex = currentGalleryIndex <= 0 ? maxIndex : currentGalleryIndex - 1;
        updateGalleryCarousel();
      });
    }

    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', () => {
        const itemsPerView = getGalleryItemsPerView();
        const maxIndex = Math.max(0, gallerySlides.length - itemsPerView);
        currentGalleryIndex = currentGalleryIndex >= maxIndex ? 0 : currentGalleryIndex + 1;
        updateGalleryCarousel();
      });
    }

    // Touch swipe support
    let touchStartX = 0;
    galleryWrap.addEventListener('touchstart', (e) => {
      isGalleryHovered = true;
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    galleryWrap.addEventListener('touchend', (e) => {
      isGalleryHovered = false;
      if (e.changedTouches && e.changedTouches[0]) {
        const diffX = touchStartX - e.changedTouches[0].clientX;
        const itemsPerView = getGalleryItemsPerView();
        const maxIndex = Math.max(0, gallerySlides.length - itemsPerView);
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) {
            currentGalleryIndex = currentGalleryIndex >= maxIndex ? 0 : currentGalleryIndex + 1;
          } else {
            currentGalleryIndex = currentGalleryIndex <= 0 ? maxIndex : currentGalleryIndex - 1;
          }
          updateGalleryCarousel();
        }
      }
    }, { passive: true });

    galleryWrap.addEventListener('mouseenter', () => { isGalleryHovered = true; });
    galleryWrap.addEventListener('mouseleave', () => { isGalleryHovered = false; });

    // Auto-slide interval
    setInterval(() => {
      if (!isGalleryHovered) {
        const itemsPerView = getGalleryItemsPerView();
        const maxIndex = Math.max(0, gallerySlides.length - itemsPerView);
        currentGalleryIndex = currentGalleryIndex >= maxIndex ? 0 : currentGalleryIndex + 1;
        updateGalleryCarousel();
      }
    }, 3500);

    window.addEventListener('resize', updateGalleryCarousel);
    updateGalleryCarousel();
  }

  updateQuoteSummary();
});
