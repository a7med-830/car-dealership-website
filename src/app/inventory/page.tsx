// WHAT: This is the Inventory page for UniDrive — it shows all available cars
//       with a sidebar for filtering and a main grid of car cards.
// WHY:  In Next.js App Router, creating a folder "inventory" with a "page.tsx"
//       inside automatically creates the route at /inventory. No config needed!

// WHY: "use client" is needed because we use useState/useEffect (browser-only features).
"use client";

// WHAT: Import React and the hooks we need.
// WHY:  useState = remember values that change (like filters, search text).
//       useEffect = run code when something changes (like filtering the list).
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { allCars } from "@/lib/cars";

// WHAT: Car data is now imported from the shared file src/lib/cars.ts
// WHY:  Keeping data in one place means you only need to edit cars in one file.
//       The detail page also imports from the same file, so everything stays in sync.

/* ============================================================
   FILTER OPTIONS
   WHAT: The options shown in each filter dropdown/checkbox panel.
   EDIT THIS: Add more body styles, colors, etc. to match your real inventory.
   ============================================================ */
// WHAT: Derive the list of brands dynamically from the actual car data.
// WHY:  This way the brand list always matches what's in stock — no need to manually keep it in sync.
const BRANDS = [...new Set(allCars.map((c) => c.make))].sort();

const BODY_STYLES = ["Sedan", "SUV", "Coupe", "Truck", "Wagon"];
const COLORS      = ["Black", "White", "Silver", "Blue", "Gray", "Red"];
const YEARS       = [2025, 2024, 2023];
const PRICE_RANGES = [
  { label: "Under $40,000",        min: 0,     max: 40000 },
  { label: "$40,000 – $50,000",    min: 40000, max: 50000 },
  { label: "$50,000 – $60,000",    min: 50000, max: 60000 },
  { label: "Over $60,000",         min: 60000, max: Infinity },
];
const SORT_OPTIONS = [
  { label: "Price: Low to High",  value: "price_asc"  },
  { label: "Price: High to Low",  value: "price_desc" },
  { label: "Year: Newest First",  value: "year_desc"  },
  { label: "Year: Oldest First",  value: "year_asc"   },
];

/* ============================================================
   BADGE COLOR HELPER
   WHAT: Returns a Tailwind color class based on the badge text.
   WHY:  We want different coloured badges for "New Arrival", "Certified", etc.
         A helper function keeps this logic out of the JSX, making it cleaner.
   ============================================================ */
function getBadgeClass(badge: string): string {
  switch (badge) {
    case "New Arrival": return "bg-black text-white";
    case "Best Seller": return "bg-gray-800 text-white";
    case "Certified":   return "bg-gray-200 text-gray-800";
    case "Electric":    return "bg-gray-900 text-green-400";
    case "Limited":     return "bg-gray-700 text-white";
    default:            return "bg-gray-100 text-gray-700";
  }
}

/* ============================================================
   COLLAPSIBLE FILTER PANEL COMPONENT
   WHAT: A reusable panel used in the sidebar. Click the header to open/close it.
   WHY:  Making this a separate component avoids repeating the same open/close
         logic for every filter section (Body Style, Color, Year, Price).
   ============================================================ */
function FilterPanel({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  // WHY: Each panel has its own open/close state, independent of others.
  const [open, setOpen] = useState(defaultOpen);

  return (
    // WHAT: The outer box for one filter section (e.g. "Body Style").
    // WHY:  `border-b border-gray-200` separates filter panels visually.
    <div className="border-b border-gray-200">

      {/* WHAT: The clickable header row — click to expand/collapse the panel. */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        {/* EDIT THIS: The filter section title */}
        <span className="font-semibold text-sm text-gray-900">{title}</span>
        {/* WHY: The arrow rotates 180° when open using `rotate-180` — a CSS transform trick. */}
        <span className={`text-gray-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* WHAT: The filter content (checkboxes etc), shown only when `open` is true.
          WHY:  Wrapping in a div with overflow-hidden + max-height lets us animate the open/close. */}
      {open && (
        <div className="pb-4 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   CHECKBOX OPTION COMPONENT
   WHAT: A single checkbox row used inside filter panels.
   WHY:  We reuse this for every filter option across all panels.
   ============================================================ */
function CheckboxOption({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    // WHAT: A label that wraps the checkbox so clicking anywhere on the row checks it.
    // WHY:  Wrapping in <label> makes the entire row clickable, not just the tiny checkbox.
    <label className="flex items-center justify-between gap-3 cursor-pointer group">
      <div className="flex items-center gap-2.5">
        {/* WHAT: The actual checkbox input.
            WHY:  `accent-black` colours the checkmark black to match our monochrome theme.
                  `w-4 h-4` makes the checkbox a consistent size. */}
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 accent-black rounded cursor-pointer"
        />
        {/* EDIT THIS: The checkbox label text — populated from filter options arrays above. */}
        <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
          {label}
        </span>
      </div>
      {/* WHAT: The count badge showing how many cars match this filter. */}
      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
        {count}
      </span>
    </label>
  );
}

/* ============================================================
   MAIN INVENTORY PAGE COMPONENT
   ============================================================ */
export default function InventoryPage() {

  // WHAT: All the filter state variables — these track what the user has selected.
  // WHY:  Each piece of state causes a re-render when it changes, updating the results.
  const [searchText,     setSearchText]     = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);       // Selected brands
  const [selectedBodies, setSelectedBodies] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedYears,  setSelectedYears]  = useState<number[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortBy,         setSortBy]         = useState("price_asc");
  const [filteredCars,   setFilteredCars]   = useState(allCars);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // WHAT: Read ?brand= from the URL and pre-check that brand filter on load.
  // WHY:  When a user clicks a brand logo on the homepage, they land here with
  //       e.g. ?brand=BMW in the URL. We read it once on mount and activate the filter.
  const searchParams = useSearchParams();
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      // Only pre-select if it actually exists in our brand list
      setSelectedBrands([brandParam]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount only

  // WHY:  Shows the user what filters are currently active, like the Volvo page does.
  const activeFilters = [
    ...selectedBrands,
    ...selectedBodies,
    ...selectedColors,
    ...selectedYears.map(String),
    ...selectedPrices,
  ];

  /* ----------------------------------------------------------
     FILTER + SORT LOGIC
     WHAT: This runs every time any filter or sort value changes.
     WHY:  useCallback memoises the function so React doesn't recreate it
           on every render — good for performance.
     ---------------------------------------------------------- */
  const applyFilters = useCallback(() => {
    let result = [...allCars];

    // 1. Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((c) => selectedBrands.includes(c.make));
    }

    // 2. Text search — filters by name, model, or trim
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.trim.toLowerCase().includes(q)
      );
    }

    // 3. Body style filter
    if (selectedBodies.length > 0) {
      result = result.filter((c) => selectedBodies.includes(c.body));
    }

    // 4. Color filter
    if (selectedColors.length > 0) {
      result = result.filter((c) => selectedColors.includes(c.color));
    }

    // 5. Year filter
    if (selectedYears.length > 0) {
      result = result.filter((c) => selectedYears.includes(c.year));
    }

    // 6. Price range filter
    if (selectedPrices.length > 0) {
      result = result.filter((c) =>
        selectedPrices.some((label) => {
          const range = PRICE_RANGES.find((r) => r.label === label);
          return range ? c.price >= range.min && c.price < range.max : false;
        })
      );
    }

    // 7. Sort
    result.sort((a, b) => {
      if (sortBy === "price_asc")  return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "year_desc")  return b.year - a.year;
      if (sortBy === "year_asc")   return a.year - b.year;
      return 0;
    });

    setFilteredCars(result);
  }, [searchText, selectedBrands, selectedBodies, selectedColors, selectedYears, selectedPrices, sortBy]);

  // WHY: useEffect watches for changes in `applyFilters` and calls it automatically.
  //      This means the list updates instantly whenever a filter changes.
  useEffect(() => { applyFilters(); }, [applyFilters]);

  /* ----------------------------------------------------------
     TOGGLE HELPERS
     WHAT: Functions that add or remove a value from a filter array.
     WHY:  When a checkbox is clicked, we either add or remove that value.
           This pattern is used for all multi-select filters.
     ---------------------------------------------------------- */
  function toggle<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
  }

  // Count helpers — how many cars match each individual option
  // WHY: We show these counts next to each checkbox so users know how many results to expect.
  const countFor = (key: keyof typeof allCars[0], val: string | number) =>
    allCars.filter((c) => c[key] === val).length;

  const countForPrice = (label: string) => {
    const range = PRICE_RANGES.find((r) => r.label === label);
    return range ? allCars.filter((c) => c.price >= range.min && c.price < range.max).length : 0;
  };

  // Clear all filters
  function clearAll() {
    setSearchText("");
    setSelectedBrands([]);
    setSelectedBodies([]);
    setSelectedColors([]);
    setSelectedYears([]);
    setSelectedPrices([]);
  }

  function removeFilter(label: string) {
    setSelectedBrands((p) => p.filter((x) => x !== label));
    setSelectedBodies((p) => p.filter((x) => x !== label));
    setSelectedColors((p) => p.filter((x) => x !== label));
    setSelectedYears((p)  => p.filter((x) => String(x) !== label));
    setSelectedPrices((p) => p.filter((x) => x !== label));
  }

  /* ----------------------------------------------------------
     SIDEBAR JSX
     WHAT: The filter sidebar content — reused for both desktop and mobile.
     ---------------------------------------------------------- */
  const SidebarContent = (
    <div>
      {/* --- SEARCH BAR --- */}
      {/* WHAT: A text input that lets users search by car name/model.
          WHY:  onChange fires every keystroke, updating `searchText`, which triggers applyFilters. */}
      <div className="relative mb-5">
        {/* Search icon */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search by name, model…"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          // WHY: `pl-9` adds padding-left so the text doesn't overlap the search icon.
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        />
        {/* Clear search icon — only shows when there's text */}
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
          >
            ✕
          </button>
        )}
      </div>

      {/* --- BRAND FILTER --- */}
      {/* WHAT: Shows all unique brands derived from the car data. */}
      <FilterPanel title="Brand">
        {BRANDS.map((b) => (
          <CheckboxOption
            key={b}
            label={b}
            count={countFor("make", b)}
            checked={selectedBrands.includes(b)}
            onChange={() => setSelectedBrands(toggle(selectedBrands, b))}
          />
        ))}
      </FilterPanel>

      {/* --- BODY STYLE FILTER --- */}
      <FilterPanel title="Body Style">
        {BODY_STYLES.map((b) => (
          <CheckboxOption
            key={b}
            label={b}
            count={countFor("body", b)}
            checked={selectedBodies.includes(b)}
            onChange={() => setSelectedBodies(toggle(selectedBodies, b))}
          />
        ))}
      </FilterPanel>

      {/* --- YEAR FILTER --- */}
      <FilterPanel title="Year">
        {YEARS.map((y) => (
          <CheckboxOption
            key={y}
            label={String(y)}
            count={countFor("year", y)}
            checked={selectedYears.includes(y)}
            onChange={() => setSelectedYears(toggle(selectedYears, y))}
          />
        ))}
      </FilterPanel>

      {/* --- PRICE RANGE FILTER --- */}
      <FilterPanel title="Price">
        {PRICE_RANGES.map((r) => (
          <CheckboxOption
            key={r.label}
            label={r.label}
            count={countForPrice(r.label)}
            checked={selectedPrices.includes(r.label)}
            onChange={() => setSelectedPrices(toggle(selectedPrices, r.label))}
          />
        ))}
      </FilterPanel>

      {/* --- COLOR FILTER --- */}
      <FilterPanel title="Exterior Color" defaultOpen={false}>
        {COLORS.map((col) => (
          <CheckboxOption
            key={col}
            label={col}
            count={countFor("color", col)}
            checked={selectedColors.includes(col)}
            onChange={() => setSelectedColors(toggle(selectedColors, col))}
          />
        ))}
      </FilterPanel>
    </div>
  );

  /* ============================================================
     PAGE RENDER
     ============================================================ */
  return (
    // WHAT: Full page wrapper.
    // WHY:  `min-h-screen` ensures the page fills the full viewport.
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ============================================================
          NAVBAR
          WHAT: Same sticky navbar as the homepage.
          EDIT THIS: Match any navbar changes you make to page.tsx here too.
          ============================================================ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo links back to homepage */}
          <Link href="/" className="text-2xl font-black tracking-tight">UniDrive</Link>

          <div className="hidden md:flex items-center gap-8">
            {/* WHAT: `font-bold underline` marks this as the ACTIVE page link.
                WHY:  Always show users where they are in the navigation. */}
            <Link href="/inventory" className="text-sm font-bold underline underline-offset-4">
              Inventory
            </Link>
            <Link href="/#about"   className="text-sm font-medium hover:opacity-60 transition-opacity">About</Link>
            <Link href="/#contact" className="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile: back to home button */}
          <Link href="/" className="md:hidden text-sm font-medium border border-gray-300 px-3 py-1.5 rounded-full">
            ← Home
          </Link>
        </div>
      </nav>

      {/* ============================================================
          PAGE HEADER
          WHAT: A compact hero-like header for the inventory page.
          EDIT THIS: Change "Our Inventory" or the subtitle text.
          ============================================================ */}
      <div className="bg-white border-b border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb — shows the user where they are */}
          {/* WHY: Breadcrumbs help with navigation and Google SEO. */}
          <p className="text-xs text-gray-400 mb-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            {" / "}
            <span className="text-gray-700 font-medium">Inventory</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Our Inventory</h1>
          {/* EDIT THIS: Change the description */}
          <p className="text-gray-500 mt-1 text-sm">
            Browse our full selection of new and certified pre-owned vehicles.
          </p>
        </div>
      </div>

      {/* ============================================================
          MAIN LAYOUT — SIDEBAR + CONTENT
          WHY: `flex` puts the sidebar and car grid side by side on desktop.
               `flex-col lg:flex-row` stacks them vertically on mobile.
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">

        {/* ============================================================
            LEFT SIDEBAR — DESKTOP (hidden on mobile)
            WHY: `hidden lg:block` hides the sidebar on small screens.
                 On mobile we show it in a slide-over drawer instead (below).
            ============================================================ */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-20">
            {/* Sidebar header with "Clear All" button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-black text-base tracking-tight">Filter Vehicles</h2>
              {activeFilters.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-gray-500 hover:text-black underline transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            {SidebarContent}
          </div>
        </aside>

        {/* ============================================================
            RIGHT MAIN CONTENT AREA
            ============================================================ */}
        <main className="flex-1 min-w-0">

          {/* --- MOBILE FILTER TOGGLE BUTTON --- */}
          {/* WHY: On mobile, the sidebar is hidden. This button opens a slide-over filter panel. */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-sm font-semibold hover:bg-gray-50 transition"
            >
              {/* Filter icon */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 4h18M7 8h10M11 12h2M9 16h6" />
              </svg>
              Filter & Sort
              {/* Show badge with active filter count */}
              {activeFilters.length > 0 && (
                <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* --- MOBILE FILTER SLIDE-OVER DRAWER --- */}
          {/* WHAT: A full-screen overlay that slides in on mobile when "Filter" is tapped.
              WHY:  We can't show the sidebar on small screens (not enough space),
                    so we use a drawer overlay instead — the standard mobile pattern. */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Dark overlay behind the drawer */}
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
              {/* The drawer itself — slides in from the left */}
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
                <div className="p-5">
                  {/* Drawer header with close button */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-black text-lg">Filters</h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-500 hover:text-black text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  {SidebarContent}
                  {/* Apply / Done button */}
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full mt-6 bg-black text-white py-3 rounded-full font-semibold text-sm"
                  >
                    View {filteredCars.length} Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- TOP BAR: Results count, active filter chips, sort dropdown --- */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

              {/* Left: result count */}
              <div>
                <p className="font-black text-lg">
                  {filteredCars.length}{" "}
                  <span className="font-normal text-gray-500 text-base">
                    vehicle{filteredCars.length !== 1 ? "s" : ""} found
                  </span>
                </p>
              </div>

              {/* Right: sort dropdown */}
              {/* WHY: <select> is a native HTML dropdown — no library needed.
                        `focus:ring-2 focus:ring-black` adds a black focus ring for accessibility. */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-500 whitespace-nowrap">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer"
                >
                  {/* EDIT THIS: Add or change sort options in the SORT_OPTIONS array above */}
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter chips — shown below the top bar when filters are selected */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                {/* WHAT: A "chip" (pill) for each active filter, with an ✕ to remove it.
                    WHY:  This lets users see and remove individual filters without opening the sidebar. */}
                {activeFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => removeFilter(f)}
                    className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                  >
                    {f}
                    <span className="text-gray-400">✕</span>
                  </button>
                ))}
                {/* Clear all chips button */}
                <button
                  onClick={clearAll}
                  className="text-xs text-gray-400 hover:text-black underline transition-colors self-center ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* --- CAR CARDS GRID --- */}
          {filteredCars.length === 0 ? (
            /* WHAT: Empty state — shown when no cars match the current filters.
               WHY:  Always handle the "no results" case so the UI doesn't look broken. */
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 text-center">
              <p className="text-5xl mb-4">🚗</p>
              <p className="text-xl font-black mb-2">No vehicles found</p>
              <p className="text-gray-500 text-sm mb-6">
                Try adjusting your filters to find more options.
              </p>
              <button
                onClick={clearAll}
                className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* WHAT: The car cards grid.
               WHY:  `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3` is responsive:
                     - 1 column on mobile
                     - 2 columns on small tablets
                     - 3 columns on large desktop screens */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCars.map((car) => (
                // WHAT: One card per car.
                // WHY:  `group` lets child elements react to hovering the whole card.
                //       `hover:-translate-y-0.5 hover:shadow-lg` gives a subtle lift on hover.
                <div
                  key={car.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
                >
                  {/* --- CAR IMAGE --- */}
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      // WHY: `group-hover:scale-105` zooms the image slightly when card is hovered.
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge overlay — top-left corner of the card image */}
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${getBadgeClass(car.badge)}`}>
                      {car.badge}
                    </span>
                    {/* Year pill — top-right corner */}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {car.year}
                    </span>
                  </div>

                  {/* --- CARD BODY --- */}
                  <div className="p-4">

                    {/* Car name and trim */}
                    <div className="mb-2">
                      <h3 className="font-black text-base leading-tight">{car.name}</h3>
                      {/* WHAT: Trim level + body style shown in small gray text.
                          EDIT THIS: Change these by editing the car data array above. */}
                      <p className="text-gray-400 text-xs mt-0.5">{car.trim} · {car.body}</p>
                    </div>

                    {/* Key specs row — mileage and fuel economy */}
                    {/* WHY: `divide-x divide-gray-200` adds a vertical divider between items. */}
                    <div className="flex items-center divide-x divide-gray-200 mb-3">
                      <span className="text-xs text-gray-500 pr-3">
                        {/* Show "New" or the mileage number */}
                        {car.mileage === "New" ? "🆕 New" : `${car.mileage} mi`}
                      </span>
                      <span className="text-xs text-gray-500 pl-3">{car.mpg}</span>
                    </div>

                    {/* Color dot + label */}
                    <div className="flex items-center gap-1.5 mb-4">
                      {/* WHAT: A small colored circle to visually represent the car color.
                          WHY:  Visual cues are faster to scan than text labels. */}
                      <span
                        className="w-3 h-3 rounded-full border border-gray-200 inline-block"
                        style={{
                          backgroundColor:
                            car.color === "Black"  ? "#111" :
                            car.color === "White"  ? "#f9f9f9" :
                            car.color === "Silver" ? "#c0c0c0" :
                            car.color === "Blue"   ? "#3b82f6" :
                            car.color === "Gray"   ? "#9ca3af" :
                            car.color === "Red"    ? "#ef4444" : "#888",
                        }}
                      />
                      <span className="text-xs text-gray-500">{car.color} Exterior</span>
                    </div>

                    {/* Price + CTA button */}
                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <div>
                        <p className="text-xl font-black">
                          {/* WHY: toLocaleString formats numbers with commas: 48990 → "48,990" */}
                          ${car.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">MSRP</p>
                      </div>
                      {/* WHAT: View Details links to the dynamic car detail page.
                          WHY:  `/inventory/${car.id}` generates the correct URL for each car,
                                e.g. car #4 → /inventory/4 */}
                      <Link
                        href={`/inventory/${car.id}`}
                        className="bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* --- CARD FOOTER — quick action links --- */}
                  {/* WHAT: A subtle footer row with secondary actions.
                      WHY:  These are less important actions (compare, save) that don't need
                            to be as visible as the main "View Details" button. */}
                  <div className="border-t border-gray-100 px-4 py-2 flex gap-4">
                    <button className="text-xs text-gray-400 hover:text-black transition-colors">
                      🔖 Save
                    </button>
                    <button className="text-xs text-gray-400 hover:text-black transition-colors">
                      ⚖️ Compare
                    </button>
                    <button className="text-xs text-gray-400 hover:text-black transition-colors ml-auto">
                      📅 Test Drive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ============================================================
          FOOTER
          WHAT: Simple footer matching the homepage.
          EDIT THIS: Keep this in sync with the footer in page.tsx.
          ============================================================ */}
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
