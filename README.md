<div align="center">
  <img src="assets/logo.svg" alt="ISLAS PH Logo" width="120" />
</div>

# ISLAS PH

A modern tour package application showcasing premier Philippine destinations. The platform features an interactive Leaflet-based map explorer, comprehensive dynamic booking customization, and dual-client support (web and mobile) backed by a PHP/MySQL REST API.

---

## Table of Contents
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Web Application Setup](#web-application-setup)
  - [Mobile Application Setup](#mobile-application-setup)
- [Project Structure](#project-structure)
- [Key Features](#key-features)

---

## Architecture

The project follows a decoupled client-server architecture:

- **Backend**: PHP REST API, MySQL Database (PDO, CORS enabled)
- **Web Client**: React.js, Vite, Leaflet Maps, custom CSS
- **Mobile Client**: React Native, Expo

## Prerequisites

Ensure you have the following installed before proceeding:
- Node.js (v16.0 or higher)
- npm or yarn
- XAMPP or an equivalent AMP stack (Apache, MySQL, PHP)
- Expo Go application (for mobile testing)

---

## Getting Started

### Backend Setup

1. Start **Apache** and **MySQL** via your XAMPP Control Panel.
2. Navigate to `http://localhost/phpmyadmin/` and create a database named `tour_packages_db`.
3. Import the initial database schema and seed data located at:
   `mobileApp/backend/database.sql`
4. Deploy the API by copying the `mobileApp/backend/` directory into your XAMPP `htdocs` folder (e.g., `C:\xampp\htdocs\backend`).

### Web Application Setup

1. Navigate to the web application directory:
   ```bash
   cd web-app
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### Mobile Application Setup

1. Navigate to the mobile application directory:
   ```bash
   cd mobile-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
   Press `w` to open in a web browser, or scan the generated QR code with the Expo Go application on your physical device.

---

## Project Structure

```text
mobileApp/
├── backend/                  # PHP REST API & MySQL Database
│   ├── api/                  # Core API Endpoints
│   ├── config.php            # Database configuration and PDO setup
│   └── database.sql          # Schema definitions
├── web-app/                  # React Browser Client
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── services/         # API integration and local storage fallback
│   │   └── index.css         # Global styles
└── mobile-app/               # React Native Client
    └── App.js                # Application entry point
```

---

## Key Features

- **Interactive Map Integration**: Native OpenStreetMap tiles with custom markers and programmatic fly-to animations.
- **Dynamic Booking Engine**: Real-time price calculation combining base package rates with hotel tiers and headcount variables.
- **Robust State Management**: Comprehensive booking modification suite allowing real-time edits to tourist details, dates, and accommodation tiers.
- **Graceful Degradation**: Built-in automated local storage fallbacks for immediate testing when the backend API is unreachable.
