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

interface APIKey {
  id: string;
  domain: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  status: "active" | "revoked" | "expired";
}

const ViewAPIKeyPage = () => {
  const [domain, setDomain] = useState("");
  const [apiKey, setApiKey] = useState<APIKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const fetchAPIKey = async () => {
    setApiKey(null);
    setError(null);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!domain.trim()) {
        throw new Error("Please enter a valid domain");
      }

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

  const copyAPIKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey.key);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto max-w-xl px-4">
          <div className="space-y-6">
            <PageHeader
              Icon={Key}
              name="API Key Management"
              title="Manage Your API Access"
              message="Securely generate and manage your API keys"
            />

            <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
              <div className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="domain"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Enter Domain
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                        className="
                        block w-full pl-9 pr-3 py-2 text-sm
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
                        px-4 py-2 text-sm
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
                          <Loader className="h-4 w-4 mr-2 animate-spin" />
                          Fetching...
                        </>
                      ) : (
                        "Fetch Key"
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    className="
                      bg-red-50 border border-red-200 
                      text-red-800 px-4 py-2 
                      rounded-xl relative 
                      flex items-center text-xs
                    "
                    role="alert"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                {apiKey && (
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h2 className="text-sm font-semibold text-gray-900">
                        API Key for {apiKey.domain}
                      </h2>
                      <span
                        className={`
                          inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
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
                          w-full px-3 py-2 text-sm
                          border border-gray-300 rounded-xl 
                          bg-white 
                          pr-20
                        "
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
                        <button
                          onClick={() => setIsKeyVisible(!isKeyVisible)}
                          className="
                            p-1.5 rounded-md 
                            hover:bg-gray-200 
                            focus:outline-none 
                            focus:ring-2 focus:ring-indigo-500
                          "
                        >
                          {isKeyVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={copyAPIKey}
                          aria-label={isCopied ? "Copied!" : "Copy API Key"}
                          className="p-1.5 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 group relative"
                        >
                          {isCopied ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          {isCopied && (
                            <span className="absolute bottom-full left-1/2 transform-translate-x-1/2  bg-gray-800 text-white text-xs px-2 py-1 rounded mb-2 whitespace-nowrap z-10 opacity-100 transition-all duration-300">
                              Copied!
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-2" />
                      Created: {new Date(apiKey.createdAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-3 text-center">
                API Key Best Practices
              </h2>
              <div className="space-y-3">
                {[
                  "Keep your API key confidential and secure",
                  "Regenerate keys periodically to maintain security",
                  "Use environment variables to store sensitive keys",
                ].map((practice, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600">{practice}</p>
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
