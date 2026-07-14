import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  const { c } = useApp();

  return (
    <div className="grid place-items-center py-24 text-center">
      <p className="text-7xl font-black" style={{ color: c.primary, fontFamily: "Poppins, sans-serif" }}>
        404
      </p>
      <h1 className="mt-4 text-2xl font-black" style={{ fontFamily: "Poppins, sans-serif" }}>
        Match abandoned
      </h1>
      <p className="mt-2 max-w-sm text-sm" style={{ color: c.muted }}>
        That page doesn't exist. Nothing was lost — there was never anything at stake.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
