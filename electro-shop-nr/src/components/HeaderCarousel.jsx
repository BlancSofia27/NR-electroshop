"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Evita problemas de SSR con next/dynamic
const ReactSwipe = dynamic(() => import("react-swipe"), { ssr: false });

const HeaderCarousel = () => {
  const [isClient, setIsClient] = useState(false);
  const [videoSources, setVideoSources] = useState([
    "/videos/header1.mp4",
    "/videos/header2.mp4",
    "/videos/header3.mp4",
    "/videos/header4.mp4",
  ]);
  const [videoHeight, setVideoHeight] = useState(
    "h-[340px] sm:h-52 md:h-60 lg:h-72 xl:h-96"
  );

  useEffect(() => {
    setIsClient(true);

    // Detectar si es móvil para cambiar los videos y la altura
    if (window.innerWidth < 768) {
      setVideoSources([
        "/videos/mobileHeader1.mp4",
        "/videos/mobileHeader2.mp4",
        "/videos/mobileHeader3.mp4",
        "/videos/mobileHeader4.mp4",
      ]);
      setVideoHeight("h-[400px]");
    }
  }, []);

  if (!isClient) return null; // Evita renderizado en SSR

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-28">
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
      >
        {videoSources.map((src, index) => (
          <div key={index} className={`relative w-full ${videoHeight}`}>
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
