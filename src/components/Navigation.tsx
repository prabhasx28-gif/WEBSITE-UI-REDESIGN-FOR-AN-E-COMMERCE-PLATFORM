/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight, Laptop, Briefcase, Watch, Headphones, LayoutGrid, Tag } from "lucide-react";
import { Category } from "../types";
import { categoriesList, productsList } from "../data/products";

interface NavigationProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onSelectTab: (tab: "home" | "products" | "account" | "orders") => void;
  activeTab: "home" | "products" | "account" | "orders";
  onHeuristicClick: (id: string) => void;
  sessionUser?: { name: string; avatar: string } | null;
  onLogout?: () => void;
}

export default function Navigation({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onSelectTab,
  activeTab,
  onHeuristicClick,
  sessionUser,
  onLogout
 }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDesktopSuggestions, setShowDesktopSuggestions] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);

  // Filter products and categories dynamically for real-time autocomplete suggestions
  const getSuggestions = (query: string) => {
    if (!query.trim()) return { products: [], categories: [] };
    const lowerQuery = query.toLowerCase();

    // Find products whose name, description, or category matches the query
    const matchedProducts = productsList.filter((product) => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);

    // Find categories whose name or description match the query
    const matchedCategories = categoriesList.filter((cat) => 
      cat.id !== "all" && (
        cat.name.toLowerCase().includes(lowerQuery) ||
        cat.description.toLowerCase().includes(lowerQuery)
      )
    ).slice(0, 3);

    return { products: matchedProducts, categories: matchedCategories };
  };

  const suggestions = getSuggestions(searchQuery);

  const renderSuggestionsDropdown = (isMobile: boolean, closeDropdown: () => void) => {
    if (!searchQuery.trim()) return null;

    return (
      <div 
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-150 shadow-[0_15px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50 animate-subtle-slide-up text-left max-h-[380px] overflow-y-auto scrollbar-none"
        id={isMobile ? "mobile-search-autocomplete" : "desktop-search-autocomplete"}
      >
        {/* Header Indicator */}
        <div className="bg-slate-50 px-3.5 py-1.5 border-b border-gray-100 flex justify-between items-center text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider select-none">
          <span>Search Suggestions</span>
          <span className="text-primary-600">Recognition vs Recall</span>
        </div>

        {/* Categories Match */}
        {suggestions.categories.length > 0 && (
          <div className="p-2 border-b border-gray-50 bg-slate-50/20">
            <span className="text-[10px] font-bold text-gray-400 px-2 font-mono uppercase tracking-wider block mb-1">Suggested Categories</span>
            <div className="flex flex-wrap gap-1.5 p-1">
              {suggestions.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onMouseDown={() => {
                    onSelectCategory(cat.id);
                    onSearchChange(""); // Reset search query when targeting a full category
                    onSelectTab("products");
                    closeDropdown();
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 text-gray-700 hover:text-gray-900 text-[10px] font-medium rounded-full flex items-center gap-1.5 cursor-pointer transition-all border border-gray-200 shadow-sm"
                >
                  <Tag className="w-2.5 h-2.5 shrink-0 text-primary-600" />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Match */}
        {suggestions.products.length > 0 ? (
          <div className="p-1">
            <span className="text-[10px] font-bold text-gray-450 px-3 py-1 font-mono uppercase tracking-wider block">Suggested Products</span>
            <div className="space-y-0.5">
              {suggestions.products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onMouseDown={() => {
                    onSearchChange(product.name);
                    onSelectTab("products");
                    closeDropdown();
                  }}
                  className="w-full flex items-center gap-3 p-2 hover:bg-slate-50/80 rounded-xl transition-all text-left cursor-pointer group"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-8 h-8 rounded-lg object-cover bg-slate-100 border border-gray-100 shrink-0 group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-secondary truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </p>
                    <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest text-[8px] truncate">
                      {product.category}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-xs text-secondary group-hover:text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-[9px] text-gray-450 line-through block leading-none">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          suggestions.categories.length === 0 && (
            <div className="py-6 px-4 text-center">
              <span className="text-sm block">🔍</span>
              <p className="text-[11px] font-medium text-gray-600 mt-1">
                No matching titles or categories
              </p>
              <p className="text-[9px] text-gray-450 mt-0.5 max-w-[200px] mx-auto">
                Try searching for keys like <span className="font-mono bg-slate-50 px-1 rounded font-semibold text-gray-650 text-slate-700">headphones</span> or <span className="font-mono bg-slate-50 px-1 rounded font-semibold text-gray-650 text-slate-700">keyboard</span>
              </p>
            </div>
          )
        )}
      </div>
    );
  };

  // Map icon names to Lucide icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Laptop": return <Laptop className="w-4 h-4" />;
      case "Briefcase": return <Briefcase className="w-4 h-4" />;
      case "Watch": return <Watch className="w-4 h-4" />;
      case "Headphones": return <Headphones className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm" id="main-navigation-bar">
      {/* Promotion Bar / Heuristic Signal */}
      <div className="bg-secondary px-4 py-1.5 text-center text-[11px] font-mono tracking-wider text-amber-400 flex justify-between items-center">
        <span className="hidden sm:inline">● COMPLIANT SYSTEM STATUS (HEURISTIC AUDITED)</span>
        <span className="mx-auto sm:mx-0">REDESIGNED: 3.5X FASTER PRODUCTS FUNNEL</span>
        <button 
          onClick={() => onHeuristicClick("h1")}
          className="text-white hover:text-primary transition-colors hover:underline text-[11px] flex items-center gap-1 font-sans font-semibold cursor-pointer"
        >
          Inspect Status Feedback Heuristic <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => { onSelectTab("home"); onSelectCategory("all"); }}
              className="flex items-center gap-2 group cursor-pointer"
              id="brand-logo"
            >
              <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg shadow-md group-hover:bg-primary-700 transition-colors">
                L
              </div>
              <div className="text-left">
                <span className="font-bold text-lg text-secondary tracking-tight block">LUMINA</span>
                <span className="text-[9px] text-gray-400 block -mt-1 uppercase tracking-widest font-mono">Redesigned v2.0</span>
              </div>
            </button>

            {/* Desktop main Links */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => { onSelectTab("home"); }}
                className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === "home" ? "text-primary border-b-2 border-primary py-1" : "text-gray-500 hover:text-gray-950"}`}
              >
                Home
              </button>
              <button 
                onClick={() => { onSelectTab("products"); }}
                className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === "products" ? "text-primary border-b-2 border-primary py-1" : "text-gray-500 hover:text-gray-950"}`}
              >
                Browse Collections
              </button>
              <button 
                onClick={() => { onSelectTab("account"); }}
                className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === "account" ? "text-primary border-b-2 border-primary py-1" : "text-gray-500 hover:text-gray-950"}`}
              >
                UX Personas Center
              </button>
            </nav>
          </div>

          {/* Desktop Search Engine - Solves Ch 4 'Recognition Rather than Recall' */}
          <div className="hidden lg:flex max-w-sm w-full relative mx-4" id="search-filter-controls">
            <input
              type="text"
              placeholder="Search specs, fabrics, brands..."
              value={searchQuery}
              onFocus={() => setShowDesktopSuggestions(true)}
              onBlur={() => {
                setTimeout(() => setShowDesktopSuggestions(false), 200);
              }}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeTab !== "products") onSelectTab("products");
                setShowDesktopSuggestions(true);
              }}
              className="w-full pl-9 pr-4 py-1.5 rounded-full border border-gray-200 text-xs text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 focus-within:text-primary transition-colors" />
            {showDesktopSuggestions && renderSuggestionsDropdown(false, () => setShowDesktopSuggestions(false))}
          </div>

          {/* User Console Tools */}
          <div className="flex items-center gap-4">
            {/* Quick search button for tablets/mobile */}
            <div className="flex lg:hidden max-w-[140px] sm:max-w-xs relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onFocus={() => setShowMobileSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => setShowMobileSuggestions(false), 200);
                }}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (activeTab !== "products") onSelectTab("products");
                  setShowMobileSuggestions(true);
                }}
                className="w-full pl-8 pr-3 py-1.5 rounded-full border border-gray-200 text-[11px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
              {showMobileSuggestions && renderSuggestionsDropdown(true, () => setShowMobileSuggestions(false))}
            </div>

            {/* Account Dashboard Button or Session Profile Badge */}
            {sessionUser ? (
              <div className="flex items-center gap-1.5 bg-slate-50 border border-gray-150 p-1 pr-2.5 rounded-full select-none shadow-sm h-9">
                <span className="text-sm bg-white p-1 rounded-full leading-none border border-gray-100 shadow-inner flex items-center justify-center shrink-0 w-7 h-7">
                  {sessionUser.avatar}
                </span>
                <div className="text-left hidden sm:block shrink-0">
                  <p className="text-[10px] font-bold text-secondary truncate max-w-[85px] leading-none">{sessionUser.name}</p>
                  <button 
                    onClick={onLogout}
                    className="text-[9px] text-red-500 hover:text-red-700 font-bold transition-colors block leading-none mt-0.5 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
                {/* Mobile Logout quick button */}
                <button 
                  onClick={onLogout}
                  title="Sign Out"
                  className="sm:hidden text-gray-500 hover:text-red-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onSelectTab("account")}
                title="Account Dashboard"
                className={`p-1.5 rounded-full transition-colors relative cursor-pointer ${activeTab === "account" ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"}`}
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Cart Button (Heuristic Target h1) */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors relative cursor-pointer"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-secondary" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[9px] font-bold animate-bounce ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Burger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Toolbar: Transparent, Horizontal, Mobile-Scrollable */}
      <div className="bg-gray-50/50 border-t border-gray-100 py-2.5 overflow-x-auto scrollbar-none shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 md:gap-3 shrink-0 whitespace-nowrap">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                if (activeTab !== "products") onSelectTab("products");
              }}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-sm ring-1 ring-primary/35 shadow-primary/20"
                  : "bg-white text-gray-600 hover:text-gray-900 border border-gray-100 hover:shadow-sm"
              }`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden border-b border-gray-100 animate-fade-in p-4 z-50">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { onSelectTab("home"); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${activeTab === "home" ? "bg-primary/5 text-primary" : "text-gray-600"}`}
            >
              Home Directory
            </button>
            <button
              onClick={() => { onSelectTab("products"); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${activeTab === "products" ? "bg-primary/5 text-primary" : "text-gray-600"}`}
            >
              Product Catalog
            </button>
            <button
              onClick={() => { onSelectTab("account"); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${activeTab === "account" ? "bg-primary/5 text-primary" : "text-gray-600"}`}
            >
              UX Personas & Usability Core
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
