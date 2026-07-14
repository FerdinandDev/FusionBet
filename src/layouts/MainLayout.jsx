import React from "react";
import { Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";
import DemoBar from "../components/DemoBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toasts from "../components/ui/Toasts";
import ScrollToTop from "../components/ui/ScrollToTop";

export default function MainLayout() {
  const { c } = useApp();

  return (
    <div
      style={{
        background: c.bg,
        color: c.text,
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: "100vh",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <DemoBar />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <Footer />
      <Toasts />
      <ScrollToTop />
    </div>
  );
}
