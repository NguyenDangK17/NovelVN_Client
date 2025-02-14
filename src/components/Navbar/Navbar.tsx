import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
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

  return (
    <nav
      className={`fixed w-full transition-transform duration-300 z-[1000] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* First Row */}
      <div className="bg-[#2c2c2c] border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://mangadex.org/img/brand/mangadex-logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              NovelVN
            </span>
          </a>

          <div className="flex items-center md:order-2 space-x-3">
            {/* Mobile Search Button */}
            <button
              type="button"
              className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff5722] rounded-lg text-sm p-2.5 me-1"
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
            <div className="relative hidden md:block w-[300px]">
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

            {/* User Dropdown */}
            <button
              type="button"
              className="flex text-sm bg-white rounded-full md:me-0 focus:ring-2 focus:ring-[#ff5722]"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg"
                alt="user photo"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-16 right-10 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">
                    Bonnie Green
                  </span>
                  <span className="block text-sm text-gray-500 truncate">
                    name@flowbite.com
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={`relative md:hidden w-full transition-all duration-300 ease-in-out ${
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
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#ff5722] focus:border-[#ff5722]"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="bg-[#3c3c3c] border-gray-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 lg:p-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navbar Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#3c3c3c] gap-4">
              <li>
                <a
                  href="/"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/novel"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/novel"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  Novel
                </a>
              </li>
              <li>
                <a
                  href="/manga"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/manga"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  Manga
                </a>
              </li>
              <li>
                <a
                  href="/filter"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/filter"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  Filter
                </a>
              </li>
              <li>
                <a
                  href="/forums"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/forums"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  Forums
                </a>
              </li>
              <li>
                <a
                  href="/ranking"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/ranking"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  Ranking
                </a>
              </li>
              <li>
                <a
                  href="/bookmark"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/bookmark"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  Bookmark
                </a>
              </li>
              <li>
                <a
                  href="/history"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/history"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  History
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className={`block py-2 px-3 rounded-sm md:p-0 hover:cursor-pointer ${
                    location.pathname === "/about"
                      ? "text-[#ff5722]"
                      : "text-white hover:text-[#ff5722]"
                  }`}
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
