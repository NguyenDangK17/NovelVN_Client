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
  const [showChapters, setShowChapters] = useState(true);

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
    <div className="relative p-6 w-full mx-auto text-white mb-7">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 w-full h-[300px] md:h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(25, 26, 28, 0.6) 10%, rgb(25, 26, 28) 90%), url(${novel.image})`,
          backgroundPosition: "center 20%",
        }}
      />

      {/* Two-Column Layout */}
      <div className="relative w-full max-w-screen-2xl mx-auto px-6 mt-60 flex flex-col lg:flex-row gap-8">
        {/* Left Column (Main Content + Chapters) */}
        <div className="w-full lg:w-9/12 flex flex-col gap-10">
          {/* Section 1: Novel Main Details */}
          <div
            className="p-6 rounded-lg"
            style={{
              background:
                // "linear-gradient(to top, rgba(44, 44, 44, 1) 20%, rgba(44, 44, 44, 0) 80%)",
                "#2c2c2c",
            }}
          >
            <div className="relative flex flex-col md:flex-row gap-6">
              {/* Novel Cover */}
              <div className="w-full md:w-3/12 flex justify-center">
                <div className="relative w-[200px] md:w-[250px] lg:w-[283px] max-w-full">
                  <img
                    src={novel.image}
                    alt={novel.title}
                    className="w-full h-auto aspect-[283/403] object-cover"
                  />
                </div>
              </div>

              {/* Novel Details */}
              <div className="w-full md:w-9/12 flex flex-col justify-between space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {novel.title}
                </h1>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 text-white font-semibold text-sm">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="inline-block px-3 py-1 bg-[#1f1f1f] rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Info */}
                <p>
                  <span className="font-semibold text-[#ff5722] mr-2">
                    Author:
                  </span>
                  Extra7
                </p>
                <p>
                  <span className="font-semibold text-[#ff5722] mr-2">
                    Artist:
                  </span>
                  Somebody
                </p>
                <p>
                  <span className="font-semibold text-[#ff5722] mr-2">
                    Release:
                  </span>
                  2024
                </p>
                <p className="mb-6">
                  <span className="font-semibold text-[#ff5722] mr-2">
                    Status:
                  </span>
                  Ongoing
                </p>

                {/* Action Buttons */}
                <div className="flex flex-row gap-4">
                  <button className="flex w-full md:w-[240px] items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md">
                    <FaHeart /> Add to Favorite
                  </button>
                  <button className="flex w-full md:w-[240px] items-center justify-center gap-2 px-4 py-2 bg-[#ff5722] hover:bg-[#d84315] rounded-md">
                    <FaBookOpen /> Start Reading
                  </button>
                </div>

                {/* Icon Buttons Section */}
                <div className="flex flex-col">
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-12 w-full p-6">
                    <button className="flex flex-col items-center">
                      <FaHeart size={24} className="text-red-500" />
                      <span className="text-sm text-white mt-1">708</span>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-5">
              <div>
                <p className="text-md text-gray-500 font-bold">Updated On</p>
                <p className="text-2xl font-bold text-white">3 years</p>
              </div>
              <div>
                <p className="text-md text-gray-500 font-bold">
                  Total Chapters
                </p>
                <p className="text-2xl font-bold text-white">15</p>
              </div>
              <div>
                <p className="text-md text-gray-500 font-bold">Rating</p>
                <div className="flex items-center justify-center">
                  <FaStar color="#ff5722" size={24} />
                  <p className="text-2xl font-bold text-[#ff5722] ml-2">
                    10,000
                  </p>
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
              <h2 className="text-xl font-bold text-white mb-2">
                Alternative Titles
              </h2>
              <p className="text-white text-sm rounded-md">
                {"No alternative names available."}
              </p>
            </div>
            <div className="mt-10">
              {/* Description Section */}
              <h2 className="text-xl font-bold text-white mb-2">Description</h2>
              <p className="text-white rounded-md">{novel.description}</p>
            </div>
          </div>

          {/* Section 2: Chapter List */}
          <div className="rounded-lg bg-[#2c2c2c]">
            <button
              className="flex items-center justify-between w-full bg-[#2c2c2c] rounded-md px-6 py-4"
              onClick={() => setShowChapters(!showChapters)}
            >
              <span className="font-bold text-white text-xl">
                Chapters List
              </span>
              {showChapters ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {showChapters && (
              <div className="p-4 bg-[#1e1e1e] flex flex-col md:flex-row">
                <img
                  src={novel.image}
                  alt="Novel Cover"
                  className="w-[141px] h-[201px] mx-auto md:mx-0 md:mr-6 object-cover"
                />
                <div className="flex-1">
                  <ul className="overflow-y-auto max-h-64">
                    {Array.from({ length: 15 }, (_, i) => (
                      <li
                        key={i}
                        className="py-2 border-b border-gray-700 hover:bg-[#292929] cursor-pointer px-3"
                        onClick={() => {
                          window.location.href = `/comic/chapter/${novel._id}`;
                        }}
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

        {/* Right Column */}
        <div className="w-full lg:w-3/12 hidden lg:block">
          <div className="bg-[#2c2c2c] p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Related Novels</h2>
            <ul className="space-y-3">
              <li className="text-sm hover:underline cursor-pointer">
                Related Novel 1
              </li>
              <li className="text-sm hover:underline cursor-pointer">
                Related Novel 2
              </li>
              <li className="text-sm hover:underline cursor-pointer">
                Related Novel 3
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">[Ad Placeholder]</p>
          </div>

          <div className="bg-[#2c2c2c] p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
            <p className="text-md text-gray-500">Updated On</p>
            <p className="text-xl font-bold text-white">3 years ago</p>
          </div>
        </div>

        {/* Show Right Column Content Below on Tablets */}
        <div className="block lg:hidden w-full">
          <div className="bg-[#2c2c2c] p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Related Novels</h2>
            <ul className="space-y-3">
              <li className="text-sm hover:underline cursor-pointer">
                Related Novel 1
              </li>
              <li className="text-sm hover:underline cursor-pointer">
                Related Novel 2
              </li>
              <li className="text-sm hover:underline cursor-pointer">
                Related Novel 3
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">[Ad Placeholder]</p>
          </div>

          <div className="bg-[#2c2c2c] p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
            <p className="text-md text-gray-500">Updated On</p>
            <p className="text-xl font-bold text-white">3 years ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelDetail;
