/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PrettierJSONView from "./PrettierJsonView";
import { BookOpen, Code, Info, Search } from "lucide-react";
import { Endpoint } from ".";

interface ViewerProps {
  selectedService: any;
  setActiveTab: (active: string) => void;
  activeTab: string;
  filteredEndpoints: Endpoint[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Viewer: React.FC<ViewerProps> = ({
  selectedService,
  setActiveTab,
  activeTab,
  filteredEndpoints,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="min-h-screen py-5 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="bg-white border-b border-gray-200 my-5">
          <div className="py-4 px-6">
            <div className="flex items-center justify-between py">
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-md p-2 mr-4">
                  <Code className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {selectedService?.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {selectedService?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {selectedService?.category}
                </span>
                <span className="text-xs text-gray-500">
                  Version: {selectedService?.version}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-6">
            {[
              { name: "Overview", key: "overview", icon: BookOpen },
              { name: "Endpoints", key: "endpoints", icon: Code },
              { name: "JSON Viewer", key: "json-viewer", icon: Info },
            ].map((tab) => (
              <div
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group flex items-center cursor-pointer pb-4 text-sm font-medium transition-all duration-300 relative ${
                  activeTab === tab.key
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <tab.icon
                  className={`h-4 w-4 mr-2 ${
                    activeTab === tab.key
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {tab.name}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Tab Content Remains the Same */}
          <div className="max-w-4xl pb-4 mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            {/* Tab Content */}
            <div className="bg-white  rounded-lg overflow-hidden">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">API Overview</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">
                        {selectedService?.description}
                      </p>
                      <div className="mt-4">
                        <span className="font-medium">Base URL:</span>{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {selectedService?.baseUrl}
                        </code>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Quick Stats</h3>
                      <ul className="space-y-2">
                        <li>
                          <span className="font-medium">Total Endpoints:</span>{" "}
                          {selectedService?.endpoints.length}
                        </li>
                        <li>
                          <span className="font-medium">Category:</span>{" "}
                          {selectedService?.category}
                        </li>
                        <li>
                          <span className="font-medium">Version:</span>{" "}
                          {selectedService?.version}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Endpoints Tab */}
              {activeTab === "endpoints" && (
                <div className="p-6">
                  {/* Search Input */}
                  <div className="mb-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search endpoints..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Endpoints List */}
                  <div className="space-y-4">
                    {filteredEndpoints.map((_endpoint, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-5">
                        {/* Existing endpoint content */}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* JSON Viewer Tab */}
              {activeTab === "json-viewer" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Full API Service JSON
                  </h2>
                  <div className="border rounded-lg overflow-auto max-h-[500px] bg-gray-50 p-4">
                    <PrettierJSONView data={selectedService || {}} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
