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
        }  rounded-full px-6 py-2 mb-4`}
      >
        <Icon className="h-5 w-5 text-indigo-600 mr-2" />
        <span className="text-sm font-medium text-indigo-700">{name}</span>
      </div>
      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        {title}
      </h3>
      <p className="mt-3 text-lg text-gray-600">{message}</p>
    </div>
  );
};

export default PageHeader;
