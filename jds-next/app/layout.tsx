import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ff6b6b',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://embrouille-jds.fr'),
  title: {
    default: "Embrouille JDS - Soirées Jeux de Société entre Amis",
    template: "%s | Embrouille JDS"
  },
  description: "Rejoignez l'Embrouille JDS pour des soirées jeux de société mémorables ! Stratégie, bluff, rires et petites embrouilles entre amis. Découvrez nos jeux préférés, scores et anecdotes.",
  keywords: ["jeux de société", "soirée jeux", "Pioupiou", "Saboteur", "Skyjo", "Cortex", "amis", "stratégie", "bluff"],
  authors: [{ name: "Embrouille JDS Team" }],
  creator: "Christophe",
  publisher: "Embrouille JDS",
  
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://embrouille-jds.fr",
    siteName: "Embrouille JDS",
    title: "Embrouille JDS - Où l'amitié se brise à chaque partie !",
    description: "Soirées jeux de société entre amis : stratégie, bluff et fous rires garantis. Découvrez notre équipe, nos jeux préférés et nos meilleures anecdotes !",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Embrouille JDS - Soirées Jeux de Société",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Embrouille JDS - Soirées Jeux de Société",
    description: "Où l'amitié se brise à chaque partie ! 🎲",
    images: ["/og-image.jpg"],
    creator: "@embrouillejds",
  },
  
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png" },
    ],
  },
  
  manifest: "/manifest.json",
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: "https://embrouille-jds.fr",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Embrouille JDS',
  description: 'Club de jeux de société entre amis',
  url: 'https://embrouille-jds.fr',
  logo: '/favicon/dice.svg',
  sameAs: [
    'https://youtube.com/@embrouillejds',
  ],
  member: [
    {
      '@type': 'Person',
      name: 'Coco',
      jobTitle: 'Règles Master'
    },
    {
      '@type': 'Person', 
      name: 'Stacy',
      jobTitle: 'Bluff Queen'
    },
    {
      '@type': 'Person',
      name: 'Fabrice',
      jobTitle: 'Champion Adresse'
    },
    {
      '@type': 'Person',
      name: 'Chris',
      jobTitle: 'Pro Saboteur'
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
