import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meneer Wit | Gratis Online Undercover Spel (Nederlands)",
  description: "Speel gratis het populaire gezelschapsspel Meneer Wit (Undercover) online! Raad wie de bedrieger is in dit spannende woordspel. Geen app download nodig, direct spelen in je browser met duizenden Nederlandse woorden.",
  applicationName: "Meneer Wit",
  authors: [{ name: "Meneer Wit Team" }],
  keywords: [
    "mister white", "meneer wit", "undercover", "undercover spel", "gratis undercover spel",
    "undercover nederlands", "mister white nederlands", "gratis mister white",
    "mister white gratis", "wie is de mol spel", "woordspel", "party game",
    "gezelschapsspel online", "browser spel", "party games nederlands",
    "weerwolven variant", "leugenaar spel", "insider game"
  ],
  creator: "Meneer Wit",
  publisher: "Meneer Wit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Meneer Wit - Het Gratis Online Undercover Spel",
    description: "Speel nu gratis Mister White / Undercover met je vrienden! Ontmasker de bedrieger voordat het te laat is. 100% gratis en geen download nodig.",
    url: "https://meneerwit.nl", // Assuming a domain, or relative
    siteName: "Meneer Wit",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/favicon/android-chrome-512x512.png", // Using the icon as OG image for now if no banner exists
        width: 512,
        height: 512,
        alt: "Meneer Wit Spel",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Meneer Wit - Gratis Online Party Game",
    description: "Wie is de indringer? Speel nu gratis het spannende spel Undercover / Mister White in je browser!",
    images: ["/favicon/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  alternates: {
    canonical: "https://meneerwit.nl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Meneer Wit",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Speel gratis Meneer Wit (de Nederlandse Mr. White) online. Het populaire gezelschapsspel met onbeperkte woorden.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1024"
    },
    "url": "https://meneerwit.nl",
    "publisher": {
      "@type": "Organization",
      "name": "Meneer Wit Games"
    }
  };

  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
