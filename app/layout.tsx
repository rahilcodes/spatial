import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HideOnAdmin from "@/components/HideOnAdmin";
import MobileContactPill from "@/components/MobileContactPill";
import { SITE } from "@/lib/data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Spatial Alphabet — AI-Enabled Geospatial & Engineering",
    template: "%s | Spatial Alphabet",
  },
  description:
    "AI-enabled geospatial, engineering design, BIM, and software solutions — delivered first-time-right by dual-shore teams in Texas and Hyderabad.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Spatial Alphabet — AI-Enabled Geospatial & Engineering Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/uploads/spatial-alphabet-logo.png`,
  email: SITE.email,
  telephone: "+1-817-231-0158",
  slogan: "Map. Model. Deliver.",
  foundingDate: "2019",
  sameAs: [SITE.linkedin],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Keller",
      addressRegion: "TX",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      streetAddress: "B Block 609, 6th Floor, Asian Sun City, Kondapur, Forest Dept Colony, Gachibowli, Kothaguda",
      postalCode: "500084",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  ],
};

const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Microsoft Clarity — free-tier page + behavior analytics. Activates only
            once NEXT_PUBLIC_CLARITY_ID is set in the environment. */}
        {clarityId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`,
            }}
          />
        )}
        <HideOnAdmin>
          <Header />
        </HideOnAdmin>
        <main id="main">{children}</main>
        <HideOnAdmin>
          <Footer />
          <MobileContactPill />
        </HideOnAdmin>
      </body>
    </html>
  );
}
