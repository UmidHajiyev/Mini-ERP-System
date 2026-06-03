"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isProductsPage = pathname === "/" || pathname === "/products";

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Inventory App</h2>

      <div className="sidebar-nav">

        <Link className={isProductsPage ? "sidebar-link active" : "sidebar-link"} href="/">
          Products
        </Link>
      </div>
    </div>
  );
}