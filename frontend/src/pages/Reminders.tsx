import { AlertTriangle, CalendarClock, CheckCircle2 } from "lucide-react";
import { useSubscriptions } from "../context/SubscriptionsContext";
import { daysUntil, formatDate, formatINR, renewalLabel } from "../lib/format";
import { PageHeader, ServiceTile } from "../components/ui";

export default function Reminders() {
  const { subscriptions } = useSubscriptions();

  const active = subscriptions.filter((s) => s.status === "active" || s.status === "successful");

  const upcoming = active
    .map((s) => ({ sub: s, days: daysUntil(s.nextRenewal) }))
    .sort((a, b) => a.days - b.days);

  const overdue = upcoming.filter((u) => u.days < 0);
  const thisWeek = upcoming.filter((u) => u.days >= 0 && u.days <= 7);
  const later = upcoming.filter((u) => u.days > 7);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Reminders"
        subtitle="Renewal alerts so you're never surprised by a charge."
      />

      {overdue.length > 0 && (
        <div className="card flex items-center gap-4 bg-rose-50/80 p-5 ring-1 ring-rose-200">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white">
            <AlertTriangle size={20} />
          </span>
          <div>
            <p className="font-bold text-slate-800">
              {overdue.length} renewal{overdue.length === 1 ? "" : "s"} overdue
            </p>
            <p className="text-sm text-slate-500">
              These active subscriptions passed their next renewal date. Check your bank statement or update your renewal dates.
            </p>
          </div>
        </div>
      )}

      <div className="card flex items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-5 ring-1 ring-amber-200/50">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white">
          <CalendarClock size={20} />
        </span>
        <div>
          <p className="font-bold text-slate-800">
            {thisWeek.length === 0
              ? "Nothing renewing in the next 7 days"
              : `${thisWeek.length} renewal${thisWeek.length === 1 ? "" : "s"} in the next 7 days`}
          </p>
          <p className="text-sm text-slate-500">Notifications go out 3 days before each renewal.</p>
        </div>
      </div>

      <div className="card divide-y divide-slate-100">
        {upcoming.length === 0 && (
          <p className="px-5 py-10 text-center text-sm font-semibold text-slate-400">No active subscriptions to remind you about.</p>
        )}
        {upcoming.map(({ sub, days }) => (
          <div key={sub.id} className="flex items-center gap-4 px-5 py-4">
            <ServiceTile name={sub.service} color={sub.color} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">{sub.service}</p>
              <p className="mt-0.5 text-xs text-slate-400">
                {formatDate(sub.nextRenewal)} · {formatINR(sub.amount)}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                days < 0
                  ? "bg-rose-100 text-rose-700 ring-1 ring-rose-300/40"
                  : days <= 3
                    ? "bg-rose-50 text-rose-600"
                    : days <= 7
                      ? "bg-amber-50 text-amber-600"
                      : "bg-slate-100 text-slate-500"
              }`}
            >
              {renewalLabel(sub.nextRenewal)}
            </span>
          </div>
        ))}
      </div>

      {later.length > 0 && (
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 size={14} className="text-emerald-500" />
          {later.length} further renewal{later.length === 1 ? "" : "s"} scheduled beyond this week.
        </p>
      )}
    </div>
  );
}
