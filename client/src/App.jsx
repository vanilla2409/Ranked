import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard   from './pages/Dashboard'
import Rivals      from './pages/BattlePage'      // Rivals content lives here
import Resources   from './pages/Resources'
import { SlideTabsExample } from './components/Navbar'


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#101010] text-white">
      <header className="border-b border-neutral-500">
        <SlideTabsExample />
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/"           element={<LandingPage />} />
          <Route path="/dashboard"  element={<Dashboard   />} />
          <Route path="/rivals"     element={<Rivals      />} />
          <Route path="/resources"  element={<Resources   />} />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}
