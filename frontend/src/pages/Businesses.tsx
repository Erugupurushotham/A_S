import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, MapPin, Phone, Search, Star } from "lucide-react";
import { BUSINESSES } from "../data/mock";
import { formatINR } from "../lib/format";
import { PageHeader } from "../components/ui";

export function BusinessCard({ id }: { id: string }) {
  const b = BUSINESSES.find((x) => x.id === id);
  if (!b) return null;
  const from = Math.min(...b.plans.map((p) => p.price));

  return (
    <Link
      to={`/businesses/${b.id}`}
      className="card group flex flex-col gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-600">
          {b.name.charAt(0)}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
          <Star size={12} fill="currentColor" /> {b.rating.toFixed(1)}
        </span>
      </div>
      <div>
        <p className="font-bold text-slate-800 group-hover:text-indigo-600">{b.name}</p>
        <p className="mt-0.5 text-sm text-slate-400">{b.category}</p>
      </div>
      <div className="space-y-1.5 text-[13px] text-slate-500">
        <p className="flex items-center gap-2"><MapPin size={14} className="shrink-0 text-slate-400" /> <span className="truncate">{b.distanceKm} km · {b.address}</span></p>
        <p className="flex items-center gap-2"><Clock size={14} className="shrink-0 text-slate-400" /> <span>{b.openHours}</span></p>
        <p className="flex items-center gap-2"><Phone size={14} className="shrink-0 text-slate-400" /> <span>{b.phone}</span></p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500">
          Plans from <span className="font-bold text-slate-800">{formatINR(from)}</span>
        </p>
        <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
          View <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}

export default function Businesses() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(BUSINESSES.map((b) => b.category)))],
    []
  );

  const visible = BUSINESSES.filter((b) => {
    if (category !== "All" && b.category !== category) return false;
    if (query && !b.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Local Businesses"
        subtitle="Verified merchants you can subscribe to directly with UPI autopay."
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-52 flex-1 sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search businesses…"
            className="input w-full rounded-xl py-2.5 pl-10 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="input rounded-xl px-3 py-2.5 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c}>{c === "All" ? "All categories" : c}</option>)}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="card p-12 text-center text-sm font-semibold text-slate-500">No businesses match your search.</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((b) => <BusinessCard key={b.id} id={b.id} />)}
        </div>
      )}
    </div>
  );
}
