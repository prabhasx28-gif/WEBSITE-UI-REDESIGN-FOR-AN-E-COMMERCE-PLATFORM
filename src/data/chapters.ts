/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChapterData {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  bullets?: string[];
  meta?: Record<string, any>;
}

export const chaptersList: ChapterData[] = [
  {
    id: 1,
    number: "Ch 1",
    title: "Introduction",
    subtitle: "Background, Overview & Objectives",
    summary: "E-commerce websites have become essential platforms for online shopping. Users expect intuitive navigation, eye-catching layouts, and safe experiences. This project focuses on a comprehensive UI/UX redesign of an e-commerce platform following modern responsive standards, Nielsen’s heuristics, and human-centered workflows.",
    bullets: [
      "1.1 Background: Growth of web-native consumer expectation, high bounce rates due to cognitive friction, and layout clutter.",
      "1.2 Project Overview: Re-engineering interface patterns, typography pairings, spacing hierarchy, and checkout speed.",
      "1.3 Objectives: Boost average task success rate above 94%, decrease time-on-task, and establish cohesive styling.",
      "1.4 Scope: Redesigning Homepage, Products, Detailed Spec Modal, Shopping Cart Drawer, and adaptive checkout panels."
    ]
  },
  {
    id: 2,
    number: "Ch 2",
    title: "Problem Statement",
    subtitle: "Core UI/UX Bottlenecks in the Existing System",
    summary: "The legacy system presented multiple key usability vulnerabilities that frustrated shoppers, increased abandonment rates, and failed basic accessibility criteria on high-contrast checks.",
    bullets: [
      "Complex and redundant primary navigation layouts hiding essential collections.",
      "Inconsistent layout styling where action buttons (primary vs. fallback) used random sizing with no padding strategy.",
      "Inadequate responsive designs (overflow horizontal scrolling on standard smartphone views).",
      "Cluttered product spec grids with missing hierarchy, creating information overload.",
      "Confusing progress flows during checkout with zero validation on form inputs, causing error fatigue."
    ]
  },
  {
    id: 3,
    number: "Ch 3",
    title: "Existing System Analysis",
    subtitle: "Heurantics of the Legacy Layout",
    summary: "A structural audit of the legacy catalog page revealed severe bottlenecks. Key interactive controls competed for visual priority. Let's look at the metrics before the redesign:",
    bullets: [
      "Homepage Overcrowding: Over 17 promotional carousels fighting for priority above the fold.",
      "Alignment Issues: Mixing absolute margins and flex columns with arbitrary margins, causing layout breakages.",
      "Interaction Stale: Zero inline state updates. Adding products required a full-page reload with no toast confirmation.",
      "Keyboard traps and invalid landmark tags mapping onto basic accessibility screen-readers."
    ]
  },
  {
    id: 4,
    number: "Ch 4",
    title: "Heuristic Evaluation",
    subtitle: "Auditing UI via Neilsen Norman Principles",
    summary: "We carried out a detailed systematic Heuristic Evaluation based on Nielsen's 10 standards to identify severe violations and formulate concrete redesign recommendations.",
    bullets: [
      "Visibility of System Status: Added an animated sliding sidebar, immediate loading spinners, and micro-toasts when actions execute.",
      "Match with Real World: Renamed technical inventory codes (e.g. 'SKU-77X-B') with customer-friendly description parameters.",
      "Consistency & Standards: Locked input fields, headers, and grids into a strict unified modular design layout.",
      "Error Prevention: Implemented real-time inline regex validators with immediate helper tips on standard credit cards.",
      "Recognition Rather Than Recall: Made search persistent, recently viewed items floating, and breadcrumbs dynamic."
    ]
  },
  {
    id: 5,
    number: "Ch 5",
    title: "User Research & Insights",
    subtitle: "Understanding Shopping Behaviors & Pain Points",
    summary: "Conducted 15 direct behavioral remote interviews along with qualitative surveys of 120 e-commerce consumers, isolating two distinct search patterns & speed expectations.",
    bullets: [
      "Fast Discovery Seekers: 58% of shoppers drop if they cannot locate their desired specific product category item within 3 steps.",
      "Detail-Oriented Comparers: Customers spend 4.6x more time reading dense, technical specs and reviews on secondary modals.",
      "Key Factor: Intuitive filtering options are highly correlative with elevated conversion triggers.",
      "Mobile Check: 72% of surveyed participants prefer smartphone browsers but report high irritation with small touch-targets."
    ]
  },
  {
    id: 6,
    number: "Ch 6",
    title: "User Personas",
    subtitle: "Target Audience Archae-types",
    summary: "We consolidated our findings into two realistic target personas that represent our primary consumer base and direct design optimization paths.",
    bullets: [
      "Rahul Sharma (24, Software Engineer): Needs frictionless speed, single-click add-to-carts, auto-filling credentials, and a dark/light responsive interface.",
      "Priya Patel (31, Marketing Professional): Needs side-by-side spec comparison tools, collapsible review categories, and authentic ratings with zoomable item cards."
    ]
  },
  {
    id: 7,
    number: "Ch 7",
    title: "Information Architecture",
    subtitle: "Synthesizing User Flows & Sitemaps",
    summary: "The redesigned Sitemap establishes a logical branch hierarchy reducing general click depth from 5 levels down to 2 levels. Information pathways are explicit:",
    bullets: [
      "Primary Root Navigation: Home, Category Quicklinks, Main Modular Products Showcase.",
      "Auxiliary Systems: Floating Cart Sidebar, Animated Wishlist Indicator, Customer Account Dashboard.",
      "Funnels: Direct Product Grid -> Instant Spec Drawer overlay -> Adaptive Multi-Step Cart checkout."
    ]
  },
  {
    id: 8,
    number: "Ch 8",
    title: "Mood Board & Vibe",
    subtitle: "Designing with Intent & Polish",
    summary: "Our mood board establishes a modern, sophisticated aesthetic reflecting high-end retail while emphasizing breathable whitespace and extreme typographic clarity.",
    bullets: [
      "Keywords: Modern, Elegant, Professional, Responsive, User-friendly.",
      "Visual Rythms: Balanced grid margins, micro-shadows, soft neutral backgrounds (#FAFAFA), and deep charcoal base tones.",
      "Interaction Style: Spring active buttons, subtle item cover zooms, and staggered list entries using motion/react."
    ]
  },
  {
    id: 9,
    number: "Ch 9",
    title: "Style Guide System",
    subtitle: "Rigid Brand System Spec",
    summary: "Consistent typographic scales, hex variables, and custom component states define our core digital style sheet.",
    bullets: [
      "Typography Family: Poppins (Display Bold for Headings, Clean Modular Regular for details).",
      "Colors: Primary (#2563EB - vibrant blue), Secondary (#0F172A - slate black), Accent (#F59E0B - gold), Background (#FFFFFF).",
      "Touch Targets: Enforced minimum 44px interactives on buttons, inputs, and category badges for mobile tap security."
    ]
  },
  {
    id: 10,
    number: "Ch 10",
    title: "Wireframes",
    subtitle: "Low-Fidelity Screen Schematics",
    summary: "Early mockups focused strictly on item grids, persistent side cards, and responsive content stack alignments before introducing final colors and images.",
    bullets: [
      "Home Grid: A dynamic responsive grid adapting to screen widths automatically.",
      "Filters Drawer: Shifted filters from a heavy top-bar to a collapsible left layout on Desktop, and an sliding tray on Mobile.",
      "Spec Sheet: Built custom tables tracking alignment guides cleanly to avoid raw paragraphs."
    ]
  },
  {
    id: 11,
    number: "Ch 11",
    title: "High-Fidelity Compositions",
    subtitle: "Translating wireframes into polished graphics",
    summary: "Transformed gray boxes into interactive consumer experiences using live-product images, dynamic badge statuses, and smooth layout changes.",
    bullets: [
      "Dynamic States: Active borders, hover overlay buttons, and immediate scale transitions indicating focus.",
      "Real-time reactive components simulating stock limits, cart tallies, and inline billing additions instantly."
    ]
  },
  {
    id: 12,
    number: "Ch 12",
    title: "Responsive Adaptations",
    subtitle: "Continuous Fluid Layouts",
    summary: "Ensured beautiful viewing ratios by using fluid Tailwind layout grids. Elements stack organically to accommodate touch screens without losing detail.",
    bullets: [
      "Desktop layout: 3-column modular layouts carrying side-panels for search criteria.",
      "Tablet adaptation: Multi-column grid compressing down gracefully, toggling search into a sub-header.",
      "Mobile adaptation: Clean slide-out filter sheets, single/double column grids, and bottom floating checkout triggers."
    ]
  },
  {
    id: 13,
    number: "Ch 13",
    title: "Industrial Tools Overview",
    subtitle: "Enforcing Industry Standards",
    summary: "The design system was prototyped and vetted across standard graphic workspaces. The responsive development bridges standard designs into a complete React web interface.",
    bullets: [
      "Tooling: Figma (UX designs & vectors), Google Fonts (Poppins family), and Font Awesome/Lucide icons.",
      "Frictionless Translation: Built from-scratch Tailwind implementations mapping exactly onto mockup constraints."
    ]
  },
  {
    id: 14,
    number: "Ch 14",
    title: "Usability Testing Results",
    subtitle: "Quantifiable Success & Metric Performance",
    summary: "Comparing usability testing reports across identical shopping tasks in both the Before and Redesigned platforms demonstrates massive boosts in performance.",
    bullets: [
      "Task Success Rate: Climbed from 64.2% up to 96.8% in checkout completion tests.",
      "Average Duration on Task: Dropped from 182 seconds to 45 seconds for item location.",
      "System Usability Score (SUS): Attained a stellar 'A' tier ranking of 89.2, up from 52.4.",
      "Qualitative Rating: Users cited highly welcoming colors, clear text sizes, and pleasant added confidence signs."
    ]
  },
  {
    id: 15,
    number: "Ch 15",
    title: "Future Enhancements",
    subtitle: "Scaling the Redesign Product Map",
    summary: "Future expansion modules designed to ride on top of the established layout architecture to provide even deeper personalized commerce.",
    bullets: [
      "AI-driven semantic recommendation agent powered by Gemini API.",
      "Voice-input catalog searches for hands-free and accessible browse flows.",
      "Full dark mode layout configuration utilizing Tailwind's dark utility prefixes."
    ]
  },
  {
    id: 16,
    number: "Ch 16",
    title: "Project Conclusion & Retrospective",
    subtitle: "Closing Design Learnings",
    summary: "This comprehensive redesign proves that aesthetic refinement when backed solidly by Nielsen's usability guidelines improves customer happiness and reduces cart abandonment.",
    bullets: [
      "Usability is not an afterthought: Clear font pairing and spacious spacing layouts are essential commerce assets.",
      "Visual Hierarchy and consistency in action buttons drastically lowers cognitive decision loads.",
      "Interactive feedback bridges physical shopping expectations cleanly into high-performance digital stores."
    ]
  }
];
