import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Save } from "lucide-react";
import { useSubscriptions } from "../context/SubscriptionsContext";
import type { BillingCycle, Category, SubscriptionStatus } from "../data/types";
import { PageHeader } from "../components/ui";

const SERVICE_PRESETS: { name: string; color: string }[] = [
  { name: "Netflix", color: "#E50914" },
  { name: "Spotify", color: "#1DB954" },
  { name: "Amazon Prime", color: "#00A8E1" },
  { name: "YouTube Premium", color: "#FF0000" },
  { name: "Microsoft 365", color: "#0F6CBD" },
  { name: "Google One", color: "#4285F4" },
  { name: "Coursera", color: "#0056D2" },
  { name: "Canva", color: "#8B3DFF" },
];

const PALETTE = ["#E50914", "#1DB954", "#00A8E1", "#FF0000", "#0F6CBD", "#4285F4", "#0056D2", "#8B3DFF", "#F59E0B", "#6366F1"];

export default function SubscriptionNew() {
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [category, setCategory] = useState<Category>("Entertainment");
  const [status, setStatus] = useState<SubscriptionStatus>("successful");
  const [nextRenewal, setNextRenewal] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [officialLink, setOfficialLink] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const color =
    SERVICE_PRESETS.find((p) => p.name.toLowerCase() === service.trim().toLowerCase())?.color ??
    PALETTE[service.length % PALETTE.length];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(amount);
    if (!service.trim()) return setError("Enter the service name.");
    if (!plan.trim()) return setError("Enter the plan name (e.g. Premium, Family).");
    if (!value || value <= 0) return setError("Enter a valid amount.");
    if (!nextRenewal) return setError("Pick the next renewal date.");

    addSubscription({
      service: service.trim(),
      plan: plan.trim(),
      amount: value,
      cycle,
      category,
      status,
      nextRenewal: new Date(`${nextRenewal}T00:00:00`).toISOString(),
      paymentMethod,
      officialLink: officialLink.trim(),
      notes: notes.trim(),
      color,
    });
    navigate("/subscriptions");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Add Subscription" subtitle="Track an online subscription — Autopay analyzes it, never charges it." />

      <form onSubmit={handleSubmit} className="card space-y-6 p-6 sm:p-8">
        <div className="flex items-start gap-3 rounded-xl bg-indigo-50/70 px-4 py-3">
          <Info size={17} className="mt-0.5 shrink-0 text-indigo-600" />
          <p className="text-[13px] leading-relaxed text-indigo-700">
            Online platforms like Netflix or Spotify are tracked for analysis and reminders only.
            Cancelling or paying them always happens on the official platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Service name</label>
            <input
              className="input w-full rounded-xl px-3.5 py-2.5"
              placeholder="e.g. Netflix"
              list="service-presets"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
            <datalist id="service-presets">
              {SERVICE_PRESETS.map((p) => <option key={p.name} value={p.name} />)}
            </datalist>
          </div>

          <div>
            <label className="label">Plan</label>
            <input className="input w-full rounded-xl px-3.5 py-2.5" placeholder="e.g. Premium 4K" value={plan} onChange={(e) => setPlan(e.target.value)} />
          </div>
          <div>
            <label className="label">Amount (₹)</label>
            <input type="number" min="1" className="input w-full rounded-xl px-3.5 py-2.5" placeholder="649" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div>
            <label className="label">Billing cycle</label>
            <div className="flex rounded-xl border border-slate-200 bg-white p-1">
              {(["monthly", "yearly"] as BillingCycle[]).map((c) => (
                <button key={c} type="button" onClick={() => setCycle(c)} className={`chip flex-1${cycle === c ? " chip-active" : ""}`}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input w-full rounded-xl px-3 py-2.5" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
              {["Entertainment", "Productivity", "Shopping", "Education", "Others"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Status</label>
            <select className="input w-full rounded-xl px-3 py-2.5" value={status} onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}>
              <option value="successful">Successful</option>
              <option value="failed">Failed</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div>
            <label className="label">Next renewal</label>
            <input type="date" className="input w-full rounded-xl px-3 py-2.5" value={nextRenewal} onChange={(e) => setNextRenewal(e.target.value)} />
          </div>

          <div>
            <label className="label">Payment method</label>
            <select className="input w-full rounded-xl px-3 py-2.5" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              {["UPI", "Credit Card", "Debit Card", "Net Banking"].map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Official link (optional)</label>
            <input className="input w-full rounded-xl px-3.5 py-2.5" placeholder="https://…" value={officialLink} onChange={(e) => setOfficialLink(e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Notes (optional)</label>
            <textarea className="input w-full rounded-xl px-3.5 py-2.5" rows={3} placeholder="Family plan shared with 3 members…" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>}

        <div className="flex gap-3 border-t border-slate-100 pt-5">
          <button type="submit" className="btn-primary flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm">
            <Save size={16} /> Save subscription
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary rounded-xl px-5 py-2.5 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
