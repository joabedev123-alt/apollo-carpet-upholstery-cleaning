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
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    drawerOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', toggleMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (mobileNav.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // --- 2. Real Work Video Showcase Player (From Pasta imagens 02) ---
  const mainVideo = document.getElementById('apolloMainVideo');
  const videoItemBtns = document.querySelectorAll('.video-item-btn');
  const videoThumbCards = document.querySelectorAll('.video-card-thumb');

  function setVideoSource(videoSrc) {
    if (!mainVideo || !videoSrc) return;
    try {
      mainVideo.pause();
    } catch (e) {}

    mainVideo.src = videoSrc;
    mainVideo.load();

    const playPromise = mainVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(function () {
        mainVideo.muted = true;
        mainVideo.play().catch(function (err) {
          console.warn('Video auto-playback requires user click:', err);
        });
      });
    }
  }

  window.playVideoClip = function (videoSrc) {
    setVideoSource(videoSrc);
    const videoSection = document.getElementById('videos');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Highlight active sidebar item
    videoItemBtns.forEach(function (b) {
      if (b.getAttribute('data-src') === videoSrc) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Highlight active grid card
    videoThumbCards.forEach(function (card) {
      if (card.getAttribute('onclick') && card.getAttribute('onclick').includes(videoSrc)) {
        card.style.borderColor = 'var(--accent-cyan)';
        card.style.backgroundColor = '#f0f9ff';
      } else {
        card.style.borderColor = '';
        card.style.backgroundColor = '';
      }
    });
  };

  if (mainVideo && videoItemBtns.length > 0) {
    videoItemBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const videoSrc = this.getAttribute('data-src');
        videoItemBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        setVideoSource(videoSrc);
      });
    });
  }

  // --- 3. Before & After Interactive Comparison Slider (From Pasta imagens 01) ---
  const baViewer = document.getElementById('baViewer');
  const afterLayer = document.getElementById('afterLayer');
  const baHandle = document.getElementById('baHandle');
  let isDragging = false;

  function updateSliderPosition(xPos) {
    if (!baViewer) return;
    const rect = baViewer.getBoundingClientRect();
    let x = xPos - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percent = (x / rect.width) * 100;
    afterLayer.style.width = percent + '%';
    baHandle.style.left = percent + '%';
  }

  if (baViewer) {
    baViewer.addEventListener('mousedown', function (e) {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', function () {
      isDragging = false;
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    baViewer.addEventListener('touchstart', function (e) {
      isDragging = true;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', function () {
      isDragging = false;
    });

    window.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });
  }

  // Single Before & After Showcase (Tufted Headboard)
  const afterImgEl = document.getElementById('baAfterImg');

  function syncBaDimensions() {
    if (!baViewer || !afterImgEl) return;
    afterImgEl.style.width = baViewer.clientWidth + 'px';
  }

  if (baViewer) {
    window.addEventListener('resize', syncBaDimensions);
    setTimeout(syncBaDimensions, 100);
    syncBaDimensions();
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

  updateQuoteSummary();
});
