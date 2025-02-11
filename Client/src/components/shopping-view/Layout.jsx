import React from "react";
import ShoppingHeader from "./Header";
import { Outlet } from "react-router-dom";

export default function ShoppingLayout() {
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        {/* Common Header  */}
        <ShoppingHeader />
        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
}
