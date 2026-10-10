import { useState } from "react";
import { Download } from "lucide-react";
import { PAYMENTS } from "../data/mock";
import { formatDate, formatINR } from "../lib/format";
import { PageHeader, ServiceTile, StatusBadge } from "../components/ui";

const TABS = ["All", "successful", "failed"] as const;

export default function Payments() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const visible = PAYMENTS.filter((p) => tab === "All" || p.status === tab);
  const total = visible.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="My Payments"
        subtitle="Recorded payments across your tracked subscriptions."
        action={
          <button className="btn-secondary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm" title="Export arrives with the backend (Phase 9)">
            <Download size={16} /> Export
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl border border-slate-200 bg-white p-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`chip${tab === t ? " chip-active" : ""}`}>
              {t === "All" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <p className="ml-auto text-sm text-slate-500">
          {visible.length} payments · <span className="font-bold text-slate-800">{formatINR(total)}</span>
        </p>
      </div>

      <div className="card divide-y divide-slate-100">
        {visible.map((p) => (
          <div key={p.id} className="flex items-center gap-4 px-5 py-4">
            <ServiceTile name={p.service} color={p.color} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">{p.service}</p>
              <p className="mt-0.5 text-xs text-slate-400">{formatDate(p.date)}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-slate-800">{formatINR(p.amount)}</p>
              <StatusBadge status={p.status} />
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="px-5 py-10 text-center text-sm font-semibold text-slate-400">No {tab} payments.</p>
        )}
      </div>
    </div>
  );
}
