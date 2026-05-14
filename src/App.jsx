import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'
import PdfViewer from './components/PdfViewer'

function App() {
  const [activeOverlay, setActiveOverlay] = useState(null) // 'showreel' | 'foodreel' | 'profile' | 'contact' | null
  const videoRef = useRef(null)

  const openOverlay = useCallback((type) => {
    setActiveOverlay(type)
  }, [])

  const closeOverlay = useCallback(() => {
    // Pause popup video when closing
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setActiveOverlay(null)
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeOverlay()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeOverlay])

  const isVideo = activeOverlay === 'showreel' || activeOverlay === 'foodreel'
  const videoSrc = activeOverlay === 'showreel'
    ? '/assets/GR-Showreel.mp4'
    : '/assets/GR-Foodreel.mp4'

  return (
    <>
      {/* ── Main Page ── */}
      <div className="page">
        <div className="bg-video">
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/assets/GR-Hero-section.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="bg-overlay" />

        <div className={`logo-wrapper ${isVideo || activeOverlay === 'profile' ? 'hidden' : ''}`}>
          <img src="/assets/GR-logo.png" alt="Golden Ratio Post-Production" />
        </div>

        <div className="buttons-bar">
          <button className="nav-btn" onClick={() => openOverlay('showreel')} aria-label="Show Reel">
            <img src="/assets/GR-showreel-button.png" alt="Showreel" />
          </button>
          <button className="nav-btn" onClick={() => openOverlay('foodreel')} aria-label="AI Food Reel">
            <img src="/assets/GR-foodreel-button.png" alt="AI Foodreel" />
          </button>
          <button className="nav-btn" onClick={() => openOverlay('profile')} aria-label="Profile">
            <img src="/assets/GR-profile-button.png" alt="Profile" />
          </button>
          <button className="nav-btn" onClick={() => openOverlay('contact')} aria-label="Contact Us">
            <img src="/assets/GR-contact-us-button.png" alt="Contact Us" />
          </button>
        </div>
      </div>

      {/* ── Video Overlay ── */}
      <div className={`overlay ${isVideo ? 'open' : ''}`}>
        <div className="overlay-backdrop" onClick={closeOverlay} />
        <button className="close-btn" onClick={closeOverlay} aria-label="Close">✕</button>
        <div className="video-popup-content">
          {isVideo && (
            <video
              ref={videoRef}
              key={activeOverlay}
              autoPlay
              controls
              playsInline
              preload="auto"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* ── PDF Overlay ── */}
      <div className={`overlay ${activeOverlay === 'profile' ? 'open' : ''}`}>
        <div className="overlay-backdrop" onClick={closeOverlay} />
        <button className="close-btn" onClick={closeOverlay} aria-label="Close">✕</button>

        {activeOverlay === 'profile' && (
          <a
            className="close-btn download-overlay-btn"
            href="/assets/GR-Profile.pdf"
            download="Golden-Ratio-Profile.pdf"
            aria-label="Download"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        )}

        <div className="pdf-popup-content">
          {activeOverlay === 'profile' && (
            <PdfViewer file="/assets/GR-Profile.pdf" />
          )}
        </div>
      </div>

      {/* ── Contact Overlay ── */}
      <div className={`overlay contact-overlay ${activeOverlay === 'contact' ? 'open' : ''}`}>
        <div className="overlay-backdrop" onClick={closeOverlay} />
        <button className="close-btn" onClick={closeOverlay} aria-label="Close">✕</button>
        <div className="contact-content">
          <h2>Get In Touch</h2>

          <div className="contact-info">
            <a href="mailto:info@golden-ratio.pro">info@golden-ratio.pro</a>
            <a href="tel:+923001234567">+92 300 123 4567</a>
            <p>Karachi, Pakistan</p>
          </div>

          <div className="social-row">
            {/* Instagram */}
            <a className="social-link" href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Facebook */}
            <a className="social-link" href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
              </svg>
            </a>
            {/* YouTube */}
            <a className="social-link" href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a className="social-link" href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm15.106-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.778-.773 1.778-1.729v-20.542c0-.955-.8-1.729-1.778-1.729z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
