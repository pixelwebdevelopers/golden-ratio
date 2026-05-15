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

        <div className={`logo-wrapper ${(activeOverlay && activeOverlay !== 'contact') ? 'hidden' : ''}`}>
          <img src="/assets/GR-logo.png" alt="Golden Ratio Post-Production" />
        </div>

        <div className="buttons-bar">
          <button className="nav-btn" onClick={() => openOverlay('showreel')} aria-label="Show Reel">
            <img src="/assets/GR-showreel-button.png" alt="Showreel" />
          </button>
          <button className="nav-btn" onClick={() => openOverlay('foodreel')} aria-label="AI Food Reel">
            <img src="/assets/GR-foodreel-button.png" alt="AI Foodreel" />
          </button>
          <button style={{ marginTop: "-5px" }} className="nav-btn" onClick={() => openOverlay('profile')} aria-label="Profile">
            <img src="/assets/GR-profile-button.png" alt="Profile" />
          </button>
          <button style={{ marginBottom: "0px", marginTop: "10px" }} className="nav-btn" onClick={() => openOverlay('contact')} aria-label="Contact Us">
            <img style={{ height: "2.8rem" }} src="/assets/GR-contact-us-button.png" alt="Contact Us" />
          </button>
        </div>
      </div>

      {/* ── Video Overlay ── */}
      <div className={`overlay ${isVideo ? 'open' : ''}`}>
        <div className="overlay-backdrop" onClick={closeOverlay} />
        <button className="close-btn" onClick={closeOverlay} aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
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
        <button className="close-btn" onClick={closeOverlay} aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Removed download button */}

        <div className="pdf-popup-content">
          {activeOverlay === 'profile' && (
            <PdfViewer file="/assets/GR-Profile.pdf" />
          )}
        </div>
      </div>

      {/* ── Contact Overlay ── */}
      <div className={`overlay contact-overlay ${activeOverlay === 'contact' ? 'open' : ''}`}>
        <div className="overlay-backdrop" onClick={closeOverlay} />
        <button className="close-btn" onClick={closeOverlay} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="contact-content" onClick={(e) => {
          if (e.target === e.currentTarget) closeOverlay();
        }}>
          <div className="contact-info-wrapper">
            <div className="contact-item">
              <img src="/assets/GR-mail-button.png" alt="Email" className="contact-icon-img" />
              <a href="mailto:hello@golden-ratio.pro">hello@golden-ratio.pro</a>
            </div>

            <div className="contact-item">
              <img src="/assets/GR-whatsapp-button.png" alt="WhatsApp" className="contact-icon-img" />
              <a href="https://wa.me/923331017860" target="_blank" rel="noopener noreferrer">+92 333 1017860</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
