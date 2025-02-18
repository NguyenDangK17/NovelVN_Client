import { useEffect, useState } from "react";
import axios from "axios";
import { Novel } from "../types";
import CarouselComponent from "../components/Home/Carousel";
import { Carousel } from "antd";
import { FaEye } from "react-icons/fa";

// Dummy Notice Board Data
const notices = [
  {
    id: 1,
    title: "Site Maintenance on Feb 20",
    author: "Admin",
    timestamp: "Feb 18, 2025",
    content:
      "We will be performing scheduled maintenance on February 20th at 2:00 AM UTC. Expect some downtime during this period.",
  },
  {
    id: 2,
    title: "New Comics Added!",
    author: "Moderator",
    timestamp: "Feb 16, 2025",
    content:
      "We have added 10 new trending comics this week! Check them out in the 'Trending Today' section.",
  },
  {
    id: 3,
    title: "Bug Fix: Login Issues Resolved",
    author: "Admin",
    timestamp: "Feb 15, 2025",
    content:
      "Some users were experiencing login issues. This has now been fixed. Let us know if you encounter any further problems.",
  },
  {
    id: 4,
    title: "Community Guidelines Updated",
    author: "Moderator",
    timestamp: "Feb 10, 2025",
    content:
      "Please review the latest updates to our community guidelines. We aim to make this a friendly and welcoming place for all users.",
  },
];

// Dummy Forum Data
const forums = [
  {
    id: 1,
    title: "Favorite Manga of 2025?",
    author: "MangaFan",
    timestamp: "Feb 17, 2025",
    replies: 24,
  },
  {
    id: 2,
    title: "Best Plot Twists",
    author: "PlotTwistLover",
    timestamp: "Feb 16, 2025",
    replies: 15,
  },
  {
    id: 3,
    title: "Recommendations for New Readers",
    author: "NewbieGuide",
    timestamp: "Feb 15, 2025",
    replies: 30,
  },
  {
    id: 4,
    title: "Upcoming Releases",
    author: "ReleaseWatcher",
    timestamp: "Feb 14, 2025",
    replies: 10,
  },
];

const Home = () => {
  const [comics, setComics] = useState<Novel[]>([]);
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "all time">(
    "weekly"
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/comics")
      .then((res) => setComics(res.data));
  }, []);

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length <= maxLength) return title;
    const truncated = title.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

  const getFilteredComics = () => {
    if (activeTab === "weekly") return comics.slice(0, 6);
    if (activeTab === "monthly") return comics.slice(5, 11);
    return comics.slice(3, 9);
  };

  return (
    <div className="w-full pb-16 overflow-x-hidden">
      <CarouselComponent />

      {/* Main Content Layout */}
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-7 grid grid-cols-12 gap-6">
        {/* Popular Section - 9/12 width */}
        <div className="col-span-12 lg:col-span-9">
          <h1 className="text-3xl font-bold mb-6 p-4 text-left">
            Trending Today
          </h1>
          <Carousel
            dots={{ className: "bg-red" }}
            slidesToShow={4}
            slidesToScroll={4}
            autoplay
            autoplaySpeed={6000}
            pauseOnHover={false}
            responsive={[
              {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 3 },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
              },
              {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
              },
            ]}
            className="px-4 pb-12"
          >
            {comics.slice(0, 8).map((comic) => (
              <div
                key={comic._id}
                className="flex flex-col items-center justify-center hover:cursor-pointer group"
                onClick={() => (window.location.href = `/comic/${comic._id}`)}
              >
                <img
                  src={comic.image}
                  alt={comic.title}
                  className="w-full max-w-[240px] h-auto object-cover mx-auto"
                  style={{ aspectRatio: "283 / 403" }}
                />
                <h2 className="text-lg text-center font-bold mt-2 mx-4 text-white group-hover:text-[#ff5722]">
                  {truncateTitle(comic.title, 40)}
                </h2>
              </div>
            ))}
          </Carousel>

          <h1 className="text-3xl font-bold p-4 text-left">Announcements</h1>
          <div className="px-4">
            <ul className="space-y-2">
              {notices.map((notice) => (
                <li
                  key={notice.id}
                  className="p-4 rounded-lg hover:bg-[#3a3a3a] transition cursor-pointer"
                  onClick={() => alert(`Opening notice: ${notice.title}`)}
                >
                  <h2 className="text-lg text-[#ff5722] font-bold">
                    {notice.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    By {notice.author} • {notice.timestamp}
                  </p>
                  <p className="text-sm mt-1 text-white">
                    {truncateTitle(notice.content, 100)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular (Custom Tabs) Section - 3/12 width */}
        <div className="col-span-12 lg:col-span-3 px-4">
          <h1 className="text-3xl font-bold py-4 text-left">Ranking</h1>
          {/* Custom Tab Navigation */}
          <div className="flex mb-4">
            {["weekly", "monthly", "all time"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 text-lg font-semibold transition-colors text-center ${
                  activeTab === tab
                    ? "border-b-2 border-[#ff5722] text-[#ff5722]"
                    : "text-gray-600"
                }`}
                onClick={() =>
                  setActiveTab(tab as "weekly" | "monthly" | "all time")
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <ul className="space-y-4">
            {getFilteredComics().map((comic, index) => (
              <li
                key={comic._id}
                className="flex items-center hover:text-[#ff5722] p-2 rounded-lg cursor-pointer group"
                onClick={() => (window.location.href = `/comic/${comic._id}`)}
              >
                <span
                  className={`text-2xl font-bold mr-4 ${
                    index === 0
                      ? "text-yellow-500"
                      : index === 1
                      ? "text-[#b5b7bb]"
                      : index === 2
                      ? "text-[#cd7f32]"
                      : "text-white"
                  }`}
                >
                  {index + 1}
                </span>
                <img
                  src={comic.image}
                  alt={comic.title}
                  className="w-20 h-auto object-cover"
                  style={{ aspectRatio: "283 / 403" }}
                />
                <div className="ml-4">
                  <h2
                    className={`text-lg font-bold group-hover:text-[#ff5722] ${
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-[#b5b7bb]"
                        : index === 2
                        ? "text-[#cd7f32]"
                        : "text-white"
                    }`}
                  >
                    {truncateTitle(comic.title, 30)}
                  </h2>
                  <div className="flex items-center">
                    <span className="text-[#a1a1aa]">
                      <FaEye />
                    </span>
                    <span className="ml-1 text-[#a1a1aa]">100,000</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {truncateTitle(comic.description, 50)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Novels & Manga Section - 9/12 width */}
        <div className="col-span-12 lg:col-span-9">
          <h1 className="text-3xl font-bold mb-6 p-4 text-left">
            Self-Published
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
            {comics.slice(0, 5).map((comic) => (
              <div key={comic._id} className="flex flex-col">
                {/* Image & Title Wrapper */}
                <div className="group">
                  {/* Image */}
                  <img
                    src={comic.image}
                    alt={comic.title}
                    className="w-full h-auto aspect-[283/403] object-cover hover:cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/comic/${comic._id}`)
                    }
                  />
                  {/* Title */}
                  <h2
                    className="text-lg font-bold my-2 min-h-[3rem] line-clamp-2 overflow-hidden 
            hover:cursor-pointer group-hover:text-[#ff5722]"
                    onClick={() =>
                      (window.location.href = `/comic/${comic._id}`)
                    }
                  >
                    {truncateTitle(comic.title, 40)}
                  </h2>
                </div>

                {/* Chapters (independent hover effect) */}
                {[1, 2, 3].map((chapter) => (
                  <div
                    key={chapter}
                    className="flex justify-between items-center text-sm mb-1"
                  >
                    <p className="text-gray-400 font-medium flex items-center hover:text-gray-700 hover:cursor-pointer">
                      Chapter {chapter}
                    </p>
                    <p className="text-gray-600 font-medium flex items-center">
                      {chapter * 3} hours ago
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-bold my-6 p-4 text-left">
            Latest Novel Updates
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
            {comics.slice(0, 10).map((comic) => (
              <div key={comic._id} className="flex flex-col">
                {/* Image & Title Wrapper */}
                <div className="group">
                  {/* Image */}
                  <img
                    src={comic.image}
                    alt={comic.title}
                    className="w-full h-auto aspect-[283/403] object-cover hover:cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/comic/${comic._id}`)
                    }
                  />
                  {/* Title */}
                  <h2
                    className="text-lg font-bold my-2 min-h-[3rem] line-clamp-2 overflow-hidden 
            hover:cursor-pointer group-hover:text-[#ff5722]"
                    onClick={() =>
                      (window.location.href = `/comic/${comic._id}`)
                    }
                  >
                    {truncateTitle(comic.title, 40)}
                  </h2>
                </div>

                {/* Chapters (independent hover effect) */}
                {[1, 2, 3].map((chapter) => (
                  <div
                    key={chapter}
                    className="flex justify-between items-center text-sm mb-1"
                  >
                    <p className="text-gray-400 font-medium flex items-center hover:text-gray-700 hover:cursor-pointer">
                      Chapter {chapter}
                    </p>
                    <p className="text-gray-600 font-medium flex items-center">
                      {chapter * 3} hours ago
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section - 3/12 width */}
        <div className="col-span-12 lg:col-span-3 px-4">
          <h1 className="text-3xl font-bold py-4 text-left">Forums</h1>
          <div className="rounded-lg shadow-md">
            <ul className="space-y-2">
              {forums.map((forum) => (
                <li
                  key={forum.id}
                  className="py-2 rounded-lg transition cursor-pointer"
                  onClick={() => alert(`Opening forum: ${forum.title}`)}
                >
                  <h2 className="text-lg text-[#ff5722] font-bold hover:text-[#8f2403]">
                    {forum.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    By {forum.author} • {forum.timestamp} • {forum.replies}{" "}
                    replies
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="text-3xl font-bold py-4 mt-6 text-left">
            Latest Comments
          </h1>
          <div className="rounded-lg shadow-md">
            <ul className="space-y-4">
              {[
                {
                  avatar:
                    "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
                  username: "User123",
                  comment: "This manga is 🔥!",
                  comicTitle: "Comic Title 1",
                  timestamp: "2 hours ago",
                },
                {
                  avatar:
                    "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
                  username: "MangaLover",
                  comment: "When’s the next update?",
                  comicTitle: "Comic Title 2",
                  timestamp: "5 hours ago",
                },
                {
                  avatar:
                    "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
                  username: "Reader99",
                  comment:
                    "Plot twist was insane! What an insane chapter! Good work trans, keep it up!",
                  comicTitle:
                    "Comic Title 3 Comic Title 3 Comic Title 3 Comic Title 3",
                  timestamp: "1 day ago",
                },
                {
                  avatar:
                    "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
                  username: "Reader99",
                  comment:
                    "Plot twist was insane! What an insane chapter! Good work trans, keep it up!",
                  comicTitle:
                    "Comic Title 3 Comic Title 3 Comic Title 3 Comic Title 3",
                  timestamp: "1 day ago",
                },
                {
                  avatar:
                    "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
                  username: "Reader99",
                  comment:
                    "Plot twist was insane! What an insane chapter! Good work trans, keep it up!",
                  comicTitle:
                    "Comic Title 3 Comic Title 3 Comic Title 3 Comic Title 3",
                  timestamp: "1 day ago",
                },
                {
                  avatar:
                    "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
                  username: "Reader99",
                  comment:
                    "Plot twist was insane! What an insane chapter! Good work trans, keep it up!",
                  comicTitle:
                    "Comic Title 3 Comic Title 3 Comic Title 3 Comic Title 3",
                  timestamp: "1 day ago",
                },
                {
                  avatar:
                    "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
                  username: "Reader99",
                  comment:
                    "Plot twist was insane! What an insane chapter! Good work trans, keep it up!",
                  comicTitle:
                    "Comic Title 3 Comic Title 3 Comic Title 3 Comic Title 3",
                  timestamp: "1 day ago",
                },
                {
                  avatar:
                    "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
                  username: "Reader99",
                  comment:
                    "Plot twist was insane! What an insane chapter! Good work trans, keep it up!",
                  comicTitle:
                    "Comic Title 3 Comic Title 3 Comic Title 3 Comic Title 3",
                  timestamp: "1 day ago",
                },
              ].map((comment, index) => (
                <li key={index} className="flex flex-col">
                  <h2 className="text-md font-bold text-[#ff5722] hover:text-[#8f2403] hover:cursor-pointer">
                    {truncateTitle(comment.comicTitle, 40)}
                  </h2>
                  <div className="flex items-start space-x-4 py-2 border-b-2 border-gray-600">
                    <img
                      src={comment.avatar}
                      alt={comment.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 mb-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white">
                          {comment.username}
                        </span>
                        <span className="text-sm text-gray-400">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {truncateTitle(comment.comment, 60)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
