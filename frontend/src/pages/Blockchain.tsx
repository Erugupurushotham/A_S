import { Check, Link2, ShieldCheck, Wallet } from "lucide-react";
import { PageHeader } from "../components/ui";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Off-chain financial data",
    text: "Amounts and payment details stay in the secure database. Only non-sensitive proof anchors go on-chain.",
  },
  {
    icon: Link2,
    title: "Public ledger verification",
    text: "Anyone can verify a subscription anchor on the public ledger without seeing private information.",
  },
  {
    icon: Wallet,
    title: "No wallet keys in app",
    text: "Autopay never asks for seed phrases or private keys. Smart contracts are triggered externally.",
  },
];

export default function Blockchain() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader title="Blockchain (Beta)" subtitle="Transparency layer for local business subscriptions." />

      <div className="card overflow-hidden">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#0A1735] to-indigo-800 px-6 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
            <Link2 size={19} />
          </span>
          <div>
            <p className="font-bold text-white">Anchor network status</p>
            <p className="text-xs text-indigo-200">Testnet · read-only in this beta</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Operational
          </span>
        </div>
        <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { label: "Anchors anchored", value: "128" },
            { label: "Last anchor", value: "2 min ago" },
            { label: "Contracts verified", value: "1" },
          ].map((s) => (
            <div key={s.label} className="p-5 text-center">
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="card p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <p.icon size={18} />
            </span>
            <p className="mt-3.5 text-sm font-bold text-slate-800">{p.title}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-base font-bold text-slate-800">How anchoring works</h2>
        <ol className="mt-4 space-y-3">
          {[
            "You subscribe to a verified local business with UPI autopay.",
            "Autopay records the subscription in its secure database.",
            "A non-sensitive hash anchor is written to the public ledger for independent verification.",
            "Contract execution is triggered externally — the app never holds keys.",
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-slate-600">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-emerald-50 px-4 py-3">
          <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
          <p className="text-[13px] leading-relaxed text-emerald-700">
            Live on-chain writes arrive in Phase 8 with audited contracts and the external trigger service.
          </p>
        </div>
      </div>
    </div>
  );
}
