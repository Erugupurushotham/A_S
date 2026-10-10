import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { INITIAL_SUBSCRIPTIONS } from "../data/mock.ts";
import type { Subscription } from "../data/types.ts";

interface SubscriptionsContextValue {
  subscriptions: Subscription[];
  addSubscription: (sub: Omit<Subscription, "id">) => Subscription;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
}

const SubscriptionsContext = createContext<SubscriptionsContextValue | null>(null);

export function SubscriptionsProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);

  const addSubscription = useCallback((sub: Omit<Subscription, "id">) => {
    const id = `${sub.service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    const next: Subscription = { ...sub, id };
    setSubscriptions((prev) => [next, ...prev]);
    return next;
  }, []);

  const updateSubscription = useCallback((id: string, updates: Partial<Subscription>) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  }, []);

  const deleteSubscription = useCallback((id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const value = useMemo(
    () => ({ subscriptions, addSubscription, updateSubscription, deleteSubscription }),
    [subscriptions, addSubscription, updateSubscription, deleteSubscription],
  );

  return (
    <SubscriptionsContext.Provider value={value}>
      {children}
    </SubscriptionsContext.Provider>
  );
}

export function useSubscriptions(): SubscriptionsContextValue {
  const ctx = useContext(SubscriptionsContext);
  if (!ctx) throw new Error("useSubscriptions must be used inside SubscriptionsProvider");
  return ctx;
}
