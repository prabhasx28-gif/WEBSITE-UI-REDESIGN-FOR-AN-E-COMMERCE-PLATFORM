/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Truck, 
  Package, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Gift, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  RefreshCw, 
  FileText, 
  Calendar,
  Layers,
  ChevronUp
} from "lucide-react";

export interface CompletedOrder {
  id: string;
  date: string;
  total: number;
  count: number;
  status: "Processing" | "Shipped" | "Delivered";
  items?: Array<{ name: string; quantity: number; price: number }>;
}

interface OrderTrackingProps {
  orders: CompletedOrder[];
  primaryColor: string;
  onAdvanceStatus: (orderId: string) => void;
  onResetStatus: (orderId: string) => void;
  onBackToProducts: () => void;
}

export default function OrderTracking({ 
  orders, 
  primaryColor, 
  onAdvanceStatus, 
  onResetStatus, 
  onBackToProducts 
}: OrderTrackingProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );
  const [expandedCarrierDetail, setExpandedCarrierDetail] = useState(true);

  // Fallback if selected item is removed or invalid
  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const getStatusPercentage = (status: CompletedOrder["status"]) => {
    switch (status) {
      case "Processing": return 20;
      case "Shipped": return 60;
      case "Delivered": return 100;
      default: return 20;
    }
  };

  const getStatusColor = (status: CompletedOrder["status"]) => {
    switch (status) {
      case "Processing": return "text-amber-500 border-amber-500 bg-amber-500/10";
      case "Shipped": return "text-blue-500 border-blue-500 bg-blue-500/10";
      case "Delivered": return "text-green-500 border-green-500 bg-green-500/10";
    }
  };

  const getStatusStepStatus = (orderStatus: CompletedOrder["status"], step: "Processing" | "Shipped" | "Delivered") => {
    const statusPriority = { "Processing": 1, "Shipped": 2, "Delivered": 3 };
    const currentWeight = statusPriority[orderStatus];
    const stepWeight = statusPriority[step];

    if (currentWeight > stepWeight) return "completed";
    if (currentWeight === stepWeight) return "active";
    return "pending";
  };

  const getEstimatedArrival = (orderId: string, currentStatus: CompletedOrder["status"]) => {
    // Deterministic delivery estimation based on digit sum in OrderID
    const num = parseInt(orderId.replace(/\D/g, "")) || 3;
    const daysOffset = (num % 4) + 1;
    
    if (currentStatus === "Delivered") {
      return "Delivered today, signed by receptionist";
    } else if (currentStatus === "Shipped") {
      return `Estimated delivery: June ${6 + daysOffset}, 2026`;
    } else {
      return `Estimated processing completion: June ${6 + daysOffset} (Within 24 hours)`;
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 text-left" id="order-tracking-stage">
      
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest font-mono p-1 px-2.5 rounded bg-blue-50 text-blue-600 block w-fit mb-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}10` }}>
            Shipment Logistics Ledger
          </span>
          <h2 className="text-xl font-bold text-secondary">Real-Time Progress & Tracking Portal</h2>
          <p className="text-xs text-gray-500">
            Monitor and simulate real-time logistic operations, shipping handlers, and progress indicators below.
          </p>
        </div>

        <button
          onClick={onBackToProducts}
          className="text-xs font-semibold px-4 py-2 border border-gray-200 hover:bg-slate-50 transition-colors rounded-xl flex items-center gap-1 cursor-pointer shadow-sm shrink-0"
        >
          Browse Collection <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 max-w-md mx-auto shadow-inner">
          <Package className="w-10 h-10 text-slate-350 mx-auto mb-3" />
          <h4 className="font-bold text-sm text-secondary mb-1">No transaction record detected</h4>
          <p className="text-xs text-gray-400 leading-relaxed px-6">
            You haven't completed any transaction log checks in this current session sandbox. Populate client values instantly by running through checkout.
          </p>
          <button
            onClick={onBackToProducts}
            className="mt-6 px-4 py-2.5 bg-primary hover:bg-primary-700 transition-colors text-white text-xs font-semibold rounded-xl cursor-pointer shadow-md"
            style={{ backgroundColor: primaryColor }}
          >
            Go To Store Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Order selection panel (Left Side - 5/12 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-bold font-mono tracking-widest text-gray-400 block uppercase px-1">
              Select Package Invoice ({orders.length})
            </span>
            <div className="space-y-2.5">
              {orders.map((order) => {
                const isActive = activeOrder?.id === order.id;
                const statusColor = getStatusColor(order.status);
                
                return (
                  <button
                    key={order.id}
                    onClick={() => {
                      setSelectedOrderId(order.id);
                    }}
                    className={`w-full p-4 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group ${
                      isActive 
                        ? "bg-white border-primary shadow-md" 
                        : "bg-white/80 hover:bg-white border-gray-150 hover:shadow-sm"
                    }`}
                    style={isActive ? { borderColor: primaryColor } : undefined}
                  >
                    <div className="flex justify-between items-start gap-2 w-full">
                      <div className="space-y-0.5">
                        <span className="font-mono text-[10px] text-gray-400 font-bold block uppercase group-hover:text-primary transition-colors">
                          ORDER CODE
                        </span>
                        <h4 className="font-bold font-mono text-sm text-secondary block">
                          {order.id}
                        </h4>
                      </div>
                      <span className={`text-[9px] font-mono leading-none font-extrabold px-2 py-1 rounded border uppercase ${statusColor}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center w-full text-[10px] text-gray-450 font-mono">
                      <span>{order.date}</span>
                      <span className="font-bold text-secondary font-sans">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active order detailed progress card tracker (Right Side - 8/12 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {activeOrder && (
              <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm space-y-6">
                
                {/* Visual Title Details */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-extrabold text-primary font-mono tracking-wider uppercase bg-primary-50 px-2 py-0.5 rounded" style={{ color: primaryColor, backgroundColor: `${primaryColor}10` }}>
                      TRACK COMPLIANCE METRICS
                    </span>
                    <h3 className="text-base font-extrabold text-secondary font-mono">
                      Invoice Code {activeOrder.id}
                    </h3>
                  </div>

                  {/* Advance shipment simulation button */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onAdvanceStatus(activeOrder.id)}
                      disabled={activeOrder.status === "Delivered"}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-950 text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent font-mono font-bold text-[10px] rounded-lg cursor-pointer hover:bg-slate-800 transition-colors flex items-center gap-1.5 focus:ring-1 focus:ring-slate-900 shadow-sm uppercase shrink-0"
                    >
                      <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "10s" }} /> 
                      {activeOrder.status === "Delivered" ? "Fully Handed" : "Advance Step"}
                    </button>

                    <button
                      onClick={() => onResetStatus(activeOrder.id)}
                      className="px-2.5 py-1.5 border border-gray-200 hover:bg-gray-50 font-mono font-bold text-[10px] rounded-lg cursor-pointer transition-colors text-slate-500 uppercase flex items-center gap-1"
                      title="Reset tracking progress back to processing"
                    >
                      Reset Status
                    </button>
                  </div>
                </div>

                {/* VISUAL STEPS & STEPPER PROGRESS BAR (THE CORE OF LOGISTIC TIMELINES/STEPPERS) */}
                <div className="space-y-6 pt-2">
                  <div className="relative">
                    
                    {/* The Full Tracking Underlay Progress Line */}
                    <div className="absolute top-5 left-6 right-6 h-1.5 bg-gray-100 rounded-full -z-10" />

                    {/* Active Dynamic Progress overlay overlay line */}
                    <div 
                      className="absolute top-5 left-6 h-1.5 rounded-full transition-all duration-700 ease-out -z-10"
                      style={{ 
                        width: `calc(${getStatusPercentage(activeOrder.status)}% - 24px)`,
                        backgroundColor: primaryColor
                      }}
                    />

                    {/* Steps Row */}
                    <div className="grid grid-cols-3 w-full relative z-10">
                      
                      {/* Step 1: Processing */}
                      {(() => {
                        const stepState = getStatusStepStatus(activeOrder.status, "Processing");
                        return (
                          <div className="flex flex-col items-center text-center space-y-2">
                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              stepState === "completed"
                                ? "bg-primary border-primary text-white shadow-md shadow-primary-200"
                                : stepState === "active"
                                ? "bg-white border-primary text-primary shadow-lg animate-pulse"
                                : "bg-white border-gray-200 text-gray-300"
                            }`}
                            style={stepState !== "pending" ? { borderColor: primaryColor, backgroundColor: stepState === "completed" ? primaryColor : undefined, color: stepState === "active" ? primaryColor : undefined } : undefined}
                            >
                              {stepState === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                            </div>
                            <div className="space-y-0.5 px-1 sm:px-2">
                              <span className={`text-[11px] font-extrabold tracking-tight uppercase block leading-tight ${
                                stepState === "active" ? "text-secondary font-black" : "text-gray-400"
                              }`}>
                                Processing
                              </span>
                              <span className="text-[9px] text-gray-400 font-mono block leading-tight">
                                Workspace Secure Checks
                              </span>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Step 2: Shipped */}
                      {(() => {
                        const stepState = getStatusStepStatus(activeOrder.status, "Shipped");
                        return (
                          <div className="flex flex-col items-center text-center space-y-2">
                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              stepState === "completed"
                                ? "bg-primary border-primary text-white shadow-md shadow-primary-200"
                                : stepState === "active"
                                ? "bg-white border-primary text-primary shadow-lg animate-pulse"
                                : "bg-white border-gray-200 text-gray-300"
                            }`}
                            style={stepState !== "pending" ? { borderColor: primaryColor, backgroundColor: stepState === "completed" ? primaryColor : undefined, color: stepState === "active" ? primaryColor : undefined } : undefined}
                            >
                              {stepState === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                            </div>
                            <div className="space-y-0.5 px-1 sm:px-2">
                              <span className={`text-[11px] font-extrabold tracking-tight uppercase block leading-tight ${
                                stepState === "active" ? "text-secondary font-black" : "text-gray-400"
                              }`}>
                                Shipped
                              </span>
                              <span className="text-[9px] text-gray-400 font-mono block leading-tight">
                                Ground Transit Courier
                              </span>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Step 3: Delivered */}
                      {(() => {
                        const stepState = getStatusStepStatus(activeOrder.status, "Delivered");
                        return (
                          <div className="flex flex-col items-center text-center space-y-2">
                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              stepState === "completed" || activeOrder.status === "Delivered"
                                ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-200"
                                : stepState === "active"
                                ? "bg-white border-primary text-primary shadow-lg animate-pulse"
                                : "bg-white border-gray-200 text-gray-300"
                            }`}
                            style={stepState === "active" ? { borderColor: primaryColor, color: primaryColor } : undefined}
                            >
                              {activeOrder.status === "Delivered" ? <CheckCircle2 className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                            </div>
                            <div className="space-y-0.5 px-1 sm:px-2">
                              <span className={`text-[11px] font-extrabold tracking-tight uppercase block leading-tight ${
                                activeOrder.status === "Delivered" ? "text-green-600 font-black" : "text-gray-400"
                              }`}>
                                Delivered
                              </span>
                              <span className="text-[9px] text-gray-400 font-mono block leading-tight">
                                Handed Courier Signed
                              </span>
                            </div>
                          </div>
                        );
                      })()}

                    </div>
                  </div>
                </div>

                {/* Subtitle Carrier Logistics Estimates */}
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex items-start gap-3.5">
                  <div className="p-2 bg-white border border-slate-200 rounded-xl">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-xs">
                    <span className="text-[10px] font-bold font-mono text-gray-400 block uppercase">CARRIER STATUS TIME</span>
                    <p className="font-bold text-secondary mt-0.5">
                      {getEstimatedArrival(activeOrder.id, activeOrder.status)}
                    </p>
                    <p className="text-[10px] text-gray-400 leading-relaxed mt-1">
                      Tracking reference code: <span className="font-mono bg-slate-200/50 px-1 py-0.5 rounded font-extrabold">{activeOrder.id}-USPS</span>
                    </p>
                  </div>
                </div>

                {/* Detailed item list of this order */}
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedCarrierDetail(!expandedCarrierDetail)}
                    className="w-full p-3 bg-slate-50 border-b border-gray-100 flex justify-between items-center text-xs font-bold text-secondary cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-1.5 uppercase font-mono tracking-wider">
                      <Layers className="w-4 h-4 text-primary-605" style={{ color: primaryColor }} /> Package Contents & Invoice Ledger
                    </span>
                    {expandedCarrierDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {expandedCarrierDetail && (
                    <div className="p-4 bg-white divide-y divide-gray-50 text-xs">
                      {activeOrder.items && activeOrder.items.length > 0 ? (
                        activeOrder.items.map((item, index) => (
                          <div key={index} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center">
                            <div>
                              <p className="font-bold text-secondary text-xs">{item.name}</p>
                              <span className="text-[10px] text-gray-450 font-mono block">QUANTITY: {item.quantity} units</span>
                            </div>
                            <span className="font-mono font-extrabold text-secondary text-xs">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="py-2 text-center text-gray-400 italic text-[11px]">
                          Specific item lists are dynamically registered on receipt transactions.
                        </div>
                      )}

                      {/* Total cost card section */}
                      <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-baseline font-mono">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">SUBTOTAL INVOICE CHARGES</span>
                        <span className="text-sm font-black text-secondary">
                          ${activeOrder.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Design Heuristics helper context footer */}
                <div className="p-3.5 bg-yellow-500/5 border border-yellow-500/10 rounded-xl text-[10px] leading-relaxed text-gray-500">
                  <div className="flex items-center gap-1.5 text-amber-600 font-bold mb-0.5 font-mono">
                    <span>💡 VISIBILITY OF SYSTEM STATUS HEURISTIC</span>
                  </div>
                  This timeline and progress stepper dynamically maps courier states based on live data values. The advance status toggler changes ledger states instantly to trigger reactive interface updates, maintaining perfect visual alignment with the shopper status expectations.
                </div>

              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
