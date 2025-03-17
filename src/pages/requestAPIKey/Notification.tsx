import { AlertTriangle, CheckCircle, Clock, Globe } from "lucide-react";

const Notification = ({
  type,
  message,
  domain,
}: {
  type: "success" | "error" | "pending";
  message: string;
  domain?: string;
}) => {
  const renderIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
      case "pending":
        return <Clock className="h-8 w-8 text-yellow-500 animate-pulse" />;
    }
  };

  const renderBackground = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "pending":
        return "bg-yellow-50 border-yellow-200";
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
          {type === "pending"
            ? "Request Submitted"
            : type === "success"
            ? "Approved"
            : "Error"}
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

export default Notification;
