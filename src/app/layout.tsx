import "@/styles/globals.css";
import "simplebar-react/dist/simplebar.min.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/session";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen flex-col antialiased", inter.className)}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main>
              <Navbar user={user} />
              <Toaster />
              {children}
            </main>
            <SiteFooter className="border-t" />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
