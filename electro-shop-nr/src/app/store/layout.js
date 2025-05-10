

import { Suspense } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

 // Indica que este es un componente cliente


export default function StoreLayout({ children }) {
  return (
    <div className="xl:mt-[100px] xs:mt-16 lg:mt-[100px] sm:mt-[100px]">
     <Navbar />
     <Suspense fallback={<div>Loading...</div>}>
      {children}
     </Suspense>
      <Footer/>
    </div>
  );
}