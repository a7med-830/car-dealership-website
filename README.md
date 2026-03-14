# 🚗 UniDrive — Luxury Car Dealership Website

Welcome to **UniDrive**, a premium, bespoke automotive individualization and dealership platform. Designed as a modern university project, this application is built from the ground up to showcase luxury vehicles with a high-end, dynamic user experience.

Built with **Next.js 15**, **React**, and **TypeScript**, the site leverages highly optimized custom CSS and a completely responsive grid/flexbox architecture to deliver a seamless experience from massive desktop monitors down to mobile devices.

---

## ✨ Key Features

- **Dynamic Inventory System:** A comprehensive `/inventory` page featuring robust client-side filtering (Brand, Body Style, Fuel Type, Year, Price, Color) and sorting.
- **Premium Aesthetics:** A bespoke dark-mode design system utilizing `Cinzel` for elegant headings and `Montserrat` for clean, legible body copy, paired with subtle gold accents (`var(--gold)`).
- **Responsive Architecture:** Fully fluid layouts tailored for Desktop, Tablet (≤1024px), and Mobile (≤768px/480px).
- **Interactive UI Components:** Includes an animated marquee for car brand logos, custom-built image carousels for the hero section and latest additions, and accessible mobile slide-out navigation.
- **Detailed Vehicle Pages:** Individual vehicle showcase pages (`/inventory/[id]`) with a built-in image lightbox/thumbnail gallery and an integrated inquiry form.
- **Dedicated Contact Page:** A newly established `/contact` page outlining dealership operating hours, headquarters information, and a customer support form.

---

## 🗺️ Site Structure & Navigation

| Route | View | Description |
|---|---|---|
| `/` | **Home** | Landing page featuring an automated hero slider, animated brand logos, a "Find Your Dream Model" quick search, and news/events. |
| `/inventory` | **Inventory Hub** | The main browsing experience. Includes a sticky sidebar (desktop) or slide-out overlay (mobile) for filtering the vehicle collection. |
| `/inventory/[id]` | **Vehicle Showcase** | Detailed specifications, high-res image galleries, feature lists, and an inline lead generation form to book a test drive. |
| `/contact` | **Contact Us** | Dealership location details, operational hours, and a full-page contact support form. |
| `/admin` | **Admin Dashboard** *(WIP)* | A protected route (currently placeholder) intended for inventory management. |

---

## ⚡ Getting Started (Local Development)

Follow these steps to run the UniDrive project on your own machine.

### Prerequisites
You will need **[Node.js](https://nodejs.org)** (LTS version recommended) installed on your computer.

### 1. Installation
Clone or download this repository to your local machine. Open a terminal inside the project's root folder (`car-dealership-website/`) and run:
```bash
npm install
```
*(Note: Never copy the `node_modules` folder when moving the project between computers; always recreate it using this command).*

### 2. Start the Development Server
```bash
npm run dev
```

### 3. View the Site
Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Modifying the Application (Developer Guide)

This project avoids massive UI libraries in favor of tailored, highly-specific CSS, making it straightforward to customize without fighting external framework constraints.

### 📂 File Locations

| What you want to do... | Where you should look... |
|---|---|
| **Edit Global Styles & Colors** | `src/app/page-styles.css` (Look for the `:root` variables at the top) |
| **Add/Edit Cars (Mock Data)** | `src/lib/cars.ts` |
| **Change the Home Page** | `src/app/page.tsx` |
| **Edit the Filters or Grid** | `src/app/inventory/page.tsx` |
| **Modify the Contact Form** | `src/app/contact/page.tsx` |

### 🎨 Theming and CSS Variables
The entire application's color scheme is controlled via CSS variables located at the top of `src/app/page-styles.css`. To change the accent color from gold to red, for instance, you would simply update:
```css
:root {
  --gold: #ff3333; /* Was #c9a96e */
}
```

### 🏎️ Adding Your Own Vehicles
The application relies on a mock database file. To add your own cars:
1. Place your high-resolution image files inside the `public/` directory (e.g., `public/cars/new-car.jpg`).
2. Open `src/lib/cars.ts`.
3. Locate the `allCars` array and append a new object. Ensure you provide an `id`, `name`, `make`, `model`, `price`, `year`, and an array of `images`.

Example:
```ts
{
  id: 99,
  name: "Your Custom Car",
  make: "Brand",
  model: "Model",
  year: 2026,
  price: 150000,
  image: "/cars/new-car-main.jpg",
  images: [
    "/cars/new-car-main.jpg",
    "/cars/new-car-side.jpg"
  ],
  // ... fill out remaining specs (engine, mpg, seats, etc.)
}
```

---

## 📦 Scripts

- `npm run dev` — Starts the Next.js development server with hot-reloading.
- `npm run build` — Compiles down the application into static files and highly optimized server code for production deployment.
- `npm run start` — Boots up a local server serving the production build (must run `npm run build` first).
- `npm run lint` — Runs ESLint to catch syntax and architectural errors.

---
*Developed as a University Project showcasing modern web engineering, aesthetic UI/UX design, and responsive frontend architecture.*
