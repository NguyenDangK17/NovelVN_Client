import { Novel } from "../../types/novel";
import { Link } from "react-router-dom";

interface NovelListProps {
  title: string;
  novels: Novel[];
}

const NovelList = ({ title, novels }: NovelListProps) => {
  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length <= maxLength) return title;
    const truncated = title.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

  return (
    <div className="col-span-12 lg:col-span-9 px-4">
      <div className="flex justify-between items-center mb-6 py-4">
        <h1 className="text-3xl font-bold text-left">{title}</h1>
        <Link
          to="/novels"
          className="text-lg text-primary-500 hover:text-primary-700 cursor-pointer"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {novels.slice(0, 5).map((novel) => (
          <div key={novel._id} className="flex flex-col">
            <div className="group">
              <Link to={`/novel/${novel._id}`}>
                <img
                  src={novel.image}
                  alt={novel.title}
                  className="w-full h-auto aspect-[1443/2048] object-cover hover:cursor-pointer"
                />
                <h2 className="text-lg font-bold my-2 min-h-[3rem] line-clamp-2 overflow-hidden group-hover:text-primary-500">
                  {truncateTitle(novel.title, 40)}
                </h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NovelList;
