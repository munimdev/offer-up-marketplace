import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { QueryProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bargain Ex",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <head>
        {/* Other head elements go here */}
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <QueryProvider>
          <Navbar />
          <div className="flex-1" style={{ minHeight: "calc(100vh - 100px)" }}>{children}</div>
          <Toaster />
          <Footer />
        </QueryProvider>
      </body>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAC1zTJy_NTO4dbq253Pv1VOSz_MB8YRTI" async></script>
    </html>
  );
}
