// web-app/src/components/BookingModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Moon, Building2, User, Phone, Mail, FileText, CheckCircle2, AlertCircle, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({
  isOpen,
  onClose,
  packageData,
  editBookingData,
  onSaveBooking
}) {
  const isEditing = !!editBookingData;

  // Form states
  const [touristName, setTouristName] = useState('');
  const [touristEmail, setTouristEmail] = useState('');
  const [touristPhone, setTouristPhone] = useState('');
  const [place, setPlace] = useState('');
  const [nightsStayed, setNightsStayed] = useState(3);
  const [touristQuantity, setTouristQuantity] = useState(2);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state when modal opens or package/edit data changes
  useEffect(() => {
    if (!isOpen) return;

    if (isEditing && editBookingData) {
      setTouristName(editBookingData.tourist_name || '');
      setTouristEmail(editBookingData.tourist_email || '');
      setTouristPhone(editBookingData.tourist_phone || '');
      setPlace(editBookingData.place || '');
      setNightsStayed(editBookingData.nights_stayed || 3);
      setTouristQuantity(editBookingData.tourist_quantity || 1);
      setBookingDate(editBookingData.booking_date || new Date().toISOString().split('T')[0]);
      setSpecialRequests(editBookingData.special_requests || '');

      // Match hotel if packageData provided
      if (packageData?.accommodations?.length > 0) {
        const found = packageData.accommodations.find(h => h.name === editBookingData.hotel_accommodation);
        setSelectedHotel(found || packageData.accommodations[0]);
      } else {
        setSelectedHotel({
          name: editBookingData.hotel_accommodation || 'Standard Villa',
          tier: 'Selected Accommodation',
          price_per_night_php: editBookingData.hotel_price_per_night || 0
        });
      }
    } else if (packageData) {
      setTouristName('');
      setTouristEmail('');
      setTouristPhone('');
      setPlace(`${packageData.title} (${packageData.province})`);
      setNightsStayed(Math.max(1, (packageData.duration_days || 4) - 1));
      setTouristQuantity(2);
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 14);
      setBookingDate(tomorrow.toISOString().split('T')[0]);
      
      setSpecialRequests('');
      if (packageData.accommodations && packageData.accommodations.length > 0) {
        setSelectedHotel(packageData.accommodations[0]);
      } else {
        setSelectedHotel({ name: 'Standard Beach Resort', tier: 'Standard', price_per_night_php: 2500 });
      }
    }
    setErrorMsg('');
  }, [isOpen, packageData, editBookingData, isEditing]);

  if (!isOpen) return null;

  const basePrice = packageData ? Number(packageData.base_price_php || 0) : (editBookingData?.package_base_price || 0);
  const hotelPricePerNight = selectedHotel ? Number(selectedHotel.price_per_night_php || 0) : 0;
  
  // Real-time calculation: (Base Package * Headcount) + (Hotel Price/night * Nights * Rooms needed based on guests)
  const roomsNeeded = Math.ceil(touristQuantity / 2);
  const totalAmount = (basePrice * touristQuantity) + (hotelPricePerNight * nightsStayed * roomsNeeded);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!touristName.trim() || !touristPhone.trim() || !place.trim()) {
      setErrorMsg('Please provide your name, phone number, and destination place.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      ...(isEditing ? { id: editBookingData.id } : {}),
      package_id: packageData?.id || editBookingData?.package_id || 1,
      tourist_name: touristName.trim(),
      tourist_email: touristEmail.trim(),
      tourist_phone: touristPhone.trim(),
      place: place.trim(),
      nights_stayed: Number(nightsStayed),
      tourist_quantity: Number(touristQuantity),
      hotel_accommodation: selectedHotel?.name || 'Standard Accommodation',
      hotel_price_per_night: hotelPricePerNight,
      package_base_price: basePrice,
      total_amount_php: totalAmount,
      booking_date: bookingDate,
      special_requests: specialRequests.trim(),
      status: editBookingData?.status || 'Confirmed'
    };

    try {
      await onSaveBooking(payload, isEditing);
      
      // Trigger festive confetti animation on success
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }

      onClose();
    } catch (err) {
      setErrorMsg('Failed to process booking. Please check details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
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
          maxWidth: '740px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: isEditing ? '#38bdf8' : 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <Sparkles size={13} />
              <span>{isEditing ? 'Modify Reservation' : 'Customize & Reserve Package'}</span>
            </div>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              marginTop: '0.2rem'
            }}>
              {packageData ? packageData.title : (editBookingData?.place || 'Philippine Tour Booking')}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: '#94a3b8',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {errorMsg && (
            <div style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '10px',
              color: '#fca5a5',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section: Tourist Information */}
          <div>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <User size={15} color="var(--accent-primary)" />
              <span>Lead Tourist & Contact Information</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={touristName}
                    onChange={(e) => setTouristName(e.target.value)}
                    placeholder="e.g. Juanita Delos Reyes"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={touristPhone}
                  onChange={(e) => setTouristPhone(e.target.value)}
                  placeholder="+63 917 123 4567"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={touristEmail}
                  onChange={(e) => setTouristEmail(e.target.value)}
                  placeholder="juanita@example.com"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                />
              </div>
            </div>
          </div>

          {/* Section: Trip Configuration (Place, Nights, Quantity, Date) */}
          <div style={{
            padding: '1.25rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)'
          }}>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Calendar size={15} color="var(--accent-cyan)" />
              <span>Itinerary & Party Parameters</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Tour Destination Place *
                </label>
                <input
                  type="text"
                  required
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Departure Date *
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    colorScheme: 'light'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Nights Stayed
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setNightsStayed(Math.max(1, nightsStayed - 1))}
                    style={{
                      width: '36px',
                      height: '38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 700
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={nightsStayed}
                    onChange={(e) => setNightsStayed(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      width: '60px',
                      textAlign: 'center',
                      padding: '0.65rem 0.4rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontWeight: 700
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setNightsStayed(nightsStayed + 1)}
                    style={{
                      width: '36px',
                      height: '38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 700
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Tourists (Quantity)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setTouristQuantity(Math.max(1, touristQuantity - 1))}
                    style={{
                      width: '36px',
                      height: '38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 700
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={touristQuantity}
                    onChange={(e) => setTouristQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      width: '60px',
                      textAlign: 'center',
                      padding: '0.65rem 0.4rem',
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontWeight: 700
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setTouristQuantity(touristQuantity + 1)}
                    style={{
                      width: '36px',
                      height: '38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 700
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Hotel / Accommodation Selection */}
          <div>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Building2 size={15} color="#fbbf24" />
              <span>Select Hotel Accommodations</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
              {(packageData?.accommodations || [selectedHotel]).filter(Boolean).map((hotel, idx) => {
                const isSelected = selectedHotel?.name === hotel.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedHotel(hotel)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--accent-glow)' : 'var(--bg-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '0.65rem', right: '0.65rem', color: 'var(--accent-primary)' }}>
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.2rem' }}>
                      {hotel.tier || 'Deluxe'}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {hotel.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 800 }}>
                      +₱{Number(hotel.price_per_night_php || 0).toLocaleString()}
                      <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'var(--text-muted)' }}> / night</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Special Requests */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
              Special Requests / Dietary / Room Preferences
            </label>
            <textarea
              rows="2"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Airport pickup timing, vegetarian meals, high floor room, child crib..."
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          {/* Total Calculation Breakdown Box */}
          <div style={{
            padding: '1.1rem 1.35rem',
            background: 'var(--accent-glow)',
            border: '1px solid var(--accent-primary)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Summary: {touristQuantity} Tourist{touristQuantity > 1 ? 's' : ''} × ₱{basePrice.toLocaleString()} base + {nightsStayed} night{nightsStayed > 1 ? 's' : ''} ({roomsNeeded} room{roomsNeeded > 1 ? 's' : ''})
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>
                ₱{totalAmount.toLocaleString()}
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
                  PHP (Total Estimated)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.7rem 1.2rem',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  color: '#94a3b8',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '0.7rem 1.6rem',
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-gold) 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                <CreditCard size={17} />
                <span>{isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Confirm Tour Booking')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
