import { useEffect, useState } from "react";
import { getHealth } from "./lib/api.ts";

type BackendState = "checking" | "online" | "offline";

function App() {
  const [backend, setBackend] = useState<BackendState>("checking");

  useEffect(() => {
    getHealth()
      .then(() => setBackend("online"))
      .catch(() => setBackend("offline"));
  }, []);

  const status = {
    checking: { dot: "bg-amber-400", label: "Checking backend…" },
    online: { dot: "bg-emerald-500", label: "Backend connected" },
    offline: { dot: "bg-rose-500", label: "Backend offline" },
  }[backend];

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-slate-900">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
          A
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Autopay</h1>
        <p className="mt-1 text-slate-600">Environment ready.</p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm">
          <span className={`h-2 w-2 rounded-full ${status.dot}`} aria-hidden="true" />
          <span>{status.label}</span>
        </div>
      </div>
    </main>
  );
}

export default App;
