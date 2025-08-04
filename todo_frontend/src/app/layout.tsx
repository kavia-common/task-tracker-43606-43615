import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/AuthContext";
import { TodoProvider } from "./todos/TodoContext";
import Link from "next/link";

// Core font initialization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A minimal modern todo tracker",
};

// Layout: sidebar + header + main; Auth and Todo contexts at root level
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-lightbg text-lightfg`}>
        <AuthProvider>
          <TodoProvider>
            <div className="min-h-screen flex flex-col md:flex-row">
              {/* Sidebar */}
              <aside className="md:w-60 w-full md:min-h-screen bg-secondary bg-opacity-10 border-r border-secondary/10 flex flex-row md:flex-col justify-between md:justify-start">
                <div className="p-4 md:p-6 font-mono text-lg font-bold text-secondary">
                  todo<span className="text-accent">.app</span>
                </div>
                <nav className="flex flex-row md:flex-col gap-2 px-4 py-2 md:py-0 flex-1 items-center md:items-start">
                  {/* Sidebar navigation can be extended */}
                  <Link className="text-primary font-medium hover:underline underline-offset-4" href="/">Todos</Link>
                </nav>
              </aside>
              {/* Main Area */}
              <main className="flex-1 min-h-screen flex flex-col bg-lightbg">
                {/* Top Header Bar */}
                <Header />
                <section className="flex-1 w-full max-w-2xl mx-auto px-4 pt-6 pb-10">
                  {children}
                </section>
              </main>
            </div>
          </TodoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import Header from "./components/Header";
