import type { Metadata } from "next";
import { Inter, Outfit, Syne } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "Nordxrelining - Experter på Relining, Stamspolning och Rörinspektion",
  description: "Sveriges tryggaste partner inom relining och rörinspektion. Vi förlänger livet på era rörsystem – med minimal störning och maximal kvalitet.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${outfit.variable} ${syne.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `window.googleTranslateElementInit = function() { new window.google.translate.TranslateElement({pageLanguage: 'sv', autoDisplay: false}, 'google_translate_element'); };` }} />
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      </head>
      <body className="min-h-full font-sans text-slate-900 bg-white">
        <div id="google_translate_element" style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}></div>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N9QNLFS9" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
