import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});


export const metadata = {
  title: "Rownak Hasan Joy | Portfolio",
  description: "Web Developer & CSE Student Portfolio",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
