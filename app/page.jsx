'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  // Mobile Nav Drawer State
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  // Hero Video State
  const heroVideoRef = useRef(null);
  const [isHeroMuted, setIsHeroMuted] = useState(true);

  // Verified Results Carousel State
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const resultsSlides = [
    {
      img: '/assets/images/carousel_01.png',
      badge: 'Authentic Work',
      categoryIcon: 'bi-cup-hot-fill',
      category: 'Dining & Accent Chairs',
      heading: 'Fabric Stain Removal & Color Revival',
      desc: 'Elimination of food spills, grease marks, and fabric dullness from delicate dining chairs and upholstered seats, leaving fibers fresh and sanitized.',
      tag1Icon: 'bi-shield-check',
      tag1: 'Gentle pH Balance',
      tag2Icon: 'bi-lightning-charge',
      tag2: 'Quick Dry Time',
    },
    {
      img: '/assets/images/carousel_02.png',
      badge: 'Deep Sanitized',
      categoryIcon: 'bi-heart-pulse-fill',
      category: 'Mattresses Sanitization',
      heading: 'Hygienic Extraction & Dust Mite Relief',
      desc: 'Intense hot water extraction removing dead skin flakes, sweat residues, body oils, and allergens for a pristine, healthy sleeping environment.',
      tag1Icon: 'bi-shield-check',
      tag1: '99% Allergen Reduction',
      tag2Icon: 'bi-stars',
      tag2: 'Odor Neutralization',
    },
    {
      img: '/assets/images/carousel_03.png',
      badge: 'Deep Extracted',
      categoryIcon: 'bi-layers-fill',
      category: 'High-Traffic Carpets',
      heading: 'Deep Steam Soil Extraction & Pile Restoration',
      desc: 'High-temperature rinse and high-suction extraction pulling deep-seated dirt from high-traffic carpet pathways, restoring texture and bright tones.',
      tag1Icon: 'bi-shield-check',
      tag1: 'Zero Sticky Residue',
      tag2Icon: 'bi-wind',
      tag2: 'High-Suction Dry',
    },
    {
      img: '/assets/images/carousel_04.png',
      badge: 'Total Revival',
      categoryIcon: 'bi-archive-fill',
      category: 'Sofas & Sectionals',
      heading: 'Living Room Sofa Rejuvenation & Deodorizing',
      desc: 'Thorough fabric and cushion decontamination lifting embedded oils, pet dander, and everyday wear for long-lasting freshness and comfort.',
      tag1Icon: 'bi-shield-check',
      tag1: 'Pet & Kid Safe',
      tag2Icon: 'bi-flower1',
      tag2: 'Fresh Neutral Smell',
    },
  ];

  // Services Carousel State (What We Do)
  const servicesSlides = [
    {
      id: 'carpet',
      img: '/assets/images/img_01.png',
      badge: 'Hot Water Extraction',
      icon: 'bi-layers-fill',
      title: 'Carpet Cleaning',
      desc: 'High-pressure hot water extraction reaches deep into carpet fibers to remove trapped soil, allergens, and high-traffic pathways.',
      features: [
        'Wall-to-wall rooms & carpeted stairs',
        'Spot & stain pre-treatment',
        'High-suction fast drying',
      ],
      quoteKey: 'carpet',
    },
    {
      id: 'sofas',
      img: '/assets/images/img_02.png',
      badge: 'Fabric Rejuvenation',
      icon: 'bi-archive-fill',
      title: 'Sofas & Sectionals',
      desc: 'Gentle yet powerful upholstery extraction for standard sofas, L-shaped sectionals, loveseats, and fabric recliners.',
      features: [
        'Odor and body oil extraction',
        'Cushion & crevice detailed vacuuming',
        'Fabric color & texture brightening',
      ],
      quoteKey: 'sofas',
    },
    {
      id: 'upholstery',
      img: '/assets/images/img_03.png',
      badge: 'Detailed Care',
      icon: 'bi-gem',
      title: 'Upholstery Cleaning',
      desc: 'Complete care for custom upholstered headboards, armchairs, ottomans, and delicate synthetic and woven furniture fabrics.',
      features: [
        'Upholstered headboards & benches',
        'Delicate fiber pH-balanced rinsing',
        'Prevents fabric water-marking',
      ],
      quoteKey: 'sofas',
    },
    {
      id: 'rugs',
      img: '/assets/images/img_04.png',
      badge: 'Rugs & Runners',
      icon: 'bi-bounding-box-circles',
      title: 'Area Rugs',
      desc: 'Dedicated cleaning for living room area rugs, runners, and decorative floor coverings to restore original patterns and softness.',
      features: [
        'Wool, synthetic & blended rugs',
        'Edge and fringe careful detailing',
        'Neutralizing pet dander & spills',
      ],
      quoteKey: 'rugs',
    },
    {
      id: 'mattresses',
      img: '/assets/images/img_05.png',
      badge: 'Sanitization',
      icon: 'bi-heart-pulse-fill',
      title: 'Mattresses',
      desc: 'Deep hygienic extraction of King, Queen, and Twin mattresses to extract sweat residues, dead skin flakes, and dust mites.',
      features: [
        'Allergen & micro-dust extraction',
        'Spot stain relief & deodorizing',
        'Healthier sleeping environment',
      ],
      quoteKey: 'mattresses',
    },
    {
      id: 'chairs',
      img: '/assets/images/img_06.png',
      badge: 'Precision Clean',
      icon: 'bi-cup-hot-fill',
      title: 'Dining & Accent Chairs',
      desc: 'Detailed fabric cleaning for dining room chair sets, office desk chairs, and living room accent armchairs.',
      features: [
        'Dining sets (4, 6, 8+ chairs)',
        'Food & drink spill removal',
        'Wood frame protection during work',
      ],
      quoteKey: 'chairs',
    },
  ];

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const isServicesHovered = useRef(false);
  const servicesTouchStartX = useRef(0);

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
      if (parseInt(formData.carpetStairs) > 0) notes.push(`${formData.carpetStairs} flights of stairs`);
      if (formData.carpetStains) notes.push('Stain treatment');
      if (formData.carpetPet) notes.push('Pet odor removal');
      items.push(`• Carpet Cleaning (${formData.carpetRooms} room(s)${notes.length ? ', ' + notes.join(', ') : ''})`);
    }
    if (selectedServices.sofas) {
      let sofaDetails = [];
      if (parseInt(formData.sofaCount) > 0) sofaDetails.push(`${formData.sofaCount} Standard Sofa(s)`);
      if (parseInt(formData.sectionalCount) > 0) sofaDetails.push(`${formData.sectionalCount} Sectional(s)`);
      if (parseInt(formData.reclinerCount) > 0) sofaDetails.push(`${formData.reclinerCount} Recliner/Armchair(s)`);
      items.push(`• Upholstery & Sofas (${sofaDetails.length ? sofaDetails.join(', ') : 'Selected'})`);
    }
    if (selectedServices.rugs) {
      items.push(`• Area Rugs (${formData.rugCount} rug(s) - ${formData.rugType})`);
    }
    if (selectedServices.mattresses) {
      const count = parseInt(formData.mattressKing || 0) + parseInt(formData.mattressTwin || 0);
      items.push(`• Mattresses (${count} item(s) to sanitize)`);
    }
    if (selectedServices.chairs) {
      items.push(`• Chairs (${formData.diningChairCount} Dining, ${formData.accentChairCount} Accent)`);
    }
    if (selectedServices.house) {
      items.push(`• House Cleaning (${formData.houseCleaningType} - ${formData.houseBeds} Beds / ${formData.houseBaths} Baths)`);
    }
    return items;
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const summaryItems = getSummaryItems();
    if (summaryItems.length === 0) {
      alert('Please select at least one service to request a quote.');
      const optionsGrid = document.querySelector('.service-options-grid');
      if (optionsGrid) optionsGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!formData.clientName || !formData.clientPhone || !formData.clientEmail || !formData.clientCity) {
      alert('Please fill in your Name, Phone, Email, and City/ZIP Code.');
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
            <span>Serving <strong>Orlando, Kissimmee, Winter Park, Davenport, Windermere, Ocoee, Dr. Phillips, Lake Nona, Celebration &amp; Clermont</strong></span>
          </div>
          <div className="top-bar-contacts">
            <a href="tel:+13212725560" title="Call Apollo">
              <i className="bi bi-telephone-fill"></i>
              <span>+1 (321) 272-5560</span>
            </a>
            <a href="mailto:contact@apollocarpetcleaning.com" title="Email Apollo">
              <i className="bi bi-envelope-fill"></i>
              <span>contact@apollocarpetcleaning.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header with Official Logo */}
      <header className={`main-header ${isHeaderScrolled ? 'scrolled' : ''}`} id="mainHeader">
        <div className="container header-inner">
          <a href="#hero" className="brand-logo-wrap" title="Apollo Carpet & Upholstery Cleaning">
            <img src="/assets/images/logo.png" alt="Apollo Carpet & Upholstery Cleaning Logo" className="brand-logo-img" />
          </a>

          <nav className="desktop-nav" aria-label="Main Navigation">
            <a href="#services" className="nav-link">Services</a>
            <div className="nav-dropdown">
              <span className="nav-link nav-dropdown-toggle">
                Our Work <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem', marginLeft: '2px' }}></i>
              </span>
              <div className="nav-dropdown-menu">
                <a href="#before-after" className="dropdown-item">
                  <i className="bi bi-images"></i> Verified Results
                </a>
                <a href="#gallery" className="dropdown-item">
                  <i className="bi bi-camera-fill"></i> Real Job Photos
                </a>
              </div>
            </div>
            <a href="#why-us" className="nav-link">Why Choose Us</a>
            <a href="#areas" className="nav-link">Service Areas</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <div className="header-actions">
            <a href="tel:+13212725560" className="header-phone-box" title="Direct Phone">
              <div className="phone-icon-circle">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div className="phone-meta">
                <span className="phone-label">Call Direct</span>
                <span className="phone-number">(321) 272-5560</span>
              </div>
            </a>

            <a href="#quote" className="btn btn-primary header-quote-btn">
              <i className="bi bi-calculator"></i> Get Free Quote
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
          <img src="/assets/images/logo.png" alt="Apollo Logo" style={{ maxHeight: '44px', width: 'auto' }} />
          <button
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close menu"
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--primary-navy)', cursor: 'pointer', padding: '6px 10px' }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="mobile-nav-links">
          <a href="#hero" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>Home</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#services" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>Our Cleaning Services</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#before-after" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>Verified Results</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#gallery" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>Real Photo Gallery</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#why-us" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>Why Choose Apollo</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#areas" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>Service Areas</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          <a href="#faq" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            <span>FAQ</span>
            <i className="bi bi-chevron-right"></i>
          </a>
        </div>

        <div className="mobile-drawer-contact">
          <a href="#quote" className="btn btn-accent" style={{ width: '100%' }} onClick={() => setIsMobileNavOpen(false)}>
            <i className="bi bi-clipboard-check"></i> Get a Free Quote
          </a>
          <a href="tel:+13212725560" className="btn btn-primary" style={{ width: '100%' }}>
            <i className="bi bi-telephone-fill"></i> Call (321) 272-5560
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
                <span>Professional Carpet &amp; Upholstery Care</span>
              </div>
              <h1 className="hero-title">
                There’s Carpet Cleaning. Then there’s <span>Apollo Standard!</span> You deserve the best for your home
              </h1>
              <p className="hero-description">
                Somos uma empresa trazendo uma nova proposta em carpet cleaning &amp; upholstery and house cleaning. Damos total atenção aos detalhes e fazemos de tudo de forma personalizada.<br /><br />
                Trabalhamos apenas com produtos profissionais de alta qualidade, seguros para você, sua criança e seu pet.<br /><br />
                <strong>Contacte-nos e descubra porque fazemos a diferença.</strong>
              </p>
              <div className="hero-cta-group">
                <a href="#quote" className="btn btn-primary btn-lg">
                  <i className="bi bi-calculator"></i> Get a Free Quote
                </a>
                <a href="tel:+13212725560" className="btn btn-outline btn-lg">
                  <i className="bi bi-telephone-fill"></i> (321) 272-5560
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
                  <source src="/assets/images/hero_video.mp4" type="video/mp4" />
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
                  <span>{isHeroMuted ? 'Unmute' : 'Mute'}</span>
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
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Carpet cleaning</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Upholstery cleaning</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Area rugs</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Mattresses</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Dining &amp; accent chairs</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> House cleaning services</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Carpet cleaning</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Upholstery cleaning</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Area rugs</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Mattresses</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> Dining &amp; accent chairs</div>
            <div className="ticker-item"><i className="bi bi-sparkles"></i> House cleaning services</div>
          </div>
        </div>
      </div>

      {/* 5. Our Cleaning Services (Interactive Carousel) */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-grid-fill"></i>
              <span>What we do</span>
            </div>
            <h2 className="section-title">Professional Cleaning Services</h2>
            <p className="section-subtitle">
              Engineered for deep fiber revitalization, dust mite reduction, and stain relief using advanced extraction equipment.
            </p>
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
                    // Next slide
                    setCurrentServiceIndex((prev) => (prev >= servicesSlides.length - itemsPerView ? 0 : prev + 1));
                  } else {
                    // Prev slide
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
              {servicesSlides.map((service, idx) => (
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
                        <i className="bi bi-plus-circle"></i> Select in Quote
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
        </div>
      </section>

      {/* 6. Verified Work Results Carousel */}
      <section className="before-after-section" id="before-after">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-patch-check-fill"></i>
              <span>Verified Work Results</span>
            </div>
            <h2 className="section-title">Verified Cleaning Transformations</h2>
            <p className="section-subtitle">
              Real results achieved with Apollo's professional hot water extraction. Slide automatically updates every 2 seconds.
            </p>
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

      {/* 8. Real Job Photo Gallery */}
      <section className="photo-gallery-section" id="gallery">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-camera-fill"></i>
              <span>Real Job Gallery</span>
            </div>
            <h2 className="section-title">Authentic Fabric &amp; Furniture Restorations</h2>
            <p className="section-subtitle">
              High-resolution views of actual residential chairs, tufted headboards, and fabrics serviced by our team (from original job archive).
            </p>
          </div>

          <div className="photo-grid">
            <div className="photo-card">
              <div className="photo-card-img-wrap">
                <img src="/assets/images/gallery_sec3_01.png" alt="Patterned Dining Chairs" loading="lazy" />
              </div>
              <div className="photo-card-caption">
                <h4>Patterned Dining Chairs</h4>
              </div>
            </div>
            <div className="photo-card">
              <div className="photo-card-img-wrap">
                <img src="/assets/images/gallery_sec3_02.png" alt="Clean Fabric Revival" loading="lazy" />
              </div>
              <div className="photo-card-caption">
                <h4>Clean Fabric Revival</h4>
              </div>
            </div>
            <div className="photo-card">
              <div className="photo-card-img-wrap">
                <img src="/assets/images/gallery_sec3_03.png" alt="Detail & Texture Rejuvenation" loading="lazy" />
              </div>
              <div className="photo-card-caption">
                <h4>Detail &amp; Texture Rejuvenation</h4>
              </div>
            </div>
            <div className="photo-card">
              <div className="photo-card-img-wrap">
                <img src="/assets/images/gallery_sec3_04.png" alt="Headboard & Cushion Sanitization" loading="lazy" />
              </div>
              <div className="photo-card-caption">
                <h4>Headboard &amp; Cushion Sanitization</h4>
              </div>
            </div>
            <div className="photo-card">
              <div className="photo-card-img-wrap">
                <img src="/assets/images/gallery_sec3_05.png" alt="Tufted Upholstery Care" loading="lazy" />
              </div>
              <div className="photo-card-caption">
                <h4>Tufted Upholstery Care</h4>
              </div>
            </div>
            <div className="photo-card">
              <div className="photo-card-img-wrap">
                <img src="/assets/images/gallery_sec3_06.png" alt="Residential Living Furniture" loading="lazy" />
              </div>
              <div className="photo-card-caption">
                <h4>Residential Living Furniture</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Why Choose Apollo */}
      <section className="why-section" id="why-us">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Why Choose Apollo</h2>
            <p className="section-subtitle">
              We combine heavy-duty professional extraction machinery with dedicated attention to detail on every piece of upholstery and carpet.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-box"><i className="bi bi-water"></i></div>
              <h3>High-Power Extraction</h3>
              <p>Industrial-grade suction and temperature extraction systems that flush out deep-seated grit from fiber roots without saturating backing materials.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box"><i className="bi bi-shield-check"></i></div>
              <h3>Professional Products</h3>
              <p>pH-balanced, biodegradable formulas specially formulated to dissolve stubborn oils, soils, and spills while preserving fabric integrity.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box"><i className="bi bi-search"></i></div>
              <h3>Attention to Detail</h3>
              <p>Thorough pre-inspection of fabric types, targeted spot pre-conditioning, manual edge scrubbing, and careful corner detail work.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box"><i className="bi bi-wind"></i></div>
              <h3>Careful Fast Drying</h3>
              <p>Controlled moisture application and high-velocity vacuum passes ensure minimal drying times so you can enjoy your living space sooner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Service Areas Section (Compact Design) */}
      <section className="areas-section" id="areas">
        <div className="container">
          <div className="areas-box areas-box-compact">
            <div className="areas-header areas-header-compact">
              <div className="section-tag">
                <i className="bi bi-pin-map-fill"></i>
                <span>Local Coverage</span>
              </div>
              <h2>Our Service Areas in Central Florida</h2>
              <p>Prompt, reliable residential &amp; upholstery cleaning across the following communities:</p>
            </div>

            <div className="cities-grid cities-grid-compact">
              {[
                'Orlando',
                'Kissimmee',
                'Winter Park',
                'Davenport',
                'Windermere',
                'Ocoee',
                'Dr. Phillips',
                'Lake Nona',
                'Celebration',
                'Clermont',
              ].map((city) => (
                <div key={city} className="city-pill-compact">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>{city}</span>
                </div>
              ))}
            </div>

            <div className="areas-footer-note areas-footer-note-compact">
              <i className="bi bi-truck"></i>
              <span>Mobile extraction units dispatched across Orange, Osceola, Seminole, and Polk counties.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">
              <i className="bi bi-question-circle-fill"></i>
              <span>Got Questions?</span>
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Clear answers regarding drying times, fabric safety, pet stain handling, and scheduling across Central Florida.
            </p>
          </div>

          <div className="faq-container">
            {[
              {
                q: 'How long does carpet & upholstery take to dry completely?',
                a: 'Thanks to our high-suction commercial extraction equipment, carpets usually dry within 4 to 6 hours, while upholstery typically dries within 3 to 5 hours depending on humidity and indoor air circulation.',
              },
              {
                q: 'Are your cleaning solutions safe for pets and children?',
                a: 'Yes, absolutely. We use non-toxic, eco-friendly, and biodegradable cleaning products that are completely safe for your entire family, including toddlers and pets.',
              },
              {
                q: 'Can you remove tough pet stains and persistent odors?',
                a: 'Yes. We utilize specialized enzymatic pre-treatments specifically designed to break down uric acid crystals and organic compounds in fabrics and carpet underpads.',
              },
              {
                q: 'How often should residential carpets and sofas be professionally cleaned?',
                a: 'Major carpet and furniture manufacturers recommend professional hot water extraction every 6 to 12 months to extend fiber life, preserve appearance, and eliminate allergens.',
              },
            ].map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <div className="faq-icon"><i className="bi bi-chevron-down"></i></div>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Interactive Quote Form */}
      <section className="quote-section" id="quote">
        <div className="container">
          <div className="quote-wrapper">
            <div className="quote-header-banner">
              <h2>Request Your Free Custom Quote</h2>
              <p>Select the services you need, configure your details, and receive an upfront estimate tailored to your home.</p>
            </div>

            <div className="quote-form-body">
              <form onSubmit={handleQuoteSubmit}>
                <div className="form-step-title">
                  <span className="step-num">1</span>
                  <span>Select Service Categories</span>
                </div>

                <div className="service-options-grid">
                  {[
                    { key: 'carpet', label: 'Carpet Cleaning', icon: 'bi-layers-fill' },
                    { key: 'sofas', label: 'Sofas & Sectionals', icon: 'bi-archive-fill' },
                    { key: 'rugs', label: 'Area Rugs', icon: 'bi-bounding-box-circles' },
                    { key: 'mattresses', label: 'Mattresses', icon: 'bi-heart-pulse-fill' },
                    { key: 'chairs', label: 'Dining & Accent Chairs', icon: 'bi-cup-hot-fill' },
                    { key: 'house', label: 'House Cleaning', icon: 'bi-house-door-fill' },
                  ].map((srv) => (
                    <div
                      key={srv.key}
                      className={`service-option-card ${selectedServices[srv.key] ? 'selected' : ''}`}
                      onClick={() => toggleService(srv.key)}
                    >
                      <i className={`bi ${srv.icon}`}></i>
                      <span>{srv.label}</span>
                      <input type="checkbox" checked={selectedServices[srv.key]} readOnly style={{ display: 'none' }} />
                    </div>
                  ))}
                </div>

                {/* Conditional Details Block */}
                <div className="quote-details-section">
                  <div className="form-step-title" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <span className="step-num">2</span>
                    <span>Configure Details for Selected Items</span>
                  </div>

                  {selectedServices.carpet && (
                    <div className="service-detail-block visible" id="detailCarpet">
                      <div className="detail-block-header">
                        <i className="bi bi-layers-fill"></i> Carpet Cleaning Details
                      </div>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Number of Carpeted Rooms / Areas:</label>
                          <select
                            className="form-control"
                            value={formData.carpetRooms}
                            onChange={(e) => setFormData({ ...formData, carpetRooms: e.target.value })}
                          >
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4">4 Rooms</option>
                            <option value="5+">5+ Rooms (Whole House)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Flights of Carpeted Stairs:</label>
                          <select
                            className="form-control"
                            value={formData.carpetStairs}
                            onChange={(e) => setFormData({ ...formData, carpetStairs: e.target.value })}
                          >
                            <option value="0">None (0)</option>
                            <option value="1">1 Flight (10-15 steps)</option>
                            <option value="2">2 Flights</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
                        <label className="form-checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.carpetStains}
                            onChange={(e) => setFormData({ ...formData, carpetStains: e.target.checked })}
                          />
                          <span>Deep traffic spot pre-treatment</span>
                        </label>
                        <label className="form-checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.carpetPet}
                            onChange={(e) => setFormData({ ...formData, carpetPet: e.target.checked })}
                          />
                          <span>Pet odor &amp; stain neutralization</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {selectedServices.sofas && (
                    <div className="service-detail-block visible" id="detailSofas">
                      <div className="detail-block-header">
                        <i className="bi bi-archive-fill"></i> Sofas &amp; Upholstery Details
                      </div>
                      <div className="form-grid-3">
                        <div className="form-group">
                          <label className="form-label">Standard Sofas (3-seat / 2-seat):</label>
                          <select
                            className="form-control"
                            value={formData.sofaCount}
                            onChange={(e) => setFormData({ ...formData, sofaCount: e.target.value })}
                          >
                            <option value="0">0</option>
                            <option value="1">1 Sofa</option>
                            <option value="2">2 Sofas</option>
                            <option value="3+">3+ Sofas</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Sectional Couches (L-Shape / U-Shape):</label>
                          <select
                            className="form-control"
                            value={formData.sectionalCount}
                            onChange={(e) => setFormData({ ...formData, sectionalCount: e.target.value })}
                          >
                            <option value="0">0</option>
                            <option value="1">1 Sectional</option>
                            <option value="2">2 Sectionals</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Armchairs / Recliners:</label>
                          <select
                            className="form-control"
                            value={formData.reclinerCount}
                            onChange={(e) => setFormData({ ...formData, reclinerCount: e.target.value })}
                          >
                            <option value="0">0</option>
                            <option value="1">1 Chair</option>
                            <option value="2">2 Chairs</option>
                            <option value="3+">3+ Chairs</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedServices.rugs && (
                    <div className="service-detail-block visible" id="detailRugs">
                      <div className="detail-block-header">
                        <i className="bi bi-bounding-box-circles"></i> Area Rugs Details
                      </div>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Number of Area Rugs / Runners:</label>
                          <select
                            className="form-control"
                            value={formData.rugCount}
                            onChange={(e) => setFormData({ ...formData, rugCount: e.target.value })}
                          >
                            <option value="1">1 Rug</option>
                            <option value="2">2 Rugs</option>
                            <option value="3">3 Rugs</option>
                            <option value="4+">4+ Rugs</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Primary Material / Size:</label>
                          <select
                            className="form-control"
                            value={formData.rugType}
                            onChange={(e) => setFormData({ ...formData, rugType: e.target.value })}
                          >
                            <option value="Standard Synthetic (Medium 5x8)">Standard Synthetic (Medium 5x8)</option>
                            <option value="Large Living Room Rug (8x10+)">Large Living Room Rug (8x10+)</option>
                            <option value="Wool / Delicate Woven Fiber">Wool / Delicate Woven Fiber</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedServices.mattresses && (
                    <div className="service-detail-block visible" id="detailMattresses">
                      <div className="detail-block-header">
                        <i className="bi bi-heart-pulse-fill"></i> Mattress Sanitization Details
                      </div>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">King / Queen Mattresses:</label>
                          <select
                            className="form-control"
                            value={formData.mattressKing}
                            onChange={(e) => setFormData({ ...formData, mattressKing: e.target.value })}
                          >
                            <option value="0">0</option>
                            <option value="1">1 Mattress</option>
                            <option value="2">2 Mattresses</option>
                            <option value="3+">3+ Mattresses</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Full / Twin / Crib Mattresses:</label>
                          <select
                            className="form-control"
                            value={formData.mattressTwin}
                            onChange={(e) => setFormData({ ...formData, mattressTwin: e.target.value })}
                          >
                            <option value="0">0</option>
                            <option value="1">1 Mattress</option>
                            <option value="2">2 Mattresses</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedServices.chairs && (
                    <div className="service-detail-block visible" id="detailChairs">
                      <div className="detail-block-header">
                        <i className="bi bi-cup-hot-fill"></i> Dining &amp; Accent Chairs Details
                      </div>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Dining Chairs (Fabric Seats / Backs):</label>
                          <select
                            className="form-control"
                            value={formData.diningChairCount}
                            onChange={(e) => setFormData({ ...formData, diningChairCount: e.target.value })}
                          >
                            <option value="2">2 Chairs</option>
                            <option value="4">4 Chairs</option>
                            <option value="6">6 Chairs</option>
                            <option value="8">8 Chairs</option>
                            <option value="10+">10+ Chairs</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Living Room Accent Chairs:</label>
                          <select
                            className="form-control"
                            value={formData.accentChairCount}
                            onChange={(e) => setFormData({ ...formData, accentChairCount: e.target.value })}
                          >
                            <option value="0">0</option>
                            <option value="1">1 Accent Chair</option>
                            <option value="2">2 Accent Chairs</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedServices.house && (
                    <div className="service-detail-block visible" id="detailHouse">
                      <div className="detail-block-header">
                        <i className="bi bi-house-door-fill"></i> House Cleaning Package Details
                      </div>
                      <div className="form-grid-3">
                        <div className="form-group">
                          <label className="form-label">Service Frequency / Type:</label>
                          <select
                            className="form-control"
                            value={formData.houseCleaningType}
                            onChange={(e) => setFormData({ ...formData, houseCleaningType: e.target.value })}
                          >
                            <option value="One-Time Deep Clean">One-Time Deep Clean</option>
                            <option value="Move-In / Move-Out">Move-In / Move-Out</option>
                            <option value="Recurring (Bi-Weekly)">Recurring (Bi-Weekly)</option>
                            <option value="Recurring (Weekly)">Recurring (Weekly)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Bedrooms:</label>
                          <select
                            className="form-control"
                            value={formData.houseBeds}
                            onChange={(e) => setFormData({ ...formData, houseBeds: e.target.value })}
                          >
                            <option value="1">1 Bed</option>
                            <option value="2">2 Beds</option>
                            <option value="3">3 Beds</option>
                            <option value="4">4 Beds</option>
                            <option value="5+">5+ Beds</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Bathrooms:</label>
                          <select
                            className="form-control"
                            value={formData.houseBaths}
                            onChange={(e) => setFormData({ ...formData, houseBaths: e.target.value })}
                          >
                            <option value="1">1 Bath</option>
                            <option value="2">2 Baths</option>
                            <option value="3">3 Baths</option>
                            <option value="4+">4+ Baths</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {getSummaryItems().length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', margin: '10px 0' }}>
                      Please select at least one service above to customize your quote request.
                    </p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="form-step-title">
                  <span className="step-num">3</span>
                  <span>Your Contact &amp; Location Details</span>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="clientName">Full Name: *</label>
                    <input
                      type="text"
                      id="clientName"
                      className="form-control"
                      placeholder="e.g. John Doe"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="clientPhone">Phone Number (WhatsApp): *</label>
                    <input
                      type="tel"
                      id="clientPhone"
                      className="form-control"
                      placeholder="(321) 000-0000"
                      required
                      value={formData.clientPhone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="clientEmail">Email Address: *</label>
                    <input
                      type="email"
                      id="clientEmail"
                      className="form-control"
                      placeholder="john@example.com"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="clientCity">City / Neighborhood / ZIP Code: *</label>
                    <input
                      type="text"
                      id="clientCity"
                      className="form-control"
                      placeholder="e.g. Orlando, FL 32801"
                      required
                      value={formData.clientCity}
                      onChange={(e) => setFormData({ ...formData, clientCity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="clientNotes">Additional Notes or Special Requests (Optional):</label>
                  <textarea
                    id="clientNotes"
                    className="form-control"
                    rows="3"
                    placeholder="Tell us about specific stains, pet odors, preferred dates, or access details..."
                    value={formData.clientNotes}
                    onChange={(e) => setFormData({ ...formData, clientNotes: e.target.value })}
                  ></textarea>
                </div>

                <div className="quote-summary-box">
                  <h4><i className="bi bi-receipt"></i> Selected Services Overview:</h4>
                  <div className="quote-summary-items">
                    {getSummaryItems().length === 0 ? (
                      <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        No services selected yet. Please select at least one service above to customize your quote request.
                      </span>
                    ) : (
                      getSummaryItems().map((item, i) => (
                        <div key={i}>{item}</div>
                      ))
                    )}
                  </div>
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="btn btn-primary btn-lg btn-submit-quote">
                    <i className="bi bi-send-fill"></i> Submit Free Quote Request
                  </button>
                  <a
                    href="https://wa.me/13212725560?text=Hello%20Apollo%2C%20I%20would%20like%20a%20free%20quote%20for%20cleaning%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                  >
                    <i className="bi bi-whatsapp"></i> Chat Direct on WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'show' : ''}`} id="successModal">
        <div className="modal-dialog">
          <div className="modal-icon-success">
            <i className="bi bi-check-lg"></i>
          </div>
          <h3>Quote Request Sent!</h3>
          <p>
            Thank you for reaching out to Apollo Carpet &amp; Upholstery Cleaning! We have logged your request and will contact you shortly with your custom pricing estimate.
          </p>
          <div className="modal-summary-box">
            <strong>Client:</strong> {formData.clientName} ({formData.clientPhone})<br />
            <strong>Location:</strong> {formData.clientCity}<br />
            <strong>Email:</strong> {formData.clientEmail}<br />
            <strong>Requested Services:</strong><br />
            {getSummaryItems().map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%' }}
            >
              <i className="bi bi-whatsapp"></i> Send to WhatsApp for Instant Confirmation
            </a>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsModalOpen(false)}
              style={{ width: '100%' }}
            >
              Close Window
            </button>
          </div>
        </div>
      </div>

      {/* 13. Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-about">
              <img src="/assets/images/logo.png" alt="Apollo Carpet Cleaning" className="footer-logo-img" />
              <p>
                Professional hot water extraction, carpet cleaning, sofa and upholstery rejuvenation, mattresses sanitization, and premium house cleaning across Central Florida.
              </p>
              <div className="footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Apollo on Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://wa.me/13212725560" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Apollo on WhatsApp">
                  <i className="bi bi-whatsapp"></i>
                </a>
                <a href="mailto:contact@apollocarpetcleaning.com" className="footer-social-btn" title="Email Apollo">
                  <i className="bi bi-envelope-fill"></i>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Our Services</h4>
              <ul className="footer-links">
                <li><a href="#services"><i className="bi bi-chevron-right"></i> Carpet Cleaning</a></li>
                <li><a href="#services"><i className="bi bi-chevron-right"></i> Sofas &amp; Sectionals</a></li>
                <li><a href="#services"><i className="bi bi-chevron-right"></i> Upholstery Cleaning</a></li>
                <li><a href="#services"><i className="bi bi-chevron-right"></i> Area Rugs Care</a></li>
                <li><a href="#services"><i className="bi bi-chevron-right"></i> Mattresses Sanitizing</a></li>
                <li><a href="#services"><i className="bi bi-chevron-right"></i> Dining &amp; Accent Chairs</a></li>
                <li><a href="#services"><i className="bi bi-chevron-right"></i> House Cleaning</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Service Areas</h4>
              <ul className="footer-links" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Orlando</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Kissimmee</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Winter Park</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Davenport</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Windermere</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Ocoee</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Dr. Phillips</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Lake Nona</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Celebration</a></li>
                <li><a href="#areas"><i className="bi bi-geo-alt"></i> Clermont</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Direct Contact</h4>
              <div className="footer-contact-item">
                <i className="bi bi-telephone-fill"></i>
                <div>
                  <strong>Phone &amp; WhatsApp:</strong><br />
                  <a href="tel:+13212725560" style={{ color: 'var(--accent-cyan)' }}>+1 (321) 272-5560</a>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="bi bi-envelope-fill"></i>
                <div>
                  <strong>Email Quotes:</strong><br />
                  <a href="mailto:contact@apollocarpetcleaning.com" style={{ color: 'var(--text-white)' }}>contact@apollocarpetcleaning.com</a>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="bi bi-facebook"></i>
                <div>
                  <strong>Facebook:</strong><br />
                  <span>Apollo carpet &amp; upholstery cleaning</span>
                </div>
              </div>
              <div style={{ marginTop: '18px' }}>
                <a href="#quote" className="btn btn-accent btn-sm" style={{ width: '100%' }}>
                  <i className="bi bi-calculator"></i> Get Free Quote
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; 2026 Apollo Carpet &amp; Upholstery Cleaning. All Rights Reserved.
            </div>
            <div className="footer-credit">
              <a href="https://camaly.com.br/" target="_blank" rel="noopener noreferrer" className="camaly-credit-link" title="Desenvolvido por Camaly">
                Produzida com 💚 por <strong>CAMALY</strong>
              </a>
            </div>
            <div>
              Professional Carpet, Upholstery &amp; Residential Cleaning in Central Florida
            </div>
          </div>
        </div>
      </footer>

      {/* 14. Floating WhatsApp Widget */}
      <a
        href="https://wa.me/13212725560?text=Hello%20Apollo%2C%20I%20would%20like%20a%20free%20quote%20for%20cleaning%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        title="Chat with Apollo on WhatsApp"
        aria-label="WhatsApp Chat"
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      {/* 15. Mobile Sticky Bottom Action Bar */}
      <div className="mobile-sticky-bar">
        <a href="tel:+13212725560" className="btn btn-outline mobile-bar-btn" title="Call Apollo">
          <i className="bi bi-telephone-fill"></i> Call Now
        </a>
        <a href="#quote" className="btn btn-primary mobile-bar-btn" title="Request Quote">
          <i className="bi bi-calculator"></i> Free Quote
        </a>
      </div>
    </>
  );
}
