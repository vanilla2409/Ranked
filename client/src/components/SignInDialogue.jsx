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
import { useNavigate } from "react-router-dom"
import axios from "../lib/axios"

export function SignInDialog() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`/users/login`, {
        email: form.email,
        password: form.password,
      })
      if(response.data.success) {
        showSuccess("Logged in successfully")
        setForm({ email: "", password: "" })
        setTimeout(() => {
          setLoading(false)
          navigate("/dashboard")
        }, 1000)
      }
      else {
        showError(response.data.message || "Login failed")
        setLoading(false)
      }
    } catch (error) {
      showError("An error occurred while logging in. Please try again.")
    }
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