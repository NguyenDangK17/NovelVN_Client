import { Carousel } from "antd";
import React from "react";

const CarouselComponent: React.FC = () => {
  const slides = [
    {
      image:
        "https://mangadex.org/covers/3b62f955-732c-43b2-84e7-cc1ff57896a7/7bd9d778-ad3a-4e6c-ac9a-c8f025fb07b4.png.512.jpg",
      title: "Title 1",
      description: "This is the description for the first image.",
    },
    {
      image:
        "https://i.docln.net/lightnovel/covers/b16403-483e2571-df43-4356-973d-97b148b6e3e8-m.jpg",
      title: "Title 2",
      description: "This is the description for the second image.",
    },
    {
      image:
        "https://i.docln.net/lightnovel/covers/s7855-0342197e-58c7-47c1-baab-01cdc0ec6274-m.jpg",
      title: "Title 3",
      description: "This is the description for the third image.",
    },
  ];

  return (
    <Carousel className="mt-20 mr-[-1px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="relative w-full h-[80vh] flex items-center justify-center"
        >
          <div
            className="absolute inset-[-1px] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(36, 36, 36, 0.6) 10%, rgb(36, 36, 36) 90%), url(${slide.image})`,
              backgroundPosition: "center 25%",
            }}
          />
          {/* Content */}
          <div className="relative flex w-3/4 h-full">
            {/* Image */}
            <div className="w-1/2 flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-[80%] sm:w-[300px] md:w-[320px] lg:w-[283px] h-auto max-h-[403px] object-cover bg-white shadow-lg rounded-md"
              />
            </div>

            {/* Title & Description */}
            <div className="w-1/2 flex flex-col justify-center p-6 text-white">
              <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
