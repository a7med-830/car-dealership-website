// src/lib/carsData.ts

export interface Car {
  id: string;
  make: string;
  name: string;
  trim: string;
  year: number;
  price: string;
  description: string;
  image: string;
  images: string[];
  features: string[];
  specs: Record<string, string>;
  videoUrl?: string;
}

export const allCars: Car[] = [
  {
    id: "UNIDRIVE-rolls-phantom",
    make: "ROLLS-ROYCE",
    name: "PHANTOM",
    trim: "UNIDRIVE SERIES II",
    year: 2024,
    price: "€ 1,240,000",
    description:
      "An unparalleled testament to the pinnacle of automotive artistry. Every surface has been sculpted with obsessive precision — from the hand-formed carbon-fibre bodywork to the bespoke interior, each element whispers of excess refined into purpose. This is not transportation. This is a declaration.",
    image: "/top 4 cars/images/rolls/1A.jpg",
    images: [
      "/top 4 cars/images/rolls/2B.jpg",
      "/top 4 cars/images/rolls/3C.jpg",
      "/top 4 cars/images/rolls/4D.jpg",
      "/top 4 cars/images/rolls/5E.jpg",
      "/top 4 cars/images/rolls/6F.jpg",
    ],
    features: [
      "Full Carbon Fibre Body Kit",
      "Bespoke Hand-Stitched Leather Interior",
      "Starlight Headliner — 1,340 Fibre Optics",
      "Forged 24″ Monoblock Alloy Wheels",
      "Active Titanium Exhaust System",
      "UNIDRIVE Sport Suspension",
      "Night Vision Assist Pro",
      "Rear Theatre Configuration",
    ],
    specs: {
      Engine: "6.75L Twin-Turbo V12",
      Power: "571 bhp",
      Torque: "900 Nm",
      "0–100 km/h": "5.3 s",
      "Top Speed": "250 km/h",
      Weight: "2,560 kg",
      Transmission: "8-speed Automatic",
      Drivetrain: "RWD",
    },
    videoUrl: "/top 4 cars/Videos/R1.mp4",
  },
  {
    id: "Porsche Panamera",
    make: "Porsche",
    name: "Panamera",
    trim: "UNIDRIVE VIVERE",
    year: 2024,
    price: "€ 680,000",
    description:
      "The Vivere edition transforms the already formidable Continental GT into something approaching the otherworldly. Carbon aero elements carve new silhouettes while the tuned W12 breathes fire through a bespoke titanium exhaust.",
    image: "/Images-home/3cba9a2c6693afff6d71cfa1f7d8a0f2.jpg",
    images: [],
    features: ["Carbon Aero Package", "700 bhp Tune", "Bespoke Leather"],
    specs: {
      Engine: "6.0L W12",
      Power: "700 bhp",
      Torque: "930 Nm",
      "0–100 km/h": "3.6 s",
    },
  },
  {
    id: "Mercedes‑Maybach S‑Class ",
    make: "Mercedes‑Maybach",
    name: "S‑Class ",
    trim: "UNIDRIVE STALLONE",
    year: 2026,
    price: "€ 920,000",
    description:
      "The prancing horse, reimagined without compromise. Full dry-carbon exterior, re-mapped hybrid drivetrain pushing 1,100 bhp. The Stallone is Italian fury wrapped in German precision.",
    image: "/Images-home/6ca3bb49af970e54f445948e1ce21c9d.jpg",
    images: [],
    features: ["Dry Carbon Monocoque", "1,100 bhp Hybrid", "Active Aero"],
    specs: {
      Engine: "4.0L Twin-Turbo V8 + 3× Electric",
      Power: "1,100 bhp",
      Torque: "800 Nm",
      "0–100 km/h": "2.4 s",
    },
  },
  {
    id: "BMW 8 Series",
    make: "BMW",
    name: "8 Series",
    trim: "",
    year: 2025,
    price: "€ 540,000",
    description:
      "The world's most aggressive SUV, sharpened further. The Venatus package redefines presence — widened carbon arches, 850 bhp, and an interior of pure hand-crafted excess.",
    image: "/Images-home/a8569c342b364babc26e498dcf6c0dca.jpg",
    images: [],
    features: ["Widebody Carbon Kit", "850 bhp Tune", "Sport Exhaust"],
    specs: {
      Engine: "4.0L Twin-Turbo V8",
      Power: "850 bhp",
      Torque: "1,050 Nm",
      "0–100 km/h": "3.1 s",
    },
  },
];

export function getCarById(id: string): Car | undefined {
  return allCars.find((c) => c.id === id);
}

export function getAllCars(): Car[] {
  return allCars;
}