import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

      <h1 className="text-3xl md:text-4xl font-bold mb-6 p-4 text-left">
        Latest Updates
      </h1>

      {/* Comics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
        {comics.map((comic) => (
          <div key={comic._id}>
            <img
              src={comic.image}
              alt={comic.title}
              className="w-full h-auto aspect-[283/403] object-cover"
            />

            <h2 className="text-lg font-semibold mt-3">{comic.title}</h2>
            <p className="text-sm text-gray-600">{comic.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Views: {comic.viewCount}
            </p>

            <Link
              to={`/comic/${comic._id}`}
              className="mt-2 inline-block text-blue-500 hover:text-blue-600 font-medium"
            >
              View Comic
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
