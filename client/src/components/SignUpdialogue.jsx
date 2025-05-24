import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { showSuccess, showError } from "./ui/sonner";
import { useAuth } from "../lib/useAuth";
import { useNavigate } from "react-router-dom";

export function SignUpDialog() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Example validation
    if (form.password !== form.confirmPassword) {
      showError("Passwords do not match");
      setLoading(false);
      return;
    }
    setTimeout(() => {
      login();
      showSuccess("Signed up successfully!");
      setLoading(false);
      navigate("/dashboard", { replace: true });
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#A594F9] text-white hover:bg-[#b3a0e6] hover:text-white border-none shadow-none"
        >
          SIGN UP
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>Enter your details to sign up</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#A594F9] text-white hover:bg-[#b3a0e6] hover:text-white border-none shadow-none"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
