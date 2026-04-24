import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import { fetchContent } from "@/lib/content";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  display: "swap",
});

const BASE_URL = "https://smartwatt.me";

export async function generateMetadata(): Promise<Metadata> {
  const { meta, hero } = await fetchContent();
  const title = `${meta.name} — Engineer & AI Researcher`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description: hero.intro,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      url: BASE_URL,
      title,
      description: hero.intro,
      siteName: meta.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: hero.intro,
    },
  };
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Smart Wattanapornmongkol",
  url: BASE_URL,
  image: `${BASE_URL}/img/profile.png`,
  jobTitle: "AI Researcher & Engineer",
  affiliation: [
    {
      "@type": "Organization",
      name: "Chulalongkorn University",
    },
    {
      "@type": "Organization",
      name: "OpenThaiGPT Lab",
    },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntuMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
