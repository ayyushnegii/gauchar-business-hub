import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../hooks/useLanguage";
import Header from "../components/layout/Header";
import BackToTop from "../components/layout/BackToTop";

export const metadata: Metadata = {
  title: "Gauchar Hub — Local Business Discovery",
  description: "Discover the best local businesses in Gauchar, Uttarakhand based on real community experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: 'var(--brand-cream)' }}>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-[#EDE8DF] py-8 px-4 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
              <div className="flex items-center gap-2 font-semibold text-[var(--brand-slate)]">
                <span>🏔️</span>
                <span>Gauchar Hub</span>
              </div>
              <p>Community-powered local discovery · Gauchar, Uttarakhand</p>
              <p>Built with ❤️ by <a href="https://ayyushportfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-saffron)] hover:underline">Ayush Negi</a></p>
            </div>
          </footer>
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
