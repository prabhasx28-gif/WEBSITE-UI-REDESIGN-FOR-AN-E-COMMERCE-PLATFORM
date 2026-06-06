/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, ShoppingCart, Eye, Sparkles } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, selectedColor?: string) => void;
  onViewDetails: (p: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  // Calculate discount percentage
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />

        {/* Categories/Discount Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          <span className="bg-secondary/90 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow">
            {product.category}
          </span>
          {discountPercent > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> SAVE {discountPercent}%
            </span>
          )}
        </div>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
          <button
            onClick={() => onViewDetails(product)}
            className="p-2.5 rounded-full bg-white text-secondary hover:bg-primary hover:text-white shadow-md transition-all duration-200 cursor-pointer"
            title="Inspect Specifications"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 rounded-full bg-primary text-white hover:bg-secondary shadow-md transition-all duration-200 cursor-pointer"
            title="Direct Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info Floor */}
      <div className="p-4 flex flex-col flex-grow text-left">
        {/* Ratings Review Row */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) ? "fill-amber-500 text-amber-500" : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-gray-700">{product.rating}</span>
          <span className="text-[10px] text-gray-400">({product.ratingCount})</span>
        </div>

        {/* Title & Description */}
        <button
          onClick={() => onViewDetails(product)}
          className="font-semibold text-sm text-secondary hover:text-primary transition-colors text-left font-sans tracking-tight line-clamp-1 mb-1 cursor-pointer"
        >
          {product.name}
        </button>
        <p className="text-xs text-gray-500 line-clamp-2 h-8 leading-relaxed mb-3">
          {product.description}
        </p>

        {/* Price & Primary CTA Bottom Panel */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-secondary font-mono">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-mono">${product.originalPrice}</span>
            )}
          </div>

          <button
            id={`quick-add-${product.id}`}
            onClick={() => onAddToCart(product)}
            className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
