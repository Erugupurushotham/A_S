import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  User,
  X,
} from "lucide-react";
import { BUSINESSES } from "../data/mock";
import { formatINR } from "../lib/format";

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const business = BUSINESSES.find((b) => b.id === id);
  const [selectedPlan, setSelectedPlan] = useState(business?.plans[0]?.name ?? "");
  const [submitted, setSubmitted] = useState(false);

  if (!business) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="card flex flex-col items-center gap-4 p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">Business not found.</p>
          <Link to="/businesses" className="btn-secondary rounded-xl px-4 py-2 text-sm">Back to businesses</Link>
        </div>
      </div>
    );
  }

  const plan = business.plans.find((p) => p.name === selectedPlan) ?? business.plans[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600">
        <ArrowLeft size={16} /> Back
      </button>

      {submitted && (
        <div className="fixed right-5 top-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] pop-in">
          <div className="rounded-2xl bg-emerald-600 p-4 text-white shadow-2xl ring-1 ring-emerald-500/20" role="alert">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">Subscription request sent to {business.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-emerald-100">
                  The merchant will confirm your plan. UPI autopay mandate will be created once they approve.
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-emerald-100 hover:bg-white/10 hover:text-white"
                onClick={() => setSubmitted(false)}
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="flex h-28 items-center bg-gradient-to-r from-[#0A1735] via-[#0C1D45] to-indigo-800 px-6 sm:px-8">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-2xl font-extrabold text-indigo-600 shadow-lg">
            {business.name.charAt(0)}
          </span>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">{business.name}</h1>
            <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
              <BadgeCheck size={13} /> Verified merchant
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              <Star size={12} fill="currentColor" /> {business.rating.toFixed(1)}
            </span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-slate-500">{business.category}</p>

          <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-3">
            <p className="flex items-center gap-2"><MapPin size={15} className="text-slate-400" /> {business.distanceKm} km · {business.address}</p>
            <p className="flex items-center gap-2"><Clock size={15} className="text-slate-400" /> {business.openHours}</p>
            <p className="flex items-center gap-2"><Phone size={15} className="text-slate-400" /> {business.phone}</p>
          </div>

          <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">{business.about}</p>
        </div>
      </div>

      <form onSubmit={handleSubscribe} className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="mb-3 text-base font-bold text-slate-800">Choose a plan</h2>
          <div className="space-y-3">
            {business.plans.map((p) => (
              <label
                key={p.name}
                className={`card flex cursor-pointer items-center gap-4 p-4 transition-all ${
                  selectedPlan === p.name ? "ring-2 ring-indigo-500" : "hover:ring-2 hover:ring-indigo-300"
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  className="h-4 w-4 accent-indigo-600"
                  checked={selectedPlan === p.name}
                  onChange={() => setSelectedPlan(p.name)}
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{p.name}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{p.features.join(" · ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-slate-800">{formatINR(p.price)}</p>
                  <p className="text-xs text-slate-400">per {p.period}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card sticky top-24 space-y-5 p-6">
            <h2 className="text-base font-bold text-slate-800">Your details</h2>
            <div>
              <label className="label">Full name</label>
              <div className="relative">
                <User size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input className="input w-full rounded-xl py-2.5 pl-10 text-sm" placeholder="Priya Sharma" required />
              </div>
            </div>
            <div>
              <label className="label">UPI ID</label>
              <input className="input w-full rounded-xl px-3.5 py-2.5 text-sm" placeholder="name@upi" required />
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-[13px] text-slate-600">
              <p className="flex justify-between"><span>{plan.name}</span><span className="font-semibold">{formatINR(plan.price)} / {plan.period}</span></p>
              <p className="mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-800">
                <span>Due on renewal</span><span>{formatINR(plan.price)}</span>
              </p>
            </div>

            <button type="submit" className="btn-primary w-full rounded-xl py-3 text-sm">
              Subscribe with UPI Autopay
            </button>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-emerald-500" />
              You can pause or cancel anytime. Billing starts only after merchant approval.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
