/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  BookOpen,
  Sliders,
  Play,
  Laptop,
  Tablet,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Award,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Users,
  Terminal,
  FileCheck
} from "lucide-react";
import { ChapterData, chaptersList } from "../data/chapters";
import { userPersonas, heuristicIssues } from "../data/products";
import { UserPersona, HeuristicIssue } from "../types";

interface CaseStudyControlProps {
  deviceSize: "desktop" | "tablet" | "mobile";
  setDeviceSize: (size: "desktop" | "tablet" | "mobile") => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  activeHeuristicId: string | null;
  setActiveHeuristicId: (id: string | null) => void;
  onSelectProductById: (id: string) => void;
  onOpenCart: () => void;
  onSelectTab: (tab: "home" | "products" | "account" | "orders") => void;
}

export default function CaseStudyControl({
  deviceSize,
  setDeviceSize,
  primaryColor,
  setPrimaryColor,
  activeHeuristicId,
  setActiveHeuristicId,
  onSelectProductById,
  onOpenCart,
  onSelectTab
}: CaseStudyControlProps) {
  // Navigation for case-study tabs
  const [activeSegment, setActiveSegment] = useState<"chapters" | "heuristics" | "sandbox" | "testing">("chapters");
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("p1");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Usability test simulator state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [simProgress, setSimProgress] = useState(0); // 0 to 100
  const [showSimResults, setShowSimResults] = useState(false);
  const [simMetrics, setSimMetrics] = useState({
    task: "",
    beforeSuccess: 0,
    afterSuccess: 0,
    beforeTime: 0,
    afterTime: 0,
    frictionDiff: 0
  });

  const selectedChapter = chaptersList.find((c) => c.id === selectedChapterId) || chaptersList[0];
  const activePersona = userPersonas.find((p) => p.id === selectedPersonaId) || userPersonas[0];

  // Colors available for primary style guides
  const availableColors = [
    { name: "Brand Vivid Blue (Style Guide #2563EB)", value: "#2563EB", class: "bg-blue-600" },
    { name: "Lumina Warm Bronze (#D97706)", value: "#D97706", class: "bg-amber-600" },
    { name: "Cosmic Charcoal Grey (#334155)", value: "#334155", class: "bg-slate-700" }
  ];

  // Fast trigger heuristic highlighting & positioning
  const triggerHeuristicInspect = (issue: HeuristicIssue) => {
    setActiveHeuristicId(issue.id);
    setSimLog([`[HEURISTIC] Inspecting: ${issue.heuristic}`, `Evaluating target: #${issue.targetElementId}`]);

    // Dispatch a mock action in e-commerce view if possible
    if (issue.id === "h1") {
      onOpenCart();
    } else if (issue.id === "h2") {
      // open details of target item sound-zenith
      onSelectProductById("sound-zenith");
    } else if (issue.id === "h3") {
      onSelectProductById("sound-zenith");
    } else if (issue.id === "h5") {
      onSelectTab("products");
    }
  };

  // Run dynamic simulated usability test
  const runUsabilityTestSimulation = (taskType: "checkout" | "compare") => {
    setIsSimulating(true);
    setShowSimResults(false);
    setSimLog([]);
    setSimProgress(10);

    const persona = activePersona;
    const logs: string[] = [];
    
    logs.push(`🚀 INITIALIZING USABILITY TEST SESSION`);
    logs.push(`Shopper Persona: ${persona.name} (${persona.occupation}, Age ${persona.age})`);
    logs.push(`Task Goal: ${taskType === "checkout" ? "Locate sound-zenith ANC and checkout with card details" : "Scan and compare specification table metrics"}`);
    setSimLog([...logs]);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setSimProgress(step * 15);

      if (step === 1) {
        logs.push(`[Before Mode] Tester attempts to find product category...`);
        logs.push(`⚠️ ALERT: Low recognition labels forced user into searching 3 collapsed list submenus`);
      } else if (step === 2) {
        logs.push(`[Before Mode] Add to cart clicked... no user confirmation received.`);
        logs.push(`⚠️ ALERT: Visual system status failed. User repeatedly clicked target add-to-cart (3 times)`);
        if (taskType === "checkout") onOpenCart();
      } else if (step === 3) {
        logs.push(`[Redesigned Mode] Shifting viewport to compliant Poppins Layout v2.0...`);
        logs.push(`✓ VISUAL STATUS: Instantly displayed micro-toasts & active side indicator.`);
      } else if (step === 4) {
        logs.push(`[Redesigned Mode] Tester triggers card input validators...`);
        logs.push(`✓ COGNITIVE CAPTURE: Real-time form helper resolved incomplete CVV credentials instantly.`);
      } else if (step === 5) {
        logs.push(`✓ SESSION COMPLETED. Logging performance comparisons into D3 parameters...`);
        clearInterval(interval);
        setIsSimulating(false);
        setSimProgress(100);

        if (taskType === "checkout") {
          setSimMetrics({
            task: "Sound Zenith checkout flow",
            beforeSuccess: 64,
            afterSuccess: 98,
            beforeTime: 182,
            afterTime: 42,
            frictionDiff: 78
          });
        } else {
          setSimMetrics({
            task: "Audio Specification lookup & match",
            beforeSuccess: 52,
            afterSuccess: 94,
            beforeTime: 144,
            afterTime: 31,
            frictionDiff: 85
          });
        }
        setShowSimResults(true);
      }
      setSimLog([...logs]);
    }, 700);
  };

  return (
    <div
      className={`border-r border-gray-200 bg-slate-900 text-slate-100 flex flex-col h-full transition-all duration-300 ${
        isMinimized ? "w-12" : "w-full md:w-[420px]"
      }`}
      id="case-study-workspace-root"
    >
      {/* Top Header of Case Study Panel */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center shrink-0">
        {!isMinimized ? (
          <div className="text-left">
            <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500 animate-spin" />
              <span>UX CASE STUDY & CONTROLLER</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">Website UI Redesign Project</p>
          </div>
        ) : (
          <BookOpen className="w-5 h-5 text-amber-500 mx-auto" />
        )}

        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer text-xs"
          title={isMinimized ? "Open Controller" : "Minimize Controller"}
        >
          {isMinimized ? "❯" : "❮"}
        </button>
      </div>

      {isMinimized ? (
        <div className="flex-1 flex flex-col gap-6 items-center pt-8 text-xs font-mono text-slate-400 select-none">
          <span className="vertical-text tracking-widest text-[9px] uppercase">Case Study Center</span>
        </div>
      ) : (
        <>
          {/* Functional Mode Tabs */}
          <div className="bg-slate-950/40 p-1 border-b border-slate-800 grid grid-cols-4 gap-1 shrink-0 text-[10px] font-semibold text-center uppercase tracking-wide">
            <button
              onClick={() => setActiveSegment("chapters")}
              className={`py-2 rounded-md transition-colors cursor-pointer ${
                activeSegment === "chapters" ? "bg-slate-800 text-amber-400 border border-slate-700" : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 mx-auto mb-1" />
              Chapters
            </button>
            <button
              id="heuristics-tab-btn"
              onClick={() => setActiveSegment("heuristics")}
              className={`py-2 rounded-md transition-colors cursor-pointer ${
                activeSegment === "heuristics" ? "bg-slate-800 text-amber-400 border border-slate-700" : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 mx-auto mb-1" />
              Heuristics
            </button>
            <button
              onClick={() => setActiveSegment("testing")}
              className={`py-2 rounded-md transition-colors cursor-pointer ${
                activeSegment === "testing" ? "bg-slate-800 text-amber-400 border border-slate-700" : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5 mx-auto mb-1" />
              Testing
            </button>
            <button
              id="sandbox-tab-btn"
              onClick={() => setActiveSegment("sandbox")}
              className={`py-2 rounded-md transition-colors cursor-pointer ${
                activeSegment === "sandbox" ? "bg-slate-800 text-amber-400 border border-slate-700" : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 mx-auto mb-1" />
              Sandbox
            </button>
          </div>

          {/* Scrollable Document Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-5">
            {/* Chapters mode presentation */}
            {activeSegment === "chapters" && (
              <div className="space-y-4">
                {/* Chapter Quick Selector list */}
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5 block text-left">
                    Select Section (Ch 1 - 16)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedChapterId}
                      onChange={(e) => setSelectedChapterId(Number(e.target.value))}
                      className="w-full bg-slate-800 text-white rounded-lg p-2.5 border border-slate-700 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                    >
                      {chaptersList.map((chap) => (
                        <option key={chap.id} value={chap.id}>
                          {chap.number}: {chap.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Selected Chapter content card */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left space-y-3.5">
                  <div className="flex justify-between items-start">
                    <span className="bg-amber-400/20 text-amber-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      {selectedChapter.number} Documentation
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">Status: Peer Vetted</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{selectedChapter.title}</h3>
                    <p className="text-[11px] text-amber-405 leading-relaxed text-slate-400 font-mono">{selectedChapter.subtitle}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                    {selectedChapter.summary}
                  </p>

                  {/* Subsection Bullets listing */}
                  {selectedChapter.bullets && selectedChapter.bullets.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <h4 className="text-[11px] font-semibold text-white uppercase tracking-wider">Chapter Details:</h4>
                      <ul className="space-y-1.5 pl-1">
                        {selectedChapter.bullets.map((b, idx) => (
                          <li key={idx} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
                            <span className="text-amber-500 mt-1 shrink-0">▪</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Chapter-specific dynamic interaction preview */}
                {selectedChapterId === 9 && (
                  <div className="p-4 bg-slate-950/30 border border-slate-800 rounded-xl text-left space-y-3">
                    <h4 className="text-[11px] text-white font-bold uppercase tracking-wider">Style Guide Tester Block</h4>
                    <p className="text-xs text-slate-400">
                      The primary style guide sets vibrant Blue `#2563EB` as primary. Tap other palettes below to simulate branding updates live:
                    </p>
                    <div className="flex flex-col gap-2">
                      {availableColors.map((col) => (
                        <button
                          key={col.value}
                          onClick={() => setPrimaryColor(col.value)}
                          className={`flex items-center gap-3 w-full p-2 rounded-lg text-left text-xs font-semibold cursor-pointer border ${
                            primaryColor === col.value ? "border-amber-400 bg-slate-800" : "border-slate-800 bg-slate-950/20"
                          }`}
                        >
                          <span className={`${col.class} w-3.5 h-3.5 rounded-full`} />
                          <span className="text-slate-300">{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Heuristics Evaluation inspection mode */}
            {activeSegment === "heuristics" && (
              <div className="space-y-4 text-left">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>Nielsen Heuristic Audits</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Click "Locate & Highlight" to trigger simulated shopper interactions and highlighting overlays around updated elements:
                  </p>
                </div>

                <div className="space-y-3">
                  {heuristicIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        activeHeuristicId === issue.id
                          ? "bg-slate-950 border-amber-400 shadow-md shadow-amber-400/10"
                          : "bg-slate-850/30 border-slate-805 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="font-bold text-xs text-white uppercase tracking-tight font-sans">
                          {issue.heuristic}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                          {issue.context}
                        </span>
                      </div>

                      <div className="space-y-2 mt-2.5">
                        <div className="bg-red-500/10 p-2 rounded border border-red-500/20 text-[11px]">
                          <span className="font-bold text-red-400 block mb-0.5">Legacy Vulnerability:</span>
                          <span className="text-slate-300 italic">"{issue.problemBefore}"</span>
                        </div>
                        <div className="bg-green-500/10 p-2 rounded border border-green-500/20 text-[11px]">
                          <span className="font-bold text-green-400 block mb-0.5">Redesigned Resolution:</span>
                          <span className="text-slate-300">"{issue.solutionAfter}"</span>
                        </div>
                      </div>

                      <button
                        onClick={() => triggerHeuristicInspect(issue)}
                        className="mt-3.5 w-full py-2 bg-slate-800 hover:bg-slate-705 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        id={`btn-highlight-${issue.id}`}
                      >
                        <Play className="w-3 h-3 text-amber-400" />
                        <span>Locate & Highlight Element</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Persona and Usability Testing simulator */}
            {activeSegment === "testing" && (
              <div className="space-y-4 text-left">
                {/* Personas Quick view selection */}
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mb-2">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>Target Personas Selector</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {userPersonas.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPersonaId(p.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          selectedPersonaId === p.id
                            ? "border-amber-400 bg-slate-950 text-white"
                            : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-xl shrink-0">{p.avatar}</span>
                        <div className="leading-tight">
                          <span className="font-bold text-xs block">{p.name}</span>
                          <span className="text-[9px] text-slate-500 font-mono block">{p.occupation}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Persona deep-look content Card */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="text-xs italic text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    "{activePersona.quote}"
                  </div>

                  <div className="text-xs">
                    <span className="font-bold text-amber-400 block mb-1 uppercase tracking-wide">Key Shopping Pain Points:</span>
                    <ul className="space-y-1 pl-1">
                      {activePersona.painPoints.map((pt, i) => (
                        <li key={i} className="text-slate-400 text-[11px] flex gap-1.5 leading-relaxed">
                          <span className="text-red-500 shrink-0">✕</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Trigger Usability Simulator */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3.5">
                  <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5" /> TEST SANDBOX
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Simulator v1.6</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => runUsabilityTestSimulation("checkout")}
                      disabled={isSimulating}
                      className="py-2 px-3 hover:bg-slate-800 text-slate-100 rounded-lg text-xs font-semibold border border-slate-700 disabled:opacity-40 cursor-pointer text-center"
                    >
                      Test Checkout Funnel
                    </button>
                    <button
                      onClick={() => runUsabilityTestSimulation("compare")}
                      disabled={isSimulating}
                      className="py-2 px-3 hover:bg-slate-800 text-slate-100 rounded-lg text-xs font-semibold border border-slate-700 disabled:opacity-40 cursor-pointer text-center"
                    >
                      Compare Spec Sheet Accuracy
                    </button>
                  </div>

                  {/* Simulator sequence visual loader */}
                  {isSimulating && (
                    <div className="space-y-1.5 pt-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Running Shopper Traces...</span>
                        <span>{simProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 transition-all duration-300"
                          style={{ width: `${simProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Running step logging output console */}
                  {simLog.length > 0 && (
                    <div className="p-3 bg-black rounded-lg font-mono text-[10px] text-green-400 space-y-1 max-h-[140px] overflow-y-auto border border-green-500/25 leading-relaxed text-left">
                      {simLog.map((log, lIdx) => (
                        <div key={lIdx} className="break-all">
                          {log}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Redesign Outcome Chart and Reports (Usability Testing results) */}
                  {showSimResults && (
                    <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-850 border-slate-800 text-xs space-y-3 animate-fade-in">
                      <h4 className="font-bold text-white text-[11px] uppercase flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500 animate-bounce" />
                        <span>Usability Metric Comparison Output</span>
                      </h4>

                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase font-mono">Task Success Rate</span>
                          <div className="flex justify-center items-baseline gap-1.5 mt-1">
                            <span className="text-red-400 line-through text-xs font-bold leading-none">{simMetrics.beforeSuccess}%</span>
                            <span className="text-green-500 text-base font-bold leading-none">{simMetrics.afterSuccess}%</span>
                          </div>
                          <span className="text-[9px] text-amber-400 font-mono block mt-1">+{(simMetrics.afterSuccess - simMetrics.beforeSuccess).toFixed(0)}% Conversion</span>
                        </div>

                        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase font-mono">Task duration time</span>
                          <div className="flex justify-center items-baseline gap-1.5 mt-1">
                            <span className="text-red-400 line-through text-xs font-bold leading-none">{simMetrics.beforeTime}s</span>
                            <span className="text-green-500 text-base font-bold leading-none">{simMetrics.afterTime}s</span>
                          </div>
                          <span className="text-[9px] text-amber-400 font-mono block mt-1">{(simMetrics.beforeTime / simMetrics.afterTime).toFixed(1)}x Faster Response</span>
                        </div>
                      </div>

                      <div className="p-2 bg-green-500/10 text-green-400 rounded text-[10px] text-center font-mono font-bold border border-green-500/20">
                        System usability friction score decreased by {simMetrics.frictionDiff}% overall!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sandbox Configurator Tab */}
            {activeSegment === "sandbox" && (
              <div className="space-y-4 text-left">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Interactive Sandbox Controls</h3>
                  <p className="text-xs text-slate-400">
                    Test the physical responsiveness and branding styles. Modify values below to watch the e-commerce layout shift instantly:
                  </p>
                </div>

                {/* Device Squeeze Frame Simulator */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-semibold text-slate-300 block mb-1">Simulate Screen Dimensions:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setDeviceSize("desktop")}
                      className={`py-2 px-2 rounded-lg flex flex-col items-center gap-1.5 text-[10px] tracking-wide cursor-pointer border font-semibold ${
                        deviceSize === "desktop" ? "border-amber-400 bg-slate-850 text-amber-400" : "border-slate-850 bg-slate-900 text-slate-400"
                      }`}
                      id="btn-desktop-frame"
                    >
                      <Laptop className="w-4 h-4" />
                      Desktop Frame
                    </button>
                    <button
                      key="tablet-device"
                      onClick={() => setDeviceSize("tablet")}
                      className={`py-2 px-2 rounded-lg flex flex-col items-center gap-1.5 text-[10px] tracking-wide cursor-pointer border font-semibold ${
                        deviceSize === "tablet" ? "border-amber-400 bg-slate-850 text-amber-400" : "border-slate-850 bg-slate-900 text-slate-400"
                      }`}
                      id="btn-tablet-frame"
                    >
                      <Tablet className="w-4 h-4" />
                      Tablet Adaptive
                    </button>
                    <button
                      onClick={() => setDeviceSize("mobile")}
                      className={`py-2 px-2 rounded-lg flex flex-col items-center gap-1.5 text-[10px] tracking-wide cursor-pointer border font-semibold ${
                        deviceSize === "mobile" ? "border-amber-400 bg-slate-850 text-amber-400" : "border-slate-850 bg-slate-900 text-slate-400"
                      }`}
                      id="btn-mobile-frame"
                    >
                      <Smartphone className="w-4 h-4" />
                      Mobile Compact
                    </button>
                  </div>
                </div>

                {/* Styling Brand Color guide simulation */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-semibold text-slate-300 block mb-1">Redesign Brand Primary Accent:</span>
                  <div className="flex gap-2.5">
                    {availableColors.map((color) => (
                      <button
                        key={color.value}
                        title={color.name}
                        onClick={() => setPrimaryColor(color.value)}
                        className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-transform ${
                          primaryColor === color.value ? "ring-2 ring-amber-400 scale-105" : "hover:scale-105"
                        } ${color.class}`}
                      >
                        {primaryColor === color.value && <span className="text-[10px] text-white">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Persistent Footer Stats panel inside the Case study */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-400 text-left shrink-0">
            <div className="flex justify-between items-center font-mono">
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-green-500 animate-pulse" />
                <span>POPPINS STYLING: COMPLIANT</span>
              </span>
              <span>SUS: 89.2 (CRITERION A)</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
