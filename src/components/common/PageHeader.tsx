import React, { JSX } from "react";

interface HeaderProps {
  Icon: JSX.ElementType;
  name: string;
  title: string;
  message: string;
  styles?: string;
}

const PageHeader: React.FC<HeaderProps> = ({
  Icon,
  name,
  title,
  message,
  styles,
}) => {
  return (
    <div className="text-center">
      <div
        className={`inline-flex items-center ${
          styles ? styles : "bg-indigo-50"
        } rounded-full px-4 py-1.5 mb-3`}
      >
        <Icon className="h-4 w-4 text-indigo-600 mr-1.5" />
        <span className="text-xs font-medium text-indigo-700">{name}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">{message}</p>
    </div>
  );
};

export default PageHeader;
