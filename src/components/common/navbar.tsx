import { useState, useEffect } from "react";
import { Code } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style when scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/api-explorer", label: "API Explorer" },
    { path: "/request-key", label: "Request API Key" },
    { path: "/view-key", label: "View API Key" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-gray-50/80 backdrop-blur-sm"
        }`}
      >
        <div
          className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled ? "max-w-7xl" : "max-w-5xl"
          }`}
        >
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? "h-14" : "h-16 sm:h-20"
            }`}
          >
            <div className="flex items-center">
              <Link
                className="flex-shrink-0 flex items-center gap-2 group"
                to={"/"}
              >
                <Code
                  className={`w-7 h-7 transition-colors duration-300 ${
                    isScrolled
                      ? "text-indigo-600"
                      : "text-indigo-600 group-hover:text-indigo-700"
                  }`}
                />
                <span
                  className={`text-lg font-bold transition-colors duration-300 ${
                    isScrolled ? "text-gray-900" : "text-gray-900"
                  }`}
                >
                  API Explorer
                </span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                className={`w-28 h-8 flex items-center justify-center rounded-full transition-all duration-300 group ${
                  isScrolled
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "bg-indigo-600/20 hover:bg-indigo-600/30"
                }`}
              >
                <span
                  className={`text-xs font-medium ${
                    isScrolled
                      ? "text-white"
                      : "text-white group-hover:text-white"
                  }`}
                >
                  Documentation
                </span>
              </button>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "h-14" : "h-16 sm:h-20"
        }`}
      ></div>
    </>
  );
};

export default Navbar;
