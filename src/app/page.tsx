// WHAT: This is the main landing page for the UniDrive car dealership website.
// WHY:  In Next.js, the file at src/app/page.tsx is automatically shown when someone
//       visits the root URL ("/"). Think of it as the front door of our website.

/* ============================================================
   IMPORTS
   WHY: We import React so we can write JSX (the HTML-like code you see below).
        "use client" tells Next.js this component runs in the browser, not just the server.
   ============================================================ */
"use client";

// WHAT: We import the React library. Every file that uses JSX needs this.
// WHY:  React is the engine that turns our JSX code into real HTML on the screen.
import React, { useState } from "react";

/* ============================================================
   DATA — Top Arrivals Cars
   WHAT: This is our list of featured cars shown in the "Top Arrivals" grid.
   EDIT THIS: Change the car names, prices, or image URLs here.
   WHY:  Storing data in an array makes it easy to add more cars later
         without copy-pasting the same card HTML over and over.
   ============================================================ */
const featuredCars = [
  {
    // EDIT THIS: Change "Aero GT" to your car model name
    name: "Aero GT",
    // EDIT THIS: Change the year
    year: "2024",
    // EDIT THIS: Change the price (this is a display string, so format it however you like)
    price: "$48,990",
    // EDIT THIS: Replace the URL below with a real photo if you have one.
    // placehold.co generates a gray box with text — perfect as a placeholder.
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Aero+GT",
    // EDIT THIS: Change the short description shown on the card
    badge: "New Arrival",
  },
  {
    name: "Zenith X",
    year: "2024",
    price: "$62,500",
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Zenith+X",
    badge: "Best Seller",
  },
  {
    name: "Nova Sport",
    year: "2023",
    price: "$35,750",
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Nova+Sport",
    badge: "Limited",
  },
];

/* ============================================================
   MAIN PAGE COMPONENT
   WHAT: This is the default export — the actual page React renders.
   WHY:  In React, a "component" is a function that returns HTML-like JSX.
         "export default" means this is the main thing this file provides.
   ============================================================ */
export default function HomePage() {
  // WHAT: This tracks whether the mobile menu is open or closed.
  // WHY:  useState is React's way of remembering values that can change.
  //       When `menuOpen` changes, React re-renders only what needs to update.
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // WHAT: The outermost <div> wraps the entire page.
    // WHY:  `min-h-screen` makes it at least as tall as the screen.
    //       `bg-white text-black` sets a white background and black text — our monochrome palette.
    //       `font-sans` uses the default clean sans-serif font stack.
    <div className="min-h-screen bg-white text-black font-sans">

      {/* ============================================================
          NAVBAR START
          WHAT: The navigation bar at the top of the page.
          WHY:  `sticky top-0 z-50` keeps the navbar visible as you scroll down.
                `border-b border-gray-200` adds a subtle bottom border separator.
                `backdrop-blur-sm bg-white/90` gives a frosted-glass effect.
          ============================================================ */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/90 border-b border-gray-200">
        {/* WHAT: Inner container that limits max width and centers content.
            WHY:  `max-w-7xl mx-auto` is the standard "centered container" pattern.
                  `px-6` adds horizontal padding so content doesn't touch the screen edges. */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* --- LOGO --- */}
          {/* WHAT: The brand name / logo on the left side of the navbar.
              EDIT THIS: Change "UniDrive" to your own brand name.
              WHY:  `text-2xl font-black tracking-tight` makes it big, bold, and tight — like Tesla's logo. */}
          <span className="text-2xl font-black tracking-tight">UniDrive</span>

          {/* --- DESKTOP NAV LINKS (hidden on mobile) --- */}
          {/* WHAT: Navigation links shown on medium screens and larger.
              WHY:  `hidden md:flex` hides this on small (mobile) screens and shows it on medium+ screens.
                    This is called "responsive design" — adapting the layout to screen size. */}
          <div className="hidden md:flex items-center gap-8">

            {/* WHAT: Each <a> is a clickable navigation link.
                EDIT THIS: Change "Inventory", "About", or add more links.
                WHY:  `href="#inventory"` scrolls to the section with id="inventory" on the same page.
                      `hover:opacity-60` makes the link fade slightly when you hover over it — a subtle effect. */}
            <a href="#inventory" className="text-sm font-medium hover:opacity-60 transition-opacity">
              Inventory
            </a>
            <a href="#about" className="text-sm font-medium hover:opacity-60 transition-opacity">
              About
            </a>

            {/* WHAT: The "Contact" button with a solid black style — it stands out from plain links.
                EDIT THIS: Change the text "Contact Us" or the link href.
                WHY:  `bg-black text-white` inverts colors to make it pop as a call-to-action (CTA).
                      `rounded-full` gives it a pill shape, which is a modern design trend.
                      `hover:bg-gray-800` slightly lightens the button on hover for feedback. */}
            <a
              href="#contact"
              className="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON (visible only on mobile) --- */}
          {/* WHAT: A button that appears on small screens to open/close the mobile menu.
              WHY:  `md:hidden` hides this button on medium and large screens (only shows on mobile).
                    Clicking it toggles the `menuOpen` state which shows/hides the mobile menu below. */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)} // WHY: ! flips true→false and false→true
            aria-label="Toggle menu" // WHY: Accessibility — tells screen readers what this button does
          >
            {/* WHAT: Three horizontal bars to create the classic hamburger icon.
                WHY:  `w-6 h-0.5 bg-black` creates a thin black line (0.5 = 2px tall, 6 = 24px wide). */}
            <span className="w-6 h-0.5 bg-black block transition-all"></span>
            <span className="w-6 h-0.5 bg-black block transition-all"></span>
            <span className="w-6 h-0.5 bg-black block transition-all"></span>
          </button>
        </div>

        {/* --- MOBILE DROPDOWN MENU --- */}
        {/* WHAT: The menu that slides open when the hamburger is tapped on mobile.
            WHY:  `{menuOpen && ...}` is React's way of conditionally rendering something.
                  If menuOpen is true, show this; if false, hide it completely. */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
            {/* EDIT THIS: These links match the desktop nav — keep them in sync */}
            <a href="#inventory" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Inventory
            </a>
            <a href="#about" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a
              href="#contact"
              className="bg-black text-white text-sm font-medium px-5 py-2 rounded-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        )}
      </nav>
      {/* NAVBAR END */}

      {/* ============================================================
          HERO SECTION START
          WHAT: The first big section the visitor sees — our "showstopper" moment.
          WHY:  A hero section is the most important part of a landing page.
                It must immediately communicate what the brand is about.
          ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 bg-white overflow-hidden">

        {/* WHAT: Subtle background decoration — a large faint circle.
            WHY:  `absolute` pulls it out of normal flow so it doesn't push content around.
                  `opacity-5` makes it barely visible — just a hint of texture. */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gray-900 opacity-5 pointer-events-none"></div>

        {/* --- EYEBROW LABEL --- */}
        {/* WHAT: A small uppercase label above the main headline.
            EDIT THIS: Change "Premium Auto Collection" to whatever you like.
            WHY:  `tracking-[0.3em]` spreads out the letters (letter-spacing) — very Tesla-like. */}
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-6">
          Premium Auto Collection
        </p>

        {/* --- MAIN HEADLINE --- */}
        {/* WHAT: The giant hero headline — the first thing visitors read.
            EDIT THIS: Change "The Future of Motion." to your own tagline.
            WHY:  `text-6xl md:text-8xl` means small screens get size-6xl, large screens get 8xl.
                  `font-black` is the heaviest font weight (900) for maximum impact.
                  `leading-none` removes extra line spacing so it feels tight and editorial. */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-8 max-w-5xl">
          {/* EDIT THIS: Change this headline text */}
          The Future<br />of Motion.
        </h1>

        {/* --- SUBTITLE --- */}
        {/* WHAT: A short supporting sentence under the headline.
            EDIT THIS: Change this description to match your dealership's message.
            WHY:  `max-w-lg` keeps the text narrow so it's easy to read (not too wide).
                  `text-gray-500` uses a lighter gray — secondary information should be de-emphasized. */}
        <p className="text-gray-500 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
          {/* EDIT THIS: Change this supporting text */}
          Discover our curated selection of premium and certified vehicles.
          Drive the car you deserve.
        </p>

        {/* --- CTA BUTTONS --- */}
        {/* WHAT: Two call-to-action buttons side by side.
            WHY:  Having TWO options (primary + secondary) gives users a choice
                  and caters to those at different stages — browsing vs. ready to act. */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">

          {/* WHAT: Primary CTA — the main action we want users to take.
              EDIT THIS: Change "View Inventory" text or the href link.
              WHY:  Solid black = high visibility = primary action.
                    `px-8 py-4` gives it generous padding so it's easy to tap on mobile. */}
          <a
            href="#inventory"
            id="view-inventory-btn"
            className="bg-black text-white font-semibold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors text-sm tracking-wide"
          >
            {/* EDIT THIS: Change the button text */}
            View Inventory
          </a>

          {/* WHAT: Secondary CTA — a softer action (less commitment).
              EDIT THIS: Change "Book a Test Drive" text or the href link.
              WHY:  `border-2 border-black` gives an outlined (ghost) style — visually lighter than the solid button.
                    `hover:bg-black hover:text-white` makes it fill in on hover — a classic "fill on hover" effect. */}
          <a
            href="#contact"
            id="test-drive-btn"
            className="border-2 border-black text-black font-semibold px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all text-sm tracking-wide"
          >
            {/* EDIT THIS: Change the button text */}
            Book a Test Drive
          </a>
        </div>

        {/* --- HERO CAR IMAGE PLACEHOLDER --- */}
        {/* WHAT: A big placeholder image representing the hero/feature car.
            EDIT THIS: Replace the src URL with a real high-quality car photo.
            WHY:  `mt-16` adds space above the image.
                  `rounded-2xl` adds rounded corners — softer, more modern than sharp corners.
                  `object-cover` ensures the image fills its container without distortion.
                  The 16:9-ish aspect ratio (`aspect-video`) matches standard photo proportions. */}
        <div className="mt-16 w-full max-w-4xl mx-auto">
          <img
            // EDIT THIS: Replace this URL with your own car image
            src="https://placehold.co/1200x600/f0f0f0/999999?text=Your+Featured+Car+Here"
            alt="Featured car" // EDIT THIS: Update alt text to describe your actual image
            className="w-full rounded-2xl shadow-2xl object-cover aspect-video"
          />
        </div>

        {/* WHAT: Small scroll hint at the bottom of the hero.
            WHY:  Helps users understand there's more content below the fold. */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
          <p className="text-xs tracking-widest uppercase">Scroll</p>
          {/* WHY: This creates a simple animated bouncing arrow using Tailwind's `animate-bounce` */}
          <div className="animate-bounce text-gray-300 text-lg">↓</div>
        </div>
      </section>
      {/* HERO SECTION END */}

      {/* ============================================================
          STATS BAR
          WHAT: A row of quick facts / numbers about the dealership.
          EDIT THIS: Change the numbers and labels to match your real stats.
          WHY:  Social proof numbers build trust instantly.
                `bg-black text-white` flips colors for visual contrast between sections.
          ============================================================ */}
      <section className="bg-black text-white py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* WHAT: Each of these is a stat block with a big number and a label.
              EDIT THIS: Change the number and label for each stat.
              WHY:  `text-4xl font-black` makes numbers big and impactful. */}
          <div>
            <p className="text-4xl font-black">500+</p>{/* EDIT THIS: Your car count */}
            <p className="text-sm text-gray-400 mt-1 tracking-wider">Vehicles in Stock</p>
          </div>
          <div>
            <p className="text-4xl font-black">12</p>{/* EDIT THIS: Years in business */}
            <p className="text-sm text-gray-400 mt-1 tracking-wider">Years of Excellence</p>
          </div>
          <div>
            <p className="text-4xl font-black">4.9★</p>{/* EDIT THIS: Your rating */}
            <p className="text-sm text-gray-400 mt-1 tracking-wider">Customer Rating</p>
          </div>
          <div>
            <p className="text-4xl font-black">24/7</p>
            <p className="text-sm text-gray-400 mt-1 tracking-wider">Online Support</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURE GRID — TOP ARRIVALS START
          WHAT: A section showing 3 featured car cards in a grid layout.
          WHY:  `id="inventory"` matches the `href="#inventory"` links in the navbar.
                When someone clicks "Inventory", the browser scrolls here.
          ============================================================ */}
      <section id="inventory" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          {/* --- SECTION HEADER --- */}
          <div className="text-center mb-16">
            {/* WHAT: Same eyebrow/label pattern as the hero section.
                EDIT THIS: Change "Top Arrivals" to whatever you want to call this section. */}
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">
              Featured Selection
            </p>
            {/* EDIT THIS: Change this section headline */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Top Arrivals
            </h2>
            {/* EDIT THIS: Change this subtitle */}
            <p className="text-gray-500 mt-4 max-w-md mx-auto">
              Hand-picked vehicles for the discerning driver. Every car is certified and ready.
            </p>
          </div>

          {/* --- CAR CARDS GRID --- */}
          {/* WHAT: The grid that holds the 3 car cards.
              WHY:  `grid-cols-1 md:grid-cols-3` means:
                    - 1 column on mobile (cards stack vertically)
                    - 3 columns on medium+ screens (side by side)
                    `gap-8` adds space between cards. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* WHAT: `.map()` loops over our `featuredCars` array and creates a card for each one.
                WHY:  Instead of copy-pasting the same card 3 times, we write it once and `.map()` repeats it.
                      `key={car.name}` is required by React to track each item in the list. */}
            {featuredCars.map((car) => (
              <div
                key={car.name}
                // WHAT: Each card container.
                // WHY:  `bg-white` gives a clean white card background against the gray section.
                //       `group` enables "group-hover" on child elements (hover the card → child elements react).
                //       `hover:-translate-y-1` lifts the card 4px on hover — a subtle "lift" effect.
                //       `shadow-md hover:shadow-xl` makes the shadow grow on hover — more depth = more lifted feel.
                //       `transition-all` ensures the hover effects animate smoothly instead of jumping.
                className="bg-white rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-xl shadow-md transition-all duration-300"
              >
                {/* --- CAR IMAGE --- */}
                {/* WHAT: The car photo at the top of the card.
                    WHY:  `overflow-hidden` on the outer div ensures the image doesn't overflow rounded corners.
                          `group-hover:scale-105` scales UP by 5% when the card is hovered — a zoom effect.
                          `transition-transform duration-500` makes the zoom smooth and slow (500ms). */}
                <div className="overflow-hidden">
                  <img
                    src={car.image} // WHY: This pulls the `image` property from our featuredCars data above
                    alt={car.name}  // WHY: Always add alt text for accessibility and SEO
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* --- CARD CONTENT --- */}
                <div className="p-6">

                  {/* WHAT: The badge (e.g. "New Arrival", "Best Seller").
                      WHY:  `inline-block` lets us control the badge size without it stretching to full width.
                            `bg-gray-100` gives a soft gray pill background. */}
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {car.badge} {/* WHY: Reads the `badge` field from our featuredCars data */}
                  </span>

                  {/* WHAT: Car name + year */}
                  {/* EDIT THIS: Go to the featuredCars array at the top of this file to edit car names */}
                  <h3 className="text-xl font-black tracking-tight">{car.name}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">{car.year}</p>

                  {/* WHAT: Price and "View Details" button side by side.
                      WHY:  `flex justify-between items-center` is the standard way to put
                            two things on opposite ends of the same row. */}
                  <div className="flex justify-between items-center mt-4">

                    {/* WHAT: The car price.
                        EDIT THIS: Go to the featuredCars array to change prices. */}
                    <p className="text-2xl font-black">{car.price}</p>

                    {/* WHAT: A small "View Details" button on each card.
                        WHY:  `hover:bg-black hover:text-white` is a fill-on-hover effect. */}
                    <button
                      className="border border-black text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* WHAT: "See Full Inventory" button below the cards.
              WHY:  Gives users a clear next action if they want to see more cars. */}
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-block border-2 border-black text-black font-semibold px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all text-sm tracking-wide"
            >
              See Full Inventory
            </a>
          </div>
        </div>
      </section>
      {/* FEATURE GRID END */}

      {/* ============================================================
          ABOUT SECTION START
          WHAT: A brief "about us" section.
          EDIT THIS: Replace the text with your own dealership background.
          WHY:  An about section builds brand trust and explains your value.
          ============================================================ */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* --- LEFT: Image Placeholder --- */}
          {/* EDIT THIS: Replace this placeholder with a photo of your showroom or team */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://placehold.co/800x600/1a1a1a/ffffff?text=Our+Showroom"
              alt="UniDrive Showroom"
              className="w-full h-full object-cover"
            />
          </div>

          {/* --- RIGHT: Text Content --- */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">
              Our Story
            </p>
            {/* EDIT THIS: The about section headline */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              Driven by<br />Excellence.
            </h2>
            {/* EDIT THIS: Write your own dealership description here */}
            <p className="text-gray-500 leading-relaxed mb-4">
              UniDrive was founded with one simple belief: buying a car should be an exciting,
              transparent experience — not a stressful one. We curate only the finest vehicles
              and back every sale with our total satisfaction guarantee.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Whether you&lsquo;re looking for a first car or your dream upgrade, our team of
              certified advisors is here to guide you every step of the way.
            </p>
          </div>
        </div>
      </section>
      {/* ABOUT SECTION END */}

      {/* ============================================================
          CONTACT / CTA BANNER START
          WHAT: A bold full-width black section that prompts users to get in touch.
          EDIT THIS: Change the headline, subtext, and button labels.
          WHY:  A contrasting CTA banner breaks the page rhythm and recaptures attention.
          ============================================================ */}
      <section id="contact" className="bg-black text-white py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          {/* EDIT THIS: Change this CTA headline */}
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Ready to Drive?
          </h2>
          {/* EDIT THIS: Change this subtext */}
          <p className="text-gray-400 text-lg mb-10">
            Book a test drive today or speak with one of our vehicle specialists.
            No pressure. No hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* WHAT: White button on the black background — maximum contrast for CTA.
                EDIT THIS: Change the button text or link */}
            <a
              href="tel:+1234567890" // EDIT THIS: Replace with your actual phone number
              id="call-us-btn"
              className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-200 transition-colors text-sm tracking-wide"
            >
              Call Us Now
            </a>
            <a
              href="mailto:hello@unidrive.com" // EDIT THIS: Replace with your actual email
              id="email-us-btn"
              className="border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all text-sm tracking-wide"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
      {/* CONTACT CTA BANNER END */}

      {/* ============================================================
          FOOTER START
          WHAT: The bottom section of the page with links and legal info.
          EDIT THIS: Update the links, social handles, and email address.
          WHY:  `border-t border-gray-200` adds a subtle top border to separate the footer
                from the content above it.
          ============================================================ */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* --- TOP ROW: Logo + Nav Links --- */}
          {/* WHY: `flex-col md:flex-row` stacks items vertically on mobile, horizontally on desktop */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">

            {/* --- FOOTER LOGO / BRAND --- */}
            <div>
              {/* EDIT THIS: Change "UniDrive" to your brand name */}
              <span className="text-2xl font-black tracking-tight">UniDrive</span>
              {/* EDIT THIS: Update this tagline */}
              <p className="text-gray-400 text-sm mt-1">Premium Auto Dealership</p>
            </div>

            {/* --- FOOTER NAV LINKS --- */}
            {/* WHAT: Quick links in the footer.
                WHY:  Footer links are important for SEO and usability —
                      users often look for info (like contact/privacy) in the footer. */}
            <div className="flex flex-wrap gap-6">
              {/* EDIT THIS: Update these links and labels */}
              <a href="#inventory" className="text-sm text-gray-500 hover:text-black transition-colors">Inventory</a>
              <a href="#about"     className="text-sm text-gray-500 hover:text-black transition-colors">About</a>
              <a href="#contact"   className="text-sm text-gray-500 hover:text-black transition-colors">Contact</a>
              <a href="#"          className="text-sm text-gray-500 hover:text-black transition-colors">Privacy Policy</a>
            </div>
          </div>

          {/* --- DIVIDER LINE --- */}
          {/* WHY: `border-t border-gray-100` is a subtle separator between the nav links and copyright */}
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

            {/* WHAT: Copyright and university disclaimer.
                EDIT THIS: Update the year and your name/institution.
                WHY:  Adding a "Made for University Project" note is honest and often required by professors. */}
            <p className="text-sm text-gray-400">
              {/* WHY: new Date().getFullYear() automatically outputs the current year */}
              &copy; {new Date().getFullYear()} UniDrive. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 font-medium">
              {/* EDIT THIS: Change the university name and student name */}
              ⚡ Made for University Project — Student Web Development
            </p>
          </div>
        </div>
      </footer>
      {/* FOOTER END */}

    </div> // End of main page wrapper
  );
}
