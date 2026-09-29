# Apollo Carpet & Upholstery Cleaning — Official Website

Modern, mobile-first, high-converting multilingual website built for **Apollo Carpet & Upholstery Cleaning**, servicing Orlando, Kissimmee, Winter Park, Davenport, Windermere, Ocoee, Dr. Phillips, Lake Nona, Celebration, and Clermont across Central Florida.

---

## 🎨 Visual Identity & Design System

- **Primary Colors**:
  - Primary Navy: `#0b2545` (Headers, buttons, footer, branding)
  - Primary Deep Navy: `#07172b`
  - Accent Cyan: `#00a8e8` (Icons, dividers, badges, interactive highlights)
  - Accent Dark Cyan: `#008cc2`
  - Neutral Backgrounds: `#ffffff`, `#f8fafc`, and `#f1f5f9`
- **Typography**: `Outfit` (Google Fonts) with system fallbacks.
- **Icons**: Bootstrap Icons (CDN).
- **Flag Assets**: Precision Vector SVGs (`/assets/images/flags/us.svg`, `es.svg`, `br.svg`).

---

## 🌐 Multilingual i18n Architecture

The application includes an instant dynamic translation system supporting 3 full locales with persistence in `localStorage`:

- 🇺🇸 **English (`en`)**: Complete US localized texts, headers, quote calculator, and WhatsApp payloads.
- 🇪🇸 **Spanish (`es`)**: Complete Spanish localized texts, headers, quote calculator, and WhatsApp payloads.
- 🇧🇷 **Portuguese (`pt`)**: Complete Brazilian Portuguese localized texts, headers, quote calculator, and WhatsApp payloads.

---

## 📱 Mobile-First & Performance Optimizations

1. **Touch Ergonomics & Safe Area**:
   - `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` for instant response without tap delay.
   - iOS Safe-Area support (`viewport-fit=cover` & `env(safe-area-inset-*)`).
   - Inputs formatted to `16px` to avoid automatic zoom on iOS Safari.
2. **Interactive Carousels**:
   - Touch swipe gesture support on mobile devices.
   - Verified Results auto-rotating carousel.
   - Real Work Photo Gallery with high-definition assets.
3. **Hero Section Video**:
   - Dedicated streaming video (`video 01.mp4`) with HTTP 206 Partial Content Range support for instant playback.
   - Interactive Mute / Unmute controls.
4. **Interactive Quote Calculator**:
   - Dynamic service selector (Carpet, Sofas, Rugs, Mattresses, Chairs, House Cleaning).
   - Real-time localized summary calculation.
   - Instant 1-click WhatsApp formatted quote dispatch.

---

## 🛠️ Getting Started Locally

### Option 1: Native Node.js Server (Recommended for Media Streaming)
```bash
# Install dependencies
npm install

# Start local server with video streaming support
npm run serve
# Or specify a custom port:
# PORT=3008 npm run serve
```
Access at: `http://localhost:3000/` (or specified port).

### Option 2: Next.js Development Server
```bash
npm run dev
```

---

## 📞 Company Contact Details

- **Company**: Apollo Carpet & Upholstery Cleaning
- **Direct Phone / WhatsApp**: +1 (321) 272-5560
- **Email**: contact@apollocarpetcleaning.com
- **Service Areas**: Orlando, Kissimmee, Winter Park, Davenport, Windermere, Ocoee, Dr. Phillips, Lake Nona, Celebration, and Clermont (Central Florida)
- **Hours**: Monday – Saturday: 7:30 AM – 7:00 PM | Sunday: By Appointment
