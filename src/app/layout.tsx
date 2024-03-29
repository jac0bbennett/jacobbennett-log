import './globals.css';
import Footer from '../components/app/footer';
import HeaderScrollListenerElement from '../components/app/headerScrollListener';
import { SidemenuProvider } from '../context/useSidemenu';
import SideMenu from '../components/app/sideMenu';
import Hamburger from '../components/app/hamburger';
import Link from 'next/link';
import {Analytics} from "@vercel/analytics/react"

export const revalidate = 60;

const name = process.env.NAME as string;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidemenuProvider>
          <Hamburger />
          <SideMenu />
          <HeaderScrollListenerElement />
          <div id="fixed-header" className="fixed-header">
            <div className="post-author">
              <Link href="/">{name}</Link>
            </div>
            <Hamburger />
          </div>
        </SidemenuProvider>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
