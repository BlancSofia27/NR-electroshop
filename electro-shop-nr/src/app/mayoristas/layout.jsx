import { Suspense } from "react";
import Footer from "../../components/Footer";
import NavbarMay from "@/components/NavbarMay";

export default function MayoristasLayout({ children }) {
  return (
    <div className="xl:mt-[100px] xs:mt-16 lg:mt-[100px] sm:mt-[100px]">
     <NavbarMay />
      <Suspense fallback={<div>Loading...</div>}>
            {children}
           </Suspense>
      <Footer/>
    </div>
  );
}