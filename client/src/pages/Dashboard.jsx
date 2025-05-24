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
          <Button
            className="bg-[#A594F9] text-white hover:bg-[#b3a0e6] hover:text-white border-none shadow-none px-8 py-3 text-lg font-semibold rounded-md mx-auto"
            onClick={() => navigate("/battle")}
          >
            Compete
          </Button>
        </div>
      </main>
    </div>
  );
}