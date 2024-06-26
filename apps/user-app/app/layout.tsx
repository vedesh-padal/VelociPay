import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { AppbarClient } from "../components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VelociPay",
  description: "Make your payments blazing fast",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen bg-[#ebe6e6] overflow-y-hidden">
            <AppbarClient />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
