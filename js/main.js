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

  // --- Language Switcher Controller ---
  const langButtons = document.querySelectorAll('.lang-flag-btn');
  let currentLanguage = localStorage.getItem('apollo_lang') || 'en';

  function applyLanguage(lang) {
    currentLanguage = lang;
    try {
      localStorage.setItem('apollo_lang', lang);
    } catch (e) {}

    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
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

    const carpetCheck = document.querySelector('#optCarpet:checked');
    if (carpetCheck) {
      const rooms = document.getElementById('carpetRooms')?.value || '1';
      const stairs = document.getElementById('carpetStairs')?.value || '0';
      const stains = document.getElementById('carpetStains')?.checked;
      const pet = document.getElementById('carpetPet')?.checked;
      let notes = [];
      if (parseInt(stairs) > 0) notes.push(`${stairs} flights of stairs`);
      if (stains) notes.push('Stain treatment');
      if (pet) notes.push('Pet odor removal');
      selected.push(`• Carpet Cleaning (${rooms} room(s)${notes.length ? ', ' + notes.join(', ') : ''})`);
    }

    const sofasCheck = document.querySelector('#optSofas:checked');
    if (sofasCheck) {
      const standardSofas = document.getElementById('sofaCount')?.value || '0';
      const sectionals = document.getElementById('sectionalCount')?.value || '0';
      const recliners = document.getElementById('reclinerCount')?.value || '0';
      let sofaDetails = [];
      if (parseInt(standardSofas) > 0) sofaDetails.push(`${standardSofas} Standard Sofa(s)`);
      if (parseInt(sectionals) > 0) sofaDetails.push(`${sectionals} Sectional(s)`);
      if (parseInt(recliners) > 0) sofaDetails.push(`${recliners} Recliner/Armchair(s)`);
      selected.push(`• Upholstery & Sofas (${sofaDetails.length ? sofaDetails.join(', ') : 'Selected'})`);
    }

    const rugsCheck = document.querySelector('#optRugs:checked');
    if (rugsCheck) {
      const rugCount = document.getElementById('rugCount')?.value || '1';
      const rugType = document.getElementById('rugType')?.value || 'Standard';
      selected.push(`• Area Rugs (${rugCount} rug(s) - ${rugType})`);
    }

    const mattressesCheck = document.querySelector('#optMattresses:checked');
    if (mattressesCheck) {
      const kingQueen = document.getElementById('mattressKing')?.value || '0';
      const twinFull = document.getElementById('mattressTwin')?.value || '0';
      selected.push(`• Mattresses (${parseInt(kingQueen) + parseInt(twinFull)} item(s) to sanitize)`);
    }

    const chairsCheck = document.querySelector('#optChairs:checked');
    if (chairsCheck) {
      const diningCount = document.getElementById('diningChairCount')?.value || '0';
      const accentCount = document.getElementById('accentChairCount')?.value || '0';
      selected.push(`• Chairs (${diningCount} Dining, ${accentCount} Accent)`);
    }

    const houseCheck = document.querySelector('#optHouse:checked');
    if (houseCheck) {
      const houseType = document.getElementById('houseCleaningType')?.value || 'One-Time Deep Clean';
      const beds = document.getElementById('houseBeds')?.value || '3';
      const baths = document.getElementById('houseBaths')?.value || '2';
      selected.push(`• House Cleaning (${houseType} - ${beds} Beds / ${baths} Baths)`);
    }

    if (selected.length === 0) {
      quoteSummaryEl.innerHTML = '<span style="color: var(--text-muted); font-style: italic;">No services selected yet. Please select at least one service above to customize your quote request.</span>';
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

      const anyService = document.querySelectorAll('.service-option-card.selected');
      if (anyService.length === 0) {
        alert('Please select at least one service to request a quote.');
        const optionsGrid = document.querySelector('.service-options-grid');
        optionsGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const clientName = document.getElementById('clientName').value.trim();
      const clientPhone = document.getElementById('clientPhone').value.trim();
      const clientEmail = document.getElementById('clientEmail').value.trim();
      const clientCity = document.getElementById('clientCity').value.trim();
      const clientNotes = document.getElementById('clientNotes').value.trim();

      if (!clientName || !clientPhone || !clientEmail || !clientCity) {
        alert('Please fill in your Name, Phone, Email, and City/ZIP Code.');
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
        modalSummaryDetails.innerHTML = `
          <strong>Client:</strong> ${clientName} (${clientPhone})<br>
          <strong>Location:</strong> ${clientCity}<br>
          <strong>Email:</strong> ${clientEmail}<br>
          <strong>Requested Services:</strong><br>
          ${summaryText.replace(/•/g, '&bull;')}
        `;
      }

      if (successModal) {
        successModal.classList.add('show');
      }

      if (sendWhatsappBtn) {
        const waMsg = encodeURIComponent(
          `*Apollo Carpet Cleaning - Quote Request*\n\n` +
          `*Name:* ${clientName}\n` +
          `*Phone:* ${clientPhone}\n` +
          `*Location:* ${clientCity}\n` +
          `*Email:* ${clientEmail}\n\n` +
          `*Services Requested:*\n${summaryText}\n\n` +
          (clientNotes ? `*Notes:* ${clientNotes}\n\n` : '') +
          `_Sent to contact@apollocarpetcleaning.com_`
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
