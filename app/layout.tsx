import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteEnhancements } from "@/components/site-enhancements";
import { siteConfig } from "@/config/site";

const defaultDescription = "FIDO zabezpečuje stavby, rekonštrukcie, interiéry, reality a správu nehnuteľností.";

export const metadata: Metadata = {
  title: "FIDO - Plníme sny",
  description: defaultDescription,
  metadataBase: new URL("https://fido.sk"),
  icons: {
    icon: [
      { url: siteConfig.icons.favicon32, type: "image/webp", sizes: "32x32" },
      { url: siteConfig.icons.favicon192, type: "image/webp", sizes: "192x192" },
    ],
    shortcut: siteConfig.icons.favicon32,
    apple: [{ url: siteConfig.icons.appleTouch, type: "image/webp", sizes: "180x180" }],
  },
  openGraph: {
    title: "FIDO - Plníme sny",
    description: defaultDescription,
    url: "https://fido.sk",
    siteName: "FIDO",
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: "FIDO s.r.o.",
      },
    ],
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDO - Plníme sny",
    description: defaultDescription,
    images: [siteConfig.logo],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": siteConfig.legalName,
  "image": `https://fido.sk${siteConfig.logo}`,
  "telephone": "+421917617202",
  "email": siteConfig.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Strojnícka 9",
    "addressLocality": "Prešov",
    "postalCode": "080 06",
    "addressCountry": "SK"
  },
  "url": "https://fido.sk"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="oxygen-body" suppressHydrationWarning>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SiteEnhancements />
        <CookieConsent />
      </body>
    </html>
  );
}
