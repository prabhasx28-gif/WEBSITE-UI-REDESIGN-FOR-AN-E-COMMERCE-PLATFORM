/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Star, Heart, ShoppingBag, ShieldCheck, CheckCircle, Search, Info } from "lucide-react";
import { Product } from "../types";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, selectedColor?: string) => void;
  onHeuristicClick: (id: string) => void;
}

type TabType = "overview" | "specs" | "reviews";

export default function ProductDetailModal({ product, onClose, onAddToCart, onHeuristicClick }: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0] : "");
  const [addingToCartSim, setAddingToCartSim] = useState(false);
  const [specQuery, setSpecQuery] = useState("");

  const handleAddSubmit = () => {
    setAddingToCartSim(true);
    // Simulate active system feedback (Heuristic target h1)
    setTimeout(() => {
      onAddToCart(product, selectedColor);
      setAddingToCartSim(false);
    }, 600);
  };

  const filteredSpecs = Object.entries(product.specs).filter(([key, val]) =>
    key.toLowerCase().includes(specQuery.toLowerCase()) ||
    val.toLowerCase().includes(specQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Stage container */}
      <div 
        className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in flex flex-col pt-0"
        id={`product-detail-panel-${product.id}`}
      >
        {/* Navigation / Heuristic Banner */}
        <div className="bg-primary/5 px-6 py-2 border-b border-primary/10 flex justify-between items-center z-10 sticky top-0 bg-white">
          <div className="flex items-center gap-2 text-[11px] text-primary font-medium">
            <Info className="w-3.5 h-3.5" />
            <span>HEURISTIC ACTIVE: Match with Real World & Standards Vetted</span>
          </div>
          <button 
            onClick={() => onHeuristicClick("h2")}
            className="text-primary hover:text-primary-700 hover:underline text-[10px] font-semibold cursor-pointer"
          >
            Audit Spec MappingHeuristic
          </button>
        </div>

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Heavy imagery & quick features specs */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="aspect-[4/3] rounded-xl bg-slate-50 overflow-hidden border border-slate-100 shadow-sm relative group">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-secondary flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Vouched Authentic
              </div>
            </div>

            {/* Quick specifications glance card list */}
            <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 flex flex-col gap-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary">Acoustic Specs Signature</h4>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white p-2 rounded border border-gray-100">
                  <span className="text-gray-400 block mb-0.5">Rating</span>
                  <span className="font-bold text-secondary flex items-center gap-0.5">⭐ {product.rating}</span>
                </div>
                <div className="bg-white p-2 rounded border border-gray-100">
                  <span className="text-gray-400 block mb-0.5">Dispatching</span>
                  <span className="font-bold text-green-600 flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3" /> Same Day
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Interactive Config, Spec Tabs */}
          <div className="md:col-span-7 flex flex-col text-left">
            {/* Breadcrumb path */}
            <span className="text-[10px] text-primary uppercase tracking-widest font-semibold font-mono mb-1 block">
              Redesigned Series / {product.category}
            </span>

            {/* Headline and Reviews Count */}
            <h1 className="text-2xl font-bold font-sans text-secondary tracking-tight mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex bg-slate-50 px-2 py-0.5 rounded border border-slate-100 items-center gap-1 text-sm font-bold text-amber-500">
                ⭐ {product.rating}
              </div>
              <span className="text-xs text-gray-500">Based on {product.ratingCount} remote shopper reviews</span>
            </div>

            {/* Financial Status line */}
            <div className="flex items-baseline gap-3 mb-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-2xl font-bold text-secondary font-mono">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through font-mono">${product.originalPrice}</span>
                  <span className="bg-amber-100 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded">
                    Save ${product.originalPrice - product.price} (Discount Applied)
                  </span>
                </>
              )}
            </div>

            {/* Color Switch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <span className="text-xs font-semibold text-secondary block mb-2">Select Visual Color:</span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all cursor-pointer ${
                        selectedColor === color
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Multi-Tab Selector */}
            <div className="border-b border-gray-150 mb-4 flex gap-6 text-sm font-medium">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === "overview" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Overview Story
              </button>
              <button
                key="specs"
                onClick={() => setActiveTab("specs")}
                className={`pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === "specs" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                id="tab-specs-button"
              >
                Specifications List
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                User Reviews ({product.reviews.length})
              </button>
            </div>

            {/* Active Tab Panel */}
            <div className="min-h-[160px] max-h-[220px] overflow-y-auto pr-1 mb-6 text-sm leading-relaxed text-gray-600">
              {activeTab === "overview" && (
                <div className="space-y-3">
                  <p>{product.longDescription}</p>
                  <div className="flex items-center gap-2 text-xs text-amber-600 font-medium">
                    <span>⚡ Inventory Available: Only {product.stock} left in stock. Ready to ship.</span>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="space-y-3" id="specifications-table">
                  {/* Dynamic Spec Search to aid Priya's goal */}
                  <div className="relative mb-3.5">
                    <input
                      type="text"
                      placeholder="Quick filter parameters..."
                      value={specQuery}
                      onChange={(e) => setSpecQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs text-secondary placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
                  </div>

                  {filteredSpecs.length > 0 ? (
                    <div className="border border-gray-100 rounded-lg overflow-hidden divide-y divide-gray-100">
                      {filteredSpecs.map(([key, val]) => (
                        <div key={key} className="grid grid-cols-12 p-2.5 text-xs">
                          <span className="col-span-4 font-bold text-secondary text-[11px] block">{key}</span>
                          <span className="col-span-8 text-gray-600 text-[11px] block text-right font-mono">{val}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-xs text-gray-400 py-6">No matching specifications found.</p>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-left">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold text-xs text-secondary">{rev.user}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? "fill-amber-500 text-amber-500" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed italic">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons & CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 mt-auto" id="action-button-group">
              <button
                onClick={handleAddSubmit}
                disabled={product.stock === 0 || addingToCartSim}
                className="flex-grow py-3 px-6 rounded-xl bg-primary text-white hover:bg-primary-700 transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addingToCartSim
                    ? "Resecuring Database Status..."
                    : product.stock === 0
                    ? "Item Out of Stock"
                    : "Add Redesigned Pack to Cart"
                  }
                </span>
              </button>
              <button 
                onClick={onClose}
                className="py-3 px-5 rounded-xl border border-gray-200 text-gray-500 hover:text-secondary hover:bg-gray-50 transition-colors text-sm font-semibold cursor-pointer"
              >
                Back to catalog
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
