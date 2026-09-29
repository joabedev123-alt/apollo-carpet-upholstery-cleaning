'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../lib/translations';

export default function HomePage() {
  // Language Switcher State
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('apollo_lang');
      if (savedLang && (savedLang === 'en' || savedLang === 'es' || savedLang === 'pt')) {
        setCurrentLang(savedLang);
      }
    } catch (e) {}
  }, []);

  const handleSetLanguage = (lang) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('apollo_lang', lang);
    } catch (e) {}
  };

  const t = translations[currentLang] || translations.en;

  // Mobile Nav Drawer State
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  // Hero Video State
  const heroVideoRef = useRef(null);
  const [isHeroMuted, setIsHeroMuted] = useState(true);

  // Verified Results Carousel State
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const resultIcons = [
    { catIcon: 'bi-cup-hot-fill', tag1Icon: 'bi-shield-check', tag2Icon: 'bi-lightning-charge', img: '/assets/images/carousel_01.png' },
    { catIcon: 'bi-heart-pulse-fill', tag1Icon: 'bi-shield-check', tag2Icon: 'bi-stars', img: '/assets/images/carousel_02.png' },
    { catIcon: 'bi-layers-fill', tag1Icon: 'bi-shield-check', tag2Icon: 'bi-wind', img: '/assets/images/carousel_03.png' },
    { catIcon: 'bi-archive-fill', tag1Icon: 'bi-shield-check', tag2Icon: 'bi-flower1', img: '/assets/images/carousel_04.png' },
  ];

  const resultsSlides = t.resultsSection.slides.map((s, idx) => ({
    ...s,
    img: resultIcons[idx].img,
    categoryIcon: resultIcons[idx].catIcon,
    tag1Icon: resultIcons[idx].tag1Icon,
    tag2Icon: resultIcons[idx].tag2Icon,
  }));

  // Services Carousel State (What We Do)
  const serviceMeta = [
    { id: 'carpet', quoteKey: 'carpet', icon: 'bi-layers-fill', img: '/assets/images/img_01.png' },
    { id: 'sofas', quoteKey: 'sofas', icon: 'bi-archive-fill', img: '/assets/images/img_02.png' },
    { id: 'upholstery', quoteKey: 'sofas', icon: 'bi-gem', img: '/assets/images/img_03.png' },
    { id: 'rugs', quoteKey: 'rugs', icon: 'bi-bounding-box-circles', img: '/assets/images/img_04.png' },
    { id: 'mattresses', quoteKey: 'mattresses', icon: 'bi-heart-pulse-fill', img: '/assets/images/img_05.png' },
    { id: 'chairs', quoteKey: 'chairs', icon: 'bi-cup-hot-fill', img: '/assets/images/img_06.png' },
  ];

  const servicesSlides = t.servicesSection.services.map((s, idx) => ({
    ...s,
    ...serviceMeta[idx],
  }));

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const isServicesHovered = useRef(false);
  const servicesTouchStartX = useRef(0);

  // Real Job Gallery Slides State
  const galleryImages = [
    '/assets/images/gallery_sec3_01.png',
    '/assets/images/gallery_sec3_02.png',
    '/assets/images/gallery_sec3_03.png',
    '/assets/images/gallery_sec3_04.png',
    '/assets/images/gallery_sec3_05.png',
    '/assets/images/gallery_sec3_06.png',
  ];

  const gallerySlides = t.gallerySection.slides.map((s, idx) => ({
    ...s,
    img: galleryImages[idx],
  }));

  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [galleryItemsPerView, setGalleryItemsPerView] = useState(3);
  const isGalleryHovered = useRef(false);
  const galleryTouchStartX = useRef(0);

  // Touch Swipe coordinates for verified results carousel
  const touchStartX = useRef(0);
  const isCarouselHovered = useRef(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Quote Form State
  const [selectedServices, setSelectedServices] = useState({
    carpet: false,
    sofas: false,
    rugs: false,
    mattresses: false,
    chairs: false,
    house: false,
  });

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientCity: '',
    clientNotes: '',
    carpetRooms: '1',
    carpetStairs: '0',
    carpetStains: false,
    carpetPet: false,
    sofaCount: '1',
    sectionalCount: '0',
    reclinerCount: '0',
    rugCount: '1',
    rugType: 'Standard Synthetic',
    mattressKing: '0',
    mattressTwin: '0',
    diningChairCount: '4',
    accentChairCount: '0',
    houseCleaningType: 'One-Time Deep Clean',
    houseBeds: '3',
    houseBaths: '2',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  // Scroll handler for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive items per view for Services Carousel
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive items per view for Gallery Carousel
  useEffect(() => {
    const handleGalleryResize = () => {
      if (window.innerWidth < 640) {
        setGalleryItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setGalleryItemsPerView(2);
      } else {
        setGalleryItemsPerView(3);
      }
    };
    handleGalleryResize();
    window.addEventListener('resize', handleGalleryResize);
    return () => window.removeEventListener('resize', handleGalleryResize);
  }, []);

  // Services Carousel Auto-slide (every 3.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isServicesHovered.current) {
        setCurrentServiceIndex((prev) => {
          const maxIdx = Math.max(0, servicesSlides.length - itemsPerView);
          return prev >= maxIdx ? 0 : prev + 1;
        });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [servicesSlides.length, itemsPerView]);

  // Gallery Carousel Auto-slide (every 3.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGalleryHovered.current) {
        setCurrentGalleryIndex((prev) => {
          const maxIdx = Math.max(0, gallerySlides.length - galleryItemsPerView);
          return prev >= maxIdx ? 0 : prev + 1;
        });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [gallerySlides.length, galleryItemsPerView]);

  // Verified Results Carousel auto-slide timer (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCarouselHovered.current) {
        setCurrentResultIndex((prev) => (prev + 1) % resultsSlides.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [resultsSlides.length]);

  // Hero Audio Toggle
  const toggleHeroAudio = () => {
    if (heroVideoRef.current) {
      const nextState = !heroVideoRef.current.muted;
      heroVideoRef.current.muted = nextState;
      setIsHeroMuted(nextState);
    }
  };

  // Service toggle in quote
  const toggleService = (key) => {
    setSelectedServices((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectServiceInQuote = (key) => {
    setSelectedServices((prev) => ({
      ...prev,
      [key]: true,
    }));
    const quoteEl = document.getElementById('quote');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form phone mask
  const handlePhoneChange = (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    const formatted = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    setFormData((prev) => ({ ...prev, clientPhone: formatted }));
  };

  // Generate Quote Summary Items
  const getSummaryItems = () => {
    const items = [];
    if (selectedServices.carpet) {
      let notes = [];
      if (parseInt(formData.carpetStairs) > 0) notes.push(`${formData.carpetStairs} ${currentLang === 'pt' ? 'lances de escada' : currentLang === 'es' ? 'tramos de escalera' : 'flights of stairs'}`);
      if (formData.carpetStains) notes.push(currentLang === 'pt' ? 'Pré-tratamento de manchas' : currentLang === 'es' ? 'Tratamiento de manchas' : 'Stain treatment');
      if (formData.carpetPet) notes.push(currentLang === 'pt' ? 'Remoção de odor de pet' : currentLang === 'es' ? 'Eliminación de olor de mascotas' : 'Pet odor removal');
      items.push(`• ${t.quoteSection.serviceNames.carpet} (${formData.carpetRooms} ${currentLang === 'pt' ? 'cômodo(s)' : currentLang === 'es' ? 'habitación(es)' : 'room(s)'}${notes.length ? ', ' + notes.join(', ') : ''})`);
    }
    if (selectedServices.sofas) {
      let sofaDetails = [];
      if (parseInt(formData.sofaCount) > 0) sofaDetails.push(`${formData.sofaCount} ${t.quoteSection.fields.standardSofas}`);
      if (parseInt(formData.sectionalCount) > 0) sofaDetails.push(`${formData.sectionalCount} ${t.quoteSection.fields.sectionals}`);
      if (parseInt(formData.reclinerCount) > 0) sofaDetails.push(`${formData.reclinerCount} ${t.quoteSection.fields.recliners}`);
      items.push(`• ${t.quoteSection.serviceNames.sofas} (${sofaDetails.length ? sofaDetails.join(', ') : 'Selected'})`);
    }
    if (selectedServices.rugs) {
      items.push(`• ${t.quoteSection.serviceNames.rugs} (${formData.rugCount} - ${formData.rugType})`);
    }
    if (selectedServices.mattresses) {
      const count = parseInt(formData.mattressKing || 0) + parseInt(formData.mattressTwin || 0);
      items.push(`• ${t.quoteSection.serviceNames.mattresses} (${count} ${currentLang === 'pt' ? 'item(ns)' : currentLang === 'es' ? 'artículo(s)' : 'item(s)'})`);
    }
    if (selectedServices.chairs) {
      items.push(`• ${t.quoteSection.serviceNames.chairs} (${formData.diningChairCount} ${t.quoteSection.fields.diningChairs}, ${formData.accentChairCount} ${t.quoteSection.fields.accentChairs})`);
    }
    if (selectedServices.house) {
      items.push(`• ${t.quoteSection.serviceNames.house} (${formData.houseCleaningType} - ${formData.houseBeds} ${t.quoteSection.fields.bedrooms} / ${formData.houseBaths} ${t.quoteSection.fields.bathrooms})`);
    }
    return items;
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const summaryItems = getSummaryItems();
    if (summaryItems.length === 0) {
      alert(currentLang === 'pt' ? 'Por favor, selecione pelo menos um serviço para solicitar o orçamento.' : currentLang === 'es' ? 'Por favor, seleccione al menos un servicio para solicitar una cotización.' : 'Please select at least one service to request a quote.');
      const optionsGrid = document.querySelector('.service-options-grid');
      if (optionsGrid) optionsGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!formData.clientName || !formData.clientPhone || !formData.clientEmail || !formData.clientCity) {
      alert(currentLang === 'pt' ? 'Por favor, preencha Nome, Telefone, E-mail e Cidade/CEP.' : currentLang === 'es' ? 'Por favor, complete Nombre, Teléfono, Correo Electrónico y Ciudad/Código Postal.' : 'Please fill in your Name, Phone, Email, and City/ZIP Code.');
      return;
    }

    const summaryText = summaryItems.join('\n');
    const waMsg = encodeURIComponent(
      `*Apollo Carpet Cleaning - Quote Request*\n\n` +
      `*Name:* ${formData.clientName}\n` +
      `*Phone:* ${formData.clientPhone}\n` +
      `*Location:* ${formData.clientCity}\n` +
      `*Email:* ${formData.clientEmail}\n\n` +
      `*Services Requested:*\n${summaryText}\n\n` +
      (formData.clientNotes ? `*Notes:* ${formData.clientNotes}\n\n` : '') +
      `_Sent to contact@apollocarpetcleaning.com_`
    );

    setWhatsappLink(`https://wa.me/13212725560?text=${waMsg}`);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* 1. Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-service-area">
            <i className="bi bi-geo-alt-fill"></i>
            <span>{t.topBar.serviceArea}</span>
          </div>
          <div className="top-bar-contacts">
            <a href="tel:+13212725560" title="Call Apollo">
              <i className="bi bi-telephone-fill"></i>
              <span>{t.topBar.phone}</span>
            </a>
            <a href="mailto:contact@apollocarpetcleaning.com" title="Email Apollo">
              <i className="bi bi-envelope-fill"></i>
              <span>{t.topBar.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header with Official Logo & Language Flags */}
      <header className={`main-header ${isHeaderScrolled ? 'scrolled' : ''}`} id="mainHeader">
        <div className="container header-inner">
          <a href="#hero" className="brand-logo-wrap" title="Apollo Carpet & Upholstery Cleaning">
            <img src="/assets/images/logo.png" alt="Apollo Carpet & Upholstery Cleaning Logo" className="brand-logo-img" />
          </a>

          <nav className="desktop-nav" aria-label="Main Navigation">
            <a href="#services" className="nav-link">{t.nav.services}</a>
            <div className="nav-dropdown">
              <span className="nav-link nav-dropdown-toggle">
                {t.nav.ourWork} <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem', marginLeft: '2px' }}></i>
              </span>
              <div className="nav-dropdown-menu">
                <a href="#before-after" className="dropdown-item">
                  <i className="bi bi-images"></i> {t.nav.verifiedResults}
                </a>
                <a href="#gallery" className="dropdown-item">
                  <i className="bi bi-camera-fill"></i> {t.nav.realJobPhotos}
                </a>
              </div>
            </div>
            <a href="#why-us" className="nav-link">{t.nav.whyChooseUs}</a>
            <a href="#areas" className="nav-link">{t.nav.serviceAreas}</a>
            <a href="#faq" className="nav-link">{t.nav.faq}</a>
          </nav>

          <div className="header-actions">
            {/* Language Switcher Flags in Navbar */}
            <div className="lang-switcher-nav" aria-label="Language Selector">
              <button
                type="button"
                className={`lang-flag-btn ${currentLang === 'en' ? 'active' : ''}`}
                onClick={() => handleSetLanguage('en')}
                title="English (United States)"
              >
                <img src="/flags/us.svg" alt="USA Flag" className="lang-flag-img" />
              </button>
              <button
                type="button"
                className={`lang-flag-btn ${currentLang === 'es' ? 'active' : ''}`}
                onClick={() => handleSetLanguage('es')}
                title="Español (España)"
              >
                <img src="/flags/es.svg" alt="Spain Flag" className="lang-flag-img" />
              </button>
              <button
                type="button"
                className={`lang-flag-btn ${currentLang === 'pt' ? 'active' : ''}`}
                onClick={() => handleSetLanguage('pt')}
                title="Português (Brasil)"
              >
                <img src="/flags/br.svg" alt="Brazil Flag" className="lang-flag-img" />
              </button>
            </div>

            <a href="tel:+13212725560" className="header-phone-box" title="Direct Phone">
              <div className="phone-icon-circle">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div className="phone-meta">
                <span className="phone-label">{t.nav.callDirect}</span>
                <span className="phone-number">(321) 272-5560</span>
              </div>
            </a>

            <a href="#quote" className="btn btn-primary header-quote-btn">
              <i className="bi bi-calculator"></i> {t.nav.getFreeQuote}
            </a>

            <a href="tel:+13212725560" className="mobile-call-icon-btn" title="Call Apollo">
              <i className="bi bi-telephone-fill"></i>
            </a>

            <button
              className={`menu-toggle ${isMobileNavOpen ? 'active' : ''}`}
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`drawer-overlay ${isMobileNavOpen ? 'active' : ''}`} onClick={() => setIsMobileNavOpen(false)}></div>
      <aside className={`mobile-nav-drawer ${isMobileNavOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
          <img src="/assets/images/logo.png" alt="Apollo Logo" style={{ maxHeight: '44px', width: 'auto' }} />
          <button
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close menu"
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--primary-navy)', cursor: 'pointer', padding: '6px 10px' }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Mobile Language Switcher */}
        <div className="mobile-lang-switcher" aria-label="Language Selector">
          <button
            type="button"
            className={`lang-flag-btn ${currentLang === 'en' ? 'active' : ''}`}
            onClick={() => handleSetLanguage('en')}
            title="English"
          >
            <img src="/flags/us.svg" alt="USA Flag" className="lang-flag-img" />
            <span className="lang-code">English</span>
          </button>
          <button
            type="button"
            className={`lang-flag-btn ${currentLang === 'es' ? 'active' : ''}`}
            onClick={() => handleSetLanguage('es')}
            title="Español"
          >
            <img src="/flags/es.svg" alt="Spain Flag" className="lang-flag-img" />
            <span className="lang-code">Español</span>
          </button>
          <button
            type="button"
            className={`lang-flag-btn ${currentLang === 'pt' ? 'active' : ''}`}
            onClick={() => handleSetLanguage('pt')}
            title="Português"
          >
            <img src="/flags/br.svg" alt="Brazil Flag" className="lang-flag-img" />
            <span className="lang-code">Português</span>
          </button>
        </div>

        <div className="mobile-nav-links">
          <a href="#hero" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>Home</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#services" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>{t.nav.services}</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#before-after" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>{t.nav.verifiedResults}</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#gallery" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>{t.nav.realJobPhotos}</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#why-us" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>{t.nav.whyChooseUs}</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#areas" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>{t.nav.serviceAreas}</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#faq" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>{t.nav.faq}</span>
            <i className="bi bi-chevron-right"></i>
          </a>
        </div>

        <div className="mobile-drawer-contact">
          <a href="#quote" className="btn btn-accent" style={{ width: '100%' }} onClick={() => setIsMobileNavOpen(false)}>
            <i className="bi bi-clipboard-check"></i> {t.nav.getFreeQuote}
          </a>
          <a href="tel:+13212725560" className="btn btn-primary" style={{ width: '100%' }}>
            <i className="bi bi-telephone-fill"></i> {t.nav.callDirect} (321) 272-5560
          </a>
          <a href="https://wa.me/13212725560?text=Hello%20Apollo%2C%20I%20would%20like%20a%20free%20quote%20for%20cleaning%20services" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%' }}>
            <i className="bi bi-whatsapp"></i> Chat on WhatsApp
          </a>
        </div>
      </aside>

      {/* 3. Hero Section */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <i className="bi bi-shield-check"></i>
                <span>{t.hero.badge}</span>
              </div>
              <h1 className="hero-title">
                {t.hero.titlePrefix} <span>{t.hero.titleHighlight}</span> {t.hero.titleSuffix}
              </h1>
              <p className="hero-description">
                {t.hero.descP1}<br /><br />
                {t.hero.descP2}<br /><br />
                <strong>{t.hero.descP3}</strong>
              </p>
              <div className="hero-cta-group">
                <a href="#quote" className="btn btn-primary btn-lg">
                  <i className="bi bi-calculator"></i> {t.hero.btnQuote}
                </a>
                <a href="tel:+13212725560" className="btn btn-outline btn-lg">
                  <i className="bi bi-telephone-fill"></i> {t.hero.btnCall}
                </a>
              </div>
            </div>

            <div className="hero-media">
              <div className="hero-image-wrapper hero-video-wrapper">
                <video
                  ref={heroVideoRef}
                  id="heroVideo"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/assets/images/img_02.png"
                  width="800"
                  height="500"
                >
                  <source src="/assets/video_01.mp4" type="video/mp4" />
                  <source src="/video_01.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <button
                  type="button"
                  className="hero-audio-btn"
                  onClick={toggleHeroAudio}
                  aria-label="Toggle Audio"
                  title="Toggle Audio"
                >
                  <i className={`bi ${isHeroMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
                  <span>{isHeroMuted ? t.hero.unmute : t.hero.mute}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sliding Banner (Marquee Ticker) */}
      <div className="ticker-banner-section" aria-label="Services Highlights">
        <div className="ticker-wrapper">
          <div className="ticker-track">
            {t.ticker.map((item, idx) => (
              <div key={idx} className="ticker-item"><i className="bi bi-sparkles"></i> {item}</div>
            ))}
            {t.ticker.map((item, idx) => (
              <div key={`dup-${idx}`} className="ticker-item"><i className="bi bi-sparkles"></i> {item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Our Cleaning Services (Interactive Carousel) */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-grid-fill"></i>
              <span>{t.servicesSection.tag}</span>
            </div>
            <h2 className="section-title">{t.servicesSection.title}</h2>
            <p className="section-subtitle">{t.servicesSection.subtitle}</p>
          </div>

          <div
            className="services-carousel-wrap"
            onMouseEnter={() => { isServicesHovered.current = true; }}
            onMouseLeave={() => { isServicesHovered.current = false; }}
            onTouchStart={(e) => {
              isServicesHovered.current = true;
              if (e.touches && e.touches[0]) {
                servicesTouchStartX.current = e.touches[0].clientX;
              }
            }}
            onTouchEnd={(e) => {
              isServicesHovered.current = false;
              if (e.changedTouches && e.changedTouches[0]) {
                const diffX = servicesTouchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diffX) > 40) {
                  if (diffX > 0) {
                    setCurrentServiceIndex((prev) => (prev >= servicesSlides.length - itemsPerView ? 0 : prev + 1));
                  } else {
                    setCurrentServiceIndex((prev) => (prev <= 0 ? Math.max(0, servicesSlides.length - itemsPerView) : prev - 1));
                  }
                }
              }
            }}
          >
            <div
              className="services-carousel-track"
              style={{
                transform: `translateX(-${currentServiceIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {servicesSlides.map((service) => (
                <div key={service.id} className="service-slide-item">
                  <article className="service-card">
                    <div className="service-img-wrap">
                      <img src={service.img} alt={service.title} loading="lazy" />
                      <span className="service-badge">{service.badge}</span>
                    </div>
                    <div className="service-body">
                      <div className="service-icon-title">
                        <div className="service-icon-box">
                          <i className={`bi ${service.icon}`}></i>
                        </div>
                        <h3 className="service-card-title">{service.title}</h3>
                      </div>
                      <p className="service-desc">{service.desc}</p>
                      <ul className="service-features-list">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx}>
                            <i className="bi bi-check2-circle"></i> {feat}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="btn btn-outline service-card-btn"
                        onClick={() => selectServiceInQuote(service.quoteKey)}
                      >
                        <i className="bi bi-plus-circle"></i> {t.servicesSection.btnSelect}
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Carousel Navigation & Controls */}
            <div className="services-carousel-controls">
              <button
                type="button"
                className="services-nav-arrow"
                onClick={() => setCurrentServiceIndex((prev) => (prev <= 0 ? Math.max(0, servicesSlides.length - itemsPerView) : prev - 1))}
                aria-label="Previous Services Slide"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              
              <div className="services-dots-row">
                {Array.from({ length: Math.max(1, servicesSlides.length - itemsPerView + 1) }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`services-dot-btn ${idx === currentServiceIndex ? 'active' : ''}`}
                    onClick={() => setCurrentServiceIndex(idx)}
                    aria-label={`Go to service slide ${idx + 1}`}
                  ></button>
                ))}
              </div>

              <button
                type="button"
                className="services-nav-arrow"
                onClick={() => setCurrentServiceIndex((prev) => (prev >= servicesSlides.length - itemsPerView ? 0 : prev + 1))}
                aria-label="Next Services Slide"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* House Cleaning Highlight Card */}
          <article className="service-card" style={{ marginTop: '28px' }}>
            <div className="service-body" style={{ padding: '28px' }}>
              <div className="service-icon-title">
                <div className="service-icon-box">
                  <i className="bi bi-house-door-fill"></i>
                </div>
                <div>
                  <span className="service-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '4px' }}>{t.servicesSection.houseCard.badge}</span>
                  <h3 className="service-card-title">{t.servicesSection.houseCard.title}</h3>
                </div>
              </div>
              <p className="service-desc">{t.servicesSection.houseCard.desc}</p>
              <ul className="service-features-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                {t.servicesSection.houseCard.features.map((f, fIdx) => (
                  <li key={fIdx}><i className="bi bi-check2-circle"></i> {f}</li>
                ))}
              </ul>
              <button
                className="btn btn-primary"
                style={{ marginTop: '16px', alignSelf: 'flex-start' }}
                onClick={() => selectServiceInQuote('house')}
              >
                <i className="bi bi-plus-circle"></i> {t.servicesSection.houseCard.btnSelect}
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* 6. Verified Work Results Carousel */}
      <section className="before-after-section" id="before-after">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-patch-check-fill"></i>
              <span>{t.resultsSection.tag}</span>
            </div>
            <h2 className="section-title">{t.resultsSection.title}</h2>
            <p className="section-subtitle">{t.resultsSection.subtitle}</p>
          </div>

          <div
            className="results-carousel-container"
            id="resultsCarousel"
            onMouseEnter={() => { isCarouselHovered.current = true; }}
            onMouseLeave={() => { isCarouselHovered.current = false; }}
            onTouchStart={(e) => {
              isCarouselHovered.current = true;
              if (e.touches && e.touches[0]) {
                touchStartX.current = e.touches[0].clientX;
              }
            }}
            onTouchEnd={(e) => {
              isCarouselHovered.current = false;
              if (e.changedTouches && e.changedTouches[0]) {
                const diffX = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diffX) > 45) {
                  if (diffX > 0) {
                    setCurrentResultIndex((prev) => (prev + 1) % resultsSlides.length);
                  } else {
                    setCurrentResultIndex((prev) => (prev - 1 + resultsSlides.length) % resultsSlides.length);
                  }
                }
              }
            }}
          >
            <div className="results-slider-track">
              {resultsSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`results-slide-card ${idx === currentResultIndex ? 'active' : ''}`}
                >
                  <div className="results-card-grid">
                    <div className="results-img-box">
                      <img src={slide.img} alt={slide.heading} loading="lazy" />
                      <span className="results-badge"><i className="bi bi-check-circle-fill"></i> {slide.badge}</span>
                    </div>
                    <div className="results-content-box">
                      <div className="results-service-label">
                        <i className={`bi ${slide.categoryIcon}`}></i> {slide.category}
                      </div>
                      <h3 className="results-item-heading">{slide.heading}</h3>
                      <p className="results-item-desc">{slide.desc}</p>
                      <div className="results-features-mini">
                        <span><i className={`bi ${slide.tag1Icon}`}></i> {slide.tag1}</span>
                        <span><i className={`bi ${slide.tag2Icon}`}></i> {slide.tag2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="results-carousel-nav">
              <button
                className="results-nav-btn prev-btn"
                onClick={() => setCurrentResultIndex((prev) => (prev - 1 + resultsSlides.length) % resultsSlides.length)}
                aria-label="Previous Slide"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <div className="results-dots-box">
                {resultsSlides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`results-dot ${idx === currentResultIndex ? 'active' : ''}`}
                    onClick={() => setCurrentResultIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
              <button
                className="results-nav-btn next-btn"
                onClick={() => setCurrentResultIndex((prev) => (prev + 1) % resultsSlides.length)}
                aria-label="Next Slide"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Real Job Photo Gallery Carousel */}
      <section className="photo-gallery-section" id="gallery">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-camera-fill"></i>
              <span>{t.gallerySection.tag}</span>
            </div>
            <h2 className="section-title">{t.gallerySection.title}</h2>
            <p className="section-subtitle">{t.gallerySection.subtitle}</p>
          </div>

          <div
            className="gallery-carousel-wrap"
            onMouseEnter={() => { isGalleryHovered.current = true; }}
            onMouseLeave={() => { isGalleryHovered.current = false; }}
            onTouchStart={(e) => {
              isGalleryHovered.current = true;
              if (e.touches && e.touches[0]) {
                galleryTouchStartX.current = e.touches[0].clientX;
              }
            }}
            onTouchEnd={(e) => {
              isGalleryHovered.current = false;
              if (e.changedTouches && e.changedTouches[0]) {
                const diffX = galleryTouchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diffX) > 40) {
                  if (diffX > 0) {
                    setCurrentGalleryIndex((prev) => (prev >= gallerySlides.length - galleryItemsPerView ? 0 : prev + 1));
                  } else {
                    setCurrentGalleryIndex((prev) => (prev <= 0 ? Math.max(0, gallerySlides.length - galleryItemsPerView) : prev - 1));
                  }
                }
              }
            }}
          >
            <div
              className="gallery-carousel-track"
              style={{
                transform: `translateX(-${currentGalleryIndex * (100 / galleryItemsPerView)}%)`,
              }}
            >
              {gallerySlides.map((slide) => (
                <div key={slide.id} className="gallery-slide-item">
                  <div className="photo-card">
                    <div className="photo-card-img-wrap">
                      <img src={slide.img} alt={slide.title} loading="lazy" />
                    </div>
                    <div className="photo-card-caption">
                      <h4>{slide.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Navigation Controls */}
            <div className="gallery-carousel-controls">
              <button
                type="button"
                className="gallery-nav-arrow"
                onClick={() => setCurrentGalleryIndex((prev) => (prev <= 0 ? Math.max(0, gallerySlides.length - galleryItemsPerView) : prev - 1))}
                aria-label="Previous Gallery Slide"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              <div className="gallery-dots-row">
                {Array.from({ length: Math.max(1, gallerySlides.length - galleryItemsPerView + 1) }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`gallery-dot-btn ${idx === currentGalleryIndex ? 'active' : ''}`}
                    onClick={() => setCurrentGalleryIndex(idx)}
                    aria-label={`Go to gallery slide ${idx + 1}`}
                  ></button>
                ))}
              </div>

              <button
                type="button"
                className="gallery-nav-arrow"
                onClick={() => setCurrentGalleryIndex((prev) => (prev >= gallerySlides.length - galleryItemsPerView ? 0 : prev + 1))}
                aria-label="Next Gallery Slide"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why Choose Apollo */}
      <section className="why-section" id="why-us">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-star-fill"></i>
              <span>{t.whySection.tag}</span>
            </div>
            <h2 className="section-title">{t.whySection.title}</h2>
            <p className="section-subtitle">{t.whySection.subtitle}</p>
          </div>

          <div className="why-grid">
            {t.whySection.cards.map((card, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon-box">
                  <i className={`bi ${idx === 0 ? 'bi-gear-wide-connected' : idx === 1 ? 'bi-shield-check' : idx === 2 ? 'bi-check-all' : 'bi-wind'}`}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Service Areas */}
      <section className="areas-section" id="areas">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-geo-alt-fill"></i>
              <span>{t.areasSection.tag}</span>
            </div>
            <h2 className="section-title">{t.areasSection.title}</h2>
            <p className="section-subtitle">{t.areasSection.subtitle}</p>
          </div>

          <div className="cities-compact-grid">
            {['Orlando', 'Kissimmee', 'Winter Park', 'Davenport', 'Windermere', 'Ocoee', 'Dr. Phillips', 'Lake Nona', 'Celebration', 'Clermont', 'Winter Garden', 'Poinciana', 'Altamonte Springs', 'Maitland', 'St. Cloud', 'Four Corners'].map((city, idx) => (
              <div key={idx} className="city-pill-compact">
                <i className="bi bi-check-circle-fill"></i>
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-question-circle-fill"></i>
              <span>{t.faqSection.tag}</span>
            </div>
            <h2 className="section-title">{t.faqSection.title}</h2>
            <p className="section-subtitle">{t.faqSection.subtitle}</p>
          </div>

          <div className="faq-accordion-box">
            {t.faqSection.items.map((item, idx) => (
              <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  aria-expanded={openFaqIndex === idx}
                >
                  <span>{item.q}</span>
                  <i className={`bi ${openFaqIndex === idx ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                </button>
                <div className="faq-answer-body">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Quote Estimator & Form */}
      <section className="quote-section" id="quote">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-calculator-fill"></i>
              <span>{t.quoteSection.tag}</span>
            </div>
            <h2 className="section-title">{t.quoteSection.title}</h2>
            <p className="section-subtitle">{t.quoteSection.subtitle}</p>
          </div>

          <div className="quote-layout-grid">
            <div className="quote-form-card">
              <form onSubmit={handleQuoteSubmit} id="quoteEstimatorForm">
                {/* Step 1: Services Selection */}
                <div className="form-step-box">
                  <h3 className="form-step-title">{t.quoteSection.step1}</h3>
                  <div className="service-options-grid">
                    {[
                      { key: 'carpet', icon: 'bi-layers-fill', name: t.quoteSection.serviceNames.carpet },
                      { key: 'sofas', icon: 'bi-archive-fill', name: t.quoteSection.serviceNames.sofas },
                      { key: 'rugs', icon: 'bi-bounding-box-circles', name: t.quoteSection.serviceNames.rugs },
                      { key: 'mattresses', icon: 'bi-heart-pulse-fill', name: t.quoteSection.serviceNames.mattresses },
                      { key: 'chairs', icon: 'bi-cup-hot-fill', name: t.quoteSection.serviceNames.chairs },
                      { key: 'house', icon: 'bi-house-door-fill', name: t.quoteSection.serviceNames.house },
                    ].map((svc) => (
                      <label
                        key={svc.key}
                        className={`service-option-card ${selectedServices[svc.key] ? 'selected' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedServices[svc.key]}
                          onChange={() => toggleService(svc.key)}
                          style={{ display: 'none' }}
                        />
                        <i className={`bi ${svc.icon}`}></i>
                        <span>{svc.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 2: Service Details */}
                <div className="form-step-box">
                  <h3 className="form-step-title">{t.quoteSection.step2}</h3>
                  
                  {/* Carpet Details */}
                  {selectedServices.carpet && (
                    <div className="dynamic-service-detail">
                      <h4><i className="bi bi-layers-fill"></i> {t.quoteSection.serviceNames.carpet}</h4>
                      <div className="fields-inline-grid">
                        <div className="form-field">
                          <label>{t.quoteSection.fields.rooms}</label>
                          <select value={formData.carpetRooms} onChange={(e) => setFormData({ ...formData, carpetRooms: e.target.value })}>
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4">4 Rooms</option>
                            <option value="5+">5+ Rooms (Whole House)</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>{t.quoteSection.fields.stairs}</label>
                          <select value={formData.carpetStairs} onChange={(e) => setFormData({ ...formData, carpetStairs: e.target.value })}>
                            <option value="0">0 (No Stairs)</option>
                            <option value="1">1 Flight (10-15 steps)</option>
                            <option value="2">2 Flights</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sofas Details */}
                  {selectedServices.sofas && (
                    <div className="dynamic-service-detail">
                      <h4><i className="bi bi-archive-fill"></i> {t.quoteSection.serviceNames.sofas}</h4>
                      <div className="fields-inline-grid">
                        <div className="form-field">
                          <label>{t.quoteSection.fields.standardSofas}</label>
                          <select value={formData.sofaCount} onChange={(e) => setFormData({ ...formData, sofaCount: e.target.value })}>
                            <option value="0">0</option>
                            <option value="1">1 Sofa</option>
                            <option value="2">2 Sofas</option>
                            <option value="3+">3+ Sofas</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>{t.quoteSection.fields.sectionals}</label>
                          <select value={formData.sectionalCount} onChange={(e) => setFormData({ ...formData, sectionalCount: e.target.value })}>
                            <option value="0">0</option>
                            <option value="1">1 Sectional</option>
                            <option value="2+">2+ Sectionals</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rugs Details */}
                  {selectedServices.rugs && (
                    <div className="dynamic-service-detail">
                      <h4><i className="bi bi-bounding-box-circles"></i> {t.quoteSection.serviceNames.rugs}</h4>
                      <div className="fields-inline-grid">
                        <div className="form-field">
                          <label>{t.quoteSection.fields.rugCount}</label>
                          <select value={formData.rugCount} onChange={(e) => setFormData({ ...formData, rugCount: e.target.value })}>
                            <option value="1">1 Rug</option>
                            <option value="2">2 Rugs</option>
                            <option value="3+">3+ Rugs</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>{t.quoteSection.fields.rugType}</label>
                          <select value={formData.rugType} onChange={(e) => setFormData({ ...formData, rugType: e.target.value })}>
                            <option value="Synthetic Standard">Synthetic Standard</option>
                            <option value="Wool / Delicate Blend">Wool / Delicate Blend</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mattresses Details */}
                  {selectedServices.mattresses && (
                    <div className="dynamic-service-detail">
                      <h4><i className="bi bi-heart-pulse-fill"></i> {t.quoteSection.serviceNames.mattresses}</h4>
                      <div className="fields-inline-grid">
                        <div className="form-field">
                          <label>{t.quoteSection.fields.mattressKing}</label>
                          <select value={formData.mattressKing} onChange={(e) => setFormData({ ...formData, mattressKing: e.target.value })}>
                            <option value="0">0</option>
                            <option value="1">1 Mattress</option>
                            <option value="2">2 Mattresses</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>{t.quoteSection.fields.mattressTwin}</label>
                          <select value={formData.mattressTwin} onChange={(e) => setFormData({ ...formData, mattressTwin: e.target.value })}>
                            <option value="0">0</option>
                            <option value="1">1 Mattress</option>
                            <option value="2+">2+ Mattresses</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chairs Details */}
                  {selectedServices.chairs && (
                    <div className="dynamic-service-detail">
                      <h4><i className="bi bi-cup-hot-fill"></i> {t.quoteSection.serviceNames.chairs}</h4>
                      <div className="fields-inline-grid">
                        <div className="form-field">
                          <label>{t.quoteSection.fields.diningChairs}</label>
                          <select value={formData.diningChairCount} onChange={(e) => setFormData({ ...formData, diningChairCount: e.target.value })}>
                            <option value="2">2 Chairs</option>
                            <option value="4">4 Chairs</option>
                            <option value="6">6 Chairs</option>
                            <option value="8+">8+ Chairs</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>{t.quoteSection.fields.accentChairs}</label>
                          <select value={formData.accentChairCount} onChange={(e) => setFormData({ ...formData, accentChairCount: e.target.value })}>
                            <option value="0">0</option>
                            <option value="1">1 Chair</option>
                            <option value="2+">2+ Chairs</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* House Cleaning Details */}
                  {selectedServices.house && (
                    <div className="dynamic-service-detail">
                      <h4><i className="bi bi-house-door-fill"></i> {t.quoteSection.serviceNames.house}</h4>
                      <div className="fields-inline-grid">
                        <div className="form-field">
                          <label>{t.quoteSection.fields.bedrooms}</label>
                          <select value={formData.houseBeds} onChange={(e) => setFormData({ ...formData, houseBeds: e.target.value })}>
                            <option value="1-2">1 - 2 Beds</option>
                            <option value="3-4">3 - 4 Beds</option>
                            <option value="5+">5+ Beds</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>{t.quoteSection.fields.bathrooms}</label>
                          <select value={formData.houseBaths} onChange={(e) => setFormData({ ...formData, houseBaths: e.target.value })}>
                            <option value="1">1 Bath</option>
                            <option value="2">2 Baths</option>
                            <option value="3+">3+ Baths</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {!Object.values(selectedServices).some(Boolean) && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      {t.quoteSection.summary.noServices}
                    </p>
                  )}
                </div>

                {/* Step 3: Contact Info */}
                <div className="form-step-box">
                  <h3 className="form-step-title">{t.quoteSection.step3}</h3>
                  <div className="fields-inline-grid">
                    <div className="form-field">
                      <label>{t.quoteSection.fields.fullName}</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label>{t.quoteSection.fields.phone}</label>
                      <input
                        type="tel"
                        required
                        placeholder="(321) 000-0000"
                        value={formData.clientPhone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>

                  <div className="fields-inline-grid" style={{ marginTop: '12px' }}>
                    <div className="form-field">
                      <label>{t.quoteSection.fields.email}</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label>{t.quoteSection.fields.city}</label>
                      <input
                        type="text"
                        required
                        placeholder="Orlando, 32801"
                        value={formData.clientCity}
                        onChange={(e) => setFormData({ ...formData, clientCity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-field" style={{ marginTop: '12px' }}>
                    <label>{t.quoteSection.fields.notes}</label>
                    <textarea
                      rows="3"
                      placeholder={t.quoteSection.fields.notesPlaceholder}
                      value={formData.clientNotes}
                      onChange={(e) => setFormData({ ...formData, clientNotes: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%', marginTop: '10px' }}>
                  <i className="bi bi-whatsapp"></i> {t.quoteSection.summary.btnSubmit}
                </button>
              </form>
            </div>

            {/* Sidebar Summary Box */}
            <div className="quote-summary-sidebar">
              <div className="summary-sticky-card">
                <h3><i className="bi bi-receipt"></i> {t.quoteSection.summary.title}</h3>
                <div className="summary-items-list">
                  {getSummaryItems().length > 0 ? (
                    getSummaryItems().map((it, idx) => (
                      <p key={idx}>{it}</p>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.quoteSection.summary.noServices}</p>
                  )}
                </div>
                <div className="summary-direct-cta">
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {currentLang === 'pt' ? 'Precisa de agendamento prioritário?' : currentLang === 'es' ? '¿Necesita cita prioritaria?' : 'Need priority same-week scheduling?'}
                  </p>
                  <a href="tel:+13212725560" className="btn btn-outline" style={{ width: '100%' }}>
                    <i className="bi bi-telephone-fill"></i> (321) 272-5560
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal WhatsApp Success */}
      {isModalOpen && (
        <div className="modal-backdrop-custom show">
          <div className="modal-dialog-custom">
            <div className="modal-header-custom">
              <h3><i className="bi bi-check-circle-fill" style={{ color: 'var(--success)' }}></i> {t.modal.title}</h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Close modal"><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="modal-body-custom">
              <p>{t.modal.desc}</p>
              <div className="modal-summary-box">
                {getSummaryItems().map((it, idx) => (
                  <p key={idx}>{it}</p>
                ))}
              </div>
              <div className="modal-actions-custom">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                  <i className="bi bi-whatsapp"></i> {t.modal.btnContinue}
                </a>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                  {t.modal.btnEdit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/13212725560?text=Hello%20Apollo%2C%20I%20would%20like%20a%20free%20quote%20for%20cleaning%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        title="WhatsApp Apollo"
        aria-label="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      {/* 13. Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col-about">
              <img src="/assets/images/logo.png" alt="Apollo Logo" className="footer-logo" />
              <p>{t.footer.about}</p>
            </div>
            <div className="footer-col-links">
              <h4>{t.footer.quickLinks}</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#services">{t.nav.services}</a></li>
                <li><a href="#before-after">{t.nav.verifiedResults}</a></li>
                <li><a href="#gallery">{t.nav.realJobPhotos}</a></li>
                <li><a href="#why-us">{t.nav.whyChooseUs}</a></li>
                <li><a href="#quote">{t.nav.getFreeQuote}</a></li>
              </ul>
            </div>
            <div className="footer-col-services">
              <h4>{t.footer.servicesTitle}</h4>
              <ul>
                {t.servicesSection.services.map((s) => (
                  <li key={s.id}><a href="#services">{s.title}</a></li>
                ))}
                <li><a href="#services">{t.servicesSection.houseCard.title}</a></li>
              </ul>
            </div>
            <div className="footer-col-contact">
              <h4>{t.footer.contactTitle}</h4>
              <p><i className="bi bi-telephone-fill"></i> {t.footer.phone}</p>
              <p><i className="bi bi-envelope-fill"></i> {t.footer.email}</p>
              <p><i className="bi bi-clock-fill"></i> {t.footer.hours}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
