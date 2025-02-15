import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaHeart,
  FaStar,
  FaBookOpen,
  FaChevronDown,
  FaChevronUp,
  FaComment,
  FaDownload,
  FaShare,
} from "react-icons/fa";
import axios from "axios";
import { Novel } from "../../types";

const genres = [
  "Action",
  "Comedy",
  "Fantasy",
  "Harem",
  "School Life",
  "Shounen",
];

const NovelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [showChapters, setShowChapters] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comics/${id}`)
      .then((res) => setNovel(res.data));

    // Update view count after 60 seconds
    const timer = setTimeout(() => {
      axios.post(`http://localhost:5000/comics/${id}/view`);
    }, 60000);

    return () => clearTimeout(timer);
  }, [id]);

  if (!novel) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="relative p-6 w-full mx-auto text-white">
      {/* Background Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(25, 26, 28, 0.6) 10%, rgb(25, 26, 28) 90%), url(${novel.image})`,
          backgroundPosition: "center 25%",
        }}
      />

      {/* Image & Info */}
      <div className="relative flex flex-col md:flex-row mt-12 gap-6 z-10 px-6">
        {/* Novel Cover - 3 columns on medium screens and up */}
        <div className="w-full md:w-3/12 flex justify-center">
          <img
            src={novel.image}
            alt={novel.title}
            className="w-[283px] h-[403px]"
          />
        </div>

        {/* Details - 9 columns on medium screens and up */}
        <div className="w-full md:w-9/12 flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">{novel.title}</h1>
          <div className="flex flex-wrap gap-2 text-white font-semibold text-sm">
            {genres.map((genre) => (
              <span
                key={genre}
                className="inline-block px-3 py-1 bg-[#2c2c2c] rounded-full whitespace-nowrap"
              >
                {genre}
              </span>
            ))}
          </div>
          <p>
            <span className="font-semibold text-[#ff5722] mr-2">Author:</span>
            _172
          </p>
          <p>
            <span className="font-semibold text-[#ff5722] mr-2">Artist:</span>
            Somebody
          </p>
          <p>
            <span className="font-semibold text-[#ff5722] mr-2">Release:</span>
            2024
          </p>
          <p className="mb-6">
            <span className="font-semibold text-[#ff5722] mr-2">Status:</span>
            Ongoing
          </p>

          {/* Buttons Section */}
          <div className="flex flex-col space-y-4">
            {/* Main Action Buttons */}
            <div className="flex gap-4">
              <button className="flex w-[240px] items-center justify-center gap-2 px-4 py-2 bg-[#ff5722] hover:bg-[#d84315] rounded-md">
                <FaBookOpen /> Start Reading
              </button>
              <button className="flex w-[240px] items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md">
                <FaHeart /> Add to Favorite
              </button>
            </div>

            {/* Icon Buttons Container */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full p-4 rounded-md mt-4">
              <button className="flex flex-col items-center">
                <FaHeart size={24} className="text-red-500" />
                <span className="text-sm text-white mt-1">Like</span>
              </button>
              <button className="flex flex-col items-center">
                <FaStar size={24} className="text-yellow-400" />
                <span className="text-sm text-white mt-1">Rate</span>
              </button>
              <button className="flex flex-col items-center">
                <FaComment size={24} className="text-white" />
                <span className="text-sm text-white mt-1">Forums</span>
              </button>
              <button className="flex flex-col items-center">
                <FaDownload size={24} className="text-blue-400" />
                <span className="text-sm text-white mt-1">Download</span>
              </button>
              <button className="flex flex-col items-center">
                <FaShare size={24} className="text-green-400" />
                <span className="text-sm text-white mt-1">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pt-10">
        <div>
          <p className="text-md text-gray-500 font-bold">Updated On</p>
          <p className="text-2xl font-bold text-white">3 years</p>
        </div>
        <div>
          <p className="text-md text-gray-500 font-bold">Total Chapters</p>
          <p className="text-2xl font-bold text-white">15</p>
        </div>
        <div>
          <p className="text-md text-gray-500 font-bold">Rating</p>
          <div className="flex items-center justify-center">
            <FaStar color="#ff5722" size={24} />
            <p className="text-2xl font-bold text-[#ff5722] ml-2">10,000</p>
          </div>
        </div>
        <div>
          <p className="text-md text-gray-500 font-bold">Views</p>
          <p className="text-2xl font-bold text-white">
            {novel.viewCount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Alternative Names Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-2">Alternative Names</h2>
        <p className="text-white text-sm bg-[#2c2c2c] p-4 rounded-md">
          {"No alternative names available."}
        </p>
      </div>

      {/* Description Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-2">Description</h2>
        <p className="text-white bg-[#2c2c2c] p-4 rounded-md">
          {novel.description}
        </p>
      </div>

      {/* Dropdown List of Chapters */}
      <div className="mt-10">
        <button
          className="flex items-center justify-between w-full px-4 py-3 bg-[#2c2c2c] hover:bg-[#3a3a3a] rounded-md"
          onClick={() => setShowChapters(!showChapters)}
        >
          <span className="font-semibold">Chapters List</span>
          {showChapters ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {showChapters && (
          <div className="mt-4 p-4 bg-[#1e1e1e] rounded-lg shadow-lg flex flex-col md:flex-row">
            <img
              src={novel.image}
              alt="Novel Cover"
              className="w-[141px] h-[201px] rounded-md mx-auto md:mx-0 md:mr-6"
            />

            {/* Chapters List */}
            <div className="flex-1">
              <ul className="max-h-64 overflow-y-auto">
                {Array.from({ length: 15 }, (_, i) => (
                  <li
                    key={i}
                    className="py-2 border-b border-gray-700 hover:bg-[#292929] cursor-pointer px-3 rounded-md"
                  >
                    Chapter {i + 1} - Title {i + 1}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelDetail;
