import * as React from "react";

export function Tooltip({ content, children }) {
  const [show, setShow] = React.useState(false);
  return (
    <span className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-black text-xs text-white whitespace-nowrap shadow-lg">
          {content}
        </span>
      )}
    </span>
  );
}
