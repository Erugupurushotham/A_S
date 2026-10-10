import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CreditCard,
  IndianRupee,
  Plus,
  Wallet,
  XCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSubscriptions } from "../context/SubscriptionsContext";
import { PAYMENTS } from "../data/mock";
import { formatINR } from "../lib/format";
import { CategoryChart, SpendingChart } from "../components/charts";
import {
  PageHeader,
  RenewalBadge,
  SectionHeader,
  ServiceTile,
  StatCard,
  StatusBadge,
} from "../components/ui";

export default function Dashboard() {
  const { user } = useAuth();
  const { subscriptions } = useSubscriptions();

  const active = subscriptions.filter((s) => s.status === "active" || s.status === "successful");
  const monthlyTotal = active.reduce(
    (sum, s) => sum + (s.cycle === "yearly" ? s.amount / 12 : s.amount),
    0
  );
  const upcomingRenewals = active.filter(
    (s) => s.nextRenewal >= new Date().toISOString()
  ).length;
  const failedPayments = PAYMENTS.filter((p) => p.status === "failed").length;

  const firstName = user?.name.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Here's what's happening with your subscriptions."
        action={
          <Link to="/subscriptions/new" className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm">
            <Plus size={17} /> Add Subscription
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={IndianRupee}
          tone="#4F46E5"
          label="Monthly spend"
          value={formatINR(Math.round(monthlyTotal))}
          sub={`${active.length} active subscriptions`}
        />
        <StatCard
          icon={CreditCard}
          tone="#0EA5E9"
          label="Active subscriptions"
          value={String(active.length)}
          sub={`${subscriptions.length} total tracked`}
        />
        <StatCard
          icon={CalendarClock}
          tone="#F59E0B"
          label="Upcoming renewals"
          value={String(upcomingRenewals)}
          sub="Next 30 days"
        />
        <StatCard
          icon={XCircle}
          tone="#F43F5E"
          label="Failed payments"
          value={String(failedPayments)}
          sub="Needs attention"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <SectionHeader title="My Subscriptions" viewAllTo="/subscriptions" />
          <div className="card divide-y divide-slate-100">
            {subscriptions.slice(0, 5).map((s) => (
              <Link
                key={s.id}
                to={`/subscriptions/${s.id}`}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
              >
                <ServiceTile name={s.service} color={s.color} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <p className="truncate text-sm font-semibold text-slate-800">{s.service}</p>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {s.plan} · {s.cycle}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{formatINR(s.amount)}</p>
                  <p className={`mt-0.5 text-xs font-medium ${s.status === "expired" ? "text-rose-500" : ""}`}>
                    <RenewalBadge nextRenewal={s.nextRenewal} />
                  </p>
                </div>
                <ArrowUpRight size={16} className="text-slate-300" />
              </Link>
            ))}
            <Link
              to="/subscriptions"
              className="flex items-center justify-center gap-1.5 px-5 py-3.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50/60"
            >
              View all subscriptions <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="space-y-6 xl:col-span-2">
          <SpendingChart />
          <CategoryChart subscriptions={subscriptions} />
        </div>
      </div>

      <div className="card flex flex-col items-start justify-between gap-4 bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
            <Wallet size={22} />
          </span>
          <div>
            <p className="font-bold text-white">Discover local businesses</p>
            <p className="text-sm text-indigo-100">
              Gyms, salons, cafes and more — subscribe with UPI autopay.
            </p>
          </div>
        </div>
        <Link
          to="/discover"
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 transition-transform hover:scale-[1.02]"
        >
          Explore nearby <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
