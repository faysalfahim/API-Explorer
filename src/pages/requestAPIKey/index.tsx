import React, { useState } from "react";
import { Shield, CheckCircle, Globe, Send, Loader } from "lucide-react";
import AppLayout from "../../components/layouts/AppLayout";
import PageHeader from "../../components/common/PageHeader";
import Notification from "./Notification";

// Notification Component

const RequestAPIKeyPage = () => {
  const [domain, setDomain] = useState("");
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!domain.trim()) {
      setRequestStatus("error");
      return;
    }

    // Simulate API request
    setRequestStatus("pending");

    // Simulated async operation
    setTimeout(() => {
      // In a real scenario, this would be an actual API call
      setRequestStatus("success");
    }, 2000);
  };

  const resetForm = () => {
    setDomain("");
    setRequestStatus("idle");
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12 lg:px-8">
          <div className="max-w-xl mx-auto space-y-8">
            {/* Header Section */}
            <PageHeader
              Icon={Shield}
              name="API Key Request"
              title="Request Your API Access"
              message="Unlock powerful integrations with our simple API key request
                process."
            />

            {/* Main Card */}
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
              <div className="p-8 space-y-6">
                {/* Notifications */}
                {requestStatus !== "idle" && (
                  <Notification
                    type={requestStatus}
                    message={
                      requestStatus === "pending"
                        ? "Your API key request is being processed. Please wait for approval."
                        : requestStatus === "success"
                        ? "Your API key request has been approved. Check your email for further instructions."
                        : "Please enter a valid domain."
                    }
                    domain={domain}
                  />
                )}

                {/* Request Form */}
                {requestStatus !== "success" && (
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
                          disabled={requestStatus === "pending"}
                          className="
                        block w-full pl-10 pr-3 py-3 
                        border border-gray-300 rounded-xl 
                        shadow-sm focus:outline-none 
                        focus:ring-2 focus:ring-indigo-500 
                        focus:border-indigo-500
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-300
                      "
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <button
                        type="submit"
                        disabled={requestStatus === "pending"}
                        className="
                      w-full sm:flex-grow 
                      inline-flex items-center justify-center 
                      px-6 py-3 
                      border border-transparent 
                      rounded-xl shadow-md 
                      text-white bg-indigo-600 
                      hover:bg-indigo-700 
                      focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-indigo-500
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-300
                    "
                      >
                        {requestStatus === "pending" ? (
                          <>
                            <Loader className="h-5 w-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Submit Request
                          </>
                        )}
                      </button>

                      {requestStatus === "pending" && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="
                        w-full sm:w-auto
                        inline-flex items-center justify-center
                        px-6 py-3 
                        border border-gray-300 
                        rounded-xl 
                        text-gray-700 bg-white 
                        hover:bg-gray-50
                        focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-indigo-500
                        transition-all duration-300
                      "
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {/* Success State */}
                {requestStatus === "success" && (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="bg-indigo-100 rounded-full p-4">
                        <CheckCircle className="h-10 w-10 text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Request Submitted Successfully
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Your API key request for {domain} is under review. You
                        will receive an email with further instructions.
                      </p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="
                    inline-flex items-center 
                    px-8 py-3 
                    border border-transparent 
                    rounded-xl 
                    text-white bg-indigo-600 
                    hover:bg-indigo-700
                    focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-indigo-500
                    transition-all duration-300
                  "
                    >
                      Submit Another Request
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Security Guidelines */}
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                API Request Guidelines
              </h3>
              <div className="space-y-4">
                {[
                  "Requests are typically processed within 1-2 business days",
                  "Ensure the domain is associated with your organization",
                  "You will receive an email notification about your request status",
                ].map((guideline, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-indigo-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{guideline}</p>
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

export default RequestAPIKeyPage;
