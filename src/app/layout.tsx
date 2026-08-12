import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Global Construction – Certifierad Totalentreprenad",
  description: "Bygg framtiden med oss. Vi levererar säkra och optimerade lösningar för konstruktion och skyddsrum.",
  icons: {
    icon: '/favicon.ico?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}>
      <head>
      </head>
      <body className="min-h-full font-sans text-slate-900 bg-white">
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
