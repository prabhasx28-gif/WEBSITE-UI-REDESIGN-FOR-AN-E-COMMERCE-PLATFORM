/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Clock, ShieldCheck, Sun, Moon, Sparkles, RefreshCw } from "lucide-react";

export default function ThreeDClock() {
  const [time, setTime] = useState(new Date());
  const [themeMode, setThemeMode] = useState<"neon" | "glass" | "mono">("neon");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D rotation state for interactive mouse hover tilt
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Sync clock precisely with system time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Get mouse position relative to the center of the clock card
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Convert to degrees of rotation (max 18deg for smooth subtle look)
    const factorX = (y / (rect.height / 2)) * -20; // vertical mouse tilts around horizontal axis (X)
    const factorY = (x / (rect.width / 2)) * 20;  // horizontal mouse tilts around vertical axis (Y)
    
    setRotate({ x: factorX, y: factorY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 }); // reset tilt smoothly
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Calculations for continuous analog rotational degrees
  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hr = time.getHours();

  const secDeg = (sec / 60) * 360;
  const minDeg = (min / 60) * 360 + (sec / 60) * 6;
  const hrDeg = ((hr % 12) / 12) * 360 + (min / 60) * 30;

  // Formatting strings
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Theme-specific style mappings
  const themeStyles = {
    neon: {
      cardbg: "bg-slate-950/95 border-emerald-500/30 text-white shadow-[0_0_50px_rgba(16,185,129,0.15)]",
      facebg: "bg-slate-900/90 border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]",
      hourHand: "bg-emerald-400 ring-2 ring-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.8)]",
      minHand: "bg-teal-400 ring-1 ring-teal-500/50 shadow-[0_0_10px_rgba(20,184,166,0.8)]",
      secHand: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]",
      glass: "from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]",
      indicator: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    glass: {
      cardbg: "bg-white/80 backdrop-blur-xl border-white/40 text-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.06)]",
      facebg: "bg-slate-50 border-gray-200/50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)]",
      hourHand: "bg-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
      minHand: "bg-slate-600 shadow-[0_1px_3px_rgba(0,0,0,0.2)]",
      secHand: "bg-primary-600 shadow-[0_1px_4px_rgba(37,99,235,0.4)]",
      glass: "text-slate-800",
      indicator: "bg-slate-100 text-slate-700 border-slate-200",
    },
    mono: {
      cardbg: "bg-zinc-900 border-zinc-750 text-zinc-100 shadow-2xl font-mono",
      facebg: "bg-black border-zinc-800",
      hourHand: "bg-zinc-200",
      minHand: "bg-zinc-400",
      secHand: "bg-amber-500",
      glass: "text-zinc-150",
      indicator: "bg-zinc-800 text-zinc-300 border-zinc-700",
    }
  };

  const curr = themeStyles[themeMode];

  return (
    <div className="w-full py-4 text-left" id="3d-time-capsule-section">
      <div className="max-w-md mx-auto">
        
        {/* Widget Header with visual heuristics metrics */}
        <div className="flex justify-between items-center mb-3 px-1">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase block flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} /> Interactive Kinetic Engineering
            </span>
            <h3 className="font-extrabold text-xs text-secondary uppercase tracking-tight">3D Horizon Kinetic Clock</h3>
          </div>
          
          {/* Quick theme toggler control */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {(["neon", "glass", "mono"] as const).map((styleId) => (
              <button
                key={styleId}
                onClick={() => setThemeMode(styleId)}
                className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded transition-all cursor-pointer ${
                  themeMode === styleId
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-slate-800"
                }`}
              >
                {styleId}
              </button>
            ))}
          </div>
        </div>

        {/* Outer 3D Container viewport */}
        <div
          className="[perspective:1000px] w-full flex justify-center py-4"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          {/* Continuous floating physics-simulated wrapper */}
          <div className="w-full max-w-sm animate-float">
            {/* Real 3D Rotational Canvas Element */}
            <div
              ref={containerRef}
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovering ? "scale(1.04) translateZ(10px)" : "scale(1) translateZ(0)"}`,
                transition: isHovering ? "none" : "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transformStyle: "preserve-3d",
              }}
              className={`w-full rounded-3xl p-6 border transition-all duration-300 relative ${curr.cardbg}`}
            >
              {/* 3D background shadow layer depth projection */}
              <div 
                style={{ transform: "translateZ(-30px)" }}
                className={`absolute inset-0 bg-black/15 blur-2xl rounded-3xl -z-10 transition-all duration-300 pointer-events-none ${
                  isHovering ? "scale-110 opacity-100" : "scale-95 opacity-40"
                }`} 
              />

              {/* Glowing Accent Ring (Back of the clock depth) */}
              <div 
                style={{ transform: "translateZ(-15px)" }} 
                className={`absolute inset-4 rounded-full border opacity-40 blur-sm pointer-events-none ${
                  themeMode === "neon" ? "border-emerald-400" : "border-slate-300"
                }`} 
              />

              {/* Clock Layout */}
              <div className="flex flex-col items-center space-y-5 relative">
                
                {/* Dynamic status indicators */}
                <div 
                  style={{ transform: "translateZ(20px)" }}
                  className={`flex gap-3 text-[9px] font-mono uppercase font-semibold px-3 py-1 rounded-full border tracking-wide transition-all ${curr.indicator}`}
                >
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM READY
                  </span>
                  <span>● {sec % 2 === 0 ? "TICK" : "TOCK"}</span>
                  <span>● LOCALTIME</span>
                </div>

                {/* 3D Isometric Analog Dial Face */}
                <div
                  style={{ 
                    transform: "translateZ(40px)",
                    transformStyle: "preserve-3d"
                  }}
                  className={`w-48 h-48 rounded-full border relative flex items-center justify-center transition-all ${curr.facebg}`}
                >
                  {/* 12, 3, 6, 9 Cardinal Ticks */}
                  <div style={{ transform: "translateZ(5px)" }} className="absolute inset-2 text-center pointer-events-none select-none">
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[10px] font-extrabold opacity-60">12</span>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] font-extrabold opacity-60">6</span>
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] font-extrabold opacity-60">3</span>
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] font-extrabold opacity-60">9</span>
                  </div>

                  {/* Sub-ticks indicators */}
                  <div className="absolute inset-3 rounded-full opacity-10 border border-dashed border-current pointer-events-none" />

                  {/* Hands center pin core */}
                  <div 
                    style={{ transform: "translateZ(25px)" }} 
                    className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-white absolute z-30 shadow-md" 
                  />

                  {/* Hour Hand (Rotated and projected forward in 3D) */}
                  <div
                    style={{
                      transform: `rotate(${hrDeg}deg) translateZ(10px)`,
                      transformOrigin: "bottom center",
                    }}
                    className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-1.5 h-12 rounded-full origin-bottom"
                  >
                    <div className={`w-full h-full rounded-full ${curr.hourHand}`} />
                  </div>

                  {/* Minute Hand (Projected even further in 3D space) */}
                  <div
                    style={{
                      transform: `rotate(${minDeg}deg) translateZ(16px)`,
                      transformOrigin: "bottom center",
                    }}
                    className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-1 h-16 rounded-full origin-bottom"
                  >
                    <div className={`w-full h-full rounded-full ${curr.minHand}`} />
                  </div>

                  {/* Second Hand (Floating highest above standard ticks) */}
                  <div
                    style={{
                      transform: `rotate(${secDeg}deg) translateZ(22px)`,
                      transformOrigin: "bottom center",
                    }}
                    className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[1.5px] h-20 rounded-full origin-bottom"
                  >
                    <div className={`w-full h-full rounded-full ${curr.secHand}`} />
                  </div>

                  {/* Visual Glass Dial Reflection Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none rounded-full" />
                </div>

                {/* Digital projection card */}
                <div 
                  style={{ transform: "translateZ(50px)" }}
                  className="text-center space-y-1 relative"
                >
                  <div className={`text-2xl font-extrabold font-mono tracking-wider transition-colors z-20 relative ${curr.glass}`}>
                    {formattedTime}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium font-sans uppercase tracking-[0.12em]">
                    {formattedDate}
                  </div>
                </div>

                {/* Real-time UX heuristics tips for visual verification */}
                <div 
                  style={{ transform: "translateZ(25px)" }}
                  className="w-full bg-slate-500/5 hover:bg-slate-500/10 border border-slate-500/10 rounded-xl p-3 text-[10px] leading-relaxed text-gray-400 transition-colors"
                >
                  <div className="flex gap-1 items-center font-bold text-amber-500 mb-0.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span className="uppercase font-mono text-[9px]">Visibility of System Status Heuristic</span>
                  </div>
                  This 3D spatial clock updates every single second to maintain continuous visual fidelity, verifying responsive network thread rates instantly. Hover over with your mouse to tilt the 3D plane interactively.
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
