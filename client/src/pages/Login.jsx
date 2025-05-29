import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { showSuccess, showError } from "../components/ui/sonner";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      showSuccess("Login successful!");
      setForm({ identifier: "", password: "" });
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101010]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-[#101010]">Log In</h2>
        <Input name="identifier" placeholder="Username or Email" value={form.identifier} onChange={handleChange} required />
        <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <Button type="submit" className="w-full bg-[#101010] text-white hover:bg-[#232323]" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </form>
    </div>
  );
}
