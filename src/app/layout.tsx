import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "OpenSuperIntelligence — Enterprise Open-Source AI Infrastructure",
    template: "%s | OpenSuperIntelligence",
  },
  description:
    "Enterprise-grade sovereign AI infrastructure platform operated by Arcane Echos Technologies SAS. Deploy verified open weights, high-throughput inference engines, and isolated microVM sandboxes.",
  applicationName: "OpenSuperIntelligence",
  authors: [{ name: "Arcane Echos Technologies SAS" }],
  creator: "Arcane Echos Technologies SAS",
  publisher: "Arcane Echos Technologies SAS",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased selection:bg-[#0071E3] selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
