import { useState } from 'react';
import { 
  Code, Copy, RefreshCw, Eye, EyeOff, 
  Loader, AlertTriangle 
} from 'lucide-react';
import AppLayout from '../../components/layouts/AppLayout';

// Interface for API Key
interface APIKey {
  id: string;
  domain: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  status: 'active' | 'revoked' | 'expired';
}

const ViewAPIKeyPage = () => {
  // State management
  const [domain, setDomain] = useState('');
  const [apiKey, setApiKey] = useState<APIKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  // Dummy function to simulate API key fetching
  const fetchAPIKey = async () => {
    // Reset previous states
    setApiKey(null);
    setError(null);
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dummy validation
      if (!domain.trim()) {
        throw new Error('Please enter a valid domain');
      }

      // Simulate API key generation
      const generatedKey: APIKey = {
        id: Math.random().toString(36).substring(2),
        domain: domain,
        key: `api_${Math.random().toString(36).substring(2, 15)}`,
        createdAt: new Date().toISOString(),
        lastUsed: null,
        status: 'active'
      };

      setApiKey(generatedKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy API Key to clipboard
  const copyAPIKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey.key);
    }
  };

  // Regenerate API Key
  const regenerateAPIKey = async () => {
    if (domain) {
      await fetchAPIKey();
    }
  };

  return (
    <AppLayout>
        <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              View API Key
            </h1>

            {/* Domain Input Section */}
            <div className="mb-6">
              <label 
                htmlFor="domain" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Domain
              </label>
              <div className="flex space-x-2">
                <input
                    type="text"
                    id="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="flex-grow px-3 py-2 border border-gray-300 text-dark rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    onClick={fetchAPIKey}
                    disabled={isLoading}
                    className="
                    btn-primary
                    px-4 py-2 
                    bg-indigo-600 
                    text-white 
                    rounded-md 
                    hover:bg-indigo-700 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-indigo-500 
                    focus:ring-offset-2
                    transition-colors 
                    duration-300
                    flex 
                    items-center 
                    justify-center
                    min-w-[120px]
                    ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
                    "
                >
                    {isLoading ? (
                    <div className="flex items-center">
                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                        Fetching...
                    </div>
                    ) : (
                    'Get API Key'
                    )}
                </button>
                </div>
            </div>

            {/* Error Handling */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative mb-6" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* API Key Display */}
            {apiKey && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    API Key for {apiKey.domain}
                  </h2>
                  <span 
                    className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${apiKey.status === 'active' ? 'bg-green-100 text-green-800' 
                      : apiKey.status === 'expired' ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'}
                    `}
                  >
                    {apiKey.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex-grow">
                    <input
                      type={isKeyVisible ? 'text' : 'password'}
                      value={apiKey.key}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                    />
                  </div>
                  <button
                    onClick={() => setIsKeyVisible(!isKeyVisible)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    {isKeyVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={copyAPIKey}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={regenerateAPIKey}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Created: {new Date(apiKey.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Information */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            API Key Best Practices
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Keep your API key confidential
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Regenerate keys periodically
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Use environment variables to store keys
            </li>
          </ul>
        </div>
      </div>

    </div>
    </AppLayout>
  );
};

export default ViewAPIKeyPage;