import type { Business, Payment, Subscription } from "./types.ts";

const isoInDays = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const isoDaysAgo = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "netflix",
    service: "Netflix",
    plan: "Premium Plan",
    amount: 649,
    cycle: "monthly",
    category: "Entertainment",
    status: "successful",
    nextRenewal: isoInDays(5),
    paymentMethod: "HDFC Credit Card (•• 4242)",
    officialLink: "https://netflix.com/account",
    notes: "4K + HDR • 4 devices",
    color: "#E50914",
  },
  {
    id: "spotify",
    service: "Spotify",
    plan: "Individual Plan",
    amount: 119,
    cycle: "monthly",
    category: "Entertainment",
    status: "successful",
    nextRenewal: isoInDays(12),
    paymentMethod: "UPI (autopay@okhdfc)",
    officialLink: "https://spotify.com/account",
    notes: "",
    color: "#1DB954",
  },
  {
    id: "prime",
    service: "Amazon Prime",
    plan: "Prime Video",
    amount: 299,
    cycle: "monthly",
    category: "Entertainment",
    status: "successful",
    nextRenewal: isoInDays(20),
    paymentMethod: "ICICI Credit Card (•• 8811)",
    officialLink: "https://amazon.in/amazonprime",
    notes: "",
    color: "#00A8E1",
  },
  {
    id: "youtube",
    service: "YouTube Premium",
    plan: "Family Plan",
    amount: 299,
    cycle: "monthly",
    category: "Entertainment",
    status: "failed",
    nextRenewal: isoInDays(28),
    paymentMethod: "UPI (autopay@okhdfc)",
    officialLink: "https://youtube.com/paid_memberships",
    notes: "5 family members",
    color: "#FF0000",
  },
  {
    id: "m365",
    service: "Microsoft 365",
    plan: "Personal",
    amount: 499,
    cycle: "monthly",
    category: "Productivity",
    status: "successful",
    nextRenewal: isoInDays(9),
    paymentMethod: "HDFC Credit Card (•• 4242)",
    officialLink: "https://account.microsoft.com",
    notes: "1 TB OneDrive included",
    color: "#0F6CBD",
  },
  {
    id: "googleone",
    service: "Google One",
    plan: "200 GB",
    amount: 199,
    cycle: "monthly",
    category: "Productivity",
    status: "successful",
    nextRenewal: isoInDays(16),
    paymentMethod: "UPI (autopay@okhdfc)",
    officialLink: "https://one.google.com",
    notes: "",
    color: "#4285F4",
  },
  {
    id: "coursera",
    service: "Coursera Plus",
    plan: "Annual",
    amount: 3299,
    cycle: "yearly",
    category: "Education",
    status: "successful",
    nextRenewal: isoInDays(45),
    paymentMethod: "ICICI Credit Card (•• 8811)",
    officialLink: "https://coursera.org",
    notes: "Billed annually",
    color: "#0056D2",
  },
  {
    id: "canva",
    service: "Canva Pro",
    plan: "Team",
    amount: 499,
    cycle: "monthly",
    category: "Others",
    status: "failed",
    nextRenewal: isoInDays(33),
    paymentMethod: "UPI (autopay@okhdfc)",
    officialLink: "https://canva.com",
    notes: "Consider cancelling — rarely used",
    color: "#8B3DFF",
  },
];

export const PAYMENTS: Payment[] = [
  { id: "p1", subscriptionId: "netflix", service: "Netflix", color: "#E50914", amount: 649, date: isoDaysAgo(6), status: "successful" },
  { id: "p2", subscriptionId: "spotify", service: "Spotify", color: "#1DB954", amount: 119, date: isoDaysAgo(18), status: "successful" },
  { id: "p3", subscriptionId: "prime", service: "Amazon Prime", color: "#00A8E1", amount: 299, date: isoDaysAgo(24), status: "successful" },
  { id: "p4", subscriptionId: "youtube", service: "YouTube Premium", color: "#FF0000", amount: 299, date: isoDaysAgo(32), status: "failed" },
  { id: "p5", subscriptionId: "m365", service: "Microsoft 365", color: "#0F6CBD", amount: 499, date: isoDaysAgo(40), status: "successful" },
  { id: "p6", subscriptionId: "coursera", service: "Coursera Plus", color: "#0056D2", amount: 3299, date: isoDaysAgo(70), status: "successful" },
];

export const SPENDING_BY_MONTH = [
  { month: "Jan", amount: 980 },
  { month: "Feb", amount: 1120 },
  { month: "Mar", amount: 1050 },
  { month: "Apr", amount: 1248 },
  { month: "May", amount: 1180 },
  { month: "Jun", amount: 1305 },
];

export const SPENDING_BY_YEAR = [
  { month: "2022", amount: 8200 },
  { month: "2023", amount: 11800 },
  { month: "2024", amount: 14200 },
  { month: "2025", amount: 15600 },
  { month: "2026", amount: 9600 },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Entertainment: "#6366F1",
  Productivity: "#38BDF8",
  Shopping: "#FB7185",
  Education: "#FBBF24",
  Others: "#94A3B8",
};

export const BUSINESSES: Business[] = [
  {
    id: "fitness-hub",
    name: "The Fitness Hub",
    category: "Gym & Fitness",
    rating: 4.5,
    distanceKm: 0.2,
    address: "3rd Main Road, Indiranagar, Bengaluru",
    phone: "+91 98765 43210",
    about:
      "Premium fitness center with modern equipment and expert trainers. Group classes, personal training and diet plans included in membership.",
    openHours: "Open Now · Closes 10:00 PM",
    plans: [
      { name: "Monthly", price: 1500, period: "month", features: ["Gym floor access", "Locker room", "1 fitness assessment"] },
      { name: "Quarterly", price: 4000, period: "quarter", features: ["Everything in Monthly", "2 group classes / week", "Diet consultation"] },
      { name: "Annual", price: 14000, period: "year", features: ["Everything in Quarterly", "Unlimited classes", "Personal trainer (4 sessions)"] },
    ],
  },
  {
    id: "fresh-bites",
    name: "Fresh Bites Cafe",
    category: "Cafe",
    rating: 4.2,
    distanceKm: 0.8,
    address: "12th Cross, MG Road, Bengaluru",
    phone: "+91 98765 12345",
    about: "Artisan coffee and healthy meals with a subscription-based daily brew plan.",
    openHours: "Open Now · Closes 9:30 PM",
    plans: [
      { name: "Coffee Pass", price: 999, period: "month", features: ["1 coffee / day", "Any size", "Skip weekends"] },
    ],
  },
  {
    id: "elite-salon",
    name: "Elite Salon",
    category: "Beauty & Wellness",
    rating: 4.7,
    distanceKm: 1.1,
    address: "100 Feet Road, Koramangala, Bengaluru",
    phone: "+91 91234 56789",
    about: "Full-service salon with monthly grooming memberships.",
    openHours: "Opens 10:00 AM",
    plans: [
      { name: "Grooming", price: 2499, period: "month", features: ["2 haircuts", "1 beard trim", "1 facial"] },
    ],
  },
  {
    id: "city-books",
    name: "City Book Store",
    category: "Books & Hobbies",
    rating: 4.3,
    distanceKm: 2.5,
    address: "Church Street, Bengaluru",
    phone: "+91 99887 66554",
    about: "Independent bookstore with a monthly readers' club subscription.",
    openHours: "Open Now · Closes 8:00 PM",
    plans: [
      { name: "Readers' Club", price: 799, period: "month", features: ["Borrow 2 books", "Member discounts", "Sunday events"] },
    ],
  },
];
