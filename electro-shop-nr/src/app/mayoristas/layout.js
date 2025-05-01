import NavbarMay from "@/components/NavbarMay";
import { Suspense } from "react";



const MayLayout = ({ children }) => {
    return (
      <div className="pt-[80px]">
        {/* Sidebar a la izquierda */}
     <NavbarMay/>
     <Suspense fallback={<div>Loading...</div>} >
        {children}
        </Suspense>
      </div>
    );
  };
  
  export default MayLayout;
  