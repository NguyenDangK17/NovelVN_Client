import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import axios from "axios";

export default function CreateManga() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !cover || !author) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://novelvn-server.onrender.com/api/mangas",
        { title, manga_cover: cover, author, description: "Nothing" },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create manga:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Create New Manga</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#2a2a2a] p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <input
          className="w-full border p-2 rounded-md mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded-md mb-3"
          placeholder="Cover URL"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded-md mb-3"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
