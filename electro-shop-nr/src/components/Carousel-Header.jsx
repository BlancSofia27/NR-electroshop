"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeaderCarousel = () => {
  const images = [
    "/images/header1.png",
    "/images/header2.png",
    "/images/header3.png",
  ];

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <Carousel
        autoPlay
        interval={7000} // ⏳ Cambia cada 7 segundos
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
      >
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-[300px]">
            <Image
              src={src}
              alt={`Header ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeaderCarousel;
