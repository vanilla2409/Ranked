import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard   from "./pages/Dashboard";
import Rivals      from "./pages/Rivals";
import Resources   from "./pages/Resources";
import { SlideTabsExample } from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <Toaster position="bottom-center" />
      <header className="fixed top-0 left-0 right-0 bg-[#101010] z-10">
        <SlideTabsExample />
      </header>
      <main className="pt-20">
        <Routes>
          <Route path="/"          element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard   />} />
          <Route path="/resources" element={<Resources   />} />
          <Route path="/rivals"    element={<Rivals      />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
