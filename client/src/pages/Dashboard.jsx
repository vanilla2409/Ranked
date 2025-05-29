import React from "react";
import { RevealBento } from "../components/Bento";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Main Dashboard Content */}
      <main className="p-6 flex flex-col justify-center min-h-[80vh]">
        <RevealBento />
        <div className="absolute bottom-82 left-0 right-0 flex">
          
        </div>
      </main>
    </div>
  );
}