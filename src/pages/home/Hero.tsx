import { BookOpen, Key } from "lucide-react";

import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Internal API Explorer
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Discover, test, and integrate with our internal API services
          </p>
          <div className="mt-10 flex justify-center space-x-4 hover:text-white">
            <Link
              to="/api-viewer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 hover:text-white focus:ring-offset-2 focus:ring-indigo-500"
            >
              <BookOpen className="h-5 w-5 mr-2 group-hover:text-white" />
              Explore APIs
            </Link>
            <Link
              to="/request-key"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Key className="h-5 w-5 mr-2" />
              Get API Key
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
