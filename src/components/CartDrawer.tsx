/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldAlert, Sparkles, CreditCard } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onHeuristicClick: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onHeuristicClick
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalCost = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Black backdrop block */}
      <div className="absolute inset-0 bg-secondary/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col pt-0 animate-slide-in"
          id="cart-drawer-panel"
        >
          {/* Top Header Section */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[9px] uppercase font-mono text-primary font-bold tracking-wider">Shopping Tray</span>
              <h2 className="text-base font-bold text-secondary">Redesigned Cart ({totalItemsCount})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-secondary cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Heuristic Notification Strip */}
          <div className="bg-amber-50 px-5 py-2.5 border-b border-amber-100 flex justify-between items-center text-left text-[11px] text-amber-800 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>HEURISTIC: System Status Feedback ACTIVE</span>
            </div>
            <button
              onClick={() => onHeuristicClick("h1")}
              className="text-amber-900 hover:underline font-bold"
            >
              Learn More
            </button>
          </div>

          {/* Scrollable list of Items */}
          <div className="flex-1 overflow-y-auto p-5">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                  <X className="w-7 h-7 text-gray-300" />
                </div>
                <h3 className="text-sm font-semibold text-secondary mb-1">Your cart is empty</h3>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                  Browse our high-fidelity product collections and add items to inspect this reactive sidebar.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-4 py-2 text-xs font-semibold bg-primary text-white hover:bg-primary-700 transition-colors rounded-lg cursor-pointer"
                >
                  Return to Browse
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all gap-4 text-left"
                  >
                    {/* Tiny representation image */}
                    <div className="w-16 h-16 rounded-lg bg-slate-150 overflow-hidden shrink-0 border border-slate-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta and incrementors */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-semibold text-xs text-secondary line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-bold text-secondary font-mono">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                        {item.selectedColor && (
                          <span className="text-[10px] text-gray-400 block -mt-0.5">
                            Color: {item.selectedColor}
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded p-0.5 bg-gray-50/50">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded text-gray-500 hover:bg-white hover:text-secondary disabled:opacity-40 cursor-pointer"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-secondary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded text-gray-500 hover:bg-white hover:text-secondary cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Erase item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing calculations and checkout trigger */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-mono">${totalCost}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Redesigned Delivery</span>
                  <span className="text-green-600 font-semibold tracking-wide">FREE STANDARD</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-secondary pt-2 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span className="font-mono">${totalCost}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-primary text-white hover:bg-primary-700 transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer shadow-primary/10"
              >
                <CreditCard className="w-4 h-4" />
                <span>Secure Redesigned Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[10px] text-gray-405 text-center mt-3 text-gray-400 flex items-center justify-center gap-1">
                <span>🔒 Secure AES-256 Payment Tunnel</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
