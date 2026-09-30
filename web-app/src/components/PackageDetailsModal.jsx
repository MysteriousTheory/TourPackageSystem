// web-app/src/components/PackageDetailsModal.jsx
import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, Star, Users, Check, ShieldCheck, BedDouble, Camera, ArrowRight, Compass } from 'lucide-react';

export default function PackageDetailsModal({ pkg, isOpen, onClose, onBookNow, onOpenMap }) {
  const [activePhoto, setActivePhoto] = useState(0);

  if (!isOpen || !pkg) return null;

  const gallery = pkg.gallery && pkg.gallery.length > 0 ? pkg.gallery : [pkg.featured_image];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      backgroundColor: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 20,
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)'
          }}
        >
          <X size={18} />
        </button>

        {/* Gallery Showcase */}
        <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
          <img
            src={gallery[activePhoto]}
            alt={pkg.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)'
          }} />

          {/* Quick Info Overlay */}
          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', right: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{
                background: 'rgba(16, 185, 129, 0.25)',
                color: '#34d399',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid rgba(16, 185, 129, 0.4)'
              }}>
                {pkg.province}, Philippines
              </span>
              <span style={{
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Star size={13} fill="#fbbf24" /> {pkg.rating} ({pkg.reviews_count} reviews)
              </span>
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {pkg.title}
            </h2>
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1.5rem',
              display: 'flex',
              gap: '0.4rem'
            }}>
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    border: activePhoto === idx ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.4)',
                    padding: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    opacity: activePhoto === idx ? 1 : 0.7
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Overview description */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              About this Expedition
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {pkg.description}
            </p>
          </div>

          {/* Highlights & Inclusions Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div style={{
              padding: '1.1rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Tour Highlights
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {pkg.highlights?.map((h, i) => (
                  <li key={i} style={{ fontSize: '0.84rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} color="#10b981" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              padding: '1.1rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                What is Included
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {pkg.inclusions?.map((inc, i) => (
                  <li key={i} style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={14} color="#06b6d4" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Partner Accommodations */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BedDouble size={16} color="var(--accent-gold)" />
              <span>Available Hotel Accommodations</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
              {pkg.accommodations?.map((hotel) => (
                <div key={hotel.id} style={{
                  background: 'rgba(0, 0, 0, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}>
                  <img src={hotel.image_url} alt={hotel.name} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                  <div style={{ padding: '0.75rem' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{hotel.tier}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{hotel.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 800 }}>
                      +₱{hotel.price_per_night_php.toLocaleString()} / night
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div style={{
            marginTop: '0.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Base Expedition Price</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>
                ₱{Number(pkg.base_price_php).toLocaleString()}
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}> / person</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenMap(pkg);
                }}
                style={{
                  padding: '0.65rem 1.1rem',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  color: '#38bdf8',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Compass size={15} />
                <span>View on Map</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBookNow(pkg);
                }}
                style={{
                  padding: '0.65rem 1.4rem',
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-gold) 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <span>Proceed to Booking</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
