# 🚗 UniDrive — Car Dealership Website

A university project — a modern car dealership website built with **Next.js** and **Tailwind CSS**.

## Pages

| Page | URL | Description |
|---|---|---|
| Home | `/` | Landing page with featured cars |
| Inventory | `/inventory` | Browse & filter all cars |
| Car Detail | `/inventory/[id]` | Full specs + Book a Test Drive form |

---

## ⚡ Running on a New Computer

### 1. Install Node.js
Download and install the **LTS** version from **[nodejs.org](https://nodejs.org)**

### 2. Get the project files
Copy the `car-dealership-website/` folder onto your computer (USB, Google Drive, GitHub, etc.)

> ⚠️ **Do NOT copy** the `node_modules/` folder — it's huge and gets recreated in the next step.

### 3. Install dependencies
Open a terminal inside the project folder and run:
```bash
npm install
```

### 4. Start the dev server
```bash
npm run dev
```

### 5. Open in browser
Go to **http://localhost:3000**

---

## ✏️ Editing the Website

| What to edit | Where |
|---|---|
| Car inventory data (names, prices, photos, specs) | `src/lib/cars.ts` |
| Home page | `src/app/page.tsx` |
| Inventory page (filters, layout) | `src/app/inventory/page.tsx` |
| Car detail page (specs, form) | `src/app/inventory/[id]/page.tsx` |
| Global styles | `src/app/globals.css` |

### Adding your own car photos
1. Put your image files inside the `public/cars/` folder
2. Open `src/lib/cars.ts` and update the `images` array for that car:
```ts
images: [
  "/cars/your-car-front.jpg",
  "/cars/your-car-side.jpg",
  "/cars/your-car-interior.jpg",
  "/cars/your-car-rear.jpg",
],
```

---

## 🛠️ Commands

| Command | What it does |
|---|---|
| `npm install` | Install all dependencies (run once on a new computer) |
| `npm run dev` | Start the development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start the production build |

---

## 🧱 Tech Stack

- **[Next.js 15](https://nextjs.org)** — React framework with file-based routing
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org)** — Type-safe JavaScript

---

*⚡ Made for University Project — Student Web Development*
