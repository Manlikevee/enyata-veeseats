import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import 'material-symbols/outlined.css';
import { VeeContextProvider } from "@/components/context/Chatcontext";
const inter = Inter({ subsets: ["latin"] });
import { GoogleOAuthProvider } from '@react-oauth/google';
import NextTopLoader from 'nextjs-toploader';
import * as Alerty from "@alerty/nextjs";

Alerty.configure({
  dsn: "https://01j6a7y8vrft174zytdb6p45er@ingest.alerty.ai/1fd2fa54-40bb-4ba7-a84d-9dcf4a8ba620",
});


export const metadata = {
  title: "The VeeSeats",
  description: "Optimize your board recruitment with VeeCruiter. Tap into a diverse pool of board-ready professionals. Position yourself effectively for the board role you seek. Achieve your leadership goals with ease",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico", // for the shortcut icon
    apple: "/favicon.ico", // for apple devices
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={inter.className}>

      <NextTopLoader
 color="#BD0B20"
 initialPosition={0.08}
 crawlSpeed={200}
 height={3}
 crawl={true}
 showSpinner={true}
 easing="ease"
 speed={200}
 shadow="0 0 10px #BD0B20,0 0 5px #BD0B20"
/>
      <GoogleOAuthProvider clientId="138849558759-tcsco1sma1pjvobkt5io0lt4g07e1mod.apps.googleusercontent.com"> 
      <VeeContextProvider>
        {children}
        <Toaster  position="top-right"/>
        {/* <Toaster className="custom-toaster" richColors position="top-right" /> */}
        </VeeContextProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
