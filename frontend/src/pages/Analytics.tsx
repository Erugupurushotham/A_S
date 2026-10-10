import { useMemo } from "react";
import { useSubscriptions } from "../context/SubscriptionsContext";
import { PAYMENTS, SPENDING_BY_YEAR } from "../data/mock";
import { formatINR } from "../lib/format";
import { CategoryChart, SpendingChart } from "../components/charts";
import { PageHeader, SectionHeader, StatCard } from "../components/ui";
import { TrendingUp, CalendarClock, XCircle, PiggyBank } from "lucide-react";

export default function Analytics() {
  const { subscriptions } = useSubscriptions();

  const active = subscriptions.filter((s) => s.status === "active" || s.status === "successful");
  const monthlyTotal = active.reduce((sum, s) => sum + (s.cycle === "yearly" ? s.amount / 12 : s.amount), 0);
  const yearlyTotal = monthlyTotal * 12;

  const successful = PAYMENTS.filter((p) => p.status === "successful");
  const totalPaid = successful.reduce((sum, p) => sum + p.amount, 0);
  const avgPayment = successful.length ? totalPaid / successful.length : 0;

  const biggest = useMemo(
    () => [...active].sort((a, b) => (b.cycle === "yearly" ? b.amount / 12 : b.amount) - (a.cycle === "yearly" ? a.amount / 12 : a.amount))[0],
    [active]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <PageHeader title="Analytics" subtitle="Spending patterns across your subscriptions." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={PiggyBank} tone="#4F46E5" label="Monthly burn" value={formatINR(Math.round(monthlyTotal))} sub="All active plans" />
        <StatCard icon={TrendingUp} tone="#0EA5E9" label="Yearly projection" value={formatINR(Math.round(yearlyTotal))} sub="At current spend" />
        <StatCard icon={CalendarClock} tone="#F59E0B" label="Avg per payment" value={formatINR(Math.round(avgPayment))} sub={`${successful.length} successful`} />
        <StatCard
          icon={XCircle}
          tone="#F43F5E"
          label="Failed payments"
          value={String(PAYMENTS.filter((p) => p.status === "failed").length)}
          sub="Retry on the platform"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SpendingChart />
        <CategoryChart subscriptions={subscriptions} />
      </div>

      <div>
        <SectionHeader title="Yearly Totals" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SPENDING_BY_YEAR.map((y) => (
            <div key={y.month} className="card p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{y.month}</p>
              <p className="mt-1.5 text-lg font-bold text-slate-800">{formatINR(y.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      {biggest && (
        <div className="card flex flex-wrap items-center gap-4 p-5">
          <span className="rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-indigo-600">Insight</span>
          <p className="text-sm text-slate-600">
            Your largest recurring cost is <span className="font-bold text-slate-800">{biggest.service}</span> at{" "}
            <span className="font-bold text-slate-800">
              {formatINR(biggest.cycle === "yearly" ? Math.round(biggest.amount / 12) : biggest.amount)}/month
            </span>
            . Reviewing its plan tier is the fastest way to cut spend.
          </p>
        </div>
      )}
    </div>
  );
}
