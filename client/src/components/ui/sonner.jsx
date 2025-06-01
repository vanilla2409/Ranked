import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        style: {
          color: '#fff',
        },
        className: '!text-white',
        success: {
          style: {
            background: '#A594F9',
            color: '#fff',
          },
          className: '!text-white',
        },
        error: {
          style: {
            background: '#101010',
            color: '#fff',
          },
          className: '!text-white',
        },
      }}
      {...props} />
  );
}

// Custom success toast with fuchsia gradient
export function showSuccess(message) {
  toast.success(message, {
    style: {
      background: "linear-gradient(to right, #d946ef, #a21caf)",
      color: "#fff",
      border: "none",
      boxShadow: "0 2px 16px 0 rgba(236, 72, 153, 0.15)",
    },
    iconTheme: {
      primary: "#d946ef",
      secondary: "#a21caf"
    }
  });
}

// Keep error toast default (or customize as needed)
export function showError(message) {
  toast.error(message);
}

export { Toaster }
