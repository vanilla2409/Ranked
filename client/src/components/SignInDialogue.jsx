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

export function SignInDialog() {
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
        <div className="grid gap-4 py-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </div>
        <DialogFooter>
          <Button type="submit">Log In</Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}