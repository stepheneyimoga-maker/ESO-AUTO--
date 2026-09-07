// ============================================================
// ESO AUTO - VEHICLE DATA & CONFIGURATION
// ============================================================
// EDIT HERE: Add, remove, or modify cars, brands, models, etc.
// All vehicle data is in ONE place so you can easily manage listings.
// ============================================================

// ---------- BRANDS & MODELS ----------
// To add a new brand, add an entry here and it will appear everywhere.
const BRANDS_MODELS = {
  "BMW": [
    { name: "BMW X5", category: "luxury", type: "SUV" },
    { name: "BMW X3", category: "luxury", type: "SUV" },
    { name: "BMW X6", category: "luxury", type: "SUV" },
    { name: "BMW M340i", category: "luxury", type: "Sedan" },
    { name: "BMW 3 Series", category: "everyday", type: "Sedan" },
    { name: "BMW M2", category: "luxury", type: "Coupe" },
    { name: "BMW M5", category: "luxury", type: "Sedan" },
    { name: "BMW i7", category: "luxury", type: "Sedan" },
    { name: "BMW iX", category: "luxury", type: "SUV" }
  ],
  "Mercedes-Benz": [
    { name: "Mercedes-Benz GLE", category: "luxury", type: "SUV" },
    { name: "Mercedes-Benz GLC", category: "luxury", type: "SUV" },
    { name: "Mercedes-Benz GLE Coupe", category: "luxury", type: "SUV" },
    { name: "Mercedes-Benz GLE 53 AMG Coupe", category: "luxury", type: "Coupe" },
    { name: "Mercedes-Benz C-Class", category: "luxury", type: "Sedan" },
    { name: "Mercedes-Benz E-Class", category: "luxury", type: "Sedan" },
    { name: "Mercedes-Benz AMG C 63", category: "luxury", type: "Sedan" },
    { name: "Mercedes-Benz AMG GT", category: "luxury", type: "Coupe" },
    { name: "Mercedes-Benz EQS Sedan", category: "luxury", type: "Sedan" },
    { name: "Mercedes-Benz EQE SUV", category: "luxury", type: "SUV" }
  ],
  "Toyota": [
    { name: "Toyota RAV4", category: "everyday", type: "SUV" },
    { name: "Toyota Highlander", category: "everyday", type: "SUV" },
    { name: "Toyota Grand Highlander", category: "everyday", type: "SUV" },
    { name: "Toyota Camry", category: "everyday", type: "Sedan" },
    { name: "Toyota Corolla", category: "everyday", type: "Sedan" },
    { name: "Toyota GR Corolla", category: "luxury", type: "Hatchback" },
    { name: "Toyota GR Supra", category: "luxury", type: "Coupe" },
    { name: "Toyota bZ4X", category: "everyday", type: "SUV" },
    { name: "Toyota Prius", category: "everyday", type: "Hatchback" }
  ],
  "Honda": [
    { name: "Honda Accord", category: "everyday", type: "Sedan" },
    { name: "Honda Civic", category: "everyday", type: "Sedan" },
    { name: "Honda CR-V", category: "everyday", type: "SUV" },
    { name: "Honda Pilot", category: "everyday", type: "SUV" },
    { name: "Honda Odyssey", category: "everyday", type: "MPV" }
  ],
  "Lexus": [
    { name: "Lexus RX 350", category: "luxury", type: "SUV" },
    { name: "Lexus ES 350", category: "luxury", type: "Sedan" },
    { name: "Lexus GX 460", category: "luxury", type: "SUV" },
    { name: "Lexus IS 250", category: "luxury", type: "Sedan" },
    { name: "Lexus LX 570", category: "luxury", type: "SUV" }
  ],
  "Range Rover": [
    { name: "Range Rover Sport", category: "luxury", type: "SUV" },
    { name: "Range Rover Vogue P400", category: "luxury", type: "SUV" },
    { name: "Range Rover Evoque", category: "luxury", type: "SUV" },
    { name: "Range Rover Velar", category: "luxury", type: "SUV" },
    { name: "Range Rover Discovery", category: "luxury", type: "SUV" },
    { name: "Range Rover Autobiography", category: "luxury", type: "SUV" },
    { name: "Range Rover Defender", category: "luxury", type: "SUV" }
  ],
  "Hyundai": [
    { name: "Hyundai Elantra", category: "everyday", type: "Sedan" },
    { name: "Hyundai Sonata", category: "everyday", type: "Sedan" },
    { name: "Hyundai Accent", category: "everyday", type: "Sedan" },
    { name: "Hyundai Tucson", category: "everyday", type: "SUV" },
    { name: "Hyundai Santa Fe", category: "everyday", type: "SUV" }
  ],
  "Nissan": [
    { name: "Nissan Pathfinder", category: "everyday", type: "SUV" },
    { name: "Nissan X-Trail", category: "everyday", type: "SUV" },
    { name: "Nissan Altima", category: "everyday", type: "Sedan" },
    { name: "Nissan Almera", category: "everyday", type: "Sedan" },
    { name: "Nissan Murano", category: "everyday", type: "SUV" },
    { name: "Nissan Rogue", category: "everyday", type: "SUV" },
    { name: "Nissan Navara", category: "everyday", type: "Pickup" },
    { name: "Nissan Primera", category: "everyday", type: "Sedan" }
  ],
  "Kia": [
    { name: "Kia Rio", category: "everyday", type: "Sedan" },
    { name: "Kia Cerato", category: "everyday", type: "Sedan" },
    { name: "Kia Sportage", category: "everyday", type: "SUV" },
    { name: "Kia Sorento", category: "everyday", type: "SUV" },
    { name: "Kia Optima", category: "everyday", type: "Sedan" },
    { name: "Kia Picanto", category: "everyday", type: "Hatchback" },
    { name: "Kia Soul", category: "everyday", type: "Hatchback" }
  ]
};

// ---------- VEHICLE TYPES ----------
const VEHICLE_TYPES = ["SUV", "Sedan", "Coupe", "Hatchback", "Pickup", "MPV", "Electric Vehicle"];

// ---------- CONDITIONS ----------
const CONDITIONS = ["Brand New", "Foreign Used", "Nigerian Used"];

// ---------- SELLER TYPES ----------
const SELLER_TYPES = ["Dealer", "Private Seller"];

// ---------- LOCATIONS ----------
const LOCATIONS = [
  "Lagos", "Abuja", "Port Harcourt", "Ibadan", "Benin City",
  "Kano", "Kaduna", "Enugu", "Calabar", "Jos"
];

// ---------- YEAR RANGE ----------
// Change these to adjust the available year range
const YEAR_MIN = 2014;
const YEAR_MAX = new Date().getFullYear(); // Auto-updates to current year

// ---------- CURRENCY ----------
const CURRENCY_SYMBOL = "₦";

// ---------- WHATSAPP CONFIG ----------
// Change the default country code if needed
const WHATSAPP_BASE_URL = "https://wa.me/";

// ============================================================
// VEHICLE LISTINGS
// ============================================================
// To add a new car, simply copy one entry and fill in the details.
// The website will automatically render it as a listing card.
// ============================================================

const VEHICLES = [
  // --- SAMPLE LISTING 1 ---
  {
    id: 1,
    make: "BMW",
    model: "BMW X5",
    year: 2022,
    price: 45000000,
    condition: "Foreign Used",
    mileage: "32,000 km",
    transmission: "Automatic",
    fuelType: "Diesel",
    bodyType: "SUV",
    category: "luxury",
    description: "Well-maintained BMW X5 in excellent condition. Full service history available. Smooth ride with premium interior features.",
    seller: {
      name: "Adebayo Motors",
      phone: "2348012345678",
      whatsapp: "2348012345678",
      location: "Lagos",
      type: "Dealer"
    },
    // Replace these with real image paths when ready. Max 12 images per listing.
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 2 ---
  {
    id: 2,
    make: "Toyota",
    model: "Toyota Camry",
    year: 2021,
    price: 18000000,
    condition: "Foreign Used",
    mileage: "45,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "everyday",
    description: "Clean Toyota Camry with low mileage. Accident-free, factory-fitted AC, leather seats. A perfect family sedan.",
    seller: {
      name: "Chidi Auto",
      phone: "2348023456789",
      whatsapp: "2348023456789",
      location: "Abuja",
      type: "Dealer"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 3 ---
  {
    id: 3,
    make: "Mercedes-Benz",
    model: "Mercedes-Benz GLE",
    year: 2023,
    price: 72000000,
    condition: "Brand New",
    mileage: "0 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "luxury",
    description: "Brand new Mercedes-Benz GLE. Full warranty. Top specification with AMG line package.",
    seller: {
      name: "Luxe Auto Lagos",
      phone: "2348034567890",
      whatsapp: "2348034567890",
      location: "Lagos",
      type: "Dealer"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 4 ---
  {
    id: 4,
    make: "Honda",
    model: "Honda CR-V",
    year: 2020,
    price: 14500000,
    condition: "Nigerian Used",
    mileage: "78,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "everyday",
    description: "Reliable Honda CR-V with full history. Great for families. Very clean interior and exterior.",
    seller: {
      name: "Emeka Cars",
      phone: "2348045678901",
      whatsapp: "2348045678901",
      location: "Port Harcourt",
      type: "Private Seller"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 5 ---
  {
    id: 5,
    make: "Lexus",
    model: "Lexus RX 350",
    year: 2021,
    price: 38000000,
    condition: "Foreign Used",
    mileage: "28,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "luxury",
    description: "Pristine Lexus RX 350. No scratches, no issues. Imported directly. All documents complete.",
    seller: {
      name: "Premium Autos NG",
      phone: "2348056789012",
      whatsapp: "2348056789012",
      location: "Lagos",
      type: "Dealer"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 6 ---
  {
    id: 6,
    make: "Hyundai",
    model: "Hyundai Tucson",
    year: 2019,
    price: 9800000,
    condition: "Nigerian Used",
    mileage: "95,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "everyday",
    description: "Affordable Hyundai Tucson in good running condition. AC working perfectly, neat interior.",
    seller: {
      name: "Bola Auto Shop",
      phone: "2348067890123",
      whatsapp: "2348067890123",
      location: "Ibadan",
      type: "Private Seller"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 7 ---
  {
    id: 7,
    make: "Mercedes-Benz",
    model: "Mercedes-Benz AMG GT",
    year: 2023,
    price: 120000000,
    condition: "Brand New",
    mileage: "0 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Coupe",
    category: "luxury",
    description: "Brand new Mercedes-AMG GT. The ultimate performance machine. Full AMG package.",
    seller: {
      name: "Luxe Auto Lagos",
      phone: "2348034567890",
      whatsapp: "2348034567890",
      location: "Lagos",
      type: "Dealer"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 8 ---
  {
    id: 8,
    make: "Toyota",
    model: "Toyota Corolla",
    year: 2022,
    price: 12000000,
    condition: "Foreign Used",
    mileage: "15,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "everyday",
    description: "Very clean Toyota Corolla. Great for daily commuting and excellent value for money.",
    seller: {
      name: "Kemi Autos",
      phone: "2348078901234",
      whatsapp: "2348078901234",
      location: "Abuja",
      type: "Private Seller"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 9 ---
  {
    id: 9,
    make: "Nissan",
    model: "Nissan Pathfinder",
    year: 2020,
    price: 16000000,
    condition: "Foreign Used",
    mileage: "55,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "everyday",
    description: "Spacious Nissan Pathfinder. Great for family trips. Well-maintained with clean title.",
    seller: {
      name: "Dan Auto Palace",
      phone: "2348089012345",
      whatsapp: "2348089012345",
      location: "Kano",
      type: "Dealer"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 10 ---
  {
    id: 10,
    make: "BMW",
    model: "BMW M5",
    year: 2022,
    price: 85000000,
    condition: "Foreign Used",
    mileage: "12,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "luxury",
    description: "Powerful BMW M5 with Competition Package. Very low mileage. A driver's dream.",
    seller: {
      name: "Adebayo Motors",
      phone: "2348012345678",
      whatsapp: "2348012345678",
      location: "Lagos",
      type: "Dealer"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 11 ---
  {
    id: 11,
    make: "Kia",
    model: "Kia Sportage",
    year: 2021,
    price: 11500000,
    condition: "Nigerian Used",
    mileage: "62,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "everyday",
    description: "Neat Kia Sportage with full options. Sunroof, leather seats, reverse camera.",
    seller: {
      name: "Femi Car Deals",
      phone: "2348090123456",
      whatsapp: "2348090123456",
      location: "Lagos",
      type: "Dealer"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 12 ---
  {
    id: 12,
    make: "Lexus",
    model: "Lexus LX 570",
    year: 2021,
    price: 95000000,
    condition: "Foreign Used",
    mileage: "18,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "luxury",
    description: "Immaculate Lexus LX 570. Fully loaded. The ultimate luxury SUV for the discerning buyer.",
    seller: {
      name: "Premium Autos NG",
      phone: "2348056789012",
      whatsapp: "2348056789012",
      location: "Lagos",
      type: "Dealer"
    },
    images: ['', '', '', '', '', '', '', '', '', '', '', '']
  },

  // --- SAMPLE LISTING 13 ---
  {
    id: 13,
    featured: true,
    make: "Mercedes-Benz",
    model: "Mercedes-Benz GLE 53 AMG Coupe",
    year: 2023,
    price: 139500000,
    condition: "Foreign Used",
    mileage: "18,000 km",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Coupe",
    category: "luxury",
    description: "Top Tier Deal. Foreign used Mercedes-Benz GLE 53 AMG Coupe with duty paid and accident-free. A premium performance SUV with luxurious interior and powerful AMG performance.",
    seller: {
      name: "TopTier Autos",
      phone: "09012931337",
      whatsapp: "2349012931337",
      location: "Lagos",
      type: "Dealer"
    },
    images: [
      'images/Toptire autos/GLE 2023/Mercedes benz GLE53 AMG cope (TopTier Autos)- front side.jpeg',
      'images/Toptire autos/GLE 2023/Mercedes benz GLE53 AMG cope (TopTier Autos)- front view.jpeg',
      'images/Toptire autos/GLE 2023/Mercedes benz GLE53 AMG cope (TopTier Autos)- front sit.jpeg',
      'images/Toptire autos/GLE 2023/WhatsApp Image 2026-08-31 at 16.21.50.jpeg',
      'images/Toptire autos/GLE 2023/Mercedes benz GLE53 AMG cope (TopTier Autos)- interior.jpeg',
      'images/Toptire autos/GLE 2023/Mercedes benz GLE53 AMG cope (TopTier Autos)- boot.jpeg',
      'images/Toptire autos/GLE 2023/Mercedes benz GLE53 AMG cope (TopTier Autos)- boot slanted.jpeg',
      'images/Toptire autos/GLE 2023/Mercedes benz GLE53 AMG cope (TopTier Autos)- back sit.jpeg',
      '', '', ''
    ]
  },

  // --- SAMPLE LISTING 14 ---
  {
    id: 14,
    make: "Range Rover",
    model: "Range Rover Sport",
    year: 2024,
    price: 165000000,
    condition: "Foreign Used",
    mileage: "Fresh import",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "luxury",
    description: "Top Tier Deal. Foreign used Range Rover Sport just landed with duty paid. Premium SUV in excellent condition with luxury finish and strong road presence.",
    seller: {
      name: "TopTier Autos",
      phone: "09012931337",
      whatsapp: "2349012931337",
      location: "Lagos",
      type: "Dealer"
    },
    images: [
      'images/Toptire autos/Range rover sport 2024 (toptire autos)/Range rover sport 2024 (toptire autos)- front side.jpeg',
      'images/Toptire autos/Range rover sport 2024 (toptire autos)/Range rover sport 2024 (toptire autos)- front.jpeg',
      'images/Toptire autos/Range rover sport 2024 (toptire autos)/Range rover sport 2024 (toptire autos)- front sit.jpeg',
      'images/Toptire autos/Range rover sport 2024 (toptire autos)/Range rover sport 2024 (toptire autos)- boot.jpeg',
      'images/Toptire autos/Range rover sport 2024 (toptire autos)/Range rover sport 2024 (toptire autos)- boot left.jpeg',
      'images/Toptire autos/Range rover sport 2024 (toptire autos)/Range rover sport 2024 (toptire autos)- boot right.jpeg',
      'images/Toptire autos/Range rover sport 2024 (toptire autos)/Range rover sport 2024 (toptire autos)- back sit.jpeg',
      'images/Toptire autos/Range rover sport 2024 (toptire autos)/Range rover sport 2024 (toptire autos)- stearing weel.jpeg',
      '', '', '', ''
    ]
  },

  // --- SAMPLE LISTING 15 ---
  {
    id: 15,
    make: "Range Rover",
    model: "Range Rover Vogue P400",
    year: 2024,
    price: 275000000,
    condition: "Foreign Used",
    mileage: "Fresh import",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "luxury",
    description: "Top Tier Deal. Foreign used Range Rover Vogue P400 just landed with duty paid. Packed with ambient lights, suction doors, massage seats, and HUD for a premium luxury drive.",
    seller: {
      name: "TopTier Autos",
      phone: "09012931337",
      whatsapp: "2349012931337",
      location: "Lagos",
      type: "Dealer"
    },
    images: [
      'images/Toptire autos/Range rover vougue p400 2024 (toptire autos)/Range rover vougue p400 2024 (toptire autos)- front side.jpeg',
      'images/Toptire autos/Range rover vougue p400 2024 (toptire autos)/Range rover vougue p400 2024 (toptire autos)- front.jpeg',
      'images/Toptire autos/Range rover vougue p400 2024 (toptire autos)/Range rover vougue p400 2024 (toptire autos)- front sit.jpeg',
      'images/Toptire autos/Range rover vougue p400 2024 (toptire autos)/Range rover vougue p400 2024 (toptire autos)- boot.jpeg',
      'images/Toptire autos/Range rover vougue p400 2024 (toptire autos)/Range rover vougue p400 2024 (toptire autos)- boot left.jpeg',
      'images/Toptire autos/Range rover vougue p400 2024 (toptire autos)/Range rover vougue p400 2024 (toptire autos)- boot right.jpeg',
      'images/Toptire autos/Range rover vougue p400 2024 (toptire autos)/Range rover vougue p400 2024 (toptire autos)- back sit .jpeg',
      'images/Toptire autos/Range rover vougue p400 2024 (toptire autos)/Range rover vougue p400 2024 (toptire autos)- steairing weel.jpeg',
      '', '', '', ''
    ]
  },

  // --- CAMRY SE LISTING ---
  {
    id: 16,
    make: "Toyota",
    model: "Toyota Camry",
    year: 2013,
    price: 13800000,
    condition: "Foreign Used",
    mileage: "199,256 miles",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "everyday",
    description: "Clean, sharp and ready to hit the road. SE trim | Excellent condition | Smooth drive.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — FRONT.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — Front side.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — front sit.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — dashboard.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — engine.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — boot.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — backsit left.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — backsit right.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — back side.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — millage.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — steering wheel.jpeg',
      'images/CHI autos/2013 TOYOTA CAMRY SE (CHI AUTOS)/2013 TOYOTA CAMRY SE — VIN.jpeg'
    ]
  },

  // --- RX350 LISTING ---
  {
    id: 17,
    make: "Lexus",
    model: "Lexus RX 350",
    year: 2016,
    price: 39000000,
    condition: "Foreign Used",
    mileage: "89,703 miles",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "SUV",
    category: "luxury",
    description: "Luxury. Power. Comfort. Class. A clean RX350 built for those who appreciate premium driving.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- front side.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- front.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- dashboard.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- engine.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- boot.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- back sit.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- back sit left.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- back sit right.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- steering wheel.jpeg',
      'images/CHI autos/2016 LEXUS RX350 (CHI AUTOS) - Copy/2016 LEXUS RX350 (CHI AUTOS)- millage.jpeg',
      '', ''
    ]
  },

  // --- C300 LISTING ---
  {
    id: 18,
    make: "Mercedes-Benz",
    model: "Mercedes-Benz C-Class",
    year: 2024,
    price: 88000000,
    condition: "Foreign Used",
    mileage: "18,492 miles",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "luxury",
    description: "Luxury, class and performance in one package. Clean 2024 C300, direct Belgium, neatly maintained and ready for a new owner.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- front.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- front side.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- front sit.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- dashboard.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- engine.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- boot.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- back sit.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- back side.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- steering wheel.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- millage.jpeg',
      'images/CHI autos/2024 MERCEDES-BENZ C300 (chi autos)/2024 MERCEDES-BENZ C300 (chi autos)- VIN.jpeg',
      ''
    ]
  },

  // --- 2015 C300 LISTING ---
  {
    id: 19,
    make: "Mercedes-Benz",
    model: "Mercedes-Benz C-Class",
    year: 2015,
    price: 22500000,
    condition: "Foreign Used",
    mileage: "162,320 miles",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "luxury",
    description: "Clean and sharp 2015 Mercedes-Benz C300. Direct Belgium, in excellent condition, with luxury, comfort and performance in one package. Available for inspection in Gwarinpa, Abuja.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Gwarinpa, Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2015 Mercedes-Benz C300/2015 mercedes-benz c300- front side view .jpg',
      'images/CHI autos/2015 Mercedes-Benz C300/BLDC4365.JPG',
      'images/CHI autos/2015 Mercedes-Benz C300/KUMC6918.JPG',
      'images/CHI autos/2015 Mercedes-Benz C300/MWZE4144.JPG',
      'images/CHI autos/2015 Mercedes-Benz C300/NYOD3728.JPG',
      'images/CHI autos/2015 Mercedes-Benz C300/QOEW5671.JPG',
      'images/CHI autos/2015 Mercedes-Benz C300/XFVK2840.JPG',
      'images/CHI autos/2015 Mercedes-Benz C300/XPYK0375.JPG'
    ]
  },

  // --- BMW 320i LISTING ---
  {
    id: 20,
    make: "BMW",
    model: "BMW 320i",
    year: 2013,
    price: 13000000,
    condition: "Foreign Used",
    mileage: "Direct Belgium",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "luxury",
    description: "Clean, sharp and ready to go! Direct Belgium import in excellent condition. Serious buyers only.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Gwarinpa, Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2013 BMW 320i/2013 BMW 320i- front side.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.31.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.32.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.33.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.34.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.35.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.36.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.37.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.38.jpeg',
      'images/CHI autos/2013 BMW 320i/WhatsApp Image 2026-09-01 at 22.49.39.jpeg'
    ]
  },

  // --- IS250 LISTING ---
  {
    id: 21,
    make: "Lexus",
    model: "Lexus IS 250",
    year: 2008,
    price: 9000000,
    condition: "Nigerian Used",
    mileage: "140,433 miles",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "luxury",
    description: "Clean & Classy. Nigerian Used Lexus IS250. Clean, sharp and ready to hit the road. Luxury, comfort and performance in one package.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Gwarinpa, Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2008 LEXUS IS250/2008 LEXUS IS250- front side.jpeg',
      'images/CHI autos/2008 LEXUS IS250/WhatsApp Image 2026-09-01 at 22.50.11.jpeg',
      'images/CHI autos/2008 LEXUS IS250/WhatsApp Image 2026-09-01 at 22.50.12.jpeg',
      'images/CHI autos/2008 LEXUS IS250/WhatsApp Image 2026-09-01 at 22.50.13.jpeg',
      'images/CHI autos/2008 LEXUS IS250/WhatsApp Image 2026-09-01 at 22.50.14.jpeg',
      'images/CHI autos/2008 LEXUS IS250/WhatsApp Image 2026-09-01 at 22.50.15.jpeg',
      'images/CHI autos/2008 LEXUS IS250/WhatsApp Image 2026-09-01 at 22.50.16.jpeg',
      'images/CHI autos/2008 LEXUS IS250/WhatsApp Image 2026-09-01 at 22.50.17.jpeg',
      'images/CHI autos/2008 LEXUS IS250/WhatsApp Image 2026-09-01 at 22.50.18.jpeg'
    ]
  },

  // --- CAMARO TRANSFORMER EDITION LISTING ---
  {
    id: 22,
    make: "Chevrolet",
    model: "Chevrolet Camaro Transformer Edition",
    year: 2014,
    price: 20000000,
    condition: "Nigerian Used",
    mileage: "Not provided",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Coupe",
    category: "luxury",
    description: "A true American muscle machine with aggressive looks, powerful performance and a commanding road presence. Neatly used 2014 Chevrolet Camaro Transformer Edition. Price: ₦20,000,000 net. Serious buyers only.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Gwarinpa, Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2014 chevolet camaro/front side .jpg',
      'images/CHI autos/2014 chevolet camaro/BEZO7520.JPG',
      'images/CHI autos/2014 chevolet camaro/DJLT9245.JPG',
      'images/CHI autos/2014 chevolet camaro/FHKN3424.jpg',
      'images/CHI autos/2014 chevolet camaro/FXZM6665.JPG',
      'images/CHI autos/2014 chevolet camaro/GLXO3816.JPG',
      'images/CHI autos/2014 chevolet camaro/JQOF3341.JPG',
      'images/CHI autos/2014 chevolet camaro/NCUR4641.JPG',
      'images/CHI autos/2014 chevolet camaro/side.jpg',
      'images/CHI autos/2014 chevolet camaro/Dash.JPG',
      'images/CHI autos/2014 chevolet camaro/RPES6428.JPG',
      'images/CHI autos/2014 chevolet camaro/SVSO5016.JPG',
      'images/CHI autos/2014 chevolet camaro/WEGZ4259.jpg',
      'images/CHI autos/2014 chevolet camaro/WWKV4800.JPG'
    ]
  },

  // --- 2012 IS250 LISTING ---
  {
    id: 23,
    make: "Lexus",
    model: "Lexus IS 250",
    year: 2012,
    price: 14000000,
    condition: "Foreign Used",
    mileage: "156,074 miles",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "luxury",
    description: "Clean, classy and sporty. This foreign used Lexus IS250 is built for comfort and offers the perfect blend of luxury and performance. Available in Gwarinpa, Abuja.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Gwarinpa, Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2012 lexus IS250/HWOE9991.JPG',
      'images/CHI autos/2012 lexus IS250/HVJI1360.JPG',
      'images/CHI autos/2012 lexus IS250/BLRS1553.JPG',
      'images/CHI autos/2012 lexus IS250/HXZV4770.JPG',
      'images/CHI autos/2012 lexus IS250/KFQF6975.JPG',
      'images/CHI autos/2012 lexus IS250/KQYF6367.JPG',
      'images/CHI autos/2012 lexus IS250/MGJV9500.JPG',
      'images/CHI autos/2012 lexus IS250/PLQL1061.JPG',
      'images/CHI autos/2012 lexus IS250/QTPW5335.JPG',
      'images/CHI autos/2012 lexus IS250/WKKQ2262.JPG'
    ]
  },

  // --- E450 LISTING ---
  {
    id: 19,
    make: "Mercedes-Benz",
    model: "Mercedes-Benz E-Class",
    year: 2019,
    price: 38000000,
    condition: "Foreign Used",
    mileage: "Unregistered",
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Sedan",
    category: "luxury",
    description: "Clean, powerful and luxurious. A proper executive machine with the performance to match.",
    seller: {
      name: "CHI AUTOS",
      phone: "08148334139",
      whatsapp: "2348148334139",
      location: "Abuja",
      type: "Dealer"
    },
    images: [
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/2019 Mercedes-Benz E450 4MATIC (CHI autos)- front.jpeg',
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/2019 Mercedes-Benz E450 4MATIC (CHI autos)- front side.jpeg',
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/2019 Mercedes-Benz E450 4MATIC (CHI autos)- boot.jpeg',
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/2019 Mercedes-Benz E450 4MATIC (CHI autos)- engine.jpeg',
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/2019 Mercedes-Benz E450 4MATIC (CHI autos)- back sit.jpeg',
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/2019 Mercedes-Benz E450 4MATIC (CHI autos)- boot right.jpeg',
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/2019 Mercedes-Benz E450 4MATIC (CHI autos)- stearing weel1.jpeg',
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/2019 Mercedes-Benz E450 4MATIC (CHI autos)- stearing weel2.jpeg',
      'images/CHI autos/2019 Mercedes-Benz E450 4MATIC/VIN.jpeg',
      '', '', ''
    ]
  }
];


// ============================================================
// DEALERS DATA
// ============================================================
const DEALERS = [
  {
    id: 1,
    name: "Adebayo Motors",
    location: "Lagos",
    phone: "2348012345678",
    whatsapp: "2348012345678",
    type: "Dealer",
    verified: false,
    // Replace with real image path when ready
    logo: "",
    carCount: 2
  },
  {
    id: 2,
    name: "Luxe Auto Lagos",
    location: "Lagos",
    phone: "2348034567890",
    whatsapp: "2348034567890",
    type: "Dealer",
    verified: false,
    logo: "",
    carCount: 2
  },
  {
    id: 3,
    name: "Premium Autos NG",
    location: "Lagos",
    phone: "2348056789012",
    whatsapp: "2348056789012",
    type: "Dealer",
    verified: false,
    logo: "",
    carCount: 2
  },
  {
    id: 4,
    name: "Chidi Auto",
    location: "Abuja",
    phone: "2348023456789",
    whatsapp: "2348023456789",
    type: "Dealer",
    verified: false,
    logo: "",
    carCount: 1
  },
  {
    id: 5,
    name: "Dan Auto Palace",
    location: "Kano",
    phone: "2348089012345",
    whatsapp: "2348089012345",
    type: "Dealer",
    verified: false,
    logo: "",
    carCount: 1
  },
  {
    id: 6,
    name: "Femi Car Deals",
    location: "Lagos",
    phone: "2348090123456",
    whatsapp: "2348090123456",
    type: "Dealer",
    verified: false,
    logo: "",
    carCount: 1
  }
];
