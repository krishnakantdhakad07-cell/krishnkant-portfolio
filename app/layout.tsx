import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ============================================================
   TYPOGRAPHY — self-hosted via next/font (zero layout shift)
   Display : Sora           → futuristic, geometric, premium
   Body    : Inter          → highly readable at every size
   Mono    : JetBrains Mono → professional coding typeface
   ============================================================ */
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--f-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--f-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--f-mono",
});

export const metadata: Metadata = {
  title: "Krishnkant Dhakar — Developer & Digital Solutions Architect",
  description:
    "Premium futuristic portfolio of Krishnkant Dhakar — software developer, AI integrator and problem solver building high-performance, visually stunning digital products.",
  keywords: [
    "Krishnkant Dhakar",
    "developer portfolio",
    "Python developer",
    "C++ developer",
    "Next.js",
    "Three.js",
    "Tally Prime",
    "AI integration",
  ],
  authors: [{ name: "Krishnkant Dhakar" }],
  openGraph: {
    title: "Krishnkant Dhakar — Developer & Digital Solutions Architect",
    description:
      "Futuristic, 3D, cinematic developer portfolio — software, AI integration and creative web engineering.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
