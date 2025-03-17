import { useState } from "react";
import { Code } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/api-viewer", label: "API Viewer" },
    { path: "/request-key", label: "Request API Key" },
    { path: "/view-key", label: "View API Key" },
  ];

  return (
    <>
      {/* Sticky Navbar with z-index to ensure it's above other content */}
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link className="flex-shrink-0 flex items-center" to={"/"}>
                <Code className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  API Explorer
                </span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                                            inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                                            transition-all duration-300
                                            ${
                                              isActive(item.path)
                                                ? "border-indigo-500 text-gray-900"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                            }
                                        `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <button
                  className="
                                        bg-indigo-600 text-white 
                                        px-4 py-2 rounded-md 
                                        text-sm font-medium 
                                        hover:bg-indigo-700 
                                        focus:outline-none 
                                        focus:ring-2 
                                        focus:ring-offset-2 
                                        focus:ring-indigo-500
                                        transition-all duration-300
                                    "
                >
                  Documentation
                </button>
              </div>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="
                                    inline-flex items-center justify-center 
                                    p-2 rounded-md text-gray-400 
                                    hover:text-gray-500 hover:bg-gray-100 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-inset focus:ring-indigo-500
                                "
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
                className={`
                                    block pl-3 pr-4 py-2 border-l-4 text-base font-medium
                                    transition-all duration-300
                                    ${
                                      isActive(item.path)
                                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                                    }
                                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
