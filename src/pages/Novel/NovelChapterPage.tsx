import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Novel } from "../../types";
import CommentSection from "../../components/Comment/CommentSection";

const NovelChapterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [novel, setNovel] = React.useState<Novel | null>(null);

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

  if (!novel) return <div>Loading...</div>;

  const formattedContent = novel.content
    .replace(/\n{2,}/g, "\n")
    .replace(/\n/g, "<br/><br/>");

  return (
    <div className="bg-[#1a1a1a] flex flex-col items-center text-center p-10 mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">The Journey Begins</h1>
      <h3 className="text-xl text-gray-600 mb-8">Chapter 1: The Awakening</h3>

      {/* Novel Content */}
      <div
        className="text-justify text-base leading-relaxed max-w-6xl"
        style={{ wordBreak: "break-word" }}
      >
        <div
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-12">
        <button className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Previous
        </button>
        <button
          className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => window.location.replace(`/comic/${id}`)}
        >
          Home
        </button>
        <button className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Next
        </button>
      </div>

      <CommentSection />
    </div>
  );
};

export default NovelChapterPage;
