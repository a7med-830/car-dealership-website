// WHAT: This is the dynamic Car Detail page.
// WHY:  In Next.js, putting a folder name in [square brackets] like [id]
//       creates a "dynamic route". So /inventory/1 shows car #1,
//       /inventory/4 shows car #4, etc. The `id` comes from the URL.

"use client";

// WHAT: Import React hooks.
// WHY:  useState for the form, useEffect is not needed here since we get data directly.
import React, { useState } from "react";

// WHAT: Import Next.js navigation tools.
// WHY:  Link = fast navigation. useParams = reads the [id] from the URL.
import Link from "next/link";
import { useParams } from "next/navigation";

// WHAT: Import our shared car data and the getCarById helper.
// WHY:  Both pages share the same data — change a car once, it updates everywhere.
import { getCarById } from "@/lib/cars";

/* ============================================================
   COLOR DOT HELPER
   WHAT: Returns a hex color for the car color dot.
   WHY:  Inline styles are needed here because Tailwind can't generate
         dynamic class names from variables at runtime.
   ============================================================ */
function colorHex(color: string): string {
  const map: Record<string, string> = {
    Black: "#111111", White: "#f9f9f9", Silver: "#c0c0c0",
    Blue: "#3b82f6", Gray: "#9ca3af", Red: "#ef4444",
  };
  return map[color] ?? "#888888";
}

/* ============================================================
   MAIN DETAIL PAGE COMPONENT
   ============================================================ */
export default function CarDetailPage() {

  // WHAT: Read the [id] from the URL.
  // WHY:  useParams() gives us the dynamic parts of the URL.
  //       e.g. visiting /inventory/4 gives us params.id = "4"
  const params = useParams();
  const id = Number(params.id); // WHY: Convert string "4" → number 4 for our lookup

  // WHAT: Look up the car using our helper function.
  const car = getCarById(id);

  // WHAT: Form state — tracks what the user types in the contact form.
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false); // Tracks if form was submitted

  // WHAT: Tracks which photo is currently shown in the large main image area.
  // WHY:  When a user clicks a thumbnail, we update this value to swap the big photo.
  //       We use `car?.images?.[0] ?? ""` here (with optional chaining) because React
  //       REQUIRES all hooks to be called before any early return — even the !car guard.
  //       The empty string fallback "" is safe because the !car guard below will
  //       render a "Not Found" page before activeImage is ever displayed.
  const [activeImage, setActiveImage] = useState(car?.images?.[0] ?? "");

  // WHAT: Handle form field changes.
  // WHY:  One handler for all fields — `name` matches the input's `name` attribute.
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // WHAT: Handle form submission.
  // WHY:  e.preventDefault() stops the browser from refreshing the page.
  //       In a real project you'd send this data to an API/email service here.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // EDIT THIS: Replace this with a real form submission (e.g. EmailJS, Formspree, etc.)
    setSubmitted(true);
  }

  /* ----------------------------------------------------------
     NOT FOUND STATE
     WHAT: If no car matches the ID in the URL, show an error page.
     WHY:  Always handle the case where data is missing — prevents blank pages.
     ---------------------------------------------------------- */
  if (!car) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
        <p className="text-6xl mb-4">🚗</p>
        <h1 className="text-3xl font-black mb-2">Vehicle Not Found</h1>
        <p className="text-gray-500 mb-8">We couldn&apos;t find a vehicle with that ID.</p>
        <Link
          href="/inventory"
          className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          ← Back to Inventory
        </Link>
      </div>
    );
  }

  /* ----------------------------------------------------------
     BADGE COLOUR
     ---------------------------------------------------------- */
  const badgeColors: Record<string, string> = {
    "New Arrival": "bg-black text-white",
    "Best Seller": "bg-gray-800 text-white",
    "Certified":   "bg-gray-200 text-gray-800",
    "Electric":    "bg-gray-900 text-green-400",
    "Limited":     "bg-gray-700 text-white",
  };

  /* ============================================================
     PAGE RENDER
     ============================================================ */
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ============================================================
          NAVBAR — same as other pages
          ============================================================ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">UniDrive</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/inventory" className="text-sm font-medium hover:opacity-60 transition-opacity">Inventory</Link>
            <Link href="/#about"    className="text-sm font-medium hover:opacity-60 transition-opacity">About</Link>
            <Link href="/#contact"  className="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Contact Us
            </Link>
          </div>
          {/* Mobile back button */}
          <Link href="/inventory" className="md:hidden text-sm font-medium border border-gray-300 px-3 py-1.5 rounded-full">
            ← Inventory
          </Link>
        </div>
      </nav>

      {/* ============================================================
          BREADCRUMB + PAGE HEADER
          ============================================================ */}
      <div className="bg-white border-b border-gray-200 py-5 px-6">
        <div className="max-w-7xl mx-auto">
          {/* WHY: Breadcrumbs help users navigate back and help Google index the page. */}
          <p className="text-xs text-gray-400 mb-1">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            {" / "}
            <Link href="/inventory" className="hover:text-black transition-colors">Inventory</Link>
            {" / "}
            {/* WHAT: Display the current car name as the final breadcrumb level */}
            <span className="text-gray-700 font-medium">{car.year} {car.name}</span>
          </p>
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* --- TWO COLUMN LAYOUT: Image left, Summary right --- */}
        {/* WHY: `grid-cols-1 lg:grid-cols-2` stacks on mobile, side-by-side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* --- LEFT: MAIN IMAGE GALLERY --- */}
          <div>
            {/* WHAT: The large main photo — changes when you click a thumbnail below.
                WHY:  `activeImage` state holds whichever photo is currently selected.
                      When a thumbnail is clicked, setActiveImage updates it and
                      React re-renders with the new photo automatically. */}
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <img
                src={activeImage}
                alt={`${car.year} ${car.name}`}
                className="w-full object-cover aspect-video transition-opacity duration-200"
              />
            </div>

            {/* WHAT: Clickable thumbnail row — clicking swaps the main photo above.
                EDIT THIS: Replace the URLs in car.images[] inside src/lib/cars.ts.
                WHY:  We .map() over car.images so adding more photos is as simple
                      as adding another URL to the images array in cars.ts. */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  // WHY: The active thumbnail gets a solid black border so the user
                  //      can see which photo is currently displayed in the main slot.
                  className={`rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                    activeImage === img
                      ? "border-black shadow-md"       // ← active thumbnail style
                      : "border-transparent opacity-60 hover:opacity-100" // ← inactive
                  }`}
                >
                  <img
                    src={img}
                    alt={`${car.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: CAR SUMMARY + QUICK STATS --- */}
          <div className="flex flex-col">

            {/* Badge + Year */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeColors[car.badge] ?? "bg-gray-100 text-gray-700"}`}>
                {car.badge}
              </span>
              <span className="text-sm text-gray-400">{car.year} Model Year</span>
            </div>

            {/* Car Name + Trim */}
            {/* EDIT THIS: Change car names in src/lib/cars.ts */}
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-1">
              {car.name}
            </h1>
            <p className="text-gray-400 text-base mb-4">{car.trim} · {car.body}</p>

            {/* Price */}
            {/* WHY: The price is shown prominently as this is the #1 thing buyers look for */}
            <div className="mb-5">
              <p className="text-4xl font-black">${car.price.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-0.5">MSRP — Excluding taxes and fees</p>
            </div>

            {/* Description */}
            {/* EDIT THIS: Change the description for each car in src/lib/cars.ts */}
            <p className="text-gray-600 leading-relaxed mb-6">{car.description}</p>

            {/* --- QUICK SPECS GRID --- */}
            {/* WHAT: A 2×3 grid of key specs shown at a glance.
                WHY:  Car buyers scan specs quickly — a grid layout is easier to read than a paragraph. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Engine",       value: car.engine },
                { label: "Transmission", value: car.transmission },
                { label: "Drivetrain",   value: car.drivetrain },
                { label: "Mileage",      value: car.mileage === "New" ? "Brand New" : `${car.mileage} miles` },
                { label: "Fuel Economy", value: car.mpg },
                { label: "Seats",        value: `${car.seats} Passengers` },
              ].map((spec) => (
                // WHAT: Each spec box — label on top, value below.
                <div key={spec.label} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{spec.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Color */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="w-5 h-5 rounded-full border border-gray-300 inline-block shadow-sm"
                style={{ backgroundColor: colorHex(car.color) }}
              />
              <span className="text-sm text-gray-600">{car.color} Exterior</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-auto">
              {/* WHAT: Scroll-to-form button — takes user to the test drive form below */}
              {/* WHY:  href="#test-drive-form" smoothly scrolls to the section with that id */}
              <a
                href="#test-drive-form"
                className="flex-1 bg-black text-white text-sm font-semibold py-3.5 rounded-full text-center hover:bg-gray-800 transition-colors"
              >
                Book a Test Drive
              </a>
              <a
                href="tel:+1234567890" // EDIT THIS: Your phone number
                className="flex-1 border-2 border-black text-black text-sm font-semibold py-3.5 rounded-full text-center hover:bg-black hover:text-white transition-all"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* --- FEATURES LIST --- */}
        {/* WHAT: A grid of feature chips for this car.
            EDIT THIS: Change the features for each car in src/lib/cars.ts */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-black tracking-tight mb-4">Key Features & Options</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {car.features.map((feature) => (
              // WHAT: Each feature shown as a pill/chip.
              // WHY:  Pills are compact and easy to scan — better than a plain list.
              <div key={feature} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                {/* A simple checkmark icon */}
                <span className="text-black font-bold text-xs">✓</span>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- TEST DRIVE FORM --- */}
        {/* WHAT: A contact form at the bottom of the page.
            WHY:  The form is below the car details — users scroll down after being
                  convinced by the specs, which maximises form completion rates.
            EDIT THIS: Connect this form to a real backend (e.g. Formspree, EmailJS). */}
        <div
          id="test-drive-form" // WHY: This id matches the href="#test-drive-form" button above
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8"
        >
          <div className="max-w-2xl mx-auto">
            {/* Form header */}
            <h2 className="text-2xl font-black tracking-tight mb-1">Book a Test Drive</h2>
            <p className="text-gray-500 text-sm mb-6">
              Interested in the {car.year} {car.name}? Fill in your details and our team will contact you within 24 hours.
            </p>

            {/* WHAT: If the form was submitted, show a success message instead of the form.
                WHY:  Always give users feedback that their action worked. */}
            {submitted ? (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-xl font-black mb-2">Request Sent!</p>
                <p className="text-gray-500 text-sm mb-5">
                  Thanks, <strong>{form.name}</strong>! We&apos;ll be in touch at {form.email} within 24 hours.
                </p>
                <Link
                  href="/inventory"
                  className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Browse More Vehicles
                </Link>
              </div>
            ) : (
              // WHAT: The contact form with name, email, phone, and message fields.
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name" // WHY: `name` must match the key in our `form` state object
                      value={form.name}
                      onChange={handleChange}
                      required // WHY: HTML5 `required` prevents submission if empty
                      placeholder="John Smith"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                  />
                </div>

                {/* Pre-filled message about the specific car */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message || `Hi, I'm interested in the ${car.year} ${car.name} (${car.trim}). Please contact me to arrange a test drive.`}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors tracking-wide"
                >
                  Send Test Drive Request →
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to be contacted by our team. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Back to inventory link */}
        <div className="text-center mt-8">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors font-medium"
          >
            ← Back to All Vehicles
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white mt-12 py-8 px-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} UniDrive. All rights reserved.
        </p>
        <p className="text-sm text-gray-400 font-medium mt-1">
          ⚡ Made for University Project — Student Web Development
        </p>
      </footer>

    </div>
  );
}
