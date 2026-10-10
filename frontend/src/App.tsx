import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SubscriptionsProvider } from "./context/SubscriptionsContext";
import { AppLayout } from "./components/layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionNew from "./pages/SubscriptionNew";
import SubscriptionDetails from "./pages/SubscriptionDetails";
import Businesses from "./pages/Businesses";
import Discover from "./pages/Discover";
import BusinessDetails from "./pages/BusinessDetails";
import Payments from "./pages/Payments";
import Reminders from "./pages/Reminders";
import Analytics from "./pages/Analytics";
import Blockchain from "./pages/Blockchain";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

export default function App() {
  return (
    <AuthProvider>
      <SubscriptionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/subscriptions/new" element={<SubscriptionNew />} />
              <Route path="/subscriptions/:id" element={<SubscriptionDetails />} />
              <Route path="/businesses" element={<Businesses />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/businesses/:id" element={<BusinessDetails />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/blockchain" element={<Blockchain />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SubscriptionsProvider>
    </AuthProvider>
  );
}
