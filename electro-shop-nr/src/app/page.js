import HeaderCarousel from "../components/HeaderCarousel";
import CarouselText from "../components/CarouselText";
import Label from "../components/Label";
import ProductList from "../components/ProductList";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar/>
   <HeaderCarousel/>
   <CarouselText/>
   <Features/>
   <ProductList/>
   <div className="flex flex-col items-center justify-center px-7 py-6">
   <Label/>
   </div>
    <Footer/>
   </>
  );
}
