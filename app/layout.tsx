import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KINETIC GT — Real-Time WebGL Automotive",
  description: "Zero images. Pure real-time 3D. A procedural sports car built entirely in WebGL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060606] text-slate-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
