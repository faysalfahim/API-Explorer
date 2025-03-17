import { Link } from 'react-router';
import { BookOpen, Key, Code, ExternalLink, Search } from 'lucide-react';
import AppLayout from '../../components/layouts/AppLayout';

const Homepage = () => {
  
  
  const apiServices = [
    {
      id: 1,
      name: 'User Management API',
      description: 'Endpoints for creating, updating, and managing user accounts',
      endpoints: 12,
      category: 'Core'
    },
    {
      id: 2,
      name: 'Authentication API',
      description: 'OAuth2 and token-based authentication services',
      endpoints: 8,
      category: 'Security'
    },
    {
      id: 3,
      name: 'Data Processing API',
      description: 'Batch and stream processing for large datasets',
      endpoints: 15,
      category: 'Data'
    },
    {
      id: 4,
      name: 'Reporting API',
      description: 'Generate and export reports in various formats',
      endpoints: 10,
      category: 'Analytics'
    },
    {
      id: 5,
      name: 'Notification API',
      description: 'Email, SMS, and push notification services',
      endpoints: 7,
      category: 'Communication'
    },
    {
      id: 6,
      name: 'File Storage API',
      description: 'Upload, download, and manage files securely',
      endpoints: 9,
      category: 'Storage'
    }
  ];

  

  return (
    <AppLayout>
        <div className="min-h-screen bg-gray-50">
      

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Internal API Explorer</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover, test, and integrate with our internal API services
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link to="/api-viewer" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore APIs
              </Link>
              <Link to="/request-key" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Key className="h-5 w-5 mr-2" />
                Get API Key
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search for APIs..."
          />
        </div>
      </div>

      {/* Available API Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available API Services</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apiServices.map((service) => (
            <div key={service.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <Code className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                      {service.category}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">{service.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{service.endpoints} endpoints</span>
                  <Link to={`/api-viewer/${service.id}`} className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View details
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to use */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Platform</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Getting Started Guide</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Follow these steps to make your first API call</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Step 1</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">1</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-900 font-medium">Request an API key</p>
                        <p className="text-gray-500">Generate a unique API key for authentication</p>
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Step 2</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">2</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-900 font-medium">Explore the API documentation</p>
                        <p className="text-gray-500">Browse available endpoints and understand request/response formats</p>
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Step 3</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">3</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-900 font-medium">Test API calls in the browser</p>
                        <p className="text-gray-500">Use our interactive API viewer to make test requests</p>
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Step 4</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">4</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-900 font-medium">Integrate with your application</p>
                        <p className="text-gray-500">Implement API calls in your own code using your preferred language</p>
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default Homepage;