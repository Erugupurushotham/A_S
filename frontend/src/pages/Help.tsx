import { useState } from "react";
import { ChevronDown, LifeBuoy, Mail, MessageCircle, Send } from "lucide-react";
import { PageHeader } from "../components/ui";

const FAQS = [
  {
    q: "Can Autopay pay my Netflix or Spotify bill?",
    a: "No. Online platforms are tracked for analysis and reminders only. You always pay and cancel on the official platform — Autopay just keeps you informed.",
  },
  {
    q: "How do local business subscriptions work?",
    a: "Pick a verified merchant, choose a plan, and set up a UPI autopay mandate. Billing starts only after the merchant approves your request.",
  },
  {
    q: "Can I pause or cancel a local subscription?",
    a: "Yes, anytime from your dashboard. Cancelling stops future mandates; the merchant handles pro-rated refunds per their policy.",
  },
  {
    q: "What does the blockchain layer do?",
    a: "It anchors non-sensitive proof of subscriptions to a public ledger for transparency. Your financial data stays off-chain in the secure database.",
  },
  {
    q: "When do renewal reminders arrive?",
    a: "Three days before each renewal, plus a same-day alert. You can tune these in Settings.",
  },
];

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 py-4 text-left">
        <p className="text-sm font-semibold text-slate-800">{q}</p>
        <ChevronDown size={17} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pop-in pb-4 text-sm leading-relaxed text-slate-500">{a}</p>}
    </div>
  );
}

export default function Help() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Help & Support" subtitle="Answers, and a direct line to us." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card flex items-center gap-4 p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <MessageCircle size={20} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-800">Live chat</p>
            <p className="text-xs text-slate-400">Typically replies in minutes</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Mail size={20} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-800">Email us</p>
            <p className="text-xs text-slate-400">support@autopay.app</p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-800">
          <LifeBuoy size={18} className="text-indigo-600" /> Frequently asked questions
        </h2>
        <div className="mt-3">
          {FAQS.map((f) => <Faq key={f.q} {...f} />)}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-bold text-slate-800">Send us a message</h2>
        {sent ? (
          <p className="pop-in mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Thanks — our support team will get back to you shortly.
          </p>
        ) : (
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (message.trim()) setSent(true);
            }}
          >
            <textarea
              className="input w-full rounded-xl px-3.5 py-2.5"
              rows={4}
              placeholder="Describe your issue or question…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn-primary flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm">
              <Send size={15} /> Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
