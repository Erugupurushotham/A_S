import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  PlusSquare,
  Store,
  MapPin,
  Wallet,
  Bell,
  BarChart3,
  Link2,
  Settings,
  LifeBuoy,
  Search,
  LogOut,
  Menu,
  X,
  CalendarClock,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BrandTile } from "./ui";

type NavItem = {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
};

const MAIN_NAV: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "My Subscriptions", to: "/subscriptions", icon: CreditCard },
  { label: "Add Subscription", to: "/subscriptions/new", icon: PlusSquare },
  { label: "Local Businesses", to: "/businesses", icon: Store },
  { label: "Discover Nearby", to: "/discover", icon: MapPin },
];

const INSIGHT_NAV: NavItem[] = [
  { label: "My Payments", to: "/payments", icon: Wallet },
  { label: "Reminders", to: "/reminders", icon: Bell },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Blockchain (Beta)", to: "/blockchain", icon: Link2 },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Help & Support", to: "/help", icon: LifeBuoy },
];

const NOTIFICATIONS = [
  { icon: CalendarClock, tint: "#F59E0B", text: "Spotify renews in 12 days", time: "2h ago" },
  { icon: AlertTriangle, tint: "#F43F5E", text: "Canva Pro payment failed", time: "1d ago" },
  { icon: Bell, tint: "#4F46E5", text: "3 renewals coming up this week", time: "2d ago" },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const render = ({ label, to, icon: Icon }: NavItem, section = false) => (
    <NavLink
      key={to}
      to={to}
      onClick={onNavigate}
      className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
    >
      <Icon size={18} strokeWidth={2.2} />
      {label}
      {section && <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-slate-400">Beta</span>}
    </NavLink>
  );

  return (
    <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-6">
      <div className="space-y-1">{MAIN_NAV.map((item) => render(item))}</div>
      <div>
        <p className="nav-section-label">Insights</p>
        <div className="mt-1 space-y-1">
          {INSIGHT_NAV.map((item) => render(item, item.to === "/blockchain"))}
        </div>
      </div>
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onNavigate?.();
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col">
      <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-3 px-6 py-5">
        <BrandTile />
        <span className="text-lg font-bold tracking-tight text-white">Autopay</span>
      </Link>
      <NavItems onNavigate={onNavigate} />
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
            {user?.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition-colors hover:border-indigo-200 hover:text-indigo-600"
        title="Notifications"
      >
        <Bell size={18} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-80 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-100 pop-in">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-800">Notifications</p>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600">3 new</span>
          </div>
          <div className="divide-y divide-slate-50">
            {NOTIFICATIONS.map((n) => (
              <div key={n.text} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${n.tint}1A`, color: n.tint }}
                >
                  <n.icon size={15} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-slate-700">{n.text}</p>
                  <p className="text-xs text-slate-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/subscriptions?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-[#F4F7FB]/90 px-4 backdrop-blur-md sm:px-6">
      <button onClick={onMenu} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 lg:hidden" title="Menu">
        <Menu size={18} />
      </button>
      <form onSubmit={handleSearch} className="relative hidden max-w-md flex-1 sm:block">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search subscriptions, businesses…"
          className="input w-full rounded-xl py-2.5 pl-10 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <div className="ml-auto flex items-center gap-3">
        <NotificationsBell />
        <div className="hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 sm:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
            {user?.name.charAt(0).toUpperCase()}
          </span>
          <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
        </div>
      </div>
    </header>
  );
}

export function AppLayout() {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen">
      <aside className="sidebar hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="overlay-enter absolute inset-0 bg-slate-900/60" onClick={() => setDrawerOpen(false)} />
          <aside className="drawer-enter sidebar absolute inset-y-0 left-0 w-72">
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setDrawerOpen(true)} />
        <main key={location.pathname} className="page-enter flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="sidebar hidden w-[420px] flex-col justify-between p-10 lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <BrandTile size="lg" />
          <span className="text-lg font-bold tracking-tight text-white">Autopay</span>
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white">
            Every subscription.
            <br />
            One autopilot.
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">
            Track online plans, subscribe to trusted local businesses, and let Autopay handle renewals, reminders and UPI payments.
          </p>
        </div>
        <p className="text-xs text-slate-400">© 2026 Autopay · autopay.app</p>
      </div>
      <div className="flex flex-1 items-center justify-center bg-[#F4F7FB] p-6">
        <div className="page-enter w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
