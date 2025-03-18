import { BookOpen, Key } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-gray-50 min-h-[90vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Internal API Explorer
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-base text-gray-600">
            Discover, test, and integrate with our internal API services
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/api-explorer"
              style={{ color: "white" }}
              className="group inline-flex items-center px-6 py-2.5 border border-transparent 
              text-sm font-medium rounded-md 
              bg-indigo-600 text-white 
              hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
              transition-all duration-300 ease-in-out"
            >
              <BookOpen className="h-5 w-5 mr-2 text-white group-hover:text-white" />
              Explore APIs
            </Link>
            <Link
              to="/request-key"
              className="group inline-flex items-center px-6 py-2.5 border border-gray-200
              text-sm font-medium rounded-md 
              bg-white text-gray-700
               hover:text-white
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group-hover:bg-gray-50
              transition-all duration-300 ease-in-out"
            >
              <Key className="h-5 w-5 mr-2 text-gray-700 " />
              Get API Key
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
