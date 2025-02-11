import React from "react";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Admin Sidebar  */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
