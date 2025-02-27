"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeaderCarousel = () => {
  const videos = [
    "/videos/header1.mp4",
    "/videos/header2.mp4",
    "/videos/header3.mp4",
    "/videos/header4.mp4",
  ];

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <Carousel
        autoPlay
        interval={4000} // ⏳ Cambia cada 6 segundos
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
      >
        {videos.map((src, index) => (
          <div key={index} className="relative w-full h-[340px]">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeaderCarousel;
