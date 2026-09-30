-- =======================================================
-- Philippine Tour Package & Booking Management Database
-- Import this into phpMyAdmin (XAMPP) -> Database: tour_packages_db
-- =======================================================

CREATE DATABASE IF NOT EXISTS `tour_packages_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tour_packages_db`;

-- 1. Tour Packages Table
CREATE TABLE IF NOT EXISTS `packages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `tagline` VARCHAR(255) NOT NULL,
    `province` VARCHAR(100) NOT NULL,
    `region` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `duration_days` INT NOT NULL DEFAULT 3,
    `base_price_php` DECIMAL(10, 2) NOT NULL,
    `rating` DECIMAL(3, 2) NOT NULL DEFAULT 4.9,
    `reviews_count` INT NOT NULL DEFAULT 120,
    `latitude` DECIMAL(10, 6) NOT NULL,
    `longitude` DECIMAL(10, 6) NOT NULL,
    `featured_image` VARCHAR(500) NOT NULL,
    `gallery` JSON NOT NULL,
    `highlights` JSON NOT NULL,
    `inclusions` JSON NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Hotels / Accommodations Table
CREATE TABLE IF NOT EXISTS `accommodations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `package_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `tier` ENUM('Standard Eco-Lodge', 'Deluxe Villa', 'Luxury Island Resort') NOT NULL DEFAULT 'Deluxe Villa',
    `price_per_night_php` DECIMAL(10, 2) NOT NULL,
    `rating` DECIMAL(3, 2) NOT NULL DEFAULT 4.8,
    `image_url` VARCHAR(500) NOT NULL,
    `amenities` JSON NOT NULL,
    FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS `bookings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `booking_code` VARCHAR(20) NOT NULL UNIQUE,
    `package_id` INT NOT NULL,
    `tourist_name` VARCHAR(255) NOT NULL,
    `tourist_email` VARCHAR(255) NOT NULL,
    `tourist_phone` VARCHAR(50) NOT NULL,
    `place` VARCHAR(255) NOT NULL,
    `nights_stayed` INT NOT NULL DEFAULT 3,
    `tourist_quantity` INT NOT NULL DEFAULT 2,
    `hotel_accommodation` VARCHAR(255) NOT NULL,
    `hotel_price_per_night` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `package_base_price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `total_amount_php` DECIMAL(12, 2) NOT NULL,
    `booking_date` DATE NOT NULL,
    `special_requests` TEXT,
    `status` ENUM('Confirmed', 'Pending', 'Cancelled') NOT NULL DEFAULT 'Confirmed',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =======================================================
-- SEED DATA (Top Philippine Destinations)
-- =======================================================

INSERT INTO `packages` (`id`, `title`, `tagline`, `province`, `region`, `description`, `duration_days`, `base_price_php`, `rating`, `reviews_count`, `latitude`, `longitude`, `featured_image`, `gallery`, `highlights`, `inclusions`) VALUES
(
    1,
    'El Nido & Coron Island Sanctuary Expedition',
    'Limestone Karsts, Secret Lagoons & Crystal Waters',
    'Palawan',
    'MIMAROPA',
    'Discover the World\'s Best Island destination. Cruise through the towering karst cliffs of Big Lagoon, swim in the pristine Kayangan Lake, and relax on pristine powder beaches with private boat tours.',
    4,
    14800.00,
    4.96,
    482,
    11.1955,
    119.4124,
    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"]',
    '["Big & Small Lagoon Kayaking", "Kayangan Lake Pristine Swim", "Twin Lagoon Hidden Cave Passage", "Sunset Dinner at Nacpan Beach"]',
    '["Private Outrigger Boat & Captain", "Environmental & Lagoon Permits", "Daily Gourmet Island Buffet Lunch", "Snorkel Gear & Lifevests", "Airport Vans & Transfers"]'
),
(
    2,
    'Boracay White Beach & Sunset Paraw Escapade',
    'Pristine White Sands & Sunset Sailing',
    'Aklan',
    'Western Visayas',
    'Experience the world-renowned 4-kilometer powdery white sand beach, private sunset Paraw sailboat charters, crystal kayak photo shoots, and lively beachfront culinary dining.',
    3,
    9800.00,
    4.91,
    620,
    11.9674,
    121.9248,
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"]',
    '["Station 1 Powder White Sand Walks", "Private Sunset Paraw Sailing", "Crystal Kayak Drone Photography", "Puka Shell Beach Picnic"]',
    '["Caticlan Speedboat & Land Transfers", "Boracay Environmental Fees", "Sunset Paraw Charter Experience", "Free Island Guide & Welcome Cocktails"]'
),
(
    3,
    'Siargao Island Surf & Turquoise Lagoons',
    'Surfing Capital, Coconut Palm Roads & Tidal Pools',
    'Surigao del Norte',
    'Caraga',
    'Ride the famous Cloud 9 swells, cruise through the endless coconut tree highway, swim in emerald Sugba Lagoon, and discover Magpupungko tidal natural infinity pools.',
    4,
    12500.00,
    4.94,
    389,
    9.7877,
    126.1557,
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80"]',
    '["Cloud 9 Boardwalk & Surf Session", "Sugba Lagoon Cliff Diving & SUP", "Magpupungko Natural Tidal Rock Pools", "Coconut Viewpoint & Palm Tree Swing"]',
    '["Private Tri-Island Boat Charter (Guyam, Daku, Naked)", "Surf Instructor & Board Rental (2 Hrs)", "Daily Breakfast & Seafood Boodle Feast", "Motorbike or Van Land Transport"]'
),
(
    4,
    'Bohol & Cebu Wonders: Chocolate Hills & Sardine Run',
    'Tarsiers, River Cruise, Whale Sharks & Waterfalls',
    'Bohol & Cebu',
    'Central Visayas',
    'Unite the best of Central Visayas. Stand before 1,776 Chocolate Hills, cruise the emerald Loboc River, canyon down Kawasan Falls, and swim with millions of sardines in Moalboal.',
    5,
    16500.00,
    4.89,
    315,
    9.8297,
    124.1435,
    'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"]',
    '["Chocolate Hills & Philippine Tarsier Sanctuary", "Loboc River Gourmet Buffet Cruise", "Kawasan Falls Canyoneering Adventure", "Moalboal Sardine Run & Sea Turtle Snorkel"]',
    '["OceanJet Fast Ferry Cebu-Bohol Tickets", "Full Canyoneering Safety Gear & Pro Guides", "All Entrance & Environmental Fees", "Air-conditioned Private Transport throughout"]'
),
(
    5,
    'Batanes Ivatan Heritage & Rolling Hills Expedition',
    'Home of the Winds, Traditional Stone Houses & Cliffs',
    'Batanes',
    'Cagayan Valley',
    'Travel to the northernmost frontier of the Philippines. Experience dramatic ocean cliffs, Basco Lighthouse, Marlboro Hills, Honesty Coffee Shop, and centuries-old Ivatan stone houses.',
    4,
    19200.00,
    4.98,
    210,
    20.4485,
    121.9708,
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"]',
    '["Basco Lighthouse & Marlboro Hills Panoramic Views", "Ivana Traditional Stone House Tour", "Sabtang Island Chamantad-Tinyan Viewpoint", "Honesty Coffee Shop Cultural Experience"]',
    '["Sabtang Island Faluwa Boat Transfer", "Licensed Ivatan Cultural Tour Guide", "Eco-Tourism & Protected Area Fees", "Authentic Ivatan Lunch on Banana Leaves"]'
),
(
    6,
    'Sagada & Banaue Mountain Terraces Retreat',
    'Sea of Clouds, Ancient Rice Terraces & Echo Valley',
    'Mountain Province & Ifugao',
    'Cordillera Administrative Region',
    'Breathe the crisp pine air of the Cordillera mountains. Watch the sunrise over the sea of clouds at Kiltepan Peak, explore the UNESCO Banaue Rice Terraces, and discover the Hanging Coffins.',
    3,
    8900.00,
    4.88,
    195,
    17.0833,
    120.9000,
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"]',
    '["Banaue & Batad UNESCO Rice Terraces Viewpoint", "Marlboro Hills Sea of Clouds Trek", "Echo Valley & Hanging Coffins Historical Tour", "Sumaguing Cave Speleological Exploration"]',
    '["Sagada Environmental Fee & Local Guides", "Cave Lanterns & Safety Equipment", "Roundtrip Mountain Van Transportation", "Sagada Drip Coffee Tasting Experience"]'
);

-- Seed Accommodations
INSERT INTO `accommodations` (`package_id`, `name`, `tier`, `price_per_night_php`, `rating`, `image_url`, `amenities`) VALUES
(1, 'El Nido Cove Eco Resort', 'Standard Eco-Lodge', 2800.00, 4.6, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', '["Free Breakfast", "Beach Access", "Solar Powered", "Wi-Fi"]'),
(1, 'Seda Lio Beachfront Villa', 'Deluxe Villa', 6500.00, 4.9, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', '["Infinity Pool", "Private Balcony", "Spa Services", "Buffet Breakfast", "Airport Shuttle"]'),
(1, 'Cauayan Luxury Private Island Resort', 'Luxury Island Resort', 18500.00, 5.0, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', '["Private Overwater Villa", "Butler Service", "Helipad Access", "Gourmet Dining", "Private Boat"]'),

(2, 'Boracay Ocean Breeze Inn', 'Standard Eco-Lodge', 2200.00, 4.5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', '["Station 2 Access", "Free Breakfast", "Air Conditioned", "Wi-Fi"]'),
(2, 'The Lind Boracay Deluxe Suite', 'Deluxe Villa', 7800.00, 4.9, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', '["Station 1 Beachfront", "Rooftop Infinity Pool", "Gym & Spa", "Sunset Lounge"]'),
(2, 'Shangri-La Boracay Luxury Cliff Villa', 'Luxury Island Resort', 22000.00, 5.0, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', '["Private Cove Beach", "Private Plunge Pool", "Fine Dining", "Speedboat Transfer"]'),

(3, 'Siargao Bamboo Hideaway', 'Standard Eco-Lodge', 2100.00, 4.7, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', '["Surfboard Storage", "Garden Hammocks", "Vegan Cafe", "Wi-Fi"]'),
(3, 'Nay Palad Hideaway Luxury Retreat', 'Luxury Island Resort', 25000.00, 5.0, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', '["All-Inclusive Dining", "Private Lagoon Access", "Yoga Pavilion", "Spa Treatments"]'),

(4, 'Bohol Beach Club Resort', 'Deluxe Villa', 5500.00, 4.8, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', '["Pristine White Beach", "Swimming Pool", "Dive Center", "Seafood Restaurant"]'),

(5, 'Fundacion Pacita Batanes Nature Lodge', 'Deluxe Villa', 8500.00, 4.9, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', '["Panoramic Pacific Ocean View", "Ivatan Art Architecture", "Organic Dining", "Garden Terraces"]'),

(6, 'Sagada Heritage Mountain Inn', 'Standard Eco-Lodge', 1900.00, 4.6, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', '["Pine Wood Fireplace", "Mountain Sunrise View", "Fresh Mountain Breakfast", "Hot Showers"]');

-- Seed Sample Bookings
INSERT INTO `bookings` (`booking_code`, `package_id`, `tourist_name`, `tourist_email`, `tourist_phone`, `place`, `nights_stayed`, `tourist_quantity`, `hotel_accommodation`, `hotel_price_per_night`, `package_base_price`, `total_amount_php`, `booking_date`, `special_requests`, `status`) VALUES
('BK-PH-9821', 1, 'Maria Santos', 'maria.santos@gmail.com', '+63 917 123 4567', 'El Nido & Coron, Palawan', 4, 2, 'Seda Lio Beachfront Villa', 6500.00, 14800.00, 55600.00, '2026-11-15', 'Vegetarian lunch request for island hopping', 'Confirmed'),
('BK-PH-4102', 2, 'Juan Dela Cruz', 'juan.cruz@outlook.com', '+63 928 987 6543', 'Boracay Island, Aklan', 3, 3, 'The Lind Boracay Deluxe Suite', 7800.00, 9800.00, 52800.00, '2026-12-05', 'High floor room facing sunset', 'Confirmed');
