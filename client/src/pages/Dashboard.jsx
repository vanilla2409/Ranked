import React from "react";
import { RevealBento } from "../components/Bento";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Main Dashboard Content */}
      <main className="p-6">
        {/* <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1> */}
        <RevealBento />
        <div className="flex justify-center mt-8">
          <Button
            className="bg-[#A594F9] text-white hover:bg-[#b3a0e6] hover:text-white border-none shadow-none px-8 py-3 text-lg font-semibold rounded-md"
            onClick={() => navigate("/battle")}
          >
            Compete
          </Button>
        </div>
      </main>
    </div>
  );
}