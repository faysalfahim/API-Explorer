import { Globe, Layers } from "lucide-react";

const IntegrationExamples = () => {
  const integrations = [
    {
      icon: Globe,
      title: "Web Applications",
      description: "Seamless integration with modern web frameworks",
      gradient: "from-blue-100 via-blue-50 to-white",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Layers,
      title: "Microservices",
      description: "Scalable architecture for complex system designs",
      gradient: "from-purple-100 via-purple-50 to-white",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Versatile Integration Options
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Designed to work with your existing technology stack
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl 
              border border-gray-100 bg-white 
              hover:border-transparent hover:shadow-xl 
              transition-all duration-300 
              transform hover:-translate-y-2 
              ease-in-out p-6 text-center"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} 
                opacity-50 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
              />
              <div
                className={`mx-auto mb-5 flex items-center justify-center 
                h-16 w-16 rounded-full ${integration.iconBg} 
                group-hover:scale-110 transition-transform duration-300`}
              >
                <integration.icon
                  className={`h-7 w-7 ${integration.iconColor}`}
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {integration.title}
              </h3>
              <p className="text-xs text-gray-600">{integration.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationExamples;
