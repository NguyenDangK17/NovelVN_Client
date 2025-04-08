import React, { useEffect, useRef, useState } from "react";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaBackward,
  FaExclamationCircle,
  FaForward,
  FaHome,
  FaInfo,
} from "react-icons/fa";
import CommentSection from "../../components/Comment/CommentSection";

interface ChapterData {
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
  };
}

const MangaChapterPage: React.FC = () => {
  const { id } = useParams();
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loadedImages, setLoadedImages] = useState(5);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(
    null
  );
  const [showNav, setShowNav] = useState(false);
  const chaptersRef = useRef<string[]>([]);

  // Fetch all chapters
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          "https://api.mangadex.org/manga/0a4bdf95-dc11-4011-937e-7bdc4dd6e786/aggregate?translatedLanguage[]=vi"
        );

        chaptersRef.current = Object.values(response.data.volumes)
          .flatMap((volume: any) => Object.values(volume.chapters))
          .map((chapter: any) => chapter.id);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  // Fetch manga chapter data
  useEffect(() => {
    if (!id) return;

    const fetchChapter = async () => {
      try {
        const response = await fetch(
          `https://api.mangadex.org/at-home/server/${id}`
        );
        const data = await response.json();
        setChapterData(data);

        // Use chaptersRef instead of state
        const index = chaptersRef.current.indexOf(id);
        setCurrentChapterIndex(index);
      } catch (error) {
        console.error("Error fetching chapter:", error);
      }
    };

    fetchChapter();
  }, [id]);

  // Scroll-based lazy loading
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setLoadedImages((prev) =>
            chapterData
              ? Math.min(prev + 5, chapterData.chapter.data.length)
              : prev
          );
          setShowNav(false);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapterData]);

  if (!chapterData) return <Loading />;

  const { baseUrl, chapter } = chapterData;
  const imageFiles = chapter.data;

  const goToNextChapter = () => {
    if (
      currentChapterIndex !== null &&
      currentChapterIndex < chaptersRef.current.length - 1
    ) {
      window.location.href = `/chapter/${
        chaptersRef.current[currentChapterIndex + 1]
      }`;
    }
  };

  const goToPreviousChapter = () => {
    if (currentChapterIndex !== null && currentChapterIndex > 0) {
      window.location.href = `/chapter/${
        chaptersRef.current[currentChapterIndex - 1]
      }`;
    }
  };

  const handleUserClick = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <div
      className="max-w-4xl mx-auto px-8 py-12 relative text-center"
      onClick={handleUserClick}
    >
      <h1 className="text-3xl font-bold mb-2">The Journey Begins</h1>
      <h3 className="text-xl text-gray-600 mb-8">Chapter 1: The Awakening</h3>
      <div className="hidden lg:flex fixed right-5 bottom-12 flex-col z-50 p-2">
        <button
          onClick={goToPreviousChapter}
          disabled={currentChapterIndex === 0}
          className={`p-4 shadow-lg bg-gray-700 text-white transition border border-white ${
            currentChapterIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          <FaBackward size={20} />
        </button>

        <button
          onClick={() => console.log("Go Home")}
          disabled={currentChapterIndex === 0}
          className={`p-4 shadow-lg bg-gray-700 text-white transition border border-white ${
            currentChapterIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          <FaHome size={20} />
        </button>

        <button
          onClick={() => console.log("Report Chapter")}
          disabled={currentChapterIndex === 0}
          className={`p-4 shadow-lg bg-gray-700 text-white transition border border-white ${
            currentChapterIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          <FaExclamationCircle size={20} />
        </button>

        <button
          onClick={() => console.log("Sidebar List Chapter")}
          disabled={currentChapterIndex === chaptersRef.current.length - 1}
          className={`p-4 shadow-lg bg-gray-700 text-white transition border border-white ${
            currentChapterIndex === chaptersRef.current.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          <FaInfo size={20} />
        </button>

        <button
          onClick={goToNextChapter}
          disabled={currentChapterIndex === chaptersRef.current.length - 1}
          className={`p-4 shadow-lg bg-gray-700 text-white transition border border-white ${
            currentChapterIndex === chaptersRef.current.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          <FaForward size={20} />
        </button>
      </div>

      {/* Bottom Navigation Bar (Visible on sm and smaller) */}
      <div
        className={`fixed bottom-0 left-0 w-full flex justify-between items-center p-4 bg-black text-white transition-transform duration-300 lg:hidden ${
          showNav ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Previous Chapter Button */}
        <button
          onClick={goToPreviousChapter}
          disabled={currentChapterIndex === 0}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg shadow-lg transition ${
            currentChapterIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-800"
          }`}
        >
          <FaBackward size={20} />
          <span>Previous</span>
        </button>

        {/* Next Chapter Button */}
        <button
          onClick={goToNextChapter}
          disabled={currentChapterIndex === chaptersRef.current.length - 1}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg shadow-lg transition ${
            currentChapterIndex === chaptersRef.current.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-800"
          }`}
        >
          <span>Next</span>
          <FaForward size={20} />
        </button>
      </div>

      {/* Manga Pages */}
      {imageFiles.slice(0, loadedImages).map((filename, index) => (
        <img
          key={index}
          src={`${baseUrl}/data/${chapter.hash}/${filename}`}
          alt={`Page ${index + 1}`}
          className="w-full my-2"
          loading="lazy"
        />
      ))}

      <CommentSection />
    </div>
  );
};

export default MangaChapterPage;
