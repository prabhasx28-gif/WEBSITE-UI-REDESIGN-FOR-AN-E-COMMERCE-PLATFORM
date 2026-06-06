/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, CreditCard, ChevronRight, HelpCircle } from "lucide-react";
import { CartItem } from "../types";

interface CheckoutViewProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onPurchaseComplete: () => void;
  onHeuristicClick: (id: string) => void;
}

interface FormField<T> {
  value: T;
  error: string;
  touched: boolean;
}

export default function CheckoutView({ cartItems, onBackToCart, onPurchaseComplete, onHeuristicClick }: CheckoutViewProps) {
  // Check form steps: 1 = Shipping layout, 2 = Payment layout
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields State (Satisfies Ch 4 Heuristic: Error Prevention)
  const [firstName, setFirstName] = useState<FormField<string>>({ value: "", error: "", touched: false });
  const [lastName, setLastName] = useState<FormField<string>>({ value: "", error: "", touched: false });
  const [email, setEmail] = useState<FormField<string>>({ value: "", error: "", touched: false });
  const [address, setAddress] = useState<FormField<string>>({ value: "", error: "", touched: false });
  const [zipCode, setZipCode] = useState<FormField<string>>({ value: "", error: "", touched: false });
  const [cardNumber, setCardNumber] = useState<FormField<string>>({ value: "", error: "", touched: false });
  const [expDate, setExpDate] = useState<FormField<string>>({ value: "", error: "", touched: false });
  const [cvv, setCvv] = useState<FormField<string>>({ value: "", error: "", touched: false });

  // Order Metrics
  const subTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subTotal * 0.08); // 8% local tax
  const totalCost = subTotal + tax;

  // Validators
  const validateFirstName = (val: string) => {
    if (val.trim().length < 2) return "First name must be at least 2 characters.";
    return "";
  };

  const validateLastName = (val: string) => {
    if (val.trim().length < 2) return "Last name must be at least 2 characters.";
    return "";
  };

  const validateEmail = (val: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return "Please enter a valid email address (e.g. name@domain.com).";
    return "";
  };

  const validateAddress = (val: string) => {
    if (val.trim().length < 8) return "Please enter your full street shipping address.";
    return "";
  };

  const validateZipCode = (val: string) => {
    const zipRegex = /^\d{5,6}$/;
    if (!zipRegex.test(val)) return "Zip code must be a 5 or 6 digit numerical value.";
    return "";
  };

  const validateCardNumber = (val: string) => {
    const cleaned = val.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(cleaned)) return "Card number must contain exactly 16 numeric digits.";
    return "";
  };

  const validateExpDate = (val: string) => {
    const expRegex = /^(0[1-9]|1[0-2])\/?([2-9][6-9])$/;
    if (!expRegex.test(val)) return "Use MM/YY expiry format (e.g., 12/28).";
    return "";
  };

  const validateCvv = (val: string) => {
    if (!/^\d{3}$/.test(val)) return "CVV must be exactly 3 numeric digits.";
    return "";
  };

  // Immediate handlers
  const handleFirstNameChange = (val: string) => {
    setFirstName({ value: val, error: validateFirstName(val), touched: true });
  };
  const handleLastNameChange = (val: string) => {
    setLastName({ value: val, error: validateLastName(val), touched: true });
  };
  const handleEmailChange = (val: string) => {
    setEmail({ value: val, error: validateEmail(val), touched: true });
  };
  const handleAddressChange = (val: string) => {
    setAddress({ value: val, error: validateAddress(val), touched: true });
  };
  const handleZipChange = (val: string) => {
    setZipCode({ value: val.replace(/\D/g, ""), error: validateZipCode(val.replace(/\D/g, "")), touched: true });
  };

  const handleCardChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, "").slice(0, 16);
    // Add nice spaces every 4 digits
    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber({ value: formatted, error: validateCardNumber(digitsOnly), touched: true });
  };

  const handleExpChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    setExpDate({ value: formatted, error: validateExpDate(formatted), touched: true });
  };

  const handleCvvChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, "").slice(0, 3);
    setCvv({ value: digitsOnly, error: validateCvv(digitsOnly), touched: true });
  };

  const isShippingValid =
    firstName.value && !firstName.error &&
    lastName.value && !lastName.error &&
    email.value && !email.error &&
    address.value && !address.error &&
    zipCode.value && !zipCode.error;

  const isPaymentValid =
    cardNumber.value && !cardNumber.error &&
    expDate.value && !expDate.error &&
    cvv.value && !cvv.error;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Force touch all
      setFirstName(prev => ({ ...prev, touched: true, error: validateFirstName(prev.value) }));
      setLastName(prev => ({ ...prev, touched: true, error: validateLastName(prev.value) }));
      setEmail(prev => ({ ...prev, touched: true, error: validateEmail(prev.value) }));
      setAddress(prev => ({ ...prev, touched: true, error: validateAddress(prev.value) }));
      setZipCode(prev => ({ ...prev, touched: true, error: validateZipCode(prev.value) }));

      if (isShippingValid) {
        setStep(2);
      }
    } else {
      setCardNumber(prev => ({ ...prev, touched: true, error: validateCardNumber(prev.value) }));
      setExpDate(prev => ({ ...prev, touched: true, error: validateExpDate(prev.value) }));
      setCvv(prev => ({ ...prev, touched: true, error: validateCvv(prev.value) }));

      if (isPaymentValid) {
        onPurchaseComplete();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left" id="checkout-form">
      {/* Dynamic Path Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <button
            onClick={onBackToCart}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-700 hover:underline cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
          </button>
          <h1 className="text-2xl font-bold font-sans text-secondary tracking-tight">Redesigned Checkout Floor</h1>
        </div>

        {/* Form Indicator Progress */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className={`px-2.5 py-1 rounded-full ${step === 1 ? "bg-primary text-white" : "bg-green-100 text-green-700"}`}>
            1. Shipping details {isShippingValid && "✓"}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className={`px-2.5 py-1 rounded-full ${step === 2 ? "bg-primary text-white" : "bg-gray-150 text-gray-500"}`}>
            2. Secure Billing check
          </span>
        </div>
      </div>

      {/* Heuristic Notification Panel */}
      <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-primary font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>REAL-TIME HEURISTIC INPUT AUDIT SYSTEM ENABLED (Error Prevention)</span>
        </div>
        <button
          onClick={() => onHeuristicClick("h4")}
          className="text-primary hover:text-primary-700 text-xs font-bold hover:underline cursor-pointer"
        >
          Inspect Form Heuristics
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Dynamic Input Panel form */}
        <form onSubmit={handleNextStep} className="lg:col-span-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          {step === 1 ? (
            <div className="space-y-5">
              <h3 className="font-bold text-sm text-secondary uppercase tracking-wider mb-2">Shipping Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-secondary block mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName.value}
                    onChange={(e) => handleFirstNameChange(e.target.value)}
                    placeholder="Rahul"
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all ${
                      firstName.touched
                        ? firstName.error
                          ? "border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50/10"
                          : "border-green-400 focus:ring-1 focus:ring-green-300 bg-green-50/10"
                        : "border-gray-200 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {firstName.touched && firstName.error && (
                    <span className="text-[10px] text-red-500 block mt-1 font-medium">{firstName.error}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-secondary block mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName.value}
                    onChange={(e) => handleLastNameChange(e.target.value)}
                    placeholder="Sharma"
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all ${
                      lastName.touched
                        ? lastName.error
                          ? "border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50/10"
                          : "border-green-400 focus:ring-1 focus:ring-green-300 bg-green-50/10"
                        : "border-gray-200 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {lastName.touched && lastName.error && (
                    <span className="text-[10px] text-red-500 block mt-1 font-medium">{lastName.error}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-secondary block mb-1">E-Commerce Email Account</label>
                <input
                  type="email"
                  value={email.value}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="rahul.sharma@gmail.com"
                  className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all ${
                    email.touched
                      ? email.error
                        ? "border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50/10"
                        : "border-green-400 focus:ring-1 focus:ring-green-300 bg-green-50/10"
                      : "border-gray-200 focus:ring-1 focus:ring-primary"
                  }`}
                />
                {email.touched && email.error && (
                  <span className="text-[10px] text-red-500 block mt-1 font-medium">{email.error}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-secondary block mb-1">Delivery Street Address</label>
                <input
                  type="text"
                  value={address.value}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  placeholder="104, Outer Ring Road, Tech Park Core Sector"
                  className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all ${
                    address.touched
                      ? address.error
                        ? "border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50/10"
                        : "border-green-400 focus:ring-1 focus:ring-green-300 bg-green-50/10"
                      : "border-gray-200 focus:ring-1 focus:ring-primary"
                  }`}
                />
                {address.touched && address.error && (
                  <span className="text-[10px] text-red-500 block mt-1 font-medium">{address.error}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-secondary block mb-1">ZIP / Postal Code</label>
                <input
                  type="text"
                  value={zipCode.value}
                  onChange={(e) => handleZipChange(e.target.value)}
                  placeholder="560103"
                  className={`w-full max-w-[180px] p-2.5 text-xs rounded-lg border focus:outline-none transition-all ${
                    zipCode.touched
                      ? zipCode.error
                        ? "border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50/10"
                        : "border-green-400 focus:ring-1 focus:ring-green-300 bg-green-50/10"
                      : "border-gray-200 focus:ring-1 focus:ring-primary"
                  }`}
                />
                {zipCode.touched && zipCode.error && (
                  <span className="text-[10px] text-red-500 block mt-1 font-medium">{zipCode.error}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <h3 className="font-bold text-sm text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-green-600 animate-pulse" /> Secure Credit Card Terminal
              </h3>

              <div>
                <label className="text-xs font-semibold text-secondary block mb-1">Card Number (16 Digits)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber.value}
                    onChange={(e) => handleCardChange(e.target.value)}
                    placeholder="4532 9876 2134 5678"
                    className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-lg border focus:outline-none transition-all ${
                      cardNumber.touched
                        ? cardNumber.error
                          ? "border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50/10"
                          : "border-green-400 focus:ring-1 focus:ring-green-300 bg-green-50/10"
                        : "border-gray-200 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  <CreditCard className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                </div>
                {cardNumber.touched && cardNumber.error && (
                  <span className="text-[10px] text-red-500 block mt-1 font-medium">{cardNumber.error}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-secondary block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expDate.value}
                    onChange={(e) => handleExpChange(e.target.value)}
                    placeholder="12/28"
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all ${
                      expDate.touched
                        ? expDate.error
                          ? "border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50/10"
                          : "border-green-400 focus:ring-1 focus:ring-green-300 bg-green-50/10"
                        : "border-gray-200 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {expDate.touched && expDate.error && (
                    <span className="text-[10px] text-red-500 block mt-1 font-medium">{expDate.error}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-secondary block mb-1">CVV Security Code (3 Digits)</label>
                  <input
                    type="password"
                    value={cvv.value}
                    onChange={(e) => handleCvvChange(e.target.value)}
                    placeholder="***"
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all ${
                      cvv.touched
                        ? cvv.error
                          ? "border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50/10"
                          : "border-green-400 focus:ring-1 focus:ring-green-300 bg-green-50/10"
                        : "border-gray-200 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {cvv.touched && cvv.error && (
                    <span className="text-[10px] text-red-500 block mt-1 font-medium">{cvv.error}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form Navigation triggers */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-150 mt-8">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-2.5 px-4 rounded-lg border border-gray-200 text-xs font-bold text-gray-500 hover:text-secondary cursor-pointer"
              >
                Back to Address
              </button>
            )}
            <button
              type="submit"
              disabled={step === 1 ? !isShippingValid : !isPaymentValid}
              className={`py-3 px-6 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                (step === 1 ? isShippingValid : isPaymentValid)
                  ? "bg-primary text-white hover:bg-primary-740 shadow"
                  : "bg-gray-150 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>{step === 1 ? "Proceed to Checkout Pay" : "Complete Secure Order Verification"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right column: Summation breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-xs uppercase tracking-wider text-secondary mb-4 border-b border-gray-55 pb-2">
              Redesigned Order Summary
            </h3>

            {/* Product lists mini items */}
            <div className="divide-y divide-gray-50 overflow-y-auto max-h-[180px] pr-1 mb-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex py-3 justify-between items-center text-xs text-left">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-10 h-10 rounded overflow-hidden border border-gray-50 bg-slate-50 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-bold block text-secondary line-clamp-1">{item.product.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-secondary text-right">
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Checkout Pricing List */}
            <div className="space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal Items</span>
                <span className="font-mono text-secondary">${subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Local Surcharge</span>
                <span className="font-mono text-secondary">${tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Optimized Courier Shipping</span>
                <span className="text-green-600 font-semibold uppercase tracking-wider">FREE DEL</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-secondary pt-3 border-t border-gray-50">
                <span>Grand Total Invoice</span>
                <span className="font-mono">${totalCost}</span>
              </div>
            </div>
          </div>

          {/* Secure details card */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3 text-left">
            <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-secondary mb-0.5">Poppins Design Compliant</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                The visual layouts conform to standard accessibility parameters. Card inputs automatically structure layouts securely of your credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
