import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { AuthLayout } from "../components/layout";
import { BrandTile } from "../components/ui";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("priya@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    login(email, password);
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="card p-8">
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <BrandTile />
          <span className="text-lg font-bold tracking-tight text-slate-800">Autopay</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
        <p className="mt-1.5 text-sm text-slate-500">Sign in to manage your subscriptions.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="email"
                type="email"
                className="input w-full rounded-xl py-2.5 pl-10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="label" htmlFor="password">Password</label>
              <span className="cursor-pointer text-xs font-medium text-indigo-600 hover:underline">Forgot?</span>
            </div>
            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="password"
                type="password"
                className="input w-full rounded-xl py-2.5 pl-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>}

          <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3">
            Sign in <ArrowRight size={17} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to Autopay?{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
