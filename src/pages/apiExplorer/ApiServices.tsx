import { Code, ExternalLink } from "lucide-react";
import { apiServices } from "../../data/home";
import { Link } from "react-router";

const ApiServices = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Available API Services
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apiServices.map((service) => (
          <div
            key={service.id}
            className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <Code className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {service.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                    {service.category}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                {service.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {service.endpoints} endpoints
                </span>
                <Link
                  to={`/api-viewer/${service.id}`}
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View details
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiServices;
