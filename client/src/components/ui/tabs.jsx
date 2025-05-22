import * as React from "react";

export function Tabs({ value, onChange, children, className = "" }) {
  return (
    <div className={"w-full " + className}>
      <div className="flex border-b border-neutral-800 mb-2">
        {React.Children.map(children, (child, idx) =>
          child.type.displayName === "TabList"
            ? React.cloneElement(child, { value, onChange })
            : null
        )}
      </div>
      {React.Children.map(children, (child) =>
        child.type.displayName === "TabPanel"
          ? React.cloneElement(child, { value })
          : null
      )}
    </div>
  );
}

export function TabList({ children, value, onChange }) {
  return (
    <div className="flex gap-2">
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, {
          selected: value === child.props.value,
          onClick: () => onChange(child.props.value),
        })
      )}
    </div>
  );
}
TabList.displayName = "TabList";

export function Tab({ value, selected, onClick, children }) {
  return (
    <button
      className={`px-4 py-1 rounded-t-md font-medium text-sm transition-colors border-b-2 ${
        selected
          ? "border-purple-500 text-purple-300 bg-neutral-900"
          : "border-transparent text-neutral-400 hover:text-purple-200"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
Tab.displayName = "Tab";

export function TabPanel({ value, children, value: selectedValue }) {
  if (value !== selectedValue) return null;
  return <div className="p-2">{children}</div>;
}
TabPanel.displayName = "TabPanel";
