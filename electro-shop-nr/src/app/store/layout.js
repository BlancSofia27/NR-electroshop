

import { Suspense } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

 // Indica que este es un componente cliente


export default function StoreLayout({ children }) {
  return (
    <>
     <Navbar />
     <Suspense fallback={<div>Loading...</div>}>
      {children}
     </Suspense>
      <Footer/>
    </>
  );
}