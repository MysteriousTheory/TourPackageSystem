// web-app/src/services/api.js
import { INITIAL_PACKAGES, INITIAL_BOOKINGS } from '../data/fallbackPackages';
// Configurable API URL for production deployment (e.g. Vercel) with fallback to local XAMPP
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost/backend/api').replace(/\/+$/, '');

// Local storage key for offline/demo persistence when XAMPP is not actively serving
const STORAGE_PACKAGES_KEY = 'ph_tour_packages_v1';
const STORAGE_BOOKINGS_KEY = 'ph_tour_bookings_v1';

const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage error:', e);
  }
};

export const fetchPackages = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/get_packages.php`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
        setStoredData(STORAGE_PACKAGES_KEY, data.data);
        return { data: data.data, source: 'xampp' };
      }
    }
  } catch (err) {
    console.log('XAMPP backend not reached or not running yet, using high-fidelity local database.');
  }

  const local = getStoredData(STORAGE_PACKAGES_KEY, INITIAL_PACKAGES);
  return { data: local, source: 'local' };
};

export const fetchBookings = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/get_bookings.php`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && Array.isArray(data.data)) {
        setStoredData(STORAGE_BOOKINGS_KEY, data.data);
        return { data: data.data, source: 'xampp' };
      }
    }
  } catch (err) {
    console.log('XAMPP backend not reached, using local storage.');
  }

  const local = getStoredData(STORAGE_BOOKINGS_KEY, INITIAL_BOOKINGS);
  return { data: local, source: 'local' };
};

export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/create_booking.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success') {
        return { success: true, data: data.data, source: 'xampp' };
      }
    }
  } catch (err) {
    console.log('Falling back to local storage creation');
  }

  // Local sync
  const current = getStoredData(STORAGE_BOOKINGS_KEY, INITIAL_BOOKINGS);
  const newBooking = {
    ...bookingData,
    id: Date.now(),
    booking_code: 'BK-PH-' + Math.floor(1000 + Math.random() * 9000),
    created_at: new Date().toISOString(),
    status: 'Confirmed'
  };
  const updated = [newBooking, ...current];
  setStoredData(STORAGE_BOOKINGS_KEY, updated);
  return { success: true, data: newBooking, source: 'local' };
};

export const updateBooking = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/update_booking.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success') {
        return { success: true, data: data.data, source: 'xampp' };
      }
    }
  } catch (err) {
    console.log('Falling back to local storage update');
  }

  const current = getStoredData(STORAGE_BOOKINGS_KEY, INITIAL_BOOKINGS);
  const updated = current.map(b => b.id === bookingData.id ? { ...b, ...bookingData } : b);
  setStoredData(STORAGE_BOOKINGS_KEY, updated);
  return { success: true, data: bookingData, source: 'local' };
};

export const deleteBooking = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/delete_booking.php?id=${id}`, {
      method: 'GET'
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success') {
        return { success: true, source: 'xampp' };
      }
    }
  } catch (err) {
    console.log('Falling back to local storage deletion');
  }

  const current = getStoredData(STORAGE_BOOKINGS_KEY, INITIAL_BOOKINGS);
  const updated = current.filter(b => b.id !== id);
  setStoredData(STORAGE_BOOKINGS_KEY, updated);
  return { success: true, source: 'local' };
};
