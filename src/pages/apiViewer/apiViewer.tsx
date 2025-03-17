import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { 
  BookOpen, Key, Code, ExternalLink, Search, 
  Copy, Play, Info, ChevronDown, Filter, Loader, AlertTriangle
} from 'lucide-react';
import AppLayout from '../../components/layouts/AppLayout';

// Custom JSON Formatter Component
const PrettierJSONView = ({ data }: { data: any }) => {
  const formatJSON = (obj: any, indent: number = 2): string => {
    // Handle primitive types
    if (obj === null) return 'null';
    if (typeof obj === 'string') return `"${obj}"`;
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);

    // Handle arrays and objects
    const spaces = ' '.repeat(indent);
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      
      const formattedItems = obj.map(item => 
        `${spaces}${formatJSON(item, indent + 2)}`
      );
      
      return `[\n${formattedItems.join(',\n')}\n${' '.repeat(indent - 2)}]`;
    }

    // Object handling
    if (typeof obj === 'object') {
      if (Object.keys(obj).length === 0) return '{}';
      
      const formattedEntries = Object.entries(obj).map(([key, value]) => 
        `${spaces}"${key}": ${formatJSON(value, indent + 2)}`
      );
      
      return `{\n${formattedEntries.join(',\n')}\n${' '.repeat(indent - 2)}}`;
    }

    return String(obj);
  };

  return (
    <pre 
      className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm font-mono" 
      style={{ 
        whiteSpace: 'pre-wrap', 
        wordBreak: 'break-word' 
      }}
    >
      {formatJSON(data)}
    </pre>
  );
};

// Define interfaces
interface APIService {
  id: number;
  name: string;
  description: string;
  version: string;
  baseUrl: string;
  category: string;
  endpoints: Endpoint[];
}

interface Endpoint {
  method: string;
  path: string;
  name: string;
  description: string;
  authentication: string;
  requestBody?: any;
  responses?: any;
}

const APIViewerPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const { serviceId } = useParams();

  // State for API data fetching
  const [apiServices, setApiServices] = useState<APIService[]>([]);
  const [selectedService, setSelectedService] = useState<APIService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch local data
  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        setIsLoading(true);
        
        // Use fetch for local JSON file
        const response = await fetch('/jsons/dummydata.json');
        
        if (!response.ok) {
          throw new Error('Failed to load local API data');
        }

        const data = await response.json();
        const apiServicesData = data.apiServices;
        
        setApiServices(apiServicesData);
        
        // Select service based on serviceId or first service
        const selectedServiceId = parseInt(serviceId || '1');
        const service = apiServicesData.find((s: APIService) => s.id === selectedServiceId);
        
        setSelectedService(service);
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    // Trigger the fetch
    fetchLocalData();
  }, [serviceId]);

  // Filter endpoints based on search term
  const filteredEndpoints = selectedService?.endpoints.filter(endpoint => 
    endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Loading Component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="flex items-center space-x-2">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="text-gray-600">Loading API Services...</span>
      </div>
    </div>
  );

  // Error Component
  const ErrorDisplay = () => (
    <div className="flex justify-center items-center h-64 bg-red-50">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-800 mb-2">Failed to Load API Services</h2>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    </div>
  );

  // If loading or error, return respective components
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  return (
    <AppLayout>
        <div className="min-h-screen bg-gray-50">

      {/* API Service Details Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-md p-3 mr-4">
                <Code className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedService?.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {selectedService?.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {selectedService?.category}
              </span>
              <span className="text-sm text-gray-500">
                Version: {selectedService?.version}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Viewer Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { name: 'Overview', key: 'overview' },
              { name: 'Endpoints', key: 'endpoints' },
              { name: 'JSON Viewer', key: 'json-viewer' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  py-4 px-1 text-sm font-medium 
                  ${activeTab === tab.key 
                    ? 'border-indigo-500 text-indigo-600 border-b-2' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2'}
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">API Overview</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">{selectedService?.description}</p>
                <div className="mt-4">
                  <span className="font-medium">Base URL:</span>{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {selectedService?.baseUrl}
                  </code>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quick Stats</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">Total Endpoints:</span>{' '}
                    {selectedService?.endpoints.length}
                  </li>
                  <li>
                    <span className="font-medium">Category:</span>{' '}
                    {selectedService?.category}
                  </li>
                  <li>
                    <span className="font-medium">Version:</span>{' '}
                    {selectedService?.version}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <div>
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
              {filteredEndpoints.map((endpoint, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <span className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' 
                        : endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'}
                      `}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm text-gray-600">{endpoint.path}</code>
                    </div>
                    <span className="text-sm text-gray-500">
                      {endpoint.authentication}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{endpoint.description}</p>
                  
                  {/* Request Body */}
                  {endpoint.requestBody && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Request Body</h4>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <PrettierJSONView data={endpoint.requestBody} />
                      </div>
                    </div>
                  )}
                  
                  {/* Responses */}
                  {endpoint.responses && (
                    <div>
                      <h4 className="font-semibold mb-2">Responses</h4>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <PrettierJSONView data={endpoint.responses} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JSON Viewer Tab */}
        {activeTab === 'json-viewer' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                Full API Service JSON
              </h2>
              <div className="border rounded-lg overflow-auto max-h-[600px] bg-gray-50 p-4">
                <PrettierJSONView data={selectedService || {}} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AppLayout>
  );
};

export default APIViewerPage;