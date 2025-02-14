import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Comic } from "../types";

const ComicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [comic, setComic] = useState<Comic | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comics/${id}`)
      .then((res) => setComic(res.data));

    const timer = setTimeout(() => {
      axios.post(`http://localhost:5000/comics/${id}/view`);
    }, 60000); // 1-minute delay

    return () => clearTimeout(timer);
  }, [id]);

  if (!comic) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{comic.title}</h1>
      <img
        src={comic.image}
        alt={comic.title}
        className="block mx-auto"
        style={{
          width: "283px",
          height: "403px",
          objectFit: "cover",
          backgroundColor: "#fff",
        }}
      />
      <p>{comic.description}</p>
      <p className="text-gray-600">Views: {comic.viewCount}</p>
    </div>
  );
};

export default ComicDetail;
