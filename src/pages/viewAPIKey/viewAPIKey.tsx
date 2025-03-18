import { useState } from "react";
import {
  Copy,
  Eye,
  EyeOff,
  Loader,
  CheckCircle,
  Key,
  AlertTriangle,
  Clock,
  Shield,
  Globe,
} from "lucide-react";
import AppLayout from "../../components/layouts/AppLayout";
import PageHeader from "../../components/common/PageHeader";

// Interface for API Key
interface APIKey {
  id: string;
  domain: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  status: "active" | "revoked" | "expired";
}

const ViewAPIKeyPage = () => {
  // State management
  const [domain, setDomain] = useState("");
  const [apiKey, setApiKey] = useState<APIKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Dummy function to simulate API key fetching
  const fetchAPIKey = async () => {
    // Reset previous states
    setApiKey(null);
    setError(null);
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy validation
      if (!domain.trim()) {
        throw new Error("Please enter a valid domain");
      }

      // Simulate API key generation
      const generatedKey: APIKey = {
        id: Math.random().toString(36).substring(2),
        domain: domain,
        key: `api_${Math.random().toString(36).substring(2, 15)}`,
        createdAt: new Date().toISOString(),
        lastUsed: null,
        status: "active",
      };

      setApiKey(generatedKey);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Copy API Key to clipboard
  const copyAPIKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey.key);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto max-w-xl px-4">
          <div className="space-y-8">
            {/* Header */}
            <PageHeader
              Icon={Key}
              name="API Key Management"
              title="Manage Your API Access"
              message="Securely generate and manage your API keys"
            />

            {/* Main Card */}
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
              <div className="p-8 space-y-6">
                {/* Domain Input Section */}
                <div>
                  <label
                    htmlFor="domain"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter Domain
                  </label>
                  <div className="flex space-x-3">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                        className="
                      block w-full pl-10 pr-3 py-3 
                      border border-gray-300 rounded-xl 
                      shadow-sm focus:outline-none 
                      focus:ring-2 focus:ring-indigo-500 
                      focus:border-indigo-500
                      transition-all duration-300
                    "
                      />
                    </div>
                    <button
                      onClick={fetchAPIKey}
                      disabled={isLoading}
                      className="
                    px-6 py-3 
                    bg-indigo-600 text-white 
                    rounded-xl 
                    hover:bg-indigo-700 
                    focus:outline-none 
                    focus:ring-2 focus:ring-indigo-500 
                    focus:ring-offset-2
                    transition-all duration-300
                    flex items-center
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                    >
                      {isLoading ? (
                        <>
                          <Loader className="h-5 w-5 mr-2 animate-spin" />
                          Fetching...
                        </>
                      ) : (
                        "Fetch Your Key"
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Handling */}
                {error && (
                  <div
                    className="
                  bg-red-50 border border-red-200 
                  text-red-800 px-4 py-3 
                  rounded-xl relative 
                  flex items-center
                "
                    role="alert"
                  >
                    <AlertTriangle className="h-5 w-5 mr-3 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                {/* API Key Display */}
                {apiKey && (
                  <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">
                        API Key for {apiKey.domain}
                      </h2>
                      <span
                        className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        apiKey.status === "active"
                          ? "bg-green-100 text-green-800"
                          : apiKey.status === "expired"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                      >
                        {apiKey.status}
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type={isKeyVisible ? "text" : "password"}
                        value={apiKey.key}
                        readOnly
                        className="
                      w-full px-3 py-3 
                      border border-gray-300 rounded-xl 
                      bg-white 
                      pr-24
                    "
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
                        <button
                          onClick={() => setIsKeyVisible(!isKeyVisible)}
                          className="
                        p-2 rounded-md 
                        hover:bg-gray-200 
                        focus:outline-none 
                        focus:ring-2 focus:ring-indigo-500
                      "
                        >
                          {isKeyVisible ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                        <div className="relative">
                          <button
                            onClick={copyAPIKey}
                            aria-label={isCopied ? "Copied!" : "Copy API Key"}
                            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 group relative"
                          >
                            {isCopied ? (
                              <CheckCircle className="h-5 w-5 text-white" />
                            ) : (
                              <Copy className="h-5 w-5" />
                            )}
                            {isCopied && (
                              <span className="absolute bottom-full left-1/2 transform-translate-x-1/2  bg-gray-800  text-white text-xs px-2 py-1 rounded mb-2 whitespace-nowrap z-10 opacity-100">
                                Copied!
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Created: {new Date(apiKey.createdAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security Best Practices */}
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                API Key Best Practices
              </h2>
              <div className="space-y-4">
                {[
                  "Keep your API key confidential and secure",
                  "Regenerate keys periodically to maintain security",
                  "Use environment variables to store sensitive keys",
                ].map((practice, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-indigo-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{practice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ViewAPIKeyPage;
