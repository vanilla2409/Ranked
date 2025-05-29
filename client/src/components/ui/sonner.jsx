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

export function showSuccess(message) {
  toast.success(message, {
    duration: 3000,
    position: "bottom-center",
    style: { background: '#A594F9', color: '#fff' },
    className: '!text-white',
  });
}

export function showError(message) {
  toast.error(message, {
    duration: 3000,
    position: "bottom-center",
    style: { background: '#101010', color: '#fff' },
    className: '!text-white',
  });
}

export { Toaster }
