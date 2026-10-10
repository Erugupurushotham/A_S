import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "bootstrap";
import {
  ArrowLeft,
  CalendarClock,
  ExternalLink,
  IndianRupee,
  Pencil,
  Repeat,
  Trash2,
  Wallet,
  X,
  Check,
} from "lucide-react";
import { useSubscriptions } from "../context/SubscriptionsContext";
import { PAYMENTS } from "../data/mock";
import { CATEGORY_COLORS } from "../data/mock";
import type { BillingCycle, SubscriptionStatus } from "../data/types";
import { formatDate, formatINR } from "../lib/format";
import { RenewalBadge, ServiceTile, StatusBadge } from "../components/ui";

const toExternalUrl = (url: string) => {
  if (!url) return "";
  return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

export default function SubscriptionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subscriptions, updateSubscription, deleteSubscription } = useSubscriptions();
  const sub = subscriptions.find((s) => s.id === id);
  const deleteModalRef = useRef<HTMLDivElement>(null);
  const deleteModal = useRef<Modal | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editPlan, setEditPlan] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCycle, setEditCycle] = useState<BillingCycle>("monthly");
  const [editStatus, setEditStatus] = useState<SubscriptionStatus>("active");
  const [editRenewal, setEditRenewal] = useState("");
  const [editPaymentMethod, setEditPaymentMethod] = useState("");
  const [editOfficialLink, setEditOfficialLink] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const handleStartEdit = () => {
    if (!sub) return;
    setEditPlan(sub.plan);
    setEditAmount(String(sub.amount));
    setEditCycle(sub.cycle);
    setEditStatus(sub.status);
    setEditRenewal(sub.nextRenewal ? sub.nextRenewal.slice(0, 10) : "");
    setEditPaymentMethod(sub.paymentMethod);
    setEditOfficialLink(sub.officialLink);
    setEditNotes(sub.notes);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sub) return;
    const num = Number(editAmount);
    if (!editPlan.trim() || !num || num <= 0 || !editRenewal) return;
    updateSubscription(sub.id, {
      plan: editPlan.trim(),
      amount: num,
      cycle: editCycle,
      status: editStatus,
      nextRenewal: new Date(`${editRenewal}T00:00:00`).toISOString(),
      paymentMethod: editPaymentMethod.trim(),
      officialLink: editOfficialLink.trim(),
      notes: editNotes.trim(),
    });
    setIsEditing(false);
  };

  useEffect(() => {
    return () => {
      deleteModal.current?.dispose();
      deleteModal.current = null;
    };
  }, []);

  if (!sub) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="card flex flex-col items-center gap-4 p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">Subscription not found.</p>
          <Link to="/subscriptions" className="btn-secondary rounded-xl px-4 py-2 text-sm">Back to subscriptions</Link>
        </div>
      </div>
    );
  }

  const payments = PAYMENTS.filter((p) => p.subscriptionId === sub.id);
  const yearlyEquivalent = sub.cycle === "yearly" ? sub.amount : sub.amount * 12;

  const openDeleteModal = () => {
    if (deleteModalRef.current) {
      deleteModal.current = Modal.getOrCreateInstance(deleteModalRef.current);
      deleteModal.current.show();
    }
  };

  const confirmDelete = () => {
    deleteSubscription(sub.id);
    deleteModal.current?.hide();
    navigate("/subscriptions");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <ServiceTile name={sub.service} color={sub.color} size="lg" />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">{sub.service}</h1>
                <StatusBadge status={sub.status} />
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ backgroundColor: `${CATEGORY_COLORS[sub.category]}1A`, color: CATEGORY_COLORS[sub.category] }}
                >
                  {sub.category}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{sub.plan} · {sub.cycle}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleStartEdit} className="btn-secondary flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
              <Pencil size={15} /> Edit
            </button>
            <button onClick={openDeleteModal} className="btn-danger flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
              <Trash2 size={15} /> Remove
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400"><IndianRupee size={13} /> Amount</p>
            <p className="mt-1.5 text-lg font-bold text-slate-800">{formatINR(sub.amount)}</p>
            <p className="text-xs text-slate-400">per {sub.cycle === "monthly" ? "month" : "year"}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400"><CalendarClock size={13} /> Renews</p>
            <p className="mt-1.5 text-lg font-bold text-slate-800">{formatDate(sub.nextRenewal)}</p>
            <p className="text-xs font-medium"><RenewalBadge nextRenewal={sub.nextRenewal} /></p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400"><Repeat size={13} /> Yearly cost</p>
            <p className="mt-1.5 text-lg font-bold text-slate-800">{formatINR(yearlyEquivalent)}</p>
            <p className="text-xs text-slate-400">equivalent</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400"><Wallet size={13} /> Paid via</p>
            <p className="mt-1.5 text-lg font-bold text-slate-800">{sub.paymentMethod}</p>
            <p className="text-xs text-slate-400">on official platform</p>
          </div>
        </div>

        {sub.notes && (
          <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Notes</p>
            <p className="mt-1 text-sm text-slate-600">{sub.notes}</p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {sub.officialLink && (
            <a href={toExternalUrl(sub.officialLink)} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
              <ExternalLink size={15} /> Manage on {sub.service}
            </a>
          )}
          <p className="text-xs text-slate-400">
            Autopay tracks and reminds only — payments and cancellation stay on the official platform.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-bold text-slate-800">Payment history</h2>
        {payments.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">No recorded payments yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3">
                <ServiceTile name={p.service} color={p.color} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{p.service}</p>
                  <p className="text-xs text-slate-400">{formatDate(p.date)}</p>
                </div>
                <p className="text-sm font-bold text-slate-800">{formatINR(p.amount)}</p>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="overlay-enter absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditing(false)} />
          <div className="pop-enter relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900">Edit {sub.service}</h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
              <div>
                <label className="label">Plan name</label>
                <input
                  type="text"
                  className="input w-full rounded-xl px-3.5 py-2.5 text-sm"
                  value={editPlan}
                  onChange={(e) => setEditPlan(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    className="input w-full rounded-xl px-3.5 py-2.5 text-sm"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">Billing cycle</label>
                  <select
                    className="input w-full rounded-xl px-3 py-2.5 text-sm"
                    value={editCycle}
                    onChange={(e) => setEditCycle(e.target.value as BillingCycle)}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Status</label>
                  <select
                    className="input w-full rounded-xl px-3 py-2.5 text-sm"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as SubscriptionStatus)}
                  >
                    <option value="successful">Successful</option>
                    <option value="failed">Failed</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                <div>
                  <label className="label">Next renewal</label>
                  <input
                    type="date"
                    className="input w-full rounded-xl px-3 py-2.5 text-sm"
                    value={editRenewal}
                    onChange={(e) => setEditRenewal(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Payment method</label>
                <input
                  type="text"
                  className="input w-full rounded-xl px-3.5 py-2.5 text-sm"
                  value={editPaymentMethod}
                  onChange={(e) => setEditPaymentMethod(e.target.value)}
                  placeholder="e.g. UPI, HDFC Card"
                />
              </div>

              <div>
                <label className="label">Official link</label>
                <input
                  type="text"
                  className="input w-full rounded-xl px-3.5 py-2.5 text-sm"
                  value={editOfficialLink}
                  onChange={(e) => setEditOfficialLink(e.target.value)}
                  placeholder="https://…"
                />
              </div>

              <div>
                <label className="label">Notes</label>
                <textarea
                  className="input w-full rounded-xl px-3.5 py-2.5 text-sm"
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="btn-secondary rounded-xl px-4 py-2 text-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm"
                >
                  <Check size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        className="modal fade"
        ref={deleteModalRef}
        tabIndex={-1}
        aria-labelledby="deleteSubLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content overflow-hidden rounded-2xl border-0 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h5 className="text-base font-bold text-slate-900" id="deleteSubLabel">Remove subscription</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="px-6 py-5">
              <p className="text-sm leading-relaxed text-slate-600">
                Remove {sub.service} from tracking? This only affects your Autopay records.
              </p>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
              <button type="button" className="btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn-danger" onClick={confirmDelete}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
