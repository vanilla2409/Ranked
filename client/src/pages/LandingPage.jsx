import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";
import { SignInDialog } from "../components/SignInDialogue";
import { SignUpDialog } from "../components/SignUpdialogue";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101010] text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to Ranked!</h1>
      <div className="flex gap-4 mb-8">
        <SignInDialog />
        <SignUpDialog />
      </div>
      {/* ...rest of your landing content... */}
    </div>
  );
}
