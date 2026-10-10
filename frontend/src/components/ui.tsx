import { CalendarClock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import logo from "../assets/autopay-logo.jpg";
import { daysUntil, renewalLabel } from "../lib/format.ts";

export function BrandTile({ size = "md" }: { size?: "md" | "lg" }) {
  const dims = size === "lg" ? "h-12 w-12 rounded-2xl" : "h-9 w-9 rounded-xl";
  return (
    <img
      src={logo}
      alt="Autopay logo"
      className={`${dims} shrink-0 bg-white object-cover shadow-sm ring-1 ring-slate-900/10`}
    />
  );
}

export function ServiceTile({
  color,
  name,
  size = "md",
}: {
  color: string;
  name: string;
  size?: "md" | "lg";
}) {
  const dims = size === "lg" ? "h-14 w-14 rounded-2xl text-xl" : "h-10 w-10 rounded-xl text-sm";
  return (
    <span
      className={`flex ${dims} shrink-0 items-center justify-center font-bold text-white`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {name.charAt(0)}
    </span>
  );
}

export function StatusBadge({
  status,
}: {
  status: "active" | "expired" | "successful" | "failed";
}) {
  if (status === "active") return <span className="badge-active">Active</span>;
  if (status === "expired") return <span className="badge-neutral">Expired</span>;
  if (status === "successful") return <span className="badge-active">Successful</span>;
  return <span className="badge-failed">Failed</span>;
}

export function RenewalBadge({ nextRenewal }: { nextRenewal: string }) {
  const days = daysUntil(nextRenewal);
  const urgent = days >= 0 && days <= 7;
  return (
    <span className={urgent ? "renewal-soon" : "renewal-ok"}>
      <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
      {renewalLabel(nextRenewal)}
    </span>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  tone: string;
}) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${tone}1A`, color: tone }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm text-slate-500">{label}</p>
        <p className="truncate text-xl font-bold tracking-tight">{value}</p>
        <p className="truncate text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

export function SectionHeader({
  title,
  viewAllTo,
}: {
  title: string;
  viewAllTo?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-base font-bold tracking-tight">{title}</h2>
      {viewAllTo ? (
        <Link
          to={viewAllTo}
          className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
        >
          View All →
        </Link>
      ) : null}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
