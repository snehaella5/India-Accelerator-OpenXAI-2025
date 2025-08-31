import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Article Generator",
  description: "Generate unique articles instantly using LLaMA3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gradient-to-br from-black via-red-950 to-black text-red-300 font-sans min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="py-6 text-center drop-shadow-lg">
          <h1 className="text-5xl font-bold text-red-500">🪄 AI Article Generator</h1>
          <p className="text-red-400 mt-2">Generate unique articles instantly using DeepSeek</p>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-red-500/70">
          © 2025 AI Project
        </footer>
      </body>
    </html>
  );
}
