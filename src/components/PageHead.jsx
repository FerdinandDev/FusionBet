import React from "react";
import { useApp } from "../context/AppContext";

export default function PageHead({ title, subtitle }) {
  const { c } = useApp();

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight md:text-4xl" style={{ fontFamily: "Poppins, sans-serif" }}>
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm" style={{ color: c.muted }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
