import React, { useState } from 'react';
import { 
  Shield, Code, CheckCircle, AlertTriangle, Globe, Clock, 
  Send, Info 
} from 'lucide-react';
import AppLayout from '../../components/layouts/AppLayout';

// Notification Component
const Notification = ({ 
  type, 
  message, 
  domain 
}: { 
  type: 'success' | 'error' | 'pending', 
  message: string, 
  domain?: string 
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
      case 'pending':
        return <Clock className="h-8 w-8 text-yellow-500 animate-pulse" />;
    }
  };

  const renderBackground = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div 
      className={`
        ${renderBackground()} 
        border rounded-lg p-4 flex items-center space-x-4 
        shadow-md mb-6 animate-fade-in
      `}
    >
      <div>{renderIcon()}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {type === 'pending' ? 'Request Submitted' : type === 'success' ? 'Approved' : 'Error'}
        </h3>
        <p className="text-sm text-gray-600">{message}</p>
        {domain && (
          <div className="mt-2 flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-500">{domain}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const RequestAPIKeyPage = () => {
  const [domain, setDomain] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!domain.trim()) {
      setRequestStatus('error');
      return;
    }

    // Simulate API request
    setRequestStatus('pending');

    // Simulated async operation
    setTimeout(() => {
      // In a real scenario, this would be an actual API call
      setRequestStatus('success');
    }, 2000);
  };

  const resetForm = () => {
    setDomain('');
    setRequestStatus('idle');
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600 mr-4" />
              <h1 className="text-2xl font-bold text-gray-900">
                API Key Request
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-8">
              {/* Notifications */}
              {requestStatus !== 'idle' && (
                <Notification 
                  type={requestStatus}
                  message={
                    requestStatus === 'pending' 
                      ? 'Your API key request is being processed. Please wait for approval.' 
                      : requestStatus === 'success'
                      ? 'Your API key request has been approved. Check your email for further instructions.'
                      : 'Please enter a valid domain.'
                  }
                  domain={domain}
                />
              )}

              {/* Request Form */}
              {requestStatus !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      htmlFor="domain" 
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Domain
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                        disabled={requestStatus === 'pending'}
                        className="
                          block w-full pl-10 pr-3 py-2 
                          border border-gray-300 rounded-md 
                          shadow-sm focus:outline-none 
                          focus:ring-indigo-500 focus:border-indigo-500
                          disabled:opacity-50 disabled:cursor-not-allowed
                        "
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      disabled={requestStatus === 'pending'}
                      className="
                        flex-grow 
                        inline-flex items-center justify-center 
                        px-4 py-2 
                        border border-transparent 
                        rounded-md shadow-sm 
                        text-white bg-indigo-600 
                        hover:bg-indigo-700 
                        focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-indigo-500
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-300
                      "
                    >
                      {requestStatus === 'pending' ? (
                        <>
                          <span className="animate-spin mr-2">🔄</span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Submit Request
                        </>
                      )}
                    </button>

                    {requestStatus === 'pending' && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="
                          inline-flex items-center 
                          px-4 py-2 
                          border border-gray-300 
                          rounded-md 
                          text-gray-700 bg-white 
                          hover:bg-gray-50
                          focus:outline-none focus:ring-2 
                          focus:ring-offset-2 focus:ring-indigo-500
                        "
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* Additional Information */}
              {requestStatus === 'success' && (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-indigo-100 rounded-full p-4">
                      <Info className="h-8 w-8 text-indigo-600" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Request Submitted Successfully
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your API key request for {domain} is under review. 
                    You will receive an email with further instructions.
                  </p>
                  <button
                    onClick={resetForm}
                    className="
                      inline-flex items-center 
                      px-6 py-2 
                      border border-transparent 
                      rounded-md 
                      text-white bg-indigo-600 
                      hover:bg-indigo-700
                      focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-indigo-500
                    "
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Security Information */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              API Request Guidelines
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-indigo-500 mr-2 mt-1" />
                Requests are typically processed within 1-2 business days
              </li>
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-indigo-500 mr-2 mt-1" />
                Ensure the domain is associated with your organization
              </li>
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-indigo-500 mr-2 mt-1" />
                You will receive an email notification about your request status
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RequestAPIKeyPage;