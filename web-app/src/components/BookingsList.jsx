// web-app/src/components/BookingsList.jsx
import React, { useState } from 'react';
import { Calendar, Users, Moon, Building2, Phone, Mail, Edit3, Trash2, CheckCircle2, Search, PlusCircle, Sparkles } from 'lucide-react';

export default function BookingsList({
  bookings,
  onEditBooking,
  onDeleteBooking,
  onCreateNew
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      (b.tourist_name && b.tourist_name.toLowerCase().includes(term)) ||
      (b.place && b.place.toLowerCase().includes(term)) ||
      (b.booking_code && b.booking_code.toLowerCase().includes(term))
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header & Filter Controls */}
      <div 
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Confirmed Tour Reservations
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Real-time management & edit suite connected with XAMPP MySQL database.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search tourist, booking #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            onClick={onCreateNew}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1rem',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-gold) 100%)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <PlusCircle size={15} />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Bookings Card Grid */}
      {filteredBookings.length === 0 ? (
        <div 
          className="glass-panel"
          style={{
            padding: '3rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Calendar size={48} color="var(--text-muted)" />
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>No Bookings Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '400px' }}>
            {searchTerm ? 'No results match your search query.' : 'You have not made any tour reservations yet. Explore packages to book your dream Philippine trip!'}
          </p>
          <button
            onClick={onCreateNew}
            style={{
              padding: '0.6rem 1.25rem',
              background: 'var(--accent-primary)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Explore Packages
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem' }}>
          {filteredBookings.map((b) => (
            <div 
              key={b.id}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                border: '1px solid var(--border-subtle)',
                position: 'relative'
              }}
            >
              {/* Card Header: Code & Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-cyan)',
                  background: 'rgba(6, 182, 212, 0.12)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px'
                }}>
                  {b.booking_code || `BK-PH-${b.id}`}
                </span>

                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#34d399',
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <CheckCircle2 size={12} />
                  <span>{b.status || 'Confirmed'}</span>
                </span>
              </div>

              {/* Destination & Tourist */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {b.place}
                </h3>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  👤 {b.tourist_name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem', marginTop: '0.2rem' }}>
                  <span>📞 {b.tourist_phone}</span>
                  {b.tourist_email && <span>✉️ {b.tourist_email}</span>}
                </div>
              </div>

              {/* Booking Specifications Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(0, 0, 0, 0.02)',
                borderRadius: '10px',
                fontSize: '0.78rem'
              }}>
                <div style={{ color: 'var(--text-secondary)' }}>
                  <Calendar size={12} style={{ marginRight: '4px', verticalAlign: 'middle', color: 'var(--accent-cyan)' }} />
                  Departure: <strong style={{ color: 'var(--text-primary)' }}>{b.booking_date}</strong>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  <Moon size={12} style={{ marginRight: '4px', verticalAlign: 'middle', color: 'var(--accent-gold)' }} />
                  Duration: <strong style={{ color: 'var(--text-primary)' }}>{b.nights_stayed} Nights</strong>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  <Users size={12} style={{ marginRight: '4px', verticalAlign: 'middle', color: 'var(--accent-green)' }} />
                  Party: <strong style={{ color: 'var(--text-primary)' }}>{b.tourist_quantity} Tourists</strong>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  <Building2 size={12} style={{ marginRight: '4px', verticalAlign: 'middle', color: '#a78bfa' }} />
                  Hotel: <strong style={{ color: 'var(--text-primary)' }}>{b.hotel_accommodation}</strong>
                </div>
              </div>

              {/* Special Requests if any */}
              {b.special_requests && (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.04)', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Requests:</span> {b.special_requests}
                </div>
              )}

              {/* Total & Action Buttons */}
              <div style={{
                marginTop: 'auto',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Amount</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>
                    ₱{Number(b.total_amount_php).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onEditBooking(b)}
                    title="Edit Booking Details"
                    style={{
                      padding: '0.45rem 0.75rem',
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '8px',
                      color: '#38bdf8',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to cancel booking for ${b.tourist_name}?`)) {
                        onDeleteBooking(b.id);
                      }
                    }}
                    title="Cancel Booking"
                    style={{
                      padding: '0.45rem 0.6rem',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#f87171',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
