// web-app/src/data/fallbackPackages.js
// Bundled high-fidelity Philippine Tour Package Dataset with real high-res photography and geolocation coordinates

export const INITIAL_PACKAGES = [
  {
    id: 1,
    title: "El Nido & Coron Island Sanctuary Expedition",
    tagline: "Limestone Karsts, Secret Lagoons & Crystal Turquoise Waters",
    province: "Palawan",
    region: "MIMAROPA",
    description: "Discover why Palawan is consistently voted the World's Best Island. Cruise beneath the soaring 250-million-year-old limestone karst cliffs of El Nido's Big Lagoon, dive into the turquoise mirror of Kayangan Lake in Coron, and stroll along pristine powdered sand at Nacpan Beach.",
    duration_days: 4,
    base_price_php: 14800,
    rating: 4.96,
    reviews_count: 482,
    latitude: 11.1955,
    longitude: 119.4124,
    featured_image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Big & Small Lagoon Clear Kayaking",
      "Kayangan Lake & Twin Lagoon Coron Excursion",
      "Secret Beach & Hidden Beach Exploration",
      "Sunset Seafood Barbecue at Nacpan Beach"
    ],
    inclusions: [
      "Private Motorized Outrigger Banca & Captain",
      "All Island Hopping Permits & Eco-Tourism Fees",
      "Daily Chef-Prepared Seafood & Tropical Fruit Buffet",
      "Full Snorkeling Gear, Lifevests & Towels",
      "Van Transfers (Puerto Princesa / El Nido / Coron)"
    ],
    accommodations: [
      {
        id: 101,
        name: "El Nido Cove Eco Lodge",
        tier: "Standard Eco-Lodge",
        price_per_night_php: 2800,
        rating: 4.6,
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        amenities: ["Beachfront Access", "Solar Powered", "Free Native Breakfast", "Wi-Fi"]
      },
      {
        id: 102,
        name: "Seda Lio Beachfront Luxury Villa",
        tier: "Deluxe Villa",
        price_per_night_php: 6500,
        rating: 4.9,
        image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        amenities: ["Infinity Pool", "Balcony Karst View", "Spa & Wellness", "Buffet Breakfast"]
      },
      {
        id: 103,
        name: "Cauayan Luxury Island Resort & Spa",
        tier: "Luxury Island Resort",
        price_per_night_php: 18500,
        rating: 5.0,
        image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        amenities: ["Overwater Water Villa", "Personal Butler", "Helipad Access", "Private Speedboat"]
      }
    ]
  },
  {
    id: 2,
    title: "Boracay White Beach & Sunset Paraw Escapade",
    tagline: "Ultra-Fine Powder White Sand & Golden Paraw Sunsets",
    province: "Aklan",
    region: "Western Visayas",
    description: "Relax on Boracay's famous Station 1 and 2 powdery shores. Glide across the Sulu Sea on an authentic wooden Paraw outrigger at golden sunset, experience crystal kayak photography, and indulge in beachfront dining.",
    duration_days: 3,
    base_price_php: 9800,
    rating: 4.91,
    reviews_count: 620,
    latitude: 11.9674,
    longitude: 121.9248,
    featured_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Station 1 Sugar White Powder Sand Strolls",
      "Private Sunset Paraw Sailboat Cruising",
      "Clear Glass Crystal Kayak Aerial Photography",
      "Puka Shell Beach Shell Hunting & Cocktails"
    ],
    inclusions: [
      "Caticlan Airport Speedboat Jet Transfer",
      "Boracay Island Environmental & Port Fees",
      "1-Hour Private Sunset Paraw Charter",
      "Complimentary Sunset Welcome Drinks & Island Guide"
    ],
    accommodations: [
      {
        id: 201,
        name: "Boracay Breeze Beach Inn",
        tier: "Standard Eco-Lodge",
        price_per_night_php: 2200,
        rating: 4.5,
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        amenities: ["Station 2 Prime Access", "Air Conditioned", "Daily Breakfast", "Fast Wi-Fi"]
      },
      {
        id: 202,
        name: "The Lind Boracay Deluxe Suite",
        tier: "Deluxe Villa",
        price_per_night_php: 7800,
        rating: 4.9,
        image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        amenities: ["Station 1 Beachfront", "Rooftop Glass Pool", "Sunset Deck", "Luxury Bathrobes"]
      },
      {
        id: 203,
        name: "Shangri-La Boracay Cliffside Sanctuary",
        tier: "Luxury Island Resort",
        price_per_night_php: 22000,
        rating: 5.0,
        image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        amenities: ["Private Cove & Beach", "Plunge Pool", "Speedboat Arrival", "CHI Spa"]
      }
    ]
  },
  {
    id: 3,
    title: "Siargao Island Surf & Turquoise Lagoons",
    tagline: "Cloud 9 Boardwalk, Coconut Tree Highways & Secret Rock Pools",
    province: "Surigao del Norte",
    region: "Caraga",
    description: "Immerse yourself in the Philippine surfing capital and tropical bohemian vibe. Catch world-class swells at Cloud 9, cruise the scenic palm-lined highways, cliff jump in Sugba Lagoon, and float in Magpupungko's tidal rock pools.",
    duration_days: 4,
    base_price_php: 12500,
    rating: 4.94,
    reviews_count: 389,
    latitude: 9.7877,
    longitude: 126.1557,
    featured_image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Cloud 9 Boardwalk Sunrise & Surf Lesson",
      "Sugba Lagoon Stand-Up Paddleboard & Diving",
      "Magpupungko Natural Tidal Rock Pools",
      "Maasin River Palm Tree Rope Swing"
    ],
    inclusions: [
      "Tri-Island Boat Charter (Guyam, Daku, Naked Island)",
      "Dedicated ISA-Certified Surf Coach (2 Hours)",
      "Daily Tropical Breakfast & Seafood Boodle Feast",
      "Airport Transfers & Motorbike Rental"
    ],
    accommodations: [
      {
        id: 301,
        name: "Siargao Bamboo Hideaway",
        tier: "Standard Eco-Lodge",
        price_per_night_php: 2100,
        rating: 4.7,
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        amenities: ["Surf Rack", "Palm Garden", "Vegan Smoothie Bar", "High-speed Wi-Fi"]
      },
      {
        id: 302,
        name: "Nay Palad Hideaway Luxury Villa",
        tier: "Luxury Island Resort",
        price_per_night_php: 25000,
        rating: 5.0,
        image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        amenities: ["All-Inclusive Fine Dining", "Private Lagoon Access", "Outdoor Cinema", "Ayurvedic Spa"]
      }
    ]
  },
  {
    id: 4,
    title: "Bohol & Cebu Wonders: Chocolate Hills & Sardine Run",
    tagline: "Tarsiers, Loboc River, Kawasan Falls & Millions of Sardines",
    province: "Bohol & Cebu",
    region: "Central Visayas",
    description: "Witness the iconic 1,776 Chocolate Hills and the world's smallest primate, the Philippine Tarsier. Canyoneer through turquoise waterfalls in Kawasan and snorkel amidst millions of shimmering sardines in Moalboal.",
    duration_days: 5,
    base_price_php: 16500,
    rating: 4.89,
    reviews_count: 315,
    latitude: 9.8297,
    longitude: 124.1435,
    featured_image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Chocolate Hills Panoramic Observation Deck",
      "Loboc Floating Restaurant River Buffet Cruise",
      "Kawasan Falls Multi-Tier Canyoneering",
      "Moalboal Sardine Run & Sea Turtle Marine Sanctuary"
    ],
    inclusions: [
      "OceanJet Fast Ferry Cebu-Bohol Roundtrip Tickets",
      "Full Canyoneering Safety Equipment & Certified Guide",
      "All Municipal Entrance and Conservation Passes",
      "Private Air-Conditioned Tourist Van"
    ],
    accommodations: [
      {
        id: 401,
        name: "Bohol Beach Club Resort",
        tier: "Deluxe Villa",
        price_per_night_php: 5500,
        rating: 4.8,
        image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        amenities: ["Private White Sand Coast", "Oceanfront Pool", "PADI Dive Center", "Seafood Bistro"]
      }
    ]
  },
  {
    id: 5,
    title: "Batanes Ivatan Heritage & Rolling Hills Expedition",
    tagline: "The Home of the Winds, Dramatic Cliffs & Traditional Stone Castles",
    province: "Batanes",
    region: "Cagayan Valley",
    description: "Fly to the breathtaking northernmost frontier. Marvel at endless green pasture hills plunging into the roaring Pacific and South China seas, Basco Lighthouse, and century-old stone houses that withstand the strongest storms.",
    duration_days: 4,
    base_price_php: 19200,
    rating: 4.98,
    reviews_count: 210,
    latitude: 20.4485,
    longitude: 121.9708,
    featured_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Basco Lighthouse & Marlboro Rolling Hills",
      "Sabtang Island Chamantad-Tinyan Viewpoint",
      "Ivana Ancient Stone Houses & Honesty Cafe",
      "Tayid Lighthouse Sunset over the Pacific"
    ],
    inclusions: [
      "Sabtang Island Roundtrip Faluwa Boat Passage",
      "Licensed Ivatan Cultural Heritage Tour Guide",
      "Protected Area & Eco-Tourism Fees",
      "Traditional Ivatan Feast Served on Breadfruit Leaves"
    ],
    accommodations: [
      {
        id: 501,
        name: "Fundacion Pacita Batanes Nature Lodge",
        tier: "Deluxe Villa",
        price_per_night_php: 8500,
        rating: 4.9,
        image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        amenities: ["Panoramic Ocean Clifftop", "Ivatan Art Galleries", "Organic Farm-to-Table", "Terraces"]
      }
    ]
  },
  {
    id: 6,
    title: "Sagada & Banaue Mountain Terraces Retreat",
    tagline: "Sea of Clouds, Ancient Rice Terraces & Echo Valley Caves",
    province: "Mountain Province & Ifugao",
    region: "Cordillera Administrative Region",
    description: "Climb up into the misty pine-scented Cordillera highlands. Gaze at the 2,000-year-old UNESCO World Heritage Banaue Rice Terraces carved by ancient Ifugao ancestors, witness the sea of clouds at Kiltepan, and explore mystical caves.",
    duration_days: 3,
    base_price_php: 8900,
    rating: 4.88,
    reviews_count: 195,
    latitude: 17.0833,
    longitude: 120.9000,
    featured_image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Banaue & Batad UNESCO Rice Terraces Amphitheater",
      "Kiltepan Peak Sunrise Sea of Clouds",
      "Echo Valley & Ancient Hanging Coffins",
      "Sumaguing Cave Lantern Spelunking"
    ],
    inclusions: [
      "Sagada Mountaineering Environmental Fees & Permits",
      "Local Cave Master & Speleological Gear",
      "Private Roundtrip Mountain Van",
      "Artisan Sagada Arabica Coffee Tasting Session"
    ],
    accommodations: [
      {
        id: 601,
        name: "Sagada Heritage Mountain Lodge",
        tier: "Standard Eco-Lodge",
        price_per_night_php: 1900,
        rating: 4.6,
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        amenities: ["Pine Wood Fireplace", "Mountain Sunrise Balcony", "Hot Showers", "Free Coffee"]
      }
    ]
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 1,
    booking_code: "BK-PH-9821",
    package_id: 1,
    tourist_name: "Maria Santos",
    tourist_email: "maria.santos@gmail.com",
    tourist_phone: "+63 917 123 4567",
    place: "El Nido & Coron, Palawan",
    nights_stayed: 4,
    tourist_quantity: 2,
    hotel_accommodation: "Seda Lio Beachfront Luxury Villa",
    hotel_price_per_night: 6500,
    package_base_price: 14800,
    total_amount_php: 55600,
    booking_date: "2026-11-15",
    special_requests: "Vegetarian lunch during island hopping and kayak rental prepared.",
    status: "Confirmed",
    package_title: "El Nido & Coron Island Sanctuary Expedition",
    package_image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    booking_code: "BK-PH-4102",
    package_id: 2,
    tourist_name: "Juan Dela Cruz",
    tourist_email: "juan.cruz@outlook.com",
    tourist_phone: "+63 928 987 6543",
    place: "Boracay Island, Aklan",
    nights_stayed: 3,
    tourist_quantity: 3,
    hotel_accommodation: "The Lind Boracay Deluxe Suite",
    hotel_price_per_night: 7800,
    package_base_price: 9800,
    total_amount_php: 52800,
    booking_date: "2026-12-05",
    special_requests: "High floor room facing sunset view.",
    status: "Confirmed",
    package_title: "Boracay White Beach & Sunset Paraw Escapade",
    package_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  }
];
