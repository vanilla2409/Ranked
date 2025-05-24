import React, { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { showSuccess, showError } from "./ui/sonner"
import { useAuth } from "../lib/useAuth"
import { useNavigate } from "react-router-dom"

export function SignInDialog() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Accept any credentials
    setTimeout(() => {
      login()
      showSuccess("Signed in successfully!")
      setLoading(false)
      navigate("/dashboard", { replace: true })
    }, 500)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-[#101010] text-white hover:bg-[#232323] hover:text-white border-none shadow-none"
        >
          LOG IN
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>Enter your email and password</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}