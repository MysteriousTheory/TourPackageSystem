// web-app/src/components/PackageCard.jsx
import React, { useState } from 'react';
import { MapPin, Star, Clock, Sparkles, ChevronRight, BedDouble, Camera, ArrowRight } from 'lucide-react';

export default function PackageCard({ pkg, onSelectPackage, onBookNow, onOpenMap }) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const gallery = pkg.gallery && pkg.gallery.length > 0 ? pkg.gallery : [pkg.featured_image];

  return (
    <div
      className="glass-panel"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--accent-primary)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={() => onSelectPackage(pkg)}
    >
      {/* Image Gallery Header */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img
          src={gallery[activePhotoIdx]}
          alt={pkg.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease'
          }}
          loading="lazy"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(9, 13, 22, 0.1) 0%, rgba(9, 13, 22, 0.85) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.3rem 0.75rem',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)'
        }}>
          <MapPin size={13} color="var(--accent-primary)" />
          <span>{pkg.province}</span>
        </div>

        {/* Rating Pill */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          padding: '0.3rem 0.65rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#d97706'
        }}>
          <Star size={13} fill="#fbbf24" color="#fbbf24" />
          <span>{pkg.rating}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>({pkg.reviews_count})</span>
        </div>

        {/* Thumbnail Preview Selector */}
        {gallery.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '0.75rem',
              display: 'flex',
              gap: '0.35rem',
              zIndex: 5
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  border: activePhotoIdx === idx ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.4)',
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  opacity: activePhotoIdx === idx ? 1 : 0.65,
                  transition: 'all 0.2s ease'
                }}
              >
                <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}

        {/* Duration badge */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          color: '#e2e8f0',
          fontSize: '0.75rem',
          fontWeight: 600,
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '0.2rem 0.55rem',
          borderRadius: '6px'
        }}>
          <Clock size={13} color="#38bdf8" />
          <span>{pkg.duration_days} Days / {pkg.duration_days - 1} Nights</span>
        </div>
      </div>

      {/* Package Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: '1.15rem',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          marginBottom: '0.35rem',
          color: 'var(--text-primary)',
          lineHeight: 1.35
        }}>
          {pkg.title}
        </h3>

        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          marginBottom: '1rem',
          lineHeight: 1.45,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {pkg.tagline}
        </p>

        {/* Highlights Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: '1.25rem'
        }}>
          {pkg.highlights?.slice(0, 2).map((hl, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.72rem',
                padding: '0.3rem 0.6rem',
                background: 'rgba(0, 0, 0, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}
            >
              ✓ {hl}
            </span>
          ))}
        </div>

        {/* Bottom Price & Action Row */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '0.9rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Base Package
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>
              ₱{Number(pkg.base_price_php).toLocaleString()}
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}> / person</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenMap(pkg);
              }}
              title="Locate on Philippine Map"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--accent-cyan)',
                padding: '0.55rem 0.65rem',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <MapPin size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookNow(pkg);
              }}
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-gold) 100%)',
                border: 'none',
                color: '#ffffff',
                padding: '0.55rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 18px var(--accent-glow)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Book</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
