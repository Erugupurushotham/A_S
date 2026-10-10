import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { BUSINESSES } from "../data/mock";
import { PageHeader } from "../components/ui";
import { BusinessCard } from "./Businesses";

const RADIUS_OPTIONS = [5, 10, 20, 40] as const;

export default function Discover() {
  const [radius, setRadius] = useState<number>(10);

  const visible = useMemo(
    () => BUSINESSES.filter((b) => b.distanceKm <= radius).sort((a, b) => a.distanceKm - b.distanceKm),
    [radius]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Discover Nearby"
        subtitle="Local subscription-ready businesses around you."
      />

      <div className="card flex flex-wrap items-center gap-4 p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <MapPin size={19} />
        </span>
        <div className="min-w-40">
          <p className="text-sm font-bold text-slate-800">Your location</p>
          <p className="text-xs text-slate-400">Indiranagar, Bengaluru</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Radius</span>
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`chip${radius === r ? " chip-active" : ""}`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500">
        <span className="font-bold text-slate-800">{visible.length}</span> businesses within{" "}
        <span className="font-bold text-slate-800">{radius} km</span>
      </p>

      {visible.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">No businesses within {radius} km yet.</p>
          <p className="mt-1 text-sm text-slate-400">Try a larger radius.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((b) => <BusinessCard key={b.id} id={b.id} />)}
        </div>
      )}
    </div>
  );
}
