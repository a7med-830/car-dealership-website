// WHAT: This is a shared data file for all car inventory data.
// WHY:  Instead of copy-pasting the car array in every page, we define it once here.
//       Both the inventory list page and the detail page import from this file.
//       In a real project, this data would come from a database or API instead.

/* ============================================================
   CAR TYPE DEFINITION
   WHAT: This tells TypeScript the exact shape/structure of a car object.
   WHY:  TypeScript types catch mistakes early — if you forget a field
         or spell something wrong, TypeScript will warn you immediately.
   ============================================================ */
export type Car = {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;         // Numeric price in USD (for filtering/sorting)
  body: string;          // Body style: Sedan, SUV, Coupe, etc.
  color: string;         // Exterior color
  mileage: string;       // "New" or "12,000" — displayed as-is
  mpg: string;           // Fuel economy or "Electric"
  image: string;         // URL to main car photo (used on inventory card)
  // WHAT: Extra photos shown in the thumbnail gallery on the detail page.
  // EDIT THIS: Replace these URLs with your own photos.
  //   - To use a file from your computer: put it in the public/ folder,
  //     then write "/your-file-name.jpg" as the URL.
  //   - To use an online photo: paste the full URL (https://...).
  images: string[];      // Array of photo URLs — first one = main hero image
  badge: string;         // Label shown on the card: "New Arrival", "Certified", etc.
  trim: string;          // Trim level: "Sport", "Elite", etc.
  // Extended fields shown on the detail page:
  engine: string;        // Engine description
  transmission: string;  // "Automatic" or "Manual"
  drivetrain: string;    // "AWD", "FWD", "RWD", "4WD"
  seats: number;         // Number of seats
  description: string;   // A paragraph description shown on the detail page
  features: string[];    // List of key features/options
};

/* ============================================================
   ALL CARS DATA
   WHAT: The full inventory. Each object is one car.
   EDIT THIS: Add, remove, or change cars. Every field must match the Car type above.
   ============================================================ */
export const allCars: Car[] = [
  {
    id: 1,
    name: "Aero GT",
    make: "UniDrive",
    model: "Aero GT",
    year: 2024,
    price: 48990,
    body: "Sedan",
    color: "Black",
    mileage: "New",
    mpg: "28 city / 35 hwy",
    image: "https://placehold.co/1200x700/111111/ffffff?text=Aero+GT",
    // EDIT THIS: Replace these 4 URLs with your own photos for the Aero GT.
    // Example using a file from your computer:
    //   images: ["/cars/aero-gt-front.jpg", "/cars/aero-gt-side.jpg", ...]
    images: [
      "https://placehold.co/1200x700/111111/ffffff?text=Aero+GT+—+Front",
      "https://placehold.co/1200x700/222222/ffffff?text=Aero+GT+—+Side",
      "https://placehold.co/1200x700/333333/ffffff?text=Aero+GT+—+Interior",
      "https://placehold.co/1200x700/444444/ffffff?text=Aero+GT+—+Rear",
    ],
    badge: "New Arrival",
    trim: "Premium",
    engine: "3.0L Twin-Turbo V6",
    transmission: "8-Speed Automatic",
    drivetrain: "AWD",
    seats: 5,
    description: "The Aero GT Premium is the perfect blend of executive comfort and spirited performance. With a twin-turbocharged V6 engine and all-wheel drive, it delivers an exhilarating drive every time you get behind the wheel.",
    features: ["Panoramic Sunroof", "Heated & Ventilated Seats", "12-inch Touchscreen", "Wireless CarPlay", "360° Camera", "Adaptive Cruise Control", "Lane Keep Assist", "20\" Alloy Wheels"],
  },
  {
    id: 2,
    name: "Zenith X",
    make: "UniDrive",
    model: "Zenith X",
    year: 2024,
    price: 62500,
    body: "SUV",
    color: "White",
    mileage: "New",
    mpg: "24 city / 30 hwy",
    image: "https://placehold.co/1200x700/111111/ffffff?text=Zenith+X",
    images: [
      "https://placehold.co/1200x700/111111/ffffff?text=Zenith+X+—+Front",
      "https://placehold.co/1200x700/222222/ffffff?text=Zenith+X+—+Side",
      "https://placehold.co/1200x700/333333/ffffff?text=Zenith+X+—+Interior",
      "https://placehold.co/1200x700/444444/ffffff?text=Zenith+X+—+Rear",
    ],
    badge: "Best Seller",
    trim: "Elite",
    engine: "3.5L Supercharged V6",
    transmission: "9-Speed Automatic",
    drivetrain: "4WD",
    seats: 7,
    description: "UniDrive's flagship SUV, the Zenith X Elite, commands the road with a supercharged V6 and three rows of luxury seating. Built for families who refuse to compromise between space and style.",
    features: ["Third-Row Seating", "Heads-Up Display", "Bose Premium Audio", "Power Folding Seats", "Air Suspension", "Trailer Hitch Prep", "Wireless Charging Pad", "21\" Black Wheels"],
  },
  {
    id: 3,
    name: "Nova Sport",
    make: "UniDrive",
    model: "Nova Sport",
    year: 2023,
    price: 35750,
    body: "Coupe",
    color: "Silver",
    mileage: "8,200",
    mpg: "26 city / 34 hwy",
    image: "https://placehold.co/1200x700/333333/ffffff?text=Nova+Sport",
    images: [
      "https://placehold.co/1200x700/333333/ffffff?text=Nova+Sport+—+Front",
      "https://placehold.co/1200x700/444444/ffffff?text=Nova+Sport+—+Side",
      "https://placehold.co/1200x700/555555/ffffff?text=Nova+Sport+—+Interior",
      "https://placehold.co/1200x700/666666/ffffff?text=Nova+Sport+—+Rear",
    ],
    badge: "Certified",
    trim: "Sport",
    engine: "2.0L Turbocharged 4-Cylinder",
    transmission: "7-Speed Dual-Clutch",
    drivetrain: "RWD",
    seats: 4,
    description: "The Nova Sport delivers thrilling rear-wheel-drive performance with a razor-sharp dual-clutch transmission. This certified pre-owned example is in excellent condition with a full service history.",
    features: ["Sport-Tuned Suspension", "Brembo Brakes", "Carbon Fibre Trim", "Bucket Seats", "Launch Control", "Performance Exhaust", "19\" Sport Wheels", "Digital Instrument Cluster"],
  },
  {
    id: 4,
    name: "Titan EV",
    make: "UniDrive",
    model: "Titan EV",
    year: 2024,
    price: 54990,
    body: "SUV",
    color: "Blue",
    mileage: "New",
    mpg: "Electric",
    image: "https://placehold.co/1200x700/111111/ffffff?text=Titan+EV",
    images: [
      "https://placehold.co/1200x700/111111/ffffff?text=Titan+EV+—+Front",
      "https://placehold.co/1200x700/222222/ffffff?text=Titan+EV+—+Side",
      "https://placehold.co/1200x700/333333/ffffff?text=Titan+EV+—+Interior",
      "https://placehold.co/1200x700/444444/ffffff?text=Titan+EV+—+Rear",
    ],
    badge: "Electric",
    trim: "EV Plus",
    engine: "Dual Electric Motor — 450 hp",
    transmission: "Single-Speed Direct Drive",
    drivetrain: "AWD",
    seats: 5,
    description: "The all-electric Titan EV Plus is our most advanced vehicle yet. With a 340-mile range, 450 horsepower, and instant torque, it redefines what an SUV can be — with zero emissions.",
    features: ["340-Mile Range", "Fast Charging (80% in 25 min)", "Autopilot Ready", "Over-The-Air Updates", "Glass Roof", "Ambient Interior Lighting", "15\" Centre Display", "Vehicle-to-Home Power"],
  },
  {
    id: 5,
    name: "Aero GT",
    make: "BMW",
    model: "Aero GT",
    year: 2023,
    price: 42000,
    body: "Sedan",
    color: "White",
    mileage: "15,400",
    mpg: "28 city / 35 hwy",
    image: "https://placehold.co/1200x700/333333/ffffff?text=Aero+GT+23",
    images: [
      "https://placehold.co/1200x700/333333/ffffff?text=Aero+GT+23+—+Front",
      "https://placehold.co/1200x700/444444/ffffff?text=Aero+GT+23+—+Side",
      "https://placehold.co/1200x700/555555/ffffff?text=Aero+GT+23+—+Interior",
      "https://placehold.co/1200x700/666666/ffffff?text=Aero+GT+23+—+Rear",
    ],
    badge: "Certified",
    trim: "Base",
    engine: "2.0L Turbocharged 4-Cylinder",
    transmission: "8-Speed Automatic",
    drivetrain: "FWD",
    seats: 5,
    description: "A lightly used Aero GT Base in pristine white. Certified pre-owned and backed by our 2-year / 24,000-mile powertrain warranty. A smart entry into the Aero GT family.",
    features: ["Apple CarPlay & Android Auto", "Heated Front Seats", "LED Headlights", "Reversing Camera", "Blind Spot Alert", "Keyless Entry", "18\" Alloy Wheels", "Dual-Zone Climate"],
  },
  {
    id: 6,
    name: "Crest Wagon",
    make: "Lexus",
    model: "Crest",
    year: 2024,
    price: 39500,
    body: "Wagon",
    color: "Gray",
    mileage: "New",
    mpg: "27 city / 33 hwy",
    image: "https://placehold.co/1200x700/111111/ffffff?text=Crest+Wagon",
    images: [
      "https://placehold.co/1200x700/111111/ffffff?text=Crest+Wagon+—+Front",
      "https://placehold.co/1200x700/222222/ffffff?text=Crest+Wagon+—+Side",
      "https://placehold.co/1200x700/333333/ffffff?text=Crest+Wagon+—+Interior",
      "https://placehold.co/1200x700/444444/ffffff?text=Crest+Wagon+—+Rear",
    ],
    badge: "New Arrival",
    trim: "Comfort",
    engine: "2.5L Naturally Aspirated 4-Cylinder",
    transmission: "CVT Automatic",
    drivetrain: "AWD",
    seats: 5,
    description: "The Crest Wagon Comfort is the ultimate family hauler — practical, spacious, and surprisingly elegant. AWD and a massive boot make it the ideal everyday companion in any weather.",
    features: ["Power Tailgate", "Roof Rails", "Rear Entertainment System", "Tri-Zone Climate", "72/28 Split Rear Seats", "Cargo Divider", "Smart Park Assist", "Family Safety Pack"],
  },
  {
    id: 7,
    name: "Raptor Truck",
    make: "Porsche",
    model: "Raptor",
    year: 2024,
    price: 58000,
    body: "Truck",
    color: "Black",
    mileage: "New",
    mpg: "20 city / 26 hwy",
    image: "https://placehold.co/1200x700/111111/ffffff?text=Raptor+Truck",
    images: [
      "https://placehold.co/1200x700/111111/ffffff?text=Raptor+—+Front",
      "https://placehold.co/1200x700/222222/ffffff?text=Raptor+—+Side",
      "https://placehold.co/1200x700/333333/ffffff?text=Raptor+—+Interior",
      "https://placehold.co/1200x700/444444/ffffff?text=Raptor+—+Rear",
    ],
    badge: "New Arrival",
    trim: "Off-Road",
    engine: "3.5L EcoBoost V6 — 400 hp",
    transmission: "10-Speed Automatic",
    drivetrain: "4WD",
    seats: 5,
    description: "The Raptor Truck Off-Road is built for those who take the road less travelled. Fox Racing shocks, skid plates, and a powerful EcoBoost V6 mean there is nowhere this truck cannot go.",
    features: ["Fox Racing Shocks", "Skid Plates", "Locking Rear Differential", "Off-Road Terrain Monitor", "36\" All-Terrain Tyres", "Tow Package (up to 11,000 lbs)", "Spray-In Bed Liner", "Heated Steering Wheel"],
  },
  {
    id: 8,
    name: "Nova Sport",
    make: "Audi",
    model: "Nova Sport",
    year: 2024,
    price: 37800,
    body: "Coupe",
    color: "Red",
    mileage: "New",
    mpg: "26 city / 34 hwy",
    image: "https://placehold.co/1200x700/111111/ffffff?text=Nova+Sport+24",
    images: [
      "https://placehold.co/1200x700/111111/ffffff?text=Nova+Sport+24+—+Front",
      "https://placehold.co/1200x700/222222/ffffff?text=Nova+Sport+24+—+Side",
      "https://placehold.co/1200x700/333333/ffffff?text=Nova+Sport+24+—+Interior",
      "https://placehold.co/1200x700/444444/ffffff?text=Nova+Sport+24+—+Rear",
    ],
    badge: "New Arrival",
    trim: "Sport",
    engine: "2.0L Turbocharged 4-Cylinder",
    transmission: "7-Speed Dual-Clutch",
    drivetrain: "RWD",
    seats: 4,
    description: "Brand new for 2024, the Nova Sport in Passion Red turns heads wherever it goes. Updated suspension, sharper steering, and an upgraded infotainment system make this the best Nova Sport yet.",
    features: ["Updated Sport Suspension", "360° Camera", "12\" Touchscreen", "Wireless CarPlay", "Launch Control", "Paddle Shifters", "19\" Red-Accent Wheels", "Black Roof"],
  },
  {
    id: 9,
    name: "Zenith X",
    make: "Mercedes",
    model: "Zenith X",
    year: 2023,
    price: 55000,
    body: "SUV",
    color: "Gray",
    mileage: "22,100",
    mpg: "24 city / 30 hwy",
    image: "https://placehold.co/1200x700/333333/ffffff?text=Zenith+X+23",
    images: [
      "https://placehold.co/1200x700/333333/ffffff?text=Zenith+X+23+—+Front",
      "https://placehold.co/1200x700/444444/ffffff?text=Zenith+X+23+—+Side",
      "https://placehold.co/1200x700/555555/ffffff?text=Zenith+X+23+—+Interior",
      "https://placehold.co/1200x700/666666/ffffff?text=Zenith+X+23+—+Rear",
    ],
    badge: "Certified",
    trim: "Elite",
    engine: "3.5L Supercharged V6",
    transmission: "9-Speed Automatic",
    drivetrain: "4WD",
    seats: 7,
    description: "A lightly used Zenith X Elite in Graphite Gray. Third-row seating, premium audio, and all the flagship SUV features — at a significantly lower price than new.",
    features: ["Third-Row Seating", "Bose Premium Audio", "Power Black Roof Rails", "Heated/Cooled Seats", "Air Suspension", "Panoramic Roof", "Head-Up Display", "21\" Graphite Wheels"],
  },
  {
    id: 10,
    name: "Titan EV",
    make: "Tesla",
    model: "Titan EV",
    year: 2023,
    price: 49500,
    body: "SUV",
    color: "White",
    mileage: "11,800",
    mpg: "Electric",
    image: "https://placehold.co/1200x700/333333/ffffff?text=Titan+EV+23",
    images: [
      "https://placehold.co/1200x700/333333/ffffff?text=Titan+EV+23+—+Front",
      "https://placehold.co/1200x700/444444/ffffff?text=Titan+EV+23+—+Side",
      "https://placehold.co/1200x700/555555/ffffff?text=Titan+EV+23+—+Interior",
      "https://placehold.co/1200x700/666666/ffffff?text=Titan+EV+23+—+Rear",
    ],
    badge: "Certified",
    trim: "EV Base",
    engine: "Single Electric Motor — 280 hp",
    transmission: "Single-Speed Direct Drive",
    drivetrain: "RWD",
    seats: 5,
    description: "A certified pre-owned Titan EV Base in Pearl White. The single-motor rear-wheel-drive setup offers 280hp and a 290-mile range, with all software updates applied.",
    features: ["290-Mile Range", "Fast Charging Ready", "Glass Roof", "15\" Centre Display", "Over-The-Air Updates", "Autopilot Ready", "Rear Heated Seats", "Wireless Charging"],
  },
  {
    id: 11,
    name: "Crest Wagon",
    make: "BMW",
    model: "Crest",
    year: 2023,
    price: 34500,
    body: "Wagon",
    color: "Blue",
    mileage: "19,300",
    mpg: "27 city / 33 hwy",
    image: "https://placehold.co/1200x700/333333/ffffff?text=Crest+23",
    images: [
      "https://placehold.co/1200x700/333333/ffffff?text=Crest+23+—+Front",
      "https://placehold.co/1200x700/444444/ffffff?text=Crest+23+—+Side",
      "https://placehold.co/1200x700/555555/ffffff?text=Crest+23+—+Interior",
      "https://placehold.co/1200x700/666666/ffffff?text=Crest+23+—+Rear",
    ],
    badge: "Certified",
    trim: "Comfort",
    engine: "2.5L Naturally Aspirated 4-Cylinder",
    transmission: "CVT Automatic",
    drivetrain: "AWD",
    seats: 5,
    description: "A well-maintained 2023 Crest Wagon in Ocean Blue. One owner, full service history, and certified pre-owned — the smart family car choice.",
    features: ["Power Tailgate", "Roof Rails", "Tri-Zone Climate", "Rear Camera", "Split Rear Seats", "Smart Park Assist", "Family Safety Pack", "Heated Front Seats"],
  },
  {
    id: 12,
    name: "Aero GT RS",
    make: "Audi",
    model: "Aero GT",
    year: 2024,
    price: 55500,
    body: "Sedan",
    color: "Red",
    mileage: "New",
    mpg: "26 city / 33 hwy",
    image: "https://placehold.co/1200x700/111111/ffffff?text=Aero+GT+RS",
    images: [
      "https://placehold.co/1200x700/111111/ffffff?text=Aero+GT+RS+—+Front",
      "https://placehold.co/1200x700/222222/ffffff?text=Aero+GT+RS+—+Side",
      "https://placehold.co/1200x700/333333/ffffff?text=Aero+GT+RS+—+Interior",
      "https://placehold.co/1200x700/444444/ffffff?text=Aero+GT+RS+—+Rear",
    ],
    badge: "Limited",
    trim: "RS",
    engine: "3.0L Twin-Turbo V6 — 420 hp",
    transmission: "8-Speed Sport Automatic",
    drivetrain: "AWD",
    seats: 4,
    description: "The Aero GT RS is a limited-edition performance variant with 420 horsepower, RS-tuned sport suspension, and an aggressive body kit. Only 500 units produced worldwide.",
    features: ["420 hp Twin-Turbo V6", "RS Sport Suspension", "Carbon Fibre Body Kit", "Recaro Sport Seats", "RS Performance Brakes", "Limited Edition Badging", "21\" Forged Wheels", "Heads-Up Display"],
  },
];

/* ============================================================
   HELPER FUNCTION — Get car by ID
   WHAT: Finds and returns a single car from the array by its `id`.
   WHY:  The detail page needs to look up one car by ID.
         Having a helper keeps the logic clean and reusable.
   ============================================================ */
export function getCarById(id: number): Car | undefined {
  // WHY: `.find()` loops through the array and returns the first match, or undefined.
  return allCars.find((car) => car.id === id);
}
