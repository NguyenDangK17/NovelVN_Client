import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/UserContext";
import { Manga } from "@/types/manga";
import axios from "axios";
import Loading from "../Loading";

export default function MangaList() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMangas = async () => {
      if (!user?.token) return;
      try {
        const response = await axios.get(
          "https://novelvn-server.onrender.com/api/mangas/work",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setMangaList(response.data);
      } catch (error) {
        console.error("Failed to fetch mangas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, [user?.token]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this manga?")) return;

    try {
      await axios.delete(`https://novelvn-server.onrender.com/api/mangas/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setMangaList((prev) => prev.filter((manga) => manga._id !== id));
    } catch (error) {
      console.error("Failed to delete manga:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Manga Management</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition"
        onClick={() => navigate("/action/manga/create")}
      >
        + Add New Manga
      </button>

      <div className="bg-[#2a2a2a] shadow-md rounded-lg w-full max-w-6xl p-4">
        <table className="w-full border-collapse border-y border-gray-500">
          <thead>
            <tr className="bg-[#2a2a2a] text-white font-bold border-y border-gray-500">
              <th className="p-2">Cover</th>
              <th className="p-2">Title</th>
              <th className="p-2">Status</th>
              <th className="p-2">Uploaded By</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mangaList.map((manga) => (
              <tr
                key={manga._id}
                className="text-white text-center hover:bg-gray-700"
              >
                <td className="border-y border-gray-500 p-2">
                  <img
                    src={manga.manga_cover}
                    alt={manga.title}
                    className="w-20 h-auto object-cover mx-auto"
                  />
                </td>
                <td className="border-y border-gray-500 p-2 font-semibold">
                  {manga.title}
                </td>
                <td className="border-y border-gray-500 p-2">{manga.status}</td>
                <td className="border-y border-gray-500 p-2">{manga.author}</td>
                <td className="border-y border-gray-500 p-2 space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => navigate(`/action/manga/${manga._id}/edit`)}
                  >
                    <FaEdit className="w-5 h-5 inline" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(manga._id)}
                  >
                    <FaTrash className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
