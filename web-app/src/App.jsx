// web-app/src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PackageCard from './components/PackageCard';
import MapExplorer from './components/MapExplorer';
import PackageDetailsModal from './components/PackageDetailsModal';
import BookingModal from './components/BookingModal';
import BookingsList from './components/BookingsList';
import HeroSlideshow from './components/HeroSlideshow';
import { fetchPackages, fetchBookings, createBooking, updateBooking, deleteBooking } from './services/api';
import { Sparkles, Compass, MapPin, Search, Filter, ShieldCheck, Sun, HeartHandshake, PhoneCall, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: '/palawan-new.jpg',
    title: 'PALAWAN',
    subtitle: 'Crystal Clear Waters & Limestone Cliffs'
  },
  {
    id: 2,
    image: 'https://ik.imgkit.net/tvlk/dam/i/01ke3xrf04rnv4nqxmcbt74nbv.jpeg?tr=q-70,c-at_max,w-500,h-250,dpr-2',
    title: 'MAYON',
    subtitle: 'The Majestic Perfect Cone Volcano'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop',
    title: 'BORACAY',
    subtitle: 'World-Class White Sand Beaches'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'map' | 'bookings'
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dbSource, setDbSource] = useState('local');
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Slideshow
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Modals
  const [selectedPackageForDetail, setSelectedPackageForDetail] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [bookingPackageTarget, setBookingPackageTarget] = useState(null);
  const [editBookingTarget, setEditBookingTarget] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const pkgRes = await fetchPackages();
      const bkgRes = await fetchBookings();
      setPackages(pkgRes.data);
      setBookings(bkgRes.data);
      setDbSource(pkgRes.source);
      setLoading(false);
    };
    loadAll();
  }, []);

  // Handlers
  const handleOpenDetail = (pkg) => {
    setSelectedPackageForDetail(pkg);
    setIsDetailModalOpen(true);
  };

  const handleBookNow = (pkg) => {
    setEditBookingTarget(null);
    setBookingPackageTarget(pkg);
    setIsBookingModalOpen(true);
  };

  const handleEditBooking = (booking) => {
    const matchedPkg = packages.find(p => p.id === booking.package_id) || packages[0];
    setBookingPackageTarget(matchedPkg);
    setEditBookingTarget(booking);
    setIsBookingModalOpen(true);
  };

  const handleSaveBooking = async (payload, isEditing) => {
    if (isEditing) {
      await updateBooking(payload);
    } else {
      await createBooking(payload);
    }
    // Refresh bookings
    const refreshed = await fetchBookings();
    setBookings(refreshed.data);
  };

  const handleDeleteBooking = async (id) => {
    await deleteBooking(id);
    const refreshed = await fetchBookings();
    setBookings(refreshed.data);
  };

  const handleOpenMapWithPackage = (pkg) => {
    setSelectedPackageForDetail(pkg);
    setActiveTab('map');
  };

  // Regions list for filter
  const regions = ['All', 'MIMAROPA', 'Western Visayas', 'Caraga', 'Central Visayas', 'Cagayan Valley', 'Cordillera Administrative Region'];

  const filteredPackages = packages.filter((p) => {
    const matchRegion = selectedRegion === 'All' || p.region === selectedRegion || p.province.includes(selectedRegion);
    const matchQuery = (
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchRegion && matchQuery;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed Background Slides */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - 250px), rgba(0,0,0,0) 100%)`,
        maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - 250px), rgba(0,0,0,0) 100%)`
      }}>
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `url(${slide.image}) center/cover no-repeat`,
              transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 6s ease-out'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)'
            }} />
          </div>
        ))}
      </div>

      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        bookingsCount={bookings.length}
        dbSource={dbSource}
      />

      {/* Tab 1 Hero Section (Full Width) */}
      {activeTab === 'explore' && (
        <div className="animate-fade-in">
          <HeroSlideshow 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            regions={regions}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            slides={SLIDES}
          />
        </div>
      )}

      {/* Main Container */}
      <main style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', padding: '1.5rem', flex: 1 }}>
        {/* Tab 1: Explore Tour Packages */}
        {activeTab === 'explore' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
            {/* Tour Packages Grid */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    Featured Philippine Tour Packages
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Showing {filteredPackages.length} curated destinations with photo galleries & maps
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('map')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--accent-cyan)',
                    padding: '0.45rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <MapPin size={14} />
                  <span>View All on Interactive Map</span>
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onSelectPackage={handleOpenDetail}
                    onBookNow={handleBookNow}
                    onOpenMap={handleOpenMapWithPackage}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Philippine Map */}
        {activeTab === 'map' && (
          <div className="animate-fade-in">
            <MapExplorer
              packages={packages}
              selectedPackage={selectedPackageForDetail}
              onSelectPackage={(pkg) => setSelectedPackageForDetail(pkg)}
              onBookNow={handleBookNow}
            />
          </div>
        )}

        {/* Tab 3: Tourist Bookings Management Suite */}
        {activeTab === 'bookings' && (
          <div className="animate-fade-in">
            <BookingsList
              bookings={bookings}
              onEditBooking={handleEditBooking}
              onDeleteBooking={handleDeleteBooking}
              onCreateNew={() => {
                setBookingPackageTarget(packages[0]);
                setEditBookingTarget(null);
                setIsBookingModalOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Package Detail Modal */}
      <PackageDetailsModal
        pkg={selectedPackageForDetail}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBookNow={handleBookNow}
        onOpenMap={handleOpenMapWithPackage}
      />

      {/* Booking Form & Edit Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        packageData={bookingPackageTarget}
        editBookingData={editBookingTarget}
        onSaveBooking={handleSaveBooking}
      />

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        padding: '2rem 1.5rem',
        color: 'var(--text-muted)',
        fontSize: '0.82rem'
      }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>ISLAS PH</span> — Philippine Tour Package Booking & Management Platform
          </div>
          <div>
            Leaflet & OpenStreetMap Integrated • MySQL XAMPP Ready • Modern Minimalist
          </div>
        </div>
      </footer>
    </div>
  );
}
