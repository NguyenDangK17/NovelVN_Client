import { useEffect, useState } from "react";
import axios from "axios";
import { Comic } from "../types";
import CarouselComponent from "../components/Home/Carousel";

const Home = () => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/comics")
      .then((res) => setComics(res.data));
  }, []);

  return (
    <div className="w-full pb-16 overflow-x-hidden">
      <CarouselComponent />

      <div className="px-4 lg:px-12 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 p-4 text-left">
          Latest Updates
        </h1>

        {/* Comics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
          {comics.map((comic) => (
            <div
              key={comic._id}
              className="flex flex-col hover:cursor-pointer"
              onClick={() => {
                window.location.href = `/comic/${comic._id}`;
              }}
            >
              <img
                src={comic.image}
                alt={comic.title}
                className="w-full h-auto aspect-[283/403] object-cover"
              />

              <h2 className="text-lg text-center font-semibold mt-2 min-h-[3rem] line-clamp-2 overflow-hidden">
                {comic.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
