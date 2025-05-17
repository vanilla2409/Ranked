import React from "react";
import { RevealBento } from "../components/Bento";  

export default function Dashboard() {
  return (
    
    <div className="min-h-screen bg-[#101010] text-white">
      

      {/* Main Dashboard Content */}
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        <RevealBento />
      </main>
    </div>
  );
}