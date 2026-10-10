import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { useSubscriptions } from "../context/SubscriptionsContext";
import { CATEGORY_COLORS } from "../data/mock";
import { formatINR } from "../lib/format";
import { PageHeader, RenewalBadge, ServiceTile, StatusBadge } from "../components/ui";

const FILTERS = ["All", "successful", "failed"] as const;

export default function Subscriptions() {
  const { subscriptions } = useSubscriptions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== query) {
      setQuery(q);
    }
  }, [searchParams]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(subscriptions.map((s) => s.category)))],
    [subscriptions]
  );

  const visible = subscriptions.filter((s) => {
    if (filter !== "All") {
      const isFailed = s.status === "failed" || s.status === "expired";
      const isSuccessful = s.status === "successful" || s.status === "active";
      if (filter === "successful" && !isSuccessful) return false;
      if (filter === "failed" && !isFailed) return false;
    }
    if (category !== "All" && s.category !== category) return false;
    if (query && !s.service.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const monthly = visible
    .filter((s) => s.status === "successful" || s.status === "active")
    .reduce((sum, s) => sum + (s.cycle === "yearly" ? s.amount / 12 : s.amount), 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="My Subscriptions"
        subtitle={`${visible.length} subscription${visible.length === 1 ? "" : "s"} · ${formatINR(Math.round(monthly))} per month`}
        action={
          <Link to="/subscriptions/new" className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm">
            <Plus size={17} /> Add Subscription
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-52 flex-1 sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search services…"
            className="input w-full rounded-xl py-2.5 pl-10 text-sm"
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              setSearchParams(val ? { q: val } : {}, { replace: true });
            }}
          />
        </div>
        <div className="flex rounded-xl border border-slate-200 bg-white p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip${filter === f ? " chip-active" : ""}`}
            >
              {f === "All" ? "All" : f === "successful" ? "Successful" : "Failed"}
            </button>
          ))}
        </div>
        <select
          className="input rounded-xl px-3 py-2.5 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">No subscriptions match your filters.</p>
          <Link to="/subscriptions/new" className="btn-secondary rounded-xl px-4 py-2 text-sm">Add one now</Link>
        </div>
      ) : (
        <div className="card divide-y divide-slate-100">
          {visible.map((s) => (
            <Link
              key={s.id}
              to={`/subscriptions/${s.id}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
            >
              <ServiceTile name={s.service} color={s.color} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="truncate text-sm font-semibold text-slate-800">{s.service}</p>
                  <StatusBadge status={s.status} />
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[s.category]}1A`,
                      color: CATEGORY_COLORS[s.category],
                    }}
                  >
                    {s.category}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-400">
                  {s.plan} · {s.cycle} · {s.paymentMethod}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-slate-800">{formatINR(s.amount)}</p>
                <p className="mt-0.5 text-xs font-medium">
                  <RenewalBadge nextRenewal={s.nextRenewal} />
                </p>
              </div>
              <ArrowUpRight size={16} className="shrink-0 text-slate-300" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
