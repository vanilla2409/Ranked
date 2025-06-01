import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { showSuccess } from "./ui/sonner";
import { useAuth } from "../lib/useAuth";
import { useNavigate } from "react-router-dom";

export function LogoutButton({ className = "" }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    showSuccess("Logged out successfully!");
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={className}
        >
          LOG OUT
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#181022] border-fuchsia-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Are you sure?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleLogout} className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 font-semibold">
            Yes, LOG OUT
          </Button>
          <DialogClose asChild>
            <Button variant="ghost" className="text-white hover:text-fuchsia-600 hover:bg-fuchsia-900/10 transition-colors">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

