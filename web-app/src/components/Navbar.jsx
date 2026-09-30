// web-app/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Compass, CalendarDays, MapPin, Sparkles, ShieldCheck, Database } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, bookingsCount, dbSource }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      padding: '0.85rem 1.5rem',
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-gold) 100%)',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px var(--accent-glow)'
          }}>
            <Compass size={24} color="#ffffff" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              color: isScrolled ? 'var(--text-primary)' : '#ffffff',
              transition: 'color 0.3s ease'
            }}>
              ISLAS<span style={{ color: 'var(--accent-primary)', WebkitTextFillColor: 'var(--accent-primary)' }}>PH</span>
            </div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)'
            }}>
              Philippine Tour Suites
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: isScrolled ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.15)',
          padding: '0.35rem 0.5rem',
          borderRadius: 'var(--radius-full)',
          border: isScrolled ? '1px solid var(--border-subtle)' : '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease'
        }}>
          <button
            onClick={() => setActiveTab('explore')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.25s ease',
              backgroundColor: activeTab === 'explore' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'explore' ? '#ffffff' : (isScrolled ? 'var(--text-secondary)' : '#ffffff')
            }}
          >
            <Compass size={16} />
            <span>Tour Packages</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.25s ease',
              backgroundColor: activeTab === 'map' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'map' ? '#ffffff' : (isScrolled ? 'var(--text-secondary)' : '#ffffff')
            }}
          >
            <MapPin size={16} />
            <span>Interactive Map</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.25s ease',
              backgroundColor: activeTab === 'bookings' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'bookings' ? '#ffffff' : (isScrolled ? 'var(--text-secondary)' : '#ffffff')
            }}
          >
            <CalendarDays size={16} />
            <span>Bookings</span>
            {bookingsCount > 0 && (
              <span style={{
                background: activeTab === 'bookings' ? '#ffffff' : 'rgba(255, 254, 254, 0.55)',
                color: activeTab === 'bookings' ? 'var(--accent-primary)' : 'var(--accent-primary)',
                padding: '0.1rem 0.5rem',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: 800
              }}>
                {bookingsCount}
              </span>
            )}
          </button>
        </nav>

      </div>
    </header>
  );
}
