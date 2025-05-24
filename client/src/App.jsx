import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Rivals from "./pages/Rivals";
import Resources from "./pages/Resources";
import BattlePage from "./pages/BattlePage";
import { SlideTabsExample } from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import { useAuth, AuthProvider } from "./lib/useAuth";

function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isBattle = location.pathname === "/battle";

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <Toaster position="bottom-center" />
      {/* Show Navbar only if authenticated, not on landing or battle page */}
      {isAuthenticated && !isLanding && !isBattle && (
        <header className="fixed top-0 left-0 right-0 bg-[#101010] z-10">
          <SlideTabsExample />
        </header>
      )}
      <main className={isAuthenticated && !isLanding && !isBattle ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/rivals" element={<Rivals />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  // Use AuthProvider without value prop so it uses internal state
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
