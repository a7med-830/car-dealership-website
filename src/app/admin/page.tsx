"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../page-styles.css"; // Reuse the main site's CSS variables and fonts

// Simple SVG Icons
const Icons = {
  Dashboard: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><rect width="7" height="9" x="3" y="3"/><rect width="7" height="5" x="14" y="3"/><rect width="7" height="9" x="14" y="12"/><rect width="7" height="5" x="3" y="16"/></svg>
  ),
  Car: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><path d="M19 17h2v-4c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v5h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
  ),
  FileText: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><path d="M15 2H6v20h12V7Z"/><path d="M14 2v5h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
  ),
  CalendarCheck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><rect width="18" height="18" x="3" y="4"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
  ),
  LogOut: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><path d="M9 21H5V3h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
  ),
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
  ),
  Edit: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><path d="M12 20h9"/><path d="M16.5 3.5l4 4L7 21l-4 1 1-4L16.5 3.5z"/></svg>
  ),
  Trash: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" {...props}><path d="M3 6h18"/><path d="M19 6v14H5V6"/><path d="M8 6V4h8v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  ),
};

type Tab = "overview" | "vehicles" | "news" | "bookings";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (!isLoggedIn) {
    return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#000000] text-[#ffffff] overflow-hidden" style={{ fontFamily: "var(--font-body)" }}>
      {/* Sidebar - Sharp, Dark, Minimal */}
      <aside className="w-70 bg-[#080808] border-r border-[#ffffff20] flex flex-col">
        {/* Logo Area */}
        <div className="h-25 flex items-center justify-center border-b border-[#ffffff15]">
          <Link href="/" className="flex flex-col items-center group cursor-pointer text-decoration-none">
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "0.22em", color: "var(--white)", fontWeight: 500, margin: 0 }}>
              UNIDRIVE
            </h1>
            <span style={{ fontSize: 7, letterSpacing: "0.35em", color: "var(--gold)", marginTop: 4, fontWeight: 500 }}>
              ADMINISTRATION
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-10 flex flex-col gap-2 overflow-y-auto px-6">
          <SidebarItem 
            icon={<Icons.Dashboard className="w-5 h-5" />} 
            label="DASHBOARD" 
            isActive={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <SidebarItem 
            icon={<Icons.Car className="w-5 h-5" />} 
            label="VEHICLES" 
            isActive={activeTab === "vehicles"} 
            onClick={() => setActiveTab("vehicles")} 
          />
          <SidebarItem 
            icon={<Icons.FileText className="w-5 h-5" />} 
            label="PRESS & NEWS" 
            isActive={activeTab === "news"} 
            onClick={() => setActiveTab("news")} 
          />
          <SidebarItem 
            icon={<Icons.CalendarCheck className="w-5 h-5" />} 
            label="APPOINTMENTS" 
            isActive={activeTab === "bookings"} 
            onClick={() => setActiveTab("bookings")} 
          />
        </nav>

        {/* Footer actions */}
        <div className="p-6 border-t border-[#ffffff15]">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-4 w-full py-3 text-[#5a5a5a] hover:text-[#ffffff] transition-colors"
            style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 500 }}
          >
            <Icons.LogOut className="w-4 h-4" />
            <span>SECURE LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000000]">
        
        {/* Top Header */}
        <header className="h-25 px-8 md:px-16 lg:px-24 flex items-center justify-between border-b border-[#ffffff15] bg-[#080808]/50 backdrop-blur-md sticky top-0 z-10">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "0.1em", color: "var(--white)", fontWeight: 400, textTransform: "uppercase" }}>
            {activeTab === 'overview' ? 'DASHBOARD' : activeTab}
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Icons.Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5a5a]" />
              <input 
                type="text" 
                placeholder="SEARCH RECORDS..." 
                className="pl-12 pr-4 py-3 bg-[#111111] border border-[#ffffff15] text-[#ffffff] focus:outline-none focus:border-[#b8965a] transition-colors w-75"
                style={{ fontSize: 9, letterSpacing: "0.2em" }}
              />
            </div>
            
            <div className="w-10 h-10 border border-[#ffffff20] flex items-center justify-center bg-[#111111] hover:border-[#b8965a] transition-colors cursor-pointer">
              <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--gold)" }}>A</span>
            </div>
          </div>
        </header>

        {/* scrollable View */}
        <div className="flex-1 overflow-y-auto p-8 md:p-16 lg:p-24 custom-scrollbar">
          <div className="max-w-360 mx-auto">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "vehicles" && <VehiclesTab />}
            {activeTab === "news" && <NewsTab />}
            {activeTab === "bookings" && <BookingsTab />}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────────────────

function SidebarItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full px-4 py-4 transition-all duration-300 relative group text-left"
    >
      <div className={`transition-colors duration-300 ${isActive ? "text-[#b8965a]" : "text-[#5a5a5a] group-hover:text-[#ffffff]"}`}>
        {icon}
      </div>
      <span 
        style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 500 }}
        className={`transition-colors duration-300 ${isActive ? "text-[#ffffff]" : "text-[#5a5a5a] group-hover:text-[#ffffff]"}`}
      >
        {label}
      </span>
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#b8965a]" />
      )}
    </button>
  );
}

// ─── Views ────────────────────────────────────────────────────────────────────

function LoginView({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] relative overflow-hidden font-sans">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image 
          src="/Images-home/photo-1503376780353-7e6692767b70.jpg" 
          alt="Login Background" 
          fill 
          style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(120%)' }}
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#000000] via-[#000000]/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-120 p-10 bg-[#080808]/90 backdrop-blur-md border border-[#ffffff15] shadow-2xl">
        
        <div className="mb-12 text-center flex flex-col items-center">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "0.22em", color: "var(--white)", fontWeight: 500, margin: 0 }}>
            UNIDRIVE
          </h1>
          <span style={{ fontSize: 7, letterSpacing: "0.35em", color: "var(--gold)", marginTop: 6, fontWeight: 500 }}>
            SECURE PORTAL
          </span>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-3">
            <label style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)", textTransform: "uppercase" }}>
              Administrator Email
            </label>
            <input 
              type="email" 
              defaultValue="admin@unidrive.com"
              className="w-full px-5 py-4 bg-[#111111] border border-[#ffffff15] focus:outline-none focus:border-[#b8965a] text-[#ffffff] transition-colors"
              style={{ fontSize: 11, letterSpacing: "0.05em" }}
              required
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)", textTransform: "uppercase" }}>
                Password
              </label>
              <a href="#" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--dim)", textTransform: "uppercase" }} className="hover:text-[#ffffff] transition-colors">
                Recover Access
              </a>
            </div>
            <input 
              type="password" 
              defaultValue="luxurydrive2026"
              className="w-full px-5 py-4 bg-[#111111] border border-[#ffffff15] focus:outline-none focus:border-[#b8965a] text-[#ffffff] transition-colors"
              style={{ fontSize: 11, letterSpacing: "0.05em" }}
              required
            />
          </div>

          <div className="pt-4">
             <button 
              type="submit"
              className="w-full m-btn cursor-pointer py-4"
              style={{ display: "block", textAlign: "center", width: "100%" }}
            >
              AUTHENTICATE
            </button>
          </div>
        </form>
        
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#5a5a5a] hover:text-[#ffffff] transition-colors" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            <Icons.LogOut className="w-3 h-3 rotate-180" />
            RETURN TO SHOWROOM
          </Link>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  const stats = [
    { label: "TOTAL INVENTORY", value: "42", change: "+3", trend: "up" },
    { label: "PENDING APPOINTMENTS", value: "12", change: "+2", trend: "up" },
    { label: "PRESS RELEASES", value: "28", change: "0", trend: "neutral" },
    { label: "TOTAL INQUIRIES", value: "1,402", change: "+15%", trend: "up" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#080808] border border-[#ffffff15] p-8 relative overflow-hidden group hover:border-[#ffffff30] transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#b8965a]/5 -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            
            <h3 style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)", marginBottom: 16 }}>{stat.label}</h3>
            
            <div className="flex items-end justify-between">
              <span style={{ fontFamily: "var(--font-display)", fontSize: 42, color: "var(--white)", lineHeight: 1 }}>{stat.value}</span>
              <span 
                style={{ fontSize: 10, letterSpacing: "0.1em" }}
                className={stat.trend === 'up' ? 'text-[#b8965a]' : 'text-[#888888]'}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart placeholder */}
        <div className="lg:col-span-2 bg-[#080808] border border-[#ffffff15] p-8 h-100 flex flex-col items-center justify-center text-[#5a5a5a]">
           <Icons.Dashboard className="w-10 h-10 mb-6 opacity-30" />
           <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>Analytics Visualization Node</p>
        </div>
        
        {/* Activity Feed */}
        <div className="bg-[#080808] border border-[#ffffff15] p-8 h-100 overflow-hidden flex flex-col">
          <h3 style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 32 }}>RECENT ACTIVITY</h3>
          
          <div className="space-y-6 flex-1 overflow-y-auto pr-4 custom-scrollbar">
            {[
              { e: "New Test Drive Request", t: "Rolls-Royce Cullinan II", time: "2 HOURS AGO" },
              { e: "Inventory Updated", t: "Porsche Panamera Carbon", time: "5 HOURS AGO" },
              { e: "Press Release Published", t: "Mansory Body Kits", time: "1 DAY AGO" },
              { e: "Inquiry Received", t: "Aston Martin DB12", time: "2 DAYS AGO" },
              { e: "Vehicle Sold", t: "Mercedes-Maybach S-Class", time: "3 DAYS AGO" },
            ].map((act, i) => (
              <div key={i} className="flex gap-4 items-start pb-6 border-b border-[#ffffff05] last:border-0 last:pb-0">
                <div className="w-1.5 h-1.5 mt-2 bg-[#b8965a] shrink-0" />
                <div>
                  <p style={{ fontSize: 12, color: "var(--light)", lineHeight: 1.5 }}>
                    {act.e}: <span style={{ color: "var(--white)" }}>{act.t}</span>
                  </p>
                  <p style={{ fontSize: 8, letterSpacing: "0.15em", color: "var(--dim)", marginTop: 8 }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VehiclesTab() {
  const dummyCars = [
    { id: "V-9012", name: "ULTRA LUXURY CULLINAN II", make: "Rolls-Royce", price: "POA", status: "AVAILABLE" },
    { id: "V-9013", name: "PORSCHE PANAMERA CARBON EDITION", make: "Porsche", price: "$285,000", status: "AVAILABLE" },
    { id: "V-9014", name: "MERCEDES-MAYBACH S-CLASS", make: "Mercedes-Maybach", price: "$320,000", status: "RESERVED" },
    { id: "V-9015", name: "FERRARI PUROSANGUE SOFT KIT", make: "Ferrari", price: "POA", status: "SOLD OUT" },
    { id: "V-9016", name: "BMW 8 SERIES WIDEBODY", make: "BMW", price: "$195,000", status: "AVAILABLE" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-[#ffffff15] pb-6">
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.3em", color: "var(--gold)", marginBottom: 8 }}>
            INVENTORY
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "0.06em", color: "var(--white)", fontWeight: 400 }}>
            FLEET MANAGEMENT
          </h2>
        </div>
        <button className="m-btn-fill flex items-center gap-2">
          <Icons.Plus className="w-3 h-3" />
          ADD VEHICLE
        </button>
      </div>

      <div className="bg-[#080808] border border-[#ffffff15]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111111] border-b border-[#ffffff15]">
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>REF</th>
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>MODEL</th>
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>BRAND</th>
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>PRICE</th>
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>STATUS</th>
                <th className="px-8 py-6 font-normal text-right" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {dummyCars.map((car) => (
                <tr key={car.id} className="border-b border-[#ffffff08] hover:bg-[#ffffff05] transition-colors">
                  <td className="px-8 py-6" style={{ fontSize: 11, color: "var(--dim)" }}>{car.id}</td>
                  <td className="px-8 py-6" style={{ fontSize: 12, color: "var(--white)", fontWeight: 500 }}>{car.name}</td>
                  <td className="px-8 py-6" style={{ fontSize: 11, color: "var(--light)" }}>{car.make}</td>
                  <td className="px-8 py-6" style={{ fontSize: 12, color: "var(--gold)" }}>{car.price}</td>
                  <td className="px-8 py-6">
                    <span 
                      style={{ fontSize: 8, letterSpacing: "0.15em", padding: "4px 8px" }}
                      className={`inline-block border ${
                        car.status === 'AVAILABLE' ? 'border-[#b8965a]/40 text-[#b8965a]' :
                        car.status === 'SOLD OUT' ? 'border-[#ffffff20] text-[#5a5a5a]' :
                        'border-[#ffffff50] text-[#ffffff]'
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-4">
                    <button className="text-[#5a5a5a] hover:text-[#b8965a] transition-colors"><Icons.Edit /></button>
                    <button className="text-[#5a5a5a] hover:text-[#ffffff] transition-colors"><Icons.Trash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-6 border-t border-[#ffffff15] flex items-center justify-between">
          <span style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--dim)" }}>SHOWING 1-5 OF 42</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 border border-[#ffffff15] flex items-center justify-center text-[#5a5a5a] hover:text-[#ffffff] hover:border-[#ffffff50] transition-colors text-xs">&lt;</button>
            <button className="w-8 h-8 border border-[#b8965a] flex items-center justify-center text-[#b8965a] text-xs">1</button>
            <button className="w-8 h-8 border border-[#ffffff15] flex items-center justify-center text-[#5a5a5a] hover:text-[#ffffff] hover:border-[#ffffff50] transition-colors text-xs">2</button>
            <button className="w-8 h-8 border border-[#ffffff15] flex items-center justify-center text-[#5a5a5a] hover:text-[#ffffff] hover:border-[#ffffff50] transition-colors text-xs">3</button>
            <button className="w-8 h-8 border border-[#ffffff15] flex items-center justify-center text-[#5a5a5a] hover:text-[#ffffff] hover:border-[#ffffff50] transition-colors text-xs">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsTab() {
  const dummyNews = [
    { id: 1, title: "THE FERRARI PUROSANGUE SOFT KIT", date: "FEBRUARY 13, 2026", cat: "BODY KITS", status: "PUBLISHED" },
    { id: 2, title: "PORSCHE TAYCAN TURBO S ARRIVES", date: "JANUARY 28, 2026", cat: "NEWS", status: "DRAFT" },
    { id: 3, title: "CULLINAN SERIES II — LINEA D'ARABO COLLECTION", date: "JANUARY 09, 2026", cat: "ATELIER", status: "PUBLISHED" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-[#ffffff15] pb-6">
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.3em", color: "var(--gold)", marginBottom: 8 }}>
            PRESS
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "0.06em", color: "var(--white)", fontWeight: 400 }}>
            NEWS & RELEASES
          </h2>
        </div>
        <button className="m-btn-fill flex items-center gap-2">
          <Icons.Plus className="w-3 h-3" />
          NEW ARTICLE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyNews.map(news => (
          <div key={news.id} className="bg-[#080808] border border-[#ffffff15] p-8 group hover:border-[#ffffff30] transition-colors flex flex-col justify-between h-70">
            <div>
               <div className="flex justify-between items-start mb-6">
                <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--dim)" }}>{news.date}</span>
                <span 
                  style={{ fontSize: 8, letterSpacing: "0.15em", padding: "4px 8px" }}
                  className={`inline-block border ${
                    news.status === 'PUBLISHED' ? 'border-[#b8965a]/40 text-[#b8965a]' : 'border-[#ffffff20] text-[#5a5a5a]'
                  }`}
                >
                  {news.status}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 300, color: "var(--white)", lineHeight: 1.4 }}>
                {news.title}
              </h3>
            </div>
           
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#ffffff10]">
               <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)" }}>{news.cat}</span>
               <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[#5a5a5a] hover:text-[#b8965a] transition-colors"><Icons.Edit /></button>
                <button className="text-[#5a5a5a] hover:text-[#ffffff] transition-colors"><Icons.Trash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingsTab() {
  const dummyBookings = [
    { id: "AP-1029", name: "Alexander Sterling", car: "BMW M8 COMPETITION", date: "TOMORROW, 10:00 AM", status: "CONFIRMED" },
    { id: "AP-1030", name: "Victoria Chase", car: "FERRARI PUROSANGUE", date: "OCT 28, 2:30 PM", status: "PENDING" },
    { id: "AP-1031", name: "Marcus Wright", car: "PORSCHE PANAMERA", date: "OCT 29, 11:00 AM", status: "PENDING" },
    { id: "AP-1028", name: "Eleanor Vance", car: "MAYBACH S-CLASS", date: "TODAY, 4:00 PM", status: "COMPLETED" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-[#ffffff15] pb-6">
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.3em", color: "var(--gold)", marginBottom: 8 }}>
            CLIENTS
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "0.06em", color: "var(--white)", fontWeight: 400 }}>
            APPOINTMENTS
          </h2>
        </div>
      </div>

       <div className="bg-[#080808] border border-[#ffffff15]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111111] border-b border-[#ffffff15]">
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>REF</th>
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>CLIENT</th>
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>MODEL OF INTEREST</th>
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>SCHEDULE</th>
                <th className="px-8 py-6 font-normal" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>STATUS</th>
                <th className="px-8 py-6 font-normal text-right" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--mid)" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {dummyBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-[#ffffff08] hover:bg-[#ffffff05] transition-colors">
                  <td className="px-8 py-6" style={{ fontSize: 11, color: "var(--dim)" }}>{booking.id}</td>
                  <td className="px-8 py-6" style={{ fontSize: 12, color: "var(--white)", fontWeight: 500 }}>{booking.name}</td>
                  <td className="px-8 py-6" style={{ fontSize: 11, color: "var(--light)" }}>{booking.car}</td>
                  <td className="px-8 py-6">
                     <span style={{ fontSize: 10, letterSpacing: "0.05em", color: "var(--mid)" }}>{booking.date}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span 
                      style={{ fontSize: 8, letterSpacing: "0.15em", padding: "4px 8px" }}
                      className={`inline-block border ${
                        booking.status === 'CONFIRMED' ? 'border-[#b8965a]/40 text-[#b8965a]' :
                        booking.status === 'COMPLETED' ? 'border-[#ffffff30] text-[#ffffff]' :
                        'border-[#ffffff10] text-[#5a5a5a]'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="m-btn py-2 px-4">
                      MANAGE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
