import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/UserContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Novel } from "../../types/novel";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { updateUser } from "../../utils/userUtils";

const BACKGROUND_IMAGE_URL =
  "https://cdn.donmai.us/original/ac/1b/__carlotta_wuthering_waves_drawn_by_void_0__ac1b3250aa00455d3d89bb1a87536de0.jpg";

const ProfileHeader: React.FC = () => {
  const { user, setUser } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleAvatarChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("userId", user._id);

        try {
          const response = await axios.post(
            "https://novelvn-server.onrender.com/api/auth/upload-avatar",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          const updatedUser = { ...user, avatar: response.data.avatar };
          updateUser(updatedUser, setUser);
        } catch (error) {
          console.error("Error updating avatar:", error);
        }
      }
    },
    [user, setUser]
  );

  return (
    <div className="relative h-[300px] md:h-[450px] bg-[#2c2c2c]">
      <div
        className="absolute inset-0 w-full h-[200px] md:h-[350px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
          backgroundPosition: "center 25%",
        }}
      />
      <div className="absolute bottom-0 left-0 w-full">
        <div className="max-w-7xl mx-auto flex items-end p-6">
          <div className="w-32 md:w-40 h-auto aspect-[1/1] rounded-full overflow-hidden relative">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="ml-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {user?.username}
            </h1>
            <p className="text-lg text-gray-300">Unemployed Hooman</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfo: React.FC = () => {
  return (
    <div className="bg-[#2a2a2a] p-6 min-h-[400px] rounded-lg">
      <h2 className="text-xl font-bold text-white mb-3">About</h2>
      <p className="text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam.
      </p>
    </div>
  );
};

const ProfileInformation: React.FC = () => {
  const { user } = useAuth(); // Get the user object from useAuth

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold text-white mb-4">Profile Information</h2>

      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-gray-400 text-lg" />
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white font-medium">
              {user?.email || "Not provided"}
            </p>
          </div>
        </div>

        {/* Username */}
        <div className="flex items-center space-x-3">
          <FaUser className="text-gray-400 text-lg" />
          <div>
            <p className="text-gray-400 text-sm">Username</p>
            <p className="text-white font-medium">
              {user?.username || "Not provided"}
            </p>
          </div>
        </div>

        {/* Avatar (Placeholder for Password) */}
        <div className="flex items-center space-x-3">
          <FaLock className="text-gray-400 text-lg" />
          <div>
            <p className="text-gray-400 text-sm">Avatar</p>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover border border-gray-500"
              />
            ) : (
              <p className="text-white font-medium">No avatar available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Groups: React.FC = () => (
  <div className="h-full">
    <h2 className="text-xl font-bold text-white mb-3">Groups</h2>
    <p className="text-white">
      Here you can find all the groups you are part of.
    </p>
  </div>
);

const Novels: React.FC<{ comics: Novel[] }> = ({ comics }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {comics.slice(0, 6).map((comic) => (
          <div
            key={comic._id}
            className="flex p-2 items-start space-x-2 bg-[#2c2c2c] hover:bg-[#3a3a3a] transition duration-300"
          >
            {/* Left Side - Image */}
            <div className="w-28 h-auto flex-shrink-0">
              <img
                src={comic.image}
                alt={comic.title}
                className="w-full h-auto object-cover hover:cursor-pointer"
                onClick={() => navigate(`/comic/${comic._id}`)}
              />
            </div>

            {/* Right Side - Text Information */}
            <div className="flex-1 flex flex-col justify-between min-h-[150px] px-2">
              {/* Title (Fixed Height) */}
              <h2
                className="text-lg font-bold text-white hover:text-primary-500 hover:cursor-pointer line-clamp-2 min-h-[3rem]"
                onClick={() => navigate(`/comic/${comic._id}`)}
              >
                {comic.title}
              </h2>

              {/* Chapters (Anchored at the Bottom) */}
              <div className="mt-auto space-y-1">
                {[1, 2, 3].map((chapter) => (
                  <div
                    key={chapter}
                    className="flex justify-between items-center text-sm text-gray-400 hover:text-gray-300 hover:cursor-pointer transition"
                  >
                    <p>Chapter {chapter}</p>
                    <p className="text-gray-500">{chapter * 3} hours ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileTabs: React.FC<{ comics: Novel[] }> = ({ comics }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab") || "info";

  const handleTabChange = (tabName: string) => {
    navigate(`/profile?tab=${tabName}`);
  };

  return (
    <>
      <div className="relative flex space-x-0 mb-6 w-1/2">
        <div className="absolute inset-0 flex bg-[#2a2a2a]">
          <div
            className={`transition-all duration-300 ease-in-out bg-[#4f4f4f] rounded ${
              tab === "info"
                ? "w-1/3"
                : tab === "groups"
                ? "w-1/3 translate-x-full"
                : "w-1/3 translate-x-[200%]"
            }`}
          />
        </div>
        <button
          onClick={() => handleTabChange("info")}
          className={`relative z-10 flex-1 px-4 py-2 font-bold rounded ${
            tab === "info"
              ? "text-white"
              : "text-[#4e4e4e] hover:text-[#6f6f6f]"
          }`}
        >
          Info
        </button>
        <button
          onClick={() => handleTabChange("groups")}
          className={`relative z-10 flex-1 px-4 py-2 font-bold rounded ${
            tab === "groups"
              ? "text-white"
              : "text-[#4e4e4e] hover:text-[#6f6f6f]"
          }`}
        >
          Groups
        </button>
        <button
          onClick={() => handleTabChange("novels")}
          className={`relative z-10 flex-1 px-4 py-2 font-bold rounded ${
            tab === "novels"
              ? "text-white"
              : "text-[#4e4e4e] hover:text-[#6f6f6f]"
          }`}
        >
          Novels
        </button>
      </div>

      <div>
        {tab === "info" && <ProfileInformation />}
        {tab === "groups" && <Groups />}
        {tab === "novels" && <Novels comics={comics} />}
      </div>
    </>
  );
};

const ProfilePage: React.FC = () => {
  const [comics, setComics] = useState<Novel[]>([]);

  useEffect(() => {
    axios
      .get("https://novelvn-server.onrender.com/api/novels")
      .then((res) => setComics(res.data));
  }, []);

  return (
    <div className="min-h-screen mx-auto bg-[#1f1f1f] py-12">
      <ProfileHeader />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProfileInfo />
          </div>
          <div className="md:col-span-3">
            <ProfileTabs comics={comics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
