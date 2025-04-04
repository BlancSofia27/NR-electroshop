
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../redux/reduxProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  

  return (
    
    <html lang="en">
      <body className={`${inter.variable} antialiased xl:mt-[100px] xs:mt-16 lg:mt-[100px] sm:mt-[100px]`}>
    <ReduxProvider>
        {children}
    </ReduxProvider>
        
      </body>
    </html>
  );
}
