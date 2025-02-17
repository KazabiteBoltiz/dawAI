import type { Metadata } from "next";
import "./globals.css";
import { Navigator } from "@/components/Navigator";
import MovingBackground from "@/components/MovingBackground";

export const metadata: Metadata = {
  title: "MedOp",
  description: "I need meds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className = 'flex flex-col flex-between bg-blue-6'>
          {children}
        <Navigator/>
        <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
      </body>
    </html>
  );
}
