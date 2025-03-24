
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../redux/reduxProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Noth Rizkon",
  description: "electroshop",
};


export default function RootLayout({ children }) {
  

  return (
    
    <html lang="en">
      <body className={`${inter.variable} antialiased `}>
    <ReduxProvider>
        {children}
    </ReduxProvider>
        
      </body>
    </html>
  );
}
