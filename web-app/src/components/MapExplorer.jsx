// web-app/src/components/MapExplorer.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, ArrowRight, ExternalLink, Compass } from 'lucide-react';

// Custom Map Marker Icon styling using Leaflet DivIcon
const createCustomIcon = (title, isActive) => {
  return L.divIcon({
    className: 'custom-leaflet-icon-wrapper',
    html: `
      <div style="
        background: ${isActive ? '#06b6d4' : '#10b981'};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid #ffffff;
        box-shadow: 0 0 16px ${isActive ? 'rgba(6, 182, 212, 0.9)' : 'rgba(16, 185, 129, 0.8)'};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        transform: translate(-50%, -50%);
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

// Component to dynamically animate map center when user focuses on a package
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2) {
      map.flyTo(center, zoom || 9, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapExplorer({ packages, selectedPackage, onSelectPackage, onBookNow }) {
  const defaultCenter = selectedPackage 
    ? [selectedPackage.latitude, selectedPackage.longitude]
    : [12.8797, 121.7740]; // Philippines Center

  const defaultZoom = selectedPackage ? 9 : 6;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(320px, 380px) 1fr',
      gap: '1.25rem',
      height: 'calc(100vh - 140px)',
      minHeight: '600px'
    }}>
      {/* Sidebar List of Destinations */}
      <div 
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--accent-cyan)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '0.25rem'
          }}>
            <Compass size={14} />
            <span>Interactive Philippine Map Explorer</span>
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            Select a Destination Pin
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Powered by OpenStreetMap & Free Leaflet Geo-Coordinates
          </p>
        </div>

        {/* Scrollable list of cards */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {packages.map((pkg) => {
            const isSelected = selectedPackage?.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--accent-glow)' : 'var(--bg-card)',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'var(--bg-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'var(--bg-card)';
                }}
              >
                <img
                  src={pkg.featured_image}
                  alt={pkg.title}
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '10px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{pkg.province}</span>
                    <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={11} fill="#fbbf24" /> {pkg.rating}
                    </span>
                  </div>
                  <h4 style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '0.2rem'
                  }}>
                    {pkg.title}
                  </h4>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                    ₱{Number(pkg.base_price_php).toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Leaflet Map Container */}
      <div 
        className="glass-panel"
        style={{
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ChangeMapView center={defaultCenter} zoom={selectedPackage ? 9 : 6} />

          {packages.map((pkg) => {
            const isSelected = selectedPackage?.id === pkg.id;
            return (
              <Marker
                key={pkg.id}
                position={[pkg.latitude, pkg.longitude]}
                icon={createCustomIcon(pkg.title, isSelected)}
                eventHandlers={{
                  click: () => onSelectPackage(pkg)
                }}
              >
                <Popup>
                  <div style={{ width: '220px', padding: '0.2rem' }}>
                    <img
                      src={pkg.featured_image}
                      alt={pkg.title}
                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}
                    />
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {pkg.province}, {pkg.region}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      {pkg.title}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                        ₱{Number(pkg.base_price_php).toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700 }}>
                        ★ {pkg.rating}
                      </span>
                    </div>
                    <button
                      onClick={() => onBookNow(pkg)}
                      style={{
                        width: '100%',
                        padding: '0.45rem',
                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-gold) 100%)',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      Book This Tour
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
