import "./globals.css";
import { Kanit } from "next/font/google";
import { cn } from "@/lib/utils"
import Header from "@/components/my/header";

const kanit = Kanit({
  subsets: ['thai'],
  weight: ['100', '300', '500'],
  variable: '--font-kanit'
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "28FF",
  description: "Friend forever",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-kanit antialiased",
        kanit.variable
      )}>
        <Header />
        {children}
      </body>
    </html>
  );
}

