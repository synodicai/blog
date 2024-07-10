"use client";
import * as React from "react";
import Link from "next/link";

import { Orbit } from "lucide-react";


export const PcNavbar = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <header className="sticky top-0 h-16 items-center border-b bg-background px-4 hidden md:px-6 md:flex">
      <nav className="flex w-full items-center justify-between text-lg font-medium md:text-sm lg:gap-6">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{ marginRight: "0.25rem" }}
          >
            <Orbit className="h-6 w-6" />
            <span>Blog</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
