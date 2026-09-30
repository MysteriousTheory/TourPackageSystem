// web-app/src/components/HeroSlideshow.jsx
import React from 'react';
import { Sparkles, Search } from 'lucide-react';

export default function HeroSlideshow({ searchQuery, setSearchQuery, selectedRegion, setSelectedRegion, regions, currentSlide, setCurrentSlide, slides }) {
  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      marginTop: '-76px', // Pull the hero behind the navbar
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Content Layer */}
      <div style={{ position: 'relative', zIndex: 2, padding: '3rem 2.5rem', width: '100%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            lineHeight: 1,
            color: '#ffffff',
            letterSpacing: '0.1em',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            {slides[currentSlide].title}
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#f8fafc',
            fontWeight: 500,
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}>
            {slides[currentSlide].subtitle}
          </p>

          {/* Search & Filter Bar (Overlayed) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ flex: '1 1 240px', position: 'relative' }}>
              <Search size={20} color="var(--accent-primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search flights, hotels, or destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 3rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  fontWeight: 500
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {regions.slice(0, 4).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: selectedRegion === r ? 'var(--accent-primary)' : 'rgba(0,0,0,0.05)',
                    color: selectedRegion === r ? '#fff' : 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {r === 'All' ? 'Top Picks' : r}
                </button>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        zIndex: 2
      }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: currentSlide === idx ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: currentSlide === idx ? 'var(--accent-primary)' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
