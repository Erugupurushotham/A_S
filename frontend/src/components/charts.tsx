import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CATEGORY_COLORS, SPENDING_BY_MONTH, SPENDING_BY_YEAR } from "../data/mock.ts";
import type { Subscription } from "../data/types.ts";
import { formatINR } from "../lib/format.ts";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-lg">
      {label ? <p className="mb-0.5 text-slate-400">{label}</p> : null}
      <p>{formatINR(payload[0].value)}</p>
    </div>
  );
}

export function SpendingChart() {
  const [range, setRange] = useState<"monthly" | "yearly">("monthly");
  const data = range === "monthly" ? SPENDING_BY_MONTH : SPENDING_BY_YEAR;

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold tracking-tight">Monthly Spending Overview</h3>
        <div className="flex rounded-full bg-slate-100 p-0.5 text-xs font-semibold">
          {(["monthly", "yearly"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-full px-3.5 py-1.5 capitalize transition-colors duration-150 ${
                range === r ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {r === "monthly" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "#F1F5F9" }} />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={36}>
              {data.map((entry) => (
                <Cell key={entry.month} fill={entry.amount >= 1248 ? "#6366F1" : "#C7D2FE"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategoryChart({ subscriptions }: { subscriptions: Subscription[] }) {
  const { data, total } = useMemo(() => {
    const totals = new Map<string, number>();
    for (const sub of subscriptions) {
      if (sub.status !== "active" && sub.status !== "successful") continue;
      const monthly = sub.cycle === "yearly" ? sub.amount / 12 : sub.amount;
      totals.set(sub.category, (totals.get(sub.category) ?? 0) + monthly);
    }
    const entries = [...totals.entries()]
      .map(([category, value]) => ({
        category,
        value: Math.round(value),
        color: CATEGORY_COLORS[category] ?? "#94A3B8",
      }))
      .sort((a, b) => b.value - a.value);
    return { data: entries, total: entries.reduce((sum, e) => sum + e.value, 0) };
  }, [subscriptions]);

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-base font-bold tracking-tight">Subscription Categories</h3>
      {data.length === 0 ? (
        <div className="py-8 text-center text-sm font-medium text-slate-400">
          No active subscriptions to categorize.
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative h-44 w-44 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="category"
                  innerRadius={56}
                  outerRadius={80}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-extrabold tracking-tight">{formatINR(total)}</span>
              <span className="text-xs text-slate-400">per month</span>
            </div>
          </div>
          <ul className="w-full min-w-0 flex-1 space-y-2.5">
            {data.map((entry) => (
              <li key={entry.category} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="flex-1 truncate text-slate-600">{entry.category}</span>
                <span className="font-semibold">{total > 0 ? Math.round((entry.value / total) * 100) : 0}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
