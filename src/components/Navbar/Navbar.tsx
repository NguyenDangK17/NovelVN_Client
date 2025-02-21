import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      setIsTop(window.scrollY === 0);
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const isProfilePage = location.pathname === "/profile";

  return (
    <nav
      className={`fixed w-full transition-all duration-300 ease-in-out z-[1000] ${
        isTop && !isProfilePage
          ? "bg-transparent border-b-2 border-transparent"
          : "bg-[#1f1f1f] border-b-2 border-primary-500"
      }`}
    >
      <div className="border-gray-200">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-2 lg:px-10 px-2">
          <div className="flex items-center space-x-3">
            {/* Menu Button */}
            <button
              type="button"
              className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-sm p-2.5"
              onClick={() => {
                setMenuOpen(!isMenuOpen);
                setDropdownOpen(false);
              }}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6h14M3 10h14M3 14h14"
                />
              </svg>
              <span className="sr-only">Menu</span>
            </button>

            <a href="/" className="flex items-center justify-center space-x-3">
              <img
                src="https://mangadex.org/img/brand/mangadex-logo.svg"
                className="h-8"
                alt="NovelVN Logo"
              />
              <span className="self-center text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap text-white hidden sm:block">
                NovelVN
              </span>
            </a>
          </div>

          <div className="flex items-center lg:order-2 space-x-3">
            {/* Mobile Search Button */}
            <button
              type="button"
              className="lg:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-sm p-2.5 me-1"
              onClick={() => setSearchOpen(!isSearchOpen)}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>

            {/* Desktop Search */}
            <div className="relative hidden lg:block w-[250px]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search..."
              />
            </div>

            {user ? (
              <>
                <MenuRoot>
                  <MenuTrigger>
                    <button
                      type="button"
                      className="flex text-sm rounded-full lg:me-0 focus:ring-2 focus:ring-primary-500"
                      id="user-menu-button"
                      aria-expanded={isDropdownOpen}
                      onClick={() => {
                        setDropdownOpen(!isDropdownOpen);
                        setMenuOpen(false);
                      }}
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.avatar}
                        alt="user photo"
                      />
                    </button>
                  </MenuTrigger>
                  <MenuContent className="text-base list-none bg-white">
                    <div className="p-2">
                      <span className="block text-sm text-gray-900">
                        {user.username}
                      </span>
                      <span className="block text-sm text-gray-500 truncate">
                        {user.email}
                      </span>
                    </div>
                    <ul className="py-2">
                      <MenuItem
                        value="Profile"
                        className="hover:bg-gray-300 hover:cursor-pointer"
                      >
                        <a href="/profile" className="text-sm text-gray-700">
                          Profile
                        </a>
                      </MenuItem>
                      <MenuItem
                        value="Settings"
                        className="hover:bg-gray-300 hover:cursor-pointer"
                      >
                        <a href="#" className="text-sm text-gray-700">
                          Settings
                        </a>
                      </MenuItem>
                      <MenuItem
                        value="Earnings"
                        className="hover:bg-gray-300 hover:cursor-pointer"
                      >
                        <a href="#" className="text-sm text-gray-700">
                          Earnings
                        </a>
                      </MenuItem>
                      <MenuItem
                        value="Sign out"
                        className="hover:bg-gray-300 hover:cursor-pointer"
                      >
                        <a
                          href="/"
                          className="text-sm text-red-500"
                          onClick={handleLogout}
                        >
                          Sign out
                        </a>
                      </MenuItem>
                    </ul>
                  </MenuContent>
                </MenuRoot>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-sm text-white font-semibold hover:text-primary-500 p-2.5"
                >
                  Login
                </a>
              </>
            )}
          </div>

          {/* Navbar Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-semibold text-md p-4 lg:p-0 mt-4 bg-[#1f1f1f] xl:space-x-8 lg:space-x-4 lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent gap-4">
              <li>
                <a
                  href="/"
                  className={`block py-2 px-3 rounded-sm lg:p-0 hover:cursor-pointer ${
                    location.pathname === "/"
                      ? "text-primary-500"
                      : "text-white hover:text-primary-500"
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/browse"
                  className={`block py-2 px-3 rounded-sm lg:p-0 hover:cursor-pointer ${
                    location.pathname === "/browse"
                      ? "text-primary-500"
                      : "text-white hover:text-primary-500"
                  }`}
                >
                  Browse
                </a>
              </li>
              <li>
                <a
                  href="/forums"
                  className={`block py-2 px-3 rounded-sm lg:p-0 hover:cursor-pointer ${
                    location.pathname === "/forums"
                      ? "text-primary-500"
                      : "text-white hover:text-primary-500"
                  }`}
                >
                  Forums
                </a>
              </li>
              <li>
                <a
                  href="/ranking"
                  className={`block py-2 px-3 rounded-sm lg:p-0 hover:cursor-pointer ${
                    location.pathname === "/ranking"
                      ? "text-primary-500"
                      : "text-white hover:text-primary-500"
                  }`}
                >
                  Ranking
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className={`block py-2 px-3 rounded-sm lg:p-0 hover:cursor-pointer ${
                    location.pathname === "/about"
                      ? "text-primary-500"
                      : "text-white hover:text-primary-500"
                  }`}
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={`relative lg:hidden w-full transition-all duration-300 ease-in-out ${
            isSearchOpen ? "max-h-screen opacity-100 p-4" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
