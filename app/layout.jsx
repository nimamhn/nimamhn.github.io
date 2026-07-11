import "./globals.css";
import QuickContact from "../components/QuickContact";

const BASE = "https://nimamhn.github.io";

export const metadata = {
  metadataBase: new URL(BASE),
  title: "Nima Mehrani | Website Designer & Accounting Specialist",
  description: "Nima Mehrani — website designer with an accounting background. Creating clean, modern websites for businesses. طراحی سایت حرفه‌ای و مدرن.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico" },
  themeColor: "#0e1a2b",
  openGraph: {
    title: "Nima Mehrani | Website Designer",
    description: "Nima Mehrani — website designer with accounting background. Clean, modern sites for businesses.",
    url: BASE,
    siteName: "Nima Mehrani",
    images: [{ url: BASE + "/images/flow01.jpeg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nima Mehrani | Full-Stack Developer",
    description: "Nima Mehrani | Full-Stack Developer, WordPress Expert & Site Designer",
    images: [BASE + "/images/flow01.jpeg"]
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Vazirmatn:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body>
        {children}
        <QuickContact />
      </body>
    </html>
  );
}
