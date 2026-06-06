/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  specs: Record<string, string>;
  stock: number;
  featured?: boolean;
  colors?: string[];
  reviews: Array<{
    id: string;
    user: string;
    rating: number;
    text: string;
    date: string;
  }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface UserPersona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  goals: string[];
  painPoints: string[];
  avatar: string;
  quote: string;
  scenario: string;
}

export interface HeuristicIssue {
  id: string;
  heuristic: string;
  problemBefore: string;
  solutionAfter: string;
  targetElementId: string; // DOM element ID to point to
  context: string;
}

export interface UsabilityTest {
  id: string;
  taskName: string;
  description: string;
  beforeStats: {
    successRate: number;
    timeMs: number;
    clicks: number;
    frictionIndex: number; // 1-100
  };
  afterStats: {
    successRate: number;
    timeMs: number;
    clicks: number;
    frictionIndex: number;
  };
  personaId: string;
  currentStep: number;
  maxSteps: number;
}
