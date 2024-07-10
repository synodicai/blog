"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  return (
    <div style={{ display: pathname.endsWith(".jpg") ? "none" : "flex", justifyContent: "center", marginBottom: "20px" }}>
      <footer style={{ display: "flex", width: "350px", justifyContent: "center" }}>
        <p
          className="text-gray-500 mr-1"
          style={{ fontSize: "12px", display: "flex", alignItems: "center" }}
        >
          {`© ${currentYear} Synodic AI, Inc.`}
        </p>
        <p
          className="text-gray-500 hover:underline mr-1 ml-1"
          style={{ fontSize: "12px", gridColumn: "4", textAlign: "center" }}
        >
          <Link href="/terms">Terms</Link>
        </p>
        <p
          className="text-gray-500 hover:underline mr-1 ml-1"
          style={{ fontSize: "12px", gridColumn: "5", textAlign: "center" }}
        >
          <Link href="/privacy">Privacy</Link>
        </p>
        <p
          className="text-gray-500 hover:underline mr-1 ml-1"
          style={{ fontSize: "12px", gridColumn: "6", textAlign: "center" }}
        >
          <Link href="/pricing">Pricing</Link>
        </p>
        <p
          className="text-gray-500 hover:underline ml-1"
          style={{ fontSize: "12px", gridColumn: "7", textAlign: "center" }}
        >
          <Link href="/contact">Contact</Link>
        </p>
      </footer>
    </div>
  );
}
