import { Code, Database, Shield, Zap } from "lucide-react";

const Features = () => {
  const featuresList = [
    {
      icon: Code,
      title: "Comprehensive API Documentation",
      description:
        "Detailed, easy-to-understand documentation for all our API endpoints.",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Robust Security",
      description:
        "Advanced authentication and encryption to protect your data.",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Zap,
      title: "High Performance",
      description:
        "Low-latency responses and high-throughput API infrastructure.",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Database,
      title: "Flexible Data Formats",
      description: "Support for multiple data formats including JSON and XML.",
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Powerful API Features
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Designed to meet your most demanding integration needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-5 rounded-lg border border-gray-100 
              hover:border-transparent hover:shadow-xl transition-all duration-300 
              transform hover:-translate-y-2 ease-in-out"
            >
              <div
                className={`absolute -top-6 left-1/2 -translate-x-1/2 
                flex items-center justify-center h-12 w-12 rounded-full 
                ${feature.color} shadow-md`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
