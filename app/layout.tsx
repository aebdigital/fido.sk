import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteEnhancements } from "@/components/site-enhancements";

export const metadata: Metadata = {
  title: "FIDO - Plníme sny",
  description: "FIDO zabezpečuje stavby, rekonštrukcie, interiéry, reality a správu nehnuteľností.",
  metadataBase: new URL("https://fido.sk"),
  openGraph: {
    title: "FIDO - Plníme sny",
    description: "FIDO zabezpečuje stavby, rekonštrukcie, interiéry, reality a správu nehnuteľností.",
    url: "https://fido.sk",
    siteName: "FIDO",
    images: [
      {
        url: "/wp-content/uploads/2025/06/fido-logo-e1749409207128.webp",
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
    description: "FIDO zabezpečuje stavby, rekonštrukcie, interiéry, reality a správu nehnuteľností.",
    images: ["/wp-content/uploads/2025/06/fido-logo-e1749409207128.webp"],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "FIDO s.r.o.",
  "image": "https://fido.sk/wp-content/uploads/2025/06/fido-logo-e1749409207128.webp",
  "telephone": "+421917617202",
  "email": "kontakt@fido.sk",
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
        <script src="/wp-includes/js/jquery/jquery.min.js" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="oxygen-body" suppressHydrationWarning>
        {children}
        <SiteEnhancements />
        <CookieConsent />
      </body>
    </html>
  );
}
