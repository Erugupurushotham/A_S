import { useState } from "react";
import { Bell, ChevronRight, CreditCard, KeyRound, LogOut, Mail, ShieldCheck, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/ui";

function Row({
  icon: Icon,
  tint,
  title,
  subtitle,
  onClick,
  danger,
  trailing,
}: {
  icon: typeof Bell;
  tint: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
  danger?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${tint}1A`, color: tint }}
      >
        <Icon size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold ${danger ? "text-rose-600" : "text-slate-800"}`}>{title}</p>
        <p className="mt-0.5 truncate text-xs text-slate-400">{subtitle}</p>
      </div>
      {trailing ?? <ChevronRight size={17} className="text-slate-300" />}
    </button>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-indigo-600" : "bg-slate-200"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [renewalAlerts, setRenewalAlerts] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Settings" subtitle="Manage your account and preferences." />

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Profile</p>
        <div className="card divide-y divide-slate-100">
          <Row icon={User} tint="#4F46E5" title="Full name" subtitle={user?.name ?? ""} />
          <Row icon={Mail} tint="#0EA5E9" title="Email" subtitle={user?.email ?? ""} />
          <Row icon={KeyRound} tint="#F59E0B" title="Password" subtitle="Change password" />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Notifications</p>
        <div className="card divide-y divide-slate-100">
          <Row icon={Bell} tint="#4F46E5" title="Push notifications" subtitle="Renewals and payment alerts" trailing={<Toggle on={notifications} onChange={setNotifications} />} />
          <Row icon={ShieldCheck} tint="#10B981" title="Renewal alerts" subtitle="3 days before every renewal" trailing={<Toggle on={renewalAlerts} onChange={setRenewalAlerts} />} />
          <Row icon={Mail} tint="#8B5CF6" title="Tips & offers" subtitle="Occasional product updates" trailing={<Toggle on={marketing} onChange={setMarketing} />} />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Payments</p>
        <div className="card divide-y divide-slate-100">
          <Row icon={CreditCard} tint="#0EA5E9" title="Payment methods" subtitle="UPI, cards and mandates (Phase 7)" />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Session</p>
        <div className="card">
          <Row
            icon={LogOut}
            tint="#F43F5E"
            title="Log out"
            subtitle="Sign out of this device"
            danger
            onClick={() => {
              logout();
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
}
