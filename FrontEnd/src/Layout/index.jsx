import React from "react";
import { Footer, Navbar } from "../Components";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
