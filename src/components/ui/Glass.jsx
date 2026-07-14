import React from "react";
import { useApp } from "../../context/AppContext";

/** Frosted surface — the base card of the whole interface. */
export default function Glass({ children, className = "", hover, style = {}, ...rest }) {
  const { c } = useApp();
  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${hover ? "hover:-translate-y-1" : ""} ${className}`}
      style={{
        background: c.glass,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `1px solid ${c.border}`,
        boxShadow: "0 10px 40px -20px rgba(0,0,0,0.6)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
