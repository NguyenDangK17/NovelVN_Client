import { useEffect, useState, Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import axios from "axios";
import Loading from "../Loading";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";

export default function EditManga() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [manga, setManga] = useState<any>(null);
  const [volumes, setVolumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return;

      try {
        const [mangaRes, volumesRes] = await Promise.all([
          axios.get(`https://novelvn-server.onrender.com/api/mangas/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          axios.get(`https://novelvn-server.onrender.com/api/volumes/${id}/get-volumes`),
        ]);

        setManga(mangaRes.data);
        setVolumes(volumesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user?.token]);

  if (loading) return <Loading />;
  if (!manga)
    return <p className="text-red-500 text-center">Manga not found.</p>;

  const currentTab = searchParams.get("action") || "editseries";

  return (
    <div className="flex min-h-screen">
      <Sidebar
        manga={manga}
        volumes={volumes}
        setSearchParams={setSearchParams}
      />
      <main className="flex-1 bg-gray-800 p-6 text-white">
        {currentTab === "editseries" && <EditSeries manga={manga} />}
        {currentTab === "editvolume" && <EditVolume volumes={volumes} />}
        {currentTab === "editchapter" && <EditChapter manga={manga} />}
        {currentTab === "addvolume" && <AddVolume manga={manga} />}
        {currentTab === "addchapter" && <AddChapter manga={manga} />}
      </main>
    </div>
  );
}

// Sidebar Component
function Sidebar({ manga, volumes, setSearchParams }: any) {
  const [showVolumes, setShowVolumes] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Edit Manga</h2>

      {/* Manga Section */}
      <DropdownItem
        title={manga.title}
        toggle={() => setShowVolumes((prev) => !prev)}
        menuItems={[
          {
            label: "Edit Series",
            onClick: () => setSearchParams({ action: "editseries" }),
          },
          {
            label: "Add Volume",
            onClick: () => setSearchParams({ action: "addvolume" }),
          },
        ]}
      />

      {/* Volume List */}
      {showVolumes &&
        volumes.map((volume: any) => (
          <VolumeItem
            key={volume._id}
            volume={volume}
            setSearchParams={setSearchParams}
          />
        ))}
    </aside>
  );
}

// Volume Item
function VolumeItem({ volume, setSearchParams }: any) {
  const [showChapters, setShowChapters] = useState(false);

  return (
    <div className="ml-4 mt-2">
      <DropdownItem
        title={volume.volume_title}
        toggle={() => setShowChapters((prev) => !prev)}
        menuItems={[
          {
            label: "Edit Volume",
            onClick: () =>
              setSearchParams({ action: "editvolume", volumeId: volume._id }),
          },
          {
            label: "Add Chapter",
            onClick: () =>
              setSearchParams({ action: "addchapter", volumeId: volume._id }),
          },
        ]}
      />

      {/* Chapter List */}
      {showChapters &&
        volume.chapters?.map((chapter: any) => (
          <MenuItem
            key={chapter._id}
            label={`Chapter ${chapter.chapter_number}`}
            onClick={() =>
              setSearchParams({ action: "editchapter", chapterId: chapter._id })
            }
          />
        ))}
    </div>
  );
}

// Dropdown Item Component (Prevents Click Propagation)
function DropdownItem({ title, toggle, menuItems }: any) {
  return (
    <div
      className="flex items-center justify-between bg-gray-800 p-2 rounded-md cursor-pointer"
      onClick={toggle}
    >
      <span>{title}</span>
      <DropdownButton menuItems={menuItems} />
    </div>
  );
}

// Dropdown Button Component (Prevents Click Propagation)
function DropdownButton({ menuItems }: any) {
  return (
    <Menu as="div" className="relative" onClick={(e) => e.stopPropagation()}>
      <MenuButton className="p-2 rounded-md hover:bg-gray-600">
        <HiDotsVertical className="text-white" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-40 bg-gray-900 rounded-md shadow-lg z-50">
          <div className="p-2">
            {menuItems.map((item: any, index: number) => (
              <MenuItem key={index} label={item.label} onClick={item.onClick} />
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

// Menu Item Component
function MenuItem({ label, onClick }: any) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`w-full text-left p-2 rounded-md ${
            active ? "bg-blue-600" : "hover:bg-gray-700"
          }`}
        >
          {label}
        </button>
      )}
    </Menu.Item>
  );
}

function EditSeries({ manga }: any) {
  return <div>Edit Series for {manga.title}</div>;
}
function AddVolume({ manga }: { manga: any }) {
  const { user } = useAuth();
  const [volumeTitle, setVolumeTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddVolume = async () => {
    if (!volumeTitle.trim()) {
      alert("Please enter a volume title.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `https://novelvn-server.onrender.com/api/volumes/${manga._id}/create-volume`,
        { volume_title: volumeTitle }, // Updated to match backend
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      alert("Volume added successfully!");

      setVolumeTitle(""); // Reset input field
    } catch (error) {
      console.error("Failed to add volume:", error);
      alert("Failed to add volume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Volume</h2>
      <input
        className="w-full border p-2 rounded-md mb-3"
        value={volumeTitle}
        onChange={(e) => setVolumeTitle(e.target.value)}
        placeholder="Volume Title"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={handleAddVolume}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Volume"}
      </button>
    </div>
  );
}

function EditVolume({ volumes }: { volumes: any[] }) {
  const { user } = useAuth();
  const searchParams = new URLSearchParams(window.location.search);
  const volumeId = searchParams.get("volumeId");

  // Find the correct volume from the array
  const volume = volumes.find((v) => v._id === volumeId);

  // State for form inputs
  const [volumeTitle, setVolumeTitle] = useState(volume?.volume_title || "");
  const [volumeCover, setVolumeCover] = useState(volume?.volume_cover || "");
  const [loading, setLoading] = useState(false);

  // Update input values when volume data changes
  useEffect(() => {
    if (volume) {
      setVolumeTitle(volume.volume_title);
      setVolumeCover(volume.volume_cover);
    }
  }, [volume]);

  const handleUpdateVolume = async () => {
    if (!volumeId) {
      alert("No volume selected.");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `https://novelvn-server.onrender.com/api/volumes/${volumeId}`,
        { volume_title: volumeTitle, volume_cover: volumeCover },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      alert("Volume updated successfully!");
    } catch (error) {
      console.error("Failed to update volume:", error);
      alert("Failed to update volume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!volume) return <p className="text-red-500">Volume not found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Volume</h2>
      <input
        className="w-full border p-2 rounded-md mb-3"
        value={volumeTitle}
        onChange={(e) => setVolumeTitle(e.target.value)}
        placeholder="Volume Title"
      />
      <input
        className="w-full border p-2 rounded-md mb-3"
        value={volumeCover}
        onChange={(e) => setVolumeCover(e.target.value)}
        placeholder="Volume Cover URL"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleUpdateVolume}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

function EditChapter({ manga }: any) {
  return <div>Edit Chapter</div>;
}
function AddChapter({ manga }: any) {
  return <div>Add Chapter</div>;
}
