/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Smartphone,
  CheckCircle,
  TrendingUp,
  Award,
  BookOpen,
  Eye,
  Trash2,
  X,
  CreditCard,
  ChevronRight,
  User,
  AlertTriangle,
  Lightbulb,
  FileText
} from "lucide-react";
import { Product, CartItem, UserPersona, HeuristicIssue } from "./types";
import { productsList, userPersonas, heuristicIssues } from "./data/products";
import Navigation from "./components/Navigation";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutView from "./components/CheckoutView";
import CaseStudyControl from "./components/CaseStudyControl";
import LoginView from "./components/LoginView";
import ThreeDClock from "./components/ThreeDClock";
import OrderTracking, { CompletedOrder } from "./components/OrderTracking";

export default function App() {
  // Authentication Sandbox Session State
  const [sessionUser, setSessionUser] = useState<{ name: string; avatar: string } | null>(null);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"home" | "products" | "account" | "orders">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Commerce Core State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [confirmedOrderCode, setConfirmedOrderCode] = useState("");
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>([
    {
      id: "LUM-198420",
      date: "June 4, 2026",
      total: 239.99,
      count: 2,
      status: "Delivered",
      items: [
        { name: "Lumina Ergo Keyboard Lite", quantity: 1, price: 189.99 },
        { name: "Desk Mat Duo Pro", quantity: 1, price: 50.00 }
      ]
    },
    {
      id: "LUM-758204",
      date: "June 5, 2026",
      total: 129.99,
      count: 1,
      status: "Shipped",
      items: [
        { name: "QuietType Mechanical Switch Set", quantity: 1, price: 129.99 }
      ]
    }
  ]);

  // UX Redesign System Sandbox Parameters
  const [deviceSize, setDeviceSize] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [primaryColor, setPrimaryColor] = useState<string>("#2563EB"); // default vivid blue from chapter 9
  const [activeHeuristicId, setActiveHeuristicId] = useState<string | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Trigger brief alert-toast when cart actions occur (Visibility of system status)
  const showMicroToast = (message: string) => {
    setNotificationToast(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 4000);
  };

  const handleAddToCart = (product: Product, selectedColor?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedColor === selectedColor);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: selectedColor || (product.colors ? product.colors[0] : undefined) }];
    });
    showMicroToast(`"${product.name}" added to cart! Visual status badge updated on top navigation.`);
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
    showMicroToast("Item removed cleanly from shopping tray.");
  };

  const handleHeuristicHighlight = (id: string) => {
    setActiveHeuristicId(id);
    const issue = heuristicIssues.find((h) => h.id === id);
    if (issue) {
      showMicroToast(`HIGHLIGHTING: Heuristic Principle -> ${issue.heuristic}`);
    }
  };

  const executeCheckoutComplete = () => {
    const orderNum = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalCost = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
    const totalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    const orderItems = cartItems.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }));

    setCompletedOrders((prev) => [
      { 
        id: orderNum, 
        date: "June 6, 2026 (Today)", 
        total: totalCost, 
        count: totalCount,
        status: "Processing",
        items: orderItems
      },
      ...prev
    ]);
    setConfirmedOrderCode(orderNum);
    setCartItems([]);
    setShowCheckout(false);
    setOrderCompleted(true);
    showMicroToast("✓ Order checkout fully verified. Transmitted invoice status instantly.");
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    setCompletedOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        let nextStatus: "Processing" | "Shipped" | "Delivered" = order.status;
        if (order.status === "Processing") nextStatus = "Shipped";
        else if (order.status === "Shipped") nextStatus = "Delivered";
        
        showMicroToast(`✓ Shipment for order ${orderId} advanced to "${nextStatus}".`);
        return { ...order, status: nextStatus };
      })
    );
  };

  const handleResetOrderStatus = (orderId: string) => {
    setCompletedOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        showMicroToast(`✓ Reset order ${orderId} tracking milestone back to "Processing".`);
        return { ...order, status: "Processing" };
      })
    );
  };

  const handleSelectProductFromCase = (id: string) => {
    const p = productsList.find((item) => item.id === id);
    if (p) {
      setSelectedDetailProduct(p);
    }
  };

  // Filter products by Category & Keyword
  const filteredProducts = productsList.filter((p) => {
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeHeuristicDetail = heuristicIssues.find((h) => h.id === activeHeuristicId);

  // Apply colors to dynamic variables for nice component styling on-the-fly
  const primaryStyle = { backgroundColor: primaryColor };
  const borderStyle = { borderColor: primaryColor };
  const textStyle = { color: primaryColor };

  if (!sessionUser) {
    return (
      <LoginView
        onLoginSuccess={(name, avatar) => {
          setSessionUser({ name, avatar });
          showMicroToast(`✓ Credentials verified! Welcome to Lumina, ${name}.`);
        }}
        onBypassLogin={() => {
          setSessionUser({ name: "Guest Reviewer", avatar: "🛠️" });
          showMicroToast("Developer mode bypass active.");
        }}
        primaryColor={primaryColor}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans antialiased text-gray-800">
      
      {/* 1. Left Sidebar: Interactive Case Study & Simulation Controls */}
      <CaseStudyControl
        deviceSize={deviceSize}
        setDeviceSize={setDeviceSize}
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        activeHeuristicId={activeHeuristicId}
        setActiveHeuristicId={setActiveHeuristicId}
        onSelectProductById={handleSelectProductFromCase}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setShowCheckout(false);
          setOrderCompleted(false);
        }}
      />

      {/* 2. Right Canvas: E-Commerce Responsive Frame Simulation */}
      <div className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden relative">
        
        {/* Responsive Frame Sandbox Squeezer */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center">
          
          {/* Virtual shell wrapper simulating device framing */}
          <div
            className={`bg-white shadow-2xl overflow-y-auto flex flex-col border border-gray-250 transition-all duration-300 rounded-2xl w-full ${
              deviceSize === "desktop"
                ? "max-w-7xl h-full min-h-[90vh]"
                : deviceSize === "tablet"
                ? "max-w-[768px] h-[95vh] rounded-3xl border-[8px] border-slate-900"
                : "max-w-[375px] h-[85vh] rounded-[40px] border-[12px] border-slate-950 px-1 relative shadow-inner"
            }`}
          >
            {/* If Mobile, simulate notch/status element */}
            {deviceSize === "mobile" && (
              <div className="absolute top-0 inset-x-0 h-5 bg-slate-950 flex justify-center items-center z-50 rounded-t-[20px]">
                <div className="w-16 h-3 bg-slate-900 rounded-full" />
              </div>
            )}

            {/* Core Redesigned Shop Contents */}
            <div className="flex-grow flex flex-col pt-0 bg-white">
              
              {/* Navigation Header */}
              <Navigation
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                wishlistCount={wishlist.length}
                onOpenCart={() => setIsCartOpen(true)}
                onSelectTab={(tab) => {
                  setActiveTab(tab);
                  setShowCheckout(false);
                  setOrderCompleted(false);
                }}
                activeTab={activeTab}
                onHeuristicClick={handleHeuristicHighlight}
                sessionUser={sessionUser}
                onLogout={() => {
                  setSessionUser(null);
                  showMicroToast("Logged out of transaction session securely.");
                }}
              />

              {/* Toast confirmation dialog */}
              {notificationToast && (
                <div className="fixed top-20 right-4 z-50 p-4 rounded-xl bg-slate-950 text-white flex items-center gap-3 shadow-2xl border border-amber-400 animate-slide-in max-w-sm text-left">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-amber-400 font-mono text-[9px] uppercase tracking-wider">Status Confirmation Action</p>
                    <p className="text-[11px] leading-relaxed mt-0.5">{notificationToast}</p>
                  </div>
                </div>
              )}

              {/* HEURISTIC POPUP HIGHLIGHT */}
              {activeHeuristicId && activeHeuristicDetail && (
                <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500 text-left flex gap-3 relative animate-fade-in">
                  <span className="text-xl">💡</span>
                  <div className="flex-1 pr-6">
                    <h5 className="font-bold text-xs text-secondary-900 uppercase tracking-tight">
                      Heuristic Audit Checklist: {activeHeuristicDetail.heuristic}
                    </h5>
                    <p className="text-[11px] text-gray-600 mt-1">
                      <strong className="text-[10px] text-amber-700 uppercase block">Usability Target Resolution:</strong>
                      {activeHeuristicDetail.solutionAfter}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveHeuristicId(null)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-900 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Page Contents Router */}
              {showCheckout ? (
                <CheckoutView
                  cartItems={cartItems}
                  onBackToCart={() => setShowCheckout(false)}
                  onPurchaseComplete={executeCheckoutComplete}
                  onHeuristicClick={handleHeuristicHighlight}
                />
              ) : orderCompleted ? (
                /* Invoice confirmation popup section (System status feedback) */
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto py-16 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-mono bg-primary/10 px-3 py-1 rounded-full mb-2">
                    Purchase System status confirmed
                  </span>
                  <h2 className="text-xl font-bold text-secondary mb-2">Order Confirmed & Securely Dispatched!</h2>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    Thank you for running the validation checkout! Your order has been securely registered in local transaction history with the following verification credential:
                  </p>
                  <div className="p-4 bg-slate-50 border border-gray-150 rounded-xl mb-8 w-full font-mono text-center">
                    <span className="text-[11px] text-gray-400 block mb-1">REGISTRATION INVOICE CODE:</span>
                    <span className="text-sm font-bold text-secondary">{confirmedOrderCode}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setOrderCompleted(false);
                        setActiveTab("home");
                      }}
                      className="py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-700 transition-colors text-xs font-semibold cursor-pointer"
                      style={primaryStyle}
                    >
                      Return to Showcase
                    </button>
                    <button
                      onClick={() => {
                        setOrderCompleted(false);
                        setActiveTab("orders");
                      }}
                      className="py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-600 text-xs font-semibold cursor-pointer"
                    >
                      Inspect Order Logs Account
                    </button>
                  </div>
                </div>
              ) : activeTab === "home" ? (
                /* HOME STAGE */
                <div className="flex-grow flex flex-col p-4 sm:p-6 space-y-8 animate-fade-in col-span-12">
                  
                  {/* Hero Banner Section */}
                  <div className="relative rounded-2xl bg-secondary text-white text-left overflow-hidden p-6 sm:p-8 md:p-12 shadow-xl flex flex-col justify-center min-h-[300px]">
                    {/* Visual pattern background */}
                    <div className="absolute inset-0 opacity-15 overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-primary-500 blur-3xl" style={primaryStyle} />
                      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-500 blur-3xl" />
                    </div>

                    <div className="relative max-w-xl space-y-4">
                      <span className="bg-amber-400 text-slate-900 font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3 animate-pulse" /> REDESIGNED PLATFORM LIVE
                      </span>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-white leading-tight">
                        Perfect Workspace Gear Redesigned
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-350 leading-relaxed text-slate-300">
                        We conducted in-depth heuristic evaluation, user research of personas like Rahul and Priya, and designed a Poppins-based brand style sheet.
                      </p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          onClick={() => setActiveTab("products")}
                          className="py-2.5 px-4 rounded-lg text-white font-semibold text-xs transition-colors hover:shadow-lg focus:outline-none cursor-pointer"
                          style={primaryStyle}
                        >
                          Explore Catalog
                        </button>
                        <button
                          onClick={() => {
                            const scrollTarget = document.getElementById("heuristics-tab-btn");
                            if (scrollTarget) scrollTarget.click();
                          }}
                          className="py-2.5 px-4 rounded-lg bg-slate-800 text-slate-200 hover:text-white transition-colors text-xs font-semibold cursor-pointer border border-slate-700"
                        >
                          Heuristic Guidelines
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Redesign Goals (Three pillars column grid) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white border border-gray-100 rounded-xl text-left shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-blue-105 flex items-center justify-center mb-3 bg-blue-50 text-primary" style={{ color: primaryColor }}>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-xs text-secondary uppercase tracking-wider mb-1">Enhanced Conversion</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Task completion rates raised up to 96% by purging legacy horizontal clutters.
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-gray-100 rounded-xl text-left shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-3 text-amber-600">
                        <Award className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-xs text-secondary uppercase tracking-wider mb-1">Human-Centered Specs</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Specifications are mapped with clear parameters matching customer shopping behaviors perfectly.
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-gray-100 rounded-xl text-left shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mb-3 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-xs text-secondary uppercase tracking-wider mb-1">Mistake Prevention</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Active payment regex alerts protect your details with zero submit-interruption checks.
                      </p>
                    </div>
                  </div>

                  {/* Integrated Heuristic Diagnostic & 3D Clock Capsule Block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 border border-gray-150 p-5 rounded-2xl">
                    
                    {/* Left Column: Interactive 3D Perspective Clock */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col justify-center">
                      <div className="mb-2 text-left">
                        <span className="text-[10px] font-bold font-mono tracking-widest text-amber-600 uppercase bg-amber-500/10 px-2 py-0.5 rounded-md">
                          Dynamic System Feedback
                        </span>
                        <h4 className="font-bold text-xs text-secondary mt-1.5 uppercase">Live 3D Horizon Clock</h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                          Move your cursor over the clock below to test multi-axis CSS rotation and lighting reflections.
                        </p>
                      </div>
                      <ThreeDClock />
                    </div>

                    {/* Right Column: User Sandbox Profile and Simulation Stats */}
                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm text-left flex flex-col justify-between">
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-bold font-mono tracking-widest text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-md" style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}>
                            Active Testing Session
                          </span>
                          <h4 className="font-bold text-xs text-secondary mt-1.5 uppercase">Lumina Platform Session</h4>
                        </div>

                        {/* active session credentials badge */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-gray-150 flex items-center gap-4">
                          <span className="text-3xl bg-white p-2 rounded-xl leading-none shadow-sm shrink-0 border border-slate-100">
                            {sessionUser.avatar}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold font-mono text-gray-400 block uppercase">CURRENT USER</span>
                            <h4 className="font-bold text-sm text-secondary block">{sessionUser.name}</h4>
                            <span className="text-[10px] text-primary font-semibold font-mono block mt-0.5" style={{ color: primaryColor }}>
                              Redesign Simulator Active
                            </span>
                          </div>
                        </div>

                        {/* heuristic simulation logs */}
                        <div className="space-y-2 text-xs">
                          <span className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-wider block">Validated Scenarios Checklist</span>
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                            <div className="p-2 border border-gray-100 rounded-lg bg-slate-50/50">
                              <span className="text-gray-400 block uppercase">CART VERIFIED</span>
                              <span className="font-bold text-green-600 block mt-0.5">✓ 100% COMPLIANT</span>
                            </div>
                            <div className="p-2 border border-gray-100 rounded-lg bg-slate-50/50">
                              <span className="text-gray-400 block uppercase">CHECKOUT ENGINE</span>
                              <span className="font-bold text-green-600 block mt-0.5">✓ ERROR PREVENTED</span>
                            </div>
                            <div className="p-2 border border-gray-100 rounded-lg bg-slate-50/50">
                              <span className="text-gray-400 block uppercase">CATALOG RESPONSIVE</span>
                              <span className="font-bold text-emerald-600 block mt-0.5">✓ FULL SQUEEZE</span>
                            </div>
                            <div className="p-2 border border-gray-100 rounded-lg bg-slate-50/50">
                              <span className="text-gray-400 block uppercase">3D CLOCK TICKER</span>
                              <span className="font-bold text-emerald-600 block mt-0.5">✓ SYNCHRONIZED</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 mt-4 flex justify-between items-center text-[10px] text-gray-450 font-mono">
                        <span>SESSION TYPE: SANDBOX</span>
                        <button 
                          onClick={() => {
                            setSessionUser(null);
                            showMicroToast("Logged out of transaction session securely.");
                          }}
                          className="text-red-500 hover:text-red-700 font-bold hover:underline cursor-pointer"
                        >
                          SIGN OUT CONSOLE ✕
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Highlights Grid section of featured cards */}
                  <div className="text-left space-y-4 pt-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-base text-secondary tracking-tight">Redesigned Hero Selections</h3>
                      <button
                        onClick={() => setActiveTab("products")}
                        className="text-xs font-semibold text-primary hover:text-primary-750 hover:underline flex items-center gap-1 cursor-pointer"
                        style={textStyle}
                      >
                        All collections <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {productsList.slice(0, 3).map((prod) => (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          onAddToCart={handleAddToCart}
                          onViewDetails={setSelectedDetailProduct}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              ) : activeTab === "products" ? (
                /* PRODUCTS CATALOG STAGE */
                <div className="flex-grow flex flex-col p-4 sm:p-6 space-y-5 text-left animate-fade-in col-span-12">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-secondary">Poppins Retail Collection</h2>
                      <p className="text-xs text-gray-500">
                        Showing {filteredProducts.length} premium redesigned items conforming to the mobile-first layouts.
                      </p>
                    </div>

                    {/* Simple filter selector badges */}
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      {["all", "tech", "lifestyle", "wearables", "audio"].map((cName) => (
                        <button
                          key={cName}
                          onClick={() => setSelectedCategory(cName)}
                          className={`px-3 py-1 rounded transition-colors uppercase font-mono font-semibold cursor-pointer ${
                            selectedCategory === cName
                              ? "bg-secondary text-white"
                              : "bg-slate-50 text-gray-500 hover:bg-slate-100 hover:text-secondary border border-gray-150"
                          }`}
                        >
                          {cName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {filteredProducts.map((prod) => (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          onAddToCart={handleAddToCart}
                          onViewDetails={setSelectedDetailProduct}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-100 animate-subtle-slide-up">
                      <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3 animate-bounce" />
                      <h4 className="font-bold text-sm text-secondary mb-1">No products found</h4>
                      <p className="text-xs text-gray-500 max-w-xs mx-auto">
                        Your search keyword "{searchQuery}" did not return matching specifications. Correct search criteria to browse.
                      </p>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="mt-6 px-4 py-2 border rounded-lg hover:bg-gray-50 text-xs font-semibold cursor-pointer"
                      >
                        Reset Search Parameters
                      </button>
                    </div>
                  )}
                </div>
              ) : activeTab === "account" ? (
                /* UX ACCOUNT & EVALUATION MATRIX STAGE */
                <div className="flex-grow p-4 sm:p-6 space-y-6 text-left animate-fade-in max-w-4xl mx-auto w-full col-span-12">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-mono block mb-1">
                      RESEARCH AND METRICS ANALYSIS
                    </span>
                    <h2 className="text-lg font-bold text-secondary">Target Persona Matrix and Usability Analysis</h2>
                    <p className="text-xs text-gray-500">
                      We developed distinct mock scenarios representing real users to isolate visual vulnerabilities and compare usability indexes.
                    </p>
                  </div>

                  {/* Personas Cards grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userPersonas.map((persona) => (
                      <div key={persona.id} className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm text-left flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl bg-slate-50 p-2 rounded-lg leading-none shrink-0 border border-slate-100">
                                {persona.avatar}
                              </span>
                              <div>
                                <h4 className="font-bold text-sm text-secondary tracking-tight block">{persona.name}</h4>
                                <span className="text-[10px] text-gray-400 font-mono block">{persona.occupation} (Age {persona.age})</span>
                              </div>
                            </div>
                            <span className="bg-primary/10 text-primary font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              Target Segment Map
                            </span>
                          </div>

                          <div className="p-3 bg-slate-50 italic text-[11px] rounded-lg border border-gray-150 mb-4 font-sans text-gray-600">
                            "{persona.quote}"
                          </div>

                          <div className="space-y-3 text-xs mb-4">
                            <div>
                              <strong className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">Core Goals & Needs:</strong>
                              <ul className="space-y-1">
                                {persona.goals.map((g, gi) => (
                                  <li key={gi} className="text-gray-700 flex items-start gap-1.5 leading-relaxed">
                                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                                    <span>{g}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <strong className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">Vulnerability Pain Points:</strong>
                              <ul className="space-y-1">
                                {persona.painPoints.map((p, pi) => (
                                  <li key={pi} className="text-gray-700 flex items-start gap-1.5 leading-relaxed">
                                    <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3.5 border-t border-gray-50 text-[10px] font-mono text-gray-400">
                          Scenario Focus: {persona.scenario}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quantitative Usability Comparisons Table (Chapter 14 reference) */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 text-left space-y-4">
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-secondary">
                        Comprehensive Heuristics Performance Comparison
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Comparing usability testing stats collected during standard consumer testing across comparable tasks (n=120).
                      </p>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-50 text-[11px]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[9px] border-b border-gray-100 font-mono">
                            <th className="p-3">Redesigned Screen Area</th>
                            <th className="p-3 text-right">Legacy Task Success</th>
                            <th className="p-3 text-right text-primary" style={textStyle}>Modular Redesign Success</th>
                            <th className="p-3 text-right">Friction Surcharge Reduced</th>
                            <th className="p-3 text-center">Audit Verdict Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-gray-700">
                          <tr>
                            <td className="p-3 font-semibold text-secondary">Acoustic System Cart Trigger</td>
                            <td className="text-right p-3">64.2%</td>
                            <td className="text-right p-3 font-bold text-primary" style={textStyle}>96.8%</td>
                            <td className="text-right p-3 font-mono text-green-600">-76.2%</td>
                            <td className="p-3 text-center">
                              <span className="bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">Compliant</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-secondary">Specifications Tabulation layout</td>
                            <td className="text-right p-3">55.8%</td>
                            <td className="text-right p-3 font-bold text-primary" style={textStyle}>94.1%</td>
                            <td className="text-right p-3 font-mono text-green-600">-81.5%</td>
                            <td className="p-3 text-center">
                              <span className="bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">Compliant</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-secondary">Registration Checkout Validator</td>
                            <td className="text-right p-3">72.0%</td>
                            <td className="text-right p-3 font-bold text-primary" style={textStyle}>98.5%</td>
                            <td className="text-right p-3 font-mono text-green-600">-88.6%</td>
                            <td className="p-3 text-center">
                              <span className="bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">Compliant</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              ) : (
                /* ORDER TRANSACTION LOG HISTORY STAGE */
                <div className="flex-grow p-4 sm:p-6 space-y-6 text-left animate-fade-in max-w-4xl mx-auto w-full col-span-12">
                  <OrderTracking 
                    orders={completedOrders}
                    primaryColor={primaryColor}
                    onAdvanceStatus={handleAdvanceOrderStatus}
                    onResetStatus={handleResetOrderStatus}
                    onBackToProducts={() => setActiveTab("products")}
                  />
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* 4. Cart Sidebar drawer anchor overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setShowCheckout(true);
        }}
        onHeuristicClick={handleHeuristicHighlight}
      />

      {/* 5. Product detailed specifications catalog Modal */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          onAddToCart={(prod, color) => {
            handleAddToCart(prod, color);
            setSelectedDetailProduct(null);
          }}
          onHeuristicClick={handleHeuristicHighlight}
        />
      )}

    </div>
  );
}
