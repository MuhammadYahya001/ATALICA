import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atalica.com.pk"),
  alternates: { canonical: "/" },
  title: {
    default: "ATALICA | Premium Interiors, Construction & Décor",
    template: "%s | ATALICA",
  },
  description:
    "Spaces that Inspire. Interior design, construction, and décor services in Multan, Islamabad, and Rawalpindi.",
  keywords: [
    "interior design Multan",
    "interior design Islamabad",
    "interior design Rawalpindi",
    "house construction Multan",
    "interior design Pakistan",
    "construction Pakistan",
    "home décor Pakistan",
    "Raheel Raza",
    "ATALICA",
  ],
  authors: [{ name: "Raheel Raza", url: "https://atalica.com.pk/about" }],
  creator: "ATALICA",
  publisher: "ATALICA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://atalica.com.pk",
    siteName: "ATALICA",
    title: "ATALICA | Premium Interiors, Construction & Décor",
    description:
      "Interior design, construction, and décor services in Multan, Islamabad, and Rawalpindi.",
    images: [
      {
        url: "/images/brand/Logo.png",
        alt: "ATALICA logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATALICA | Premium Interiors, Construction & Décor",
    description:
      "Interior design, construction, and décor services in Multan, Islamabad, and Rawalpindi.",
    images: ["/images/brand/Logo.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "ATALICA",
  alternateName: "ATALICA Interiors | Construction | Décor",
  url: "https://atalica.com.pk",
  logo: "https://atalica.com.pk/images/brand/Logo.png",
  description:
    "Interior design, construction, and décor services in Multan, Islamabad, and Rawalpindi.",
  founder: {
    "@type": "Person",
    name: "Raheel Raza",
    jobTitle: "Founder & Principal",
  },
  telephone: "+923051755566",
  email: "official@atalica.com.pk",
  areaServed: [
    { "@type": "City", name: "Multan" },
    { "@type": "City", name: "Islamabad" },
    { "@type": "City", name: "Rawalpindi" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.match(/^G-[A-Z0-9]+$/)?.[0];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-brand-offwhite text-brand-charcoal">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
