// import "@/app/globals.css"
import { inter } from "@/app/fonts"
import Link from 'next/link';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AppRouterCacheProvider>
          <main className="min-h-screen flex flex-col items-center">
            <ul>
              <li>
                <Link href="/">root</Link>
              </li>
              <li>
                <Link href="/eval">eval</Link>
              </li>
            </ul>
            {children}
          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
