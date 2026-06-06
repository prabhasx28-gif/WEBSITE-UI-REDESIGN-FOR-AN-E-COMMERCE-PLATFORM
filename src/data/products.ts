/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category, UserPersona, HeuristicIssue } from "../types";

export const categoriesList: Category[] = [
  {
    id: "all",
    name: "All Collections",
    description: "Browse our entire catalog of redesigned premium products",
    icon: "LayoutGrid"
  },
  {
    id: "tech",
    name: "Tech & Workspace",
    description: "Premium gadgets and peripheral items optimized for productivity",
    icon: "Laptop"
  },
  {
    id: "lifestyle",
    name: "Travel & Commute",
    description: "Durable and weather-proof solutions for modern professionals",
    icon: "Briefcase"
  },
  {
    id: "wearables",
    name: "Smart Wearables",
    description: "Sleek and high-accuracy health and notification devices",
    icon: "Watch"
  },
  {
    id: "audio",
    name: "Premium Audio",
    description: "Immersive acoustic items engineered with pristine sound signature",
    icon: "Headphones"
  }
];

export const productsList: Product[] = [
  {
    id: "sound-zenith",
    name: "Zenith ANC Headphones",
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    ratingCount: 142,
    category: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    description: "Studio-grade active noise cancellation headphones with custom drivers, 40hr battery life, and rapid-charge technology.",
    longDescription: "Engineered for pure focus, the Zenith ANC Headphones integrate active acoustic shielding with ultra-low distortion 40mm neodymium drivers. Designed with memory-foam ear cushions wrapped in premium protein leather, they deliver unparalleled comfort for long-lasting listening sessions. Features touch-gesture controls, high-fidelity ambient bypass mode, and seamless multi-device Bluetooth audio pairing.",
    stock: 14,
    featured: true,
    colors: ["Space Gray", "Alabaster White", "Ocean Blue"],
    specs: {
      "Drive Unit": "40mm custom Dynamic Neodymium",
      "Noise Cancellation": "Hybrid Active ANC up to -40dB",
      "Bluetooth Protocol": "Bluetooth 5.3 with LE Audio",
      "Battery Endurance": "40 Hours (ANC On) / 60 Hours (Off)",
      "Audio Codecs": "AAC, SBC, aptX Adaptive",
      "Charging Connection": "USB Type-C (10 min charge = 5 hours play)"
    },
    reviews: [
      { id: "r1", user: "Vikram R.", rating: 5, text: "Unbelievable balance! The active cancellation is stellar, isolating high-pitch office hum perfectly.", date: "2026-05-12" },
      { id: "r2", user: "Tanya S.", rating: 4, text: "Pristine mids and incredibly comfortable over long deep-focus programming sessions. Beautiful design.", date: "2026-05-20" }
    ]
  },
  {
    id: "apex-key",
    name: "Alloy-87 Mechanical Keyboard",
    price: 149,
    originalPrice: 179,
    rating: 4.9,
    ratingCount: 88,
    category: "tech",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",
    description: "Anodized aluminum CNC case, hot-swappable linear yellow switches, sound-damped stabilizers, and custom RGB profiles.",
    longDescription: "The Alloy-87 represents the pinnacle of compact workspace acoustics. Crafted with a heavy CNC-machined aluminum body and high-density interior dampening sheets, every keystroke delivers a solid, satisfying sound. Outfitted with pre-lubricated silent linear switches, double-shot PBT keycaps with crisp text, and full hot-swap pin sockets for absolute personalization.",
    stock: 9,
    featured: true,
    colors: ["Obsidian Black", "Arctic Silver"],
    specs: {
      "Form Factor": "Tenkeyless (87 Key Layout)",
      "Case Material": "Anodized Aircraft-Grade Aluminum",
      "Pin Hot-swap": "3-pin & 5-pin compatible sockets",
      "Stock Switches": "Pre-lubed Silent Linear Yellows (45g)",
      "Stabilizers": "Screw-in PCB mounted stabilizers",
      "Connecting Style": "Detachable braided Type-C cable"
    },
    reviews: [
      { id: "r3", user: "Arjun M.", rating: 5, text: "The typing feel is absolute luxury. The stock linear yellows sound perfectly lubed, very crisp.", date: "2026-04-28" }
    ]
  },
  {
    id: "nomad-pack",
    name: "Nomad Commuter Backpack",
    price: 120,
    rating: 4.7,
    ratingCount: 215,
    category: "lifestyle",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    description: "Military-grade ballistic nylon, weather-sealed zip pathways, dedicated floating laptop bay, and 24L storage capacity.",
    longDescription: "Engineered to safeguard your entire everyday carry, the Nomad Commuter Backpack features an extremely robust 1680D high-density ballistic nylon exterior coated in water-repulsive polymer. Features a suspended, microfiber-lined laptop cradle, an integrated quick-access passport slot, premium magnetic fidlock buckles, and an ergonomic channel back-panel for sweat mitigation.",
    stock: 25,
    featured: true,
    colors: ["Midnight Carbon", "Olive Drab", "Silt Khaki"],
    specs: {
      "Capacity Volume": "24 Liters of organized storage",
      "Body Material": "1680D Ballistic Cordura Nylon",
      "Laptop Capacity": "Fits up to 16\" Macbook Pro suspended",
      "Zipper Track": "YKK AquaGuard weather-shielded zips",
      "Weight Capacity": "Tested for loads up to 25kg comfortably",
      "Sternum Buckle": "Magnetic Quick-Snap Fidlock"
    },
    reviews: [
      { id: "r4", user: "Meera K.", rating: 5, text: "I have taken this through multiple heavy monsoons. Everything inside stays completely bone-dry. Incredible purchase.", date: "2026-05-30" },
      { id: "r5", user: "Rahul Sharma", rating: 4, text: "Perfect for holding my devices and travel charger securely. Easy visual search inside due to high contrast layout.", date: "2026-06-01" }
    ]
  },
  {
    id: "pulse-halo",
    name: "AeroActive Sports Watch",
    price: 189,
    originalPrice: 229,
    rating: 4.6,
    ratingCount: 97,
    category: "wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    description: "Always-on sapphire crystal display, dual-band GPS tracker, continuous optical SpO2 heart rate engine, and waterproof casing.",
    longDescription: "The AeroActive watch is built for athletes who demand exact biometric tracking. Featuring a titanium rotating bezel and ultra-hard sapphire crystal face, it withstands severe outdoor scrapes. Outfitted with deep dual-band GPS, 14 specialized athletic metrics, ambient water depth pressure sensors, and deep sleep architecture scores sync-enabled to our streamlined client application profile.",
    stock: 4,
    colors: ["Carbon Titanium", "Solar Amber"],
    specs: {
      "Screen Type": "1.4\" AMOLED Sapphire Touch-Display",
      "Casing Core": "Grade 5 Titanium & fiber-reinforced casing",
      "Water Resistance": "10 ATM (Submersible up to 100 meters)",
      "Sensing Suite": "6-Axis Gyro, Optical HR, HRV, SpO2 & ECG",
      "GPS System": "Multi-Band GNSS (GPS, GLONASS, Galileo)",
      "Battery Lifespan": "Up to 12 days in standard activity mode"
    },
    reviews: [
      { id: "r6", user: "Priya Patel", rating: 5, text: "Love the immediate health summary dials. Running tracking is highly precise compared to older sports devices.", date: "2026-06-03" }
    ]
  },
  {
    id: "lumina-glow",
    name: "Lumina Smart Desk Lamp",
    price: 79,
    rating: 4.5,
    ratingCount: 304,
    category: "tech",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
    description: "Architectural desk stand, smart tunable CRI 95 LEDs, built-in Qi wireless fast-charger, and touch slide-bar intensity scale.",
    longDescription: "Crafted to prevent optical strain, the Lumina Smart Desk Lamp projects clean, diffused, glare-free light with an ultra-high Color Rendering Index of 95. Matches circadian rhythms via astronomical sunrise-to-sunset temperature curves. Engineered with an anodized structural hinge, warm high-contrast brass elements, and a integrated fast Qi charger in the heavy safety-base.",
    stock: 18,
    colors: ["Brushed Amber", "Minimalist White"],
    specs: {
      "Color Accuracy": "CRI 95+ professional light output",
      "Color Temperature": "Tunable 2700K (Warm) to 6500K (Daylight)",
      "Maximum Output": "850 Lumens adjustable spotlight",
      "Base Fast-Charge": "Built-in 15W Qi wireless charge pad",
      "Core Hinge": "Double-Axis articulating friction gear",
      "Input Mode": "Touch-capacitive slider track"
    },
    reviews: [
      { id: "r7", user: "Suresh P.", rating: 5, text: "Absolutely phenomenal light quality. The Qi charge spot renders desk clutter a thing of the past.", date: "2026-05-18" }
    ]
  },
  {
    id: "sound-pod",
    name: "EchoSphere Desktop Speakers",
    price: 249,
    originalPrice: 279,
    rating: 4.9,
    ratingCount: 65,
    category: "audio",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=700&q=80",
    description: "Compact desktop studio monitors featuring customized Kevlar cones, walnut veneer cabinets, and USB-DAC digital input stream.",
    longDescription: "A glorious combination of acoustic engineering and organic woodwork. The EchoSphere monitors utilize heavy, hand-polished walnut plywood cabinets to arrest cabinet resonances. Inside, custom 3.5\" bulletproof Kevlar bass-mid woofers dance alongside lightweight silk-dome tweeters to project a perfectly detailed, wide stereo stage right across your desk space.",
    stock: 7,
    colors: ["Walnut Gold", "Sleek Carbon"],
    specs: {
      "Acoustic Power": "80W Peak Class-D amplification",
      "Woofers Units": "3.5\" Woven Kevlar driver cones",
      "Tweeters": "0.75\" Silk-dome high frequency drivers",
      "Digital Input": "Built-in premium 24-bit/96kHz Sabre DAC",
      "Ports Profile": "USB-C, Bluetooth 5.0, 3.5mm Aux & RCA Inputs",
      "Cabinet Specs": "MDF core with authentic Walnut side veneers"
    },
    reviews: [
      { id: "r8", user: "Kabir L.", rating: 5, text: "For this compact size, the spatial separation is shocking. The DAC brings out details I have never heard before in acoustic songs.", date: "2026-05-24" }
    ]
  }
];

export const userPersonas: UserPersona[] = [
  {
    id: "p1",
    name: "Rahul Sharma",
    age: 24,
    occupation: "Software Engineer",
    goals: [
      "Frictionless, single-click additions to shopping carts.",
      "Accelerated checkout sequence with zero form friction.",
      "Clear indicators confirming standard order confirmation and parcel dispatch timelines."
    ],
    painPoints: [
      "Confusing layouts that obfuscate real-time pricing and shipping delivery brackets.",
      "Slow, unresponsive mobile views that force horizontal scrolling and carry microscopic buttons."
    ],
    avatar: "💻",
    quote: "I just want things to be fast. I buy my gear with zero fuss, so if a website has slow pages or microscopic buttons that fail on phone clicks, I bounce immediately.",
    scenario: "Accustomed to purchasing developer tools and books in a single-click flow. Extremely sensitive to latency and layout drift."
  },
  {
    id: "p2",
    name: "Priya Patel",
    age: 31,
    occupation: "Marketing Professional",
    goals: [
      "Speedy side-by-side spec comparison to select products accurately.",
      "Unrestricted access to high-contrast technical figures and ratings before committing."
    ],
    painPoints: [
      "Unstructured product grids with random text truncation, hiding key measurements of products.",
      "Fragmented product layouts that make it tedious to evaluate real sizing or component features."
    ],
    avatar: "🎨",
    quote: "I compare specs in detail. When product descriptions are vague and important specifications are buried behind heavy PDFs or collapsed text, I buy elsewhere.",
    scenario: "Wants premium accessories that handle heavy creative travel. Relies heavily on verified consumer reviews and well-organized specification tables."
  }
];

export const heuristicIssues: HeuristicIssue[] = [
  {
    id: "h1",
    heuristic: "Visibility of System Status",
    problemBefore: "Adding products to cart gave no user confirmation. Customers clicked repeatedly, resulting in unexpected multi-item additions on checkout page.",
    solutionAfter: "Added floating badges on primary cart, slide-out cart sidebar, micro-scale animations, and brief, auto-dismissing toast notifications verifying success.",
    targetElementId: "nav-cart-btn",
    context: "Cart State Feedback"
  },
  {
    id: "h2",
    heuristic: "Match Between System & Real World",
    problemBefore: "Product specification listings featured technical factory codes (e.g. 'ANOD-ALU-87-Y') that simple non-technical users couldn't translate.",
    solutionAfter: "Replaced confusing internal codes with readable translations (e.g. 'Anodized Aircraft-Grade Aluminum, linear quiet yellow switches').",
    targetElementId: "specifications-table",
    context: "Natural Spec Titles"
  },
  {
    id: "h3",
    heuristic: "Consistency & Standards",
    problemBefore: "Action buttons of varying spacing styles and colors were scattered. Secondary selectors was occasionally dark, sometimes bright blue, with irregular sizing.",
    solutionAfter: "Created a rigid visual hierarchy with Poppins, locking Primary Actions to Vibrant Blue (#2563EB) and Secondary actions to Slate grey (#0F172A).",
    targetElementId: "action-button-group",
    context: "Style Guide System"
  },
  {
    id: "h4",
    heuristic: "Error Prevention",
    problemBefore: "Form fields did not validate credit card, email, or zip inputs until final submit. Caused frustrating page re-renders and deleted form progress.",
    solutionAfter: "Added real-time validation checks as user types, highlighting field borders instantly with clean helper instructions if formats fail context requirements.",
    targetElementId: "checkout-form",
    context: "Frictionless Forms"
  },
  {
    id: "h5",
    heuristic: "Recognition Rather Than Recall",
    problemBefore: "Category listings and wishlist values were hidden inside multiple user preference dropdown menus requiring 4-5 manual user clicks to trace.",
    solutionAfter: "Configured persistent search, responsive category shortcut tags on top header, and clear item ratings with active rating counts immediately visible on cards.",
    targetElementId: "search-filter-controls",
    context: "Transparent Discovery"
  }
];
