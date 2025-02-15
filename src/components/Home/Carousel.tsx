import { Carousel } from "antd";
import React from "react";

const CarouselComponent: React.FC = () => {
  const slides = [
    {
      image:
        "https://mangadex.org/covers/3b62f955-732c-43b2-84e7-cc1ff57896a7/7bd9d778-ad3a-4e6c-ac9a-c8f025fb07b4.png.512.jpg",
      title:
        "Abandoned ~Tsuyosugite Buki ga Kowareru Yuusha to Buki Shokunin no Elf~",
      description: "This is the description for the first image.",
      tags: ["Action", "Fantasy", "Adventure"],
    },
    {
      image:
        "https://mangadex.org/covers/ac983725-5e63-4ebe-8dc8-94ca5e4c5982/d3b10777-34a2-427f-8808-2d0abbfb95eb.jpg.512.jpg",
      title: "Uchi ni Kaeru to Itsumo Kukkoro ga Iru",
      description: "This is the description for the second image.",
      tags: ["Comedy", "Slice of Life"],
    },
    {
      image:
        "https://mangadex.org/covers/f349008f-0896-4ec8-bc37-56733525dfc7/e04eb3c0-1264-41f4-b7a9-850481803cbf.png.512.jpg",
      title: "Girls x Vampire",
      description: "This is the description for the third image.",
      tags: ["Romance", "Supernatural"],
    },
    {
      image:
        "https://mangadex.org/covers/452ca5c5-8132-4cc9-9c60-2d0ebd62c5be/8f801d5d-4ff9-4089-9ba6-835689365735.jpg.512.jpg",
      title: "Gal Oshi JK wa Gal ni Naritai",
      description: `“Living as a gal is seriously the best!!” Mimiru was an introvert in middle school, but when she entered high school, she made her long-awaited debut as a gal, thinking, “Maybe I can become a gal too!?”. She made friends with three girls: Yuuhi, a cool beauty with a calm and pretty look; Fuuka, a cute gal with a soft and fluffy look; and Kurumi, a cheerful and energetic gal who is good at sports. Now she has joined the gal group she has always admired! While she lives the sparkling life she has always dreamed of, she also pushes herself too hard to keep up with her friends. And she also notices new feelings growing within her…`,
      tags: ["School", "Drama"],
    },
    {
      image:
        "https://mangadex.org/covers/9d9b04ad-9a83-49f4-8ae4-a9a3780fe9c0/800833b8-8fee-4309-8e2d-d83df6b842a6.jpg.512.jpg",
      title: "Sakamoto Days",
      description: "This is the description for the first image.",
      tags: ["Action", "Comedy"],
    },
    {
      image:
        "https://mangadex.org/covers/1bfbb8cf-96ea-416e-b211-656a9eb04a57/d0e4aa79-763d-4710-856a-3495aa3dc801.png.512.jpg",
      title: "Kyou Kara Tsukaeru Isekai Ren'ai Manual",
      description: "This is the description for the first image.",
      tags: ["Isekai", "Romance"],
    },
    {
      image:
        "https://mangadex.org/covers/b6b89f54-81c1-4e7e-ae80-b4dccdd63ada/b9e9586c-c7a2-4e08-bf17-789e4ba8124c.png.512.jpg",
      title:
        "Hyouketsu Reijou-sama wo Follow Shitara, Mechamecha Dekiai Sareteshimatta Ken",
      description: "This is the description for the first image.",
      tags: ["Isekai", "Romance"],
    },
  ];

  return (
    <Carousel
      autoplay
      autoplaySpeed={4000}
      pauseOnHover={false}
      className="mr-[-1px]"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="relative w-full h-[80vh] flex items-center justify-center px-8 lg:px-12"
        >
          {/* Background Overlay */}
          <div
            className="absolute inset-[-1px] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(25, 26, 28, 0.6) 10%, rgb(25, 26, 28) 90%), url(${slide.image})`,
              backgroundPosition: "center 25%",
            }}
          />

          {/* Content Wrapper */}
          <div className="relative flex w-full max-w-6xl h-full items-start gap-4 mt-20">
            <div className="w-[25%] flex justify-center">
              <div className="w-full max-w-[283px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto aspect-[283/403] object-cover rounded-md"
                />
              </div>
            </div>

            <div className="w-[75%] flex flex-col justify-start text-white">
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-4">
                {slide.title}
              </h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {slide.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-700 text-xs sm:text-sm px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm sm:text-lg">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
