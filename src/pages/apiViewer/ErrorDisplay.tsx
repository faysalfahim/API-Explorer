import { AlertTriangle } from "lucide-react";
import React from "react";

interface ErrorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const ErrorDisplay: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center h-64 bg-red-50">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Failed to Load API Services
          </h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
