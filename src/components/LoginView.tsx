/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  Eye,
  EyeOff,
  UserCheck,
  RefreshCw
} from "lucide-react";
import ThreeDClock from "./ThreeDClock";

interface LoginViewProps {
  onLoginSuccess: (userName: string, userAvatar: string) => void;
  onBypassLogin: () => void;
  primaryColor?: string;
}

export default function LoginView({ onLoginSuccess, onBypassLogin, primaryColor = "#2563EB" }: LoginViewProps) {
  // Credentials States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation indicator states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto-fill credential fast triggers (supporting our heuristic design personas)
  const simulationPersonas = [
    {
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      avatar: "👨‍💻",
      occupation: "WFH Backend Engineer",
      pass: "rahulsecure2026"
    },
    {
      name: "Priya Patel",
      email: "priya.patel@designhub.co",
      avatar: "👩‍🎨",
      occupation: "Creative Director",
      pass: "priyacreative99"
    }
  ];

  // Manual Credentials Validation Heuristics (Error Prevention)
  const handleValidateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic fields validation
    if (!email) {
      setErrorMsg("Visibility Action Failed: Email is a mandatory identification item.");
      return;
    }
    if (!email.includes("@")) {
      setErrorMsg("Error Prevention Match: Email must contain a valid '@' domain operator.");
      return;
    }
    if (!password) {
      setErrorMsg("Verification Rejected: Passwords cannot be empty.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Heuristic Safety Rule: Passwords must contain a minimum of 6 characters.");
      return;
    }

    // Simulate Secure Cryptographic Verification API
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Match if persona email
      const matchedPersona = simulationPersonas.find(p => p.email.toLowerCase() === email.toLowerCase());
      const displayName = matchedPersona ? matchedPersona.name : email.split("@")[0];
      const avatarLabel = matchedPersona ? matchedPersona.avatar : "👤";

      setSuccessMsg(`✓ Authentication Verified! Welcome back, ${displayName}. Transferring to Lumina Sandbox...`);
      
      setTimeout(() => {
        onLoginSuccess(displayName, avatarLabel);
      }, 1200);
    }, 1000);
  };

  const handleApplyPersona = (persona: typeof simulationPersonas[0]) => {
    setEmail(persona.email);
    setPassword(persona.pass);
    setErrorMsg(null);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col md:flex-row shadow-inner" id="secure-login-portal">
      
      {/* LEFT SPLIT PANEL: Interactive 3D system clock & branding */}
      <div className="w-full md:w-1/2 bg-slate-900 text-white flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
        
        {/* Abstract background vector mesh glow */}
        <div className="absolute inset-x-0 -top-40 h-96 bg-primary-600/10 blur-3xl rounded-full" />
        <div className="absolute inset-x-0 -bottom-40 h-96 bg-teal-500/10 blur-3xl rounded-full animate-pulse" />

        {/* Brand visual header */}
        <div className="relative flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-extrabold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              L
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block">LUMINA CONSOLE</span>
              <span className="text-[8px] font-mono text-emerald-400 block tracking-widest -mt-0.5 uppercase">Security Audit Gate</span>
            </div>
          </div>
          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full">
            ● SSL SECURED
          </span>
        </div>

        {/* Dynamic 3D clock workspace display */}
        <div className="relative py-8 my-auto z-10">
          <div className="text-center space-y-2 mb-4">
            <h2 className="text-xl font-black font-sans text-white tracking-tight">KINETIC CHRONOS MATRIX</h2>
            <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
              This spatial 3D clock widget uses hardware-accelerated CSS perspective matrices. Move your cursor over the card to tilt the time capsule interactively!
            </p>
          </div>
          
          {/* Integrated 3D Clock component */}
          <ThreeDClock />
        </div>

        {/* Footer info showing environmental variables details */}
        <div className="relative z-10 border-t border-slate-800 pt-5 text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="font-mono">BUILD RUNTIME: SECURE SANDBOX</span>
          <span className="font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> AES-256 SESSION CHANNELS
          </span>
        </div>
      </div>

      {/* RIGHT SPLIT PANEL: Secure form validator & UX persona simulator options */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-left relative">
        <div className="max-w-md w-full mx-auto space-y-6">
          
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono tracking-wider text-primary uppercase block">
              Redesigned Experience Sandbox
            </span>
            <h1 className="text-2xl font-black text-secondary tracking-tight">Access Lumina Studio</h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              Authenticate your developer session or instantly select a pre-configured UX Persona below to run real-world heuristic tests in our shopping simulator.
            </p>
          </div>

          {/* Quick Persona Picker (Heuristic Helper Targets) */}
          <div className="bg-slate-50/70 border border-gray-100 rounded-2xl p-4 space-y-3">
            <span className="text-[10px] font-bold font-mono text-gray-400 block uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-primary" /> Simulate UX Persona Session
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {simulationPersonas.map((persona) => (
                <button
                  key={persona.email}
                  type="button"
                  onClick={() => handleApplyPersona(persona)}
                  className="flex items-center gap-3 p-2.5 bg-white border border-gray-150 hover:border-primary rounded-xl text-left hover:shadow-md transition-all active:scale-95 group cursor-pointer"
                >
                  <span className="text-2xl bg-slate-50 p-1.5 rounded-lg border border-slate-100 leading-none group-hover:bg-primary/5 transition-colors">
                    {persona.avatar}
                  </span>
                  <div>
                    <h4 className="font-mono font-bold text-[11px] text-secondary group-hover:text-primary transition-colors block">
                      {persona.name}
                    </h4>
                    <span className="text-[9px] text-gray-400 block -mt-0.5 leading-none">
                      {persona.occupation}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 italic">
              *Tapping a persona auto-populates credentials correctly for quick, seamless simulation testing.
            </p>
          </div>

          {/* Core Login Form */}
          <form className="space-y-4" onSubmit={handleValidateLogin}>
            
            {/* Display error messages dynamically */}
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 text-xs flex items-start gap-2.5 animate-fade-in font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Display success message */}
            {successMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 text-xs flex items-start gap-2.5 animate-fade-in font-medium">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-3.5">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Console Email Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="user@example.com"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 hover:border-gray-300 focus:bg-white text-xs text-secondary rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Secure Password field */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Security Access Token
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] text-primary hover:underline font-semibold font-mono"
                  >
                    {showPassword ? "HIDE TOKEN" : "SHOW TOKEN"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 hover:border-gray-300 focus:bg-white text-xs font-mono text-secondary rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Submit Actions Button */}
            <div className="pt-2 flex flex-col gap-3 font-semibold">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-primary hover:bg-primary-700 disabled:bg-primary/50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-99 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Verifying Credentials Ledger...
                  </>
                ) : (
                  <>
                    Authenticate Console <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBypassLogin}
                className="w-full py-2 bg-slate-105 border border-slate-205 hover:bg-slate-50 text-gray-600 hover:text-gray-950 font-bold text-[11px] rounded-xl transition-all cursor-pointer"
              >
                Direct Access Mode (Bypass Login Security)
              </button>
            </div>
          </form>

          {/* Feedback Heuristics Note */}
          <div className="bg-slate-50 border border-gray-150 rounded-xl p-3.5 flex gap-2.5">
            <span className="text-sm">💡</span>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              <strong>Heuristic Note (Error Prevention & Feedback):</strong> The login form evaluates formats dynamically, verifying proper constraints (like <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[9px]">@</code> format and length) before communicating with server assets, protecting user workloads seamlessly.
            </p>
          </div>

        </div>
      </div>
      
    </div>
  );
}
