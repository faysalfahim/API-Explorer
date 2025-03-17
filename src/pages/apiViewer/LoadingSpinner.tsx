import { Loader } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen ">
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex items-center space-x-2">
          <Loader className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="text-gray-600">Loading API Services...</span>
        </div>
      </div>
    </div>
  );
};
