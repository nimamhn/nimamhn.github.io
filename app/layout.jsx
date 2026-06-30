import "./globals.css";
import Script from "next/script";

const BASE = "https://nima-ha.github.io/nimamehrani";

export const metadata = {
  metadataBase: new URL(BASE),
  title: "Nima Mehrani | Full-Stack Developer & WordPress Expert",
  description: "Nima Mehrani | Full-Stack Developer, WordPress Expert & Site Designer",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Nima Mehrani | Full-Stack Developer",
    description: "Nima Mehrani | Full-Stack Developer, WordPress Expert & Site Designer",
    url: BASE,
    siteName: "Nima Mehrani",
    images: [{ url: BASE + "/images/profile.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nima Mehrani | Full-Stack Developer",
    description: "Nima Mehrani | Full-Stack Developer, WordPress Expert & Site Designer",
    images: [BASE + "/images/profile.jpg"]
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
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Script id="nima-contact-widget" strategy="lazyOnload">
          {`(function(){var n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap",document.head.appendChild(n);var s=document.createElement("link");s.rel="stylesheet",s.href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css",document.head.appendChild(s);var t=document.createElement("div");t.id="nima-contact-widget",t.innerHTML='<button id="nima-widget-btn" style="position:fixed;bottom:24px;left:24px;z-index:9999;width:56px;height:56px;border-radius:50%;border:none;background:linear-gradient(135deg,#6C3CE1,#E84393);color:white;font-size:24px;cursor:pointer;box-shadow:0 4px 20px rgba(108,60,225,0.4);transition:all 0.3s" aria-label="Contact me"><i class="bi bi-chat-dots"></i></button><div id="nima-widget-panel" style="display:none;position:fixed;bottom:92px;left:24px;z-index:9999;width:300px;background:#12122a;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,0.5);font-family:Vazirmatn,system-ui,sans-serif"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><strong style="color:var(--text,#f0f0ff);font-size:16px">Contact Me</strong><button id="nima-widget-close" style="background:none;border:none;color:#9898cc;font-size:20px;cursor:pointer;padding:0;line-height:1">&times;</button></div><a href="tel:+989377798775" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;background:rgba(108,60,225,0.1);text-decoration:none;margin-bottom:8px" onmouseover="this.style.background=\'rgba(108,60,225,0.2)\'" onmouseout="this.style.background=\'rgba(108,60,225,0.1)\'"><i class="bi bi-telephone" style="color:#6C3CE1;font-size:20px"></i><span style="color:#f0f0ff;font-size:14px">09377798775</span></a><a href="mailto:nima@nimamehrani.ir" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;background:rgba(232,67,147,0.1);text-decoration:none;margin-bottom:8px" onmouseover="this.style.background=\'rgba(232,67,147,0.2)\'" onmouseout="this.style.background=\'rgba(232,67,147,0.1)\'"><i class="bi bi-envelope" style="color:#E84393;font-size:20px"></i><span style="color:#f0f0ff;font-size:14px">nima@nimamehrani.ir</span></a><a href="https://t.me/Nima4mehrani" target="_blank" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;background:rgba(0,206,201,0.1);text-decoration:none" onmouseover="this.style.background=\'rgba(0,206,201,0.2)\'" onmouseout="this.style.background=\'rgba(0,206,201,0.1)\'"><i class="bi bi-telegram" style="color:#00CEC9;font-size:20px"></i><span style="color:#f0f0ff;font-size:14px">@Nima4mehrani</span></a></div>',document.body.appendChild(t);var b=document.getElementById("nima-widget-btn"),p=document.getElementById("nima-widget-panel"),c=document.getElementById("nima-widget-close");b&&b.addEventListener("click",function(){p.style.display="block",b.style.display="none"}),c&&c.addEventListener("click",function(){p.style.display="none",b.style.display="flex"})})();`}
        </Script>
      </body>
    </html>
  );
}
