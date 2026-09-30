# ISLAS PH — Modern Philippine Tour Package Web & Mobile Platform

A modern, high-contrast, minimalist tour package application showcasing premier Philippine destinations (El Nido & Coron Palawan, Boracay, Siargao, Bohol & Cebu, Batanes, and Sagada/Banaue) with interactive Leaflet/OpenStreetMap maps, rich photo galleries, dynamic booking customizations, and full XAMPP MySQL backend support.

---

## 🗂️ Project Structure

```
mobileApp/
├── backend/                  # PHP REST API & MySQL Database for XAMPP
│   ├── database.sql          # Full database schema and seed data
│   ├── config.php            # PDO Connection with CORS headers
│   └── api/
│       ├── get_packages.php  # Tour packages & hotel accommodations
│       ├── create_booking.php# Register new tourist bookings
│       ├── get_bookings.php  # Fetch all reservations
│       ├── update_booking.php# Modify booking details
│       └── delete_booking.php# Cancel reservations
├── web-app/                  # React + Vite Web Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PackageCard.jsx
│   │   │   ├── MapExplorer.jsx       # Leaflet OpenStreetMap Interactive Map
│   │   │   ├── PackageDetailsModal.jsx # HD Galleries & Day Itineraries
│   │   │   ├── BookingModal.jsx        # Live pricing & hotel tier customization
│   │   │   └── BookingsList.jsx        # Search, edit & manage reservations
│   │   ├── services/api.js             # Dual-mode API (XAMPP + Local fallback)
│   │   └── index.css                   # Glassmorphic dark high-contrast theme
└── mobile-app/               # React Native (Expo) Mobile Application
    └── App.js                # Cross-platform mobile tour & booking experience
```

---

## 🚀 Quick Start Guide

### 1. Setting Up XAMPP & MySQL Database
1. Open the **XAMPP Control Panel** and start **Apache** and **MySQL**.
2. Open your browser and go to `http://localhost/phpmyadmin/`.
3. Create a new database named `tour_packages_db` or import the SQL script directly:
   - File location: `mobileApp/backend/database.sql`
4. Copy the `mobileApp/backend/` folder into your XAMPP `htdocs` directory:
   - Target: `C:\xampp\htdocs\backend` (so it is reachable at `http://localhost/backend/api/get_packages.php`).

*(Note: The React Web and Mobile apps also include automated local storage and embedded fallback data so you can test immediately even before starting XAMPP!)*

---

### 2. Running the React Web Application
```bash
cd web-app
npm run dev
```
Open your browser at **`http://localhost:5173`**.

---

### 3. Running the React Native Mobile Application
```bash
cd mobile-app
npx expo start
```
- Press `w` to open in your web browser.
- Scan the QR code using the **Expo Go** app on your Android or iPhone device.

---

## 🌟 Key Features Included
1. **Interactive Free Leaflet Maps**:
   - OpenStreetMap tiles with custom markers for Philippine destinations.
   - Smooth camera fly-to animations and popup previews with one-click booking.
2. **Comprehensive Booking & Modification Suite**:
   - Real-time price calculation: `(Base Package × Headcount) + (Hotel Rate × Nights × Rooms)`.
   - Edit tourist name, contact number, departure date, destination place, nights stayed, tourist headcount, and hotel class.
   - Live delete / cancellation with safety confirmations.
3. **Rich Photo Carousel & HD Galleries**:
   - High-resolution photography for each destination and resort partner.
4. **State-of-the-Art Aesthetic**:
   - Dark Obsidian `#090d16` base with Philippine Emerald (`#10b981`) and Palawan Cyan (`#06b6d4`) accents.
