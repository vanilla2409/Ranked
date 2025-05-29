import * as React from "react";

export function Card({ className = "", ...props }) {
  return (
    <div
      className={
        "rounded-lg border border-neutral-800 bg-neutral-900/80 shadow-sm p-4 " +
        className
      }
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return <div className={"mb-2 " + className} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={"text-lg font-semibold " + className} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={" " + className} {...props} />;
}

export function CardFooter({ className = "", ...props }) {
  return <div className={"mt-2 flex justify-end gap-2 " + className} {...props} />;
}
