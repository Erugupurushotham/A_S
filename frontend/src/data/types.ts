export type BillingCycle = "monthly" | "yearly";

export type SubscriptionStatus = "successful" | "failed" | "active" | "expired";

export type Category =
  | "Entertainment"
  | "Productivity"
  | "Shopping"
  | "Education"
  | "Others";

export interface Subscription {
  id: string;
  service: string;
  plan: string;
  amount: number;
  cycle: BillingCycle;
  category: Category;
  status: SubscriptionStatus;
  nextRenewal: string; // ISO date
  paymentMethod: string;
  officialLink: string;
  notes: string;
  color: string; // brand tile color
}

export interface Payment {
  id: string;
  subscriptionId: string;
  service: string;
  color: string;
  amount: number;
  date: string; // ISO date
  status: "successful" | "failed";
}

export interface BusinessPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
}

export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  distanceKm: number;
  address: string;
  phone: string;
  about: string;
  openHours: string;
  plans: BusinessPlan[];
}
