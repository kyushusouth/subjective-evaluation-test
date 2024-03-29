// import "@/app/globals.css"
import { inter } from "@/app/fonts"
import Link from 'next/link';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from "@/app/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextAuthProvider session={session}>
          <AppRouterCacheProvider>
            <main className="min-h-screen flex flex-col items-center">
              <ul>
                <li>
                  <Link href="/">root</Link>
                </li>
                <li>
                  <Link href="/eval">eval</Link>
                </li>
                <li>
                  <Link href="/login">login</Link>
                </li>
              </ul>
              {children}
            </main>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
