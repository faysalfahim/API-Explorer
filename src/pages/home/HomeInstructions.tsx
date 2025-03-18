const HomeInstructions = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          How to Use This Platform
        </h2>
        <div className="space-y-4">
          {[
            {
              step: "1",
              title: "Request an API key",
              description: "Generate a unique API key for authentication",
            },
            {
              step: "2",
              title: "Explore the API documentation",
              description:
                "Browse available endpoints and understand request/response formats",
            },
            {
              step: "3",
              title: "Test API calls in the browser",
              description:
                "Use our interactive API viewer to make test requests",
            },
            {
              step: "4",
              title: "Integrate with your application",
              description:
                "Implement API calls in your own code using your preferred language",
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className="group relative bg-gray-50 rounded-xl p-5 
              hover:bg-white hover:shadow-md 
              transition-all duration-300 
              border border-gray-100 
              hover:border-transparent"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="flex-shrink-0 h-10 w-10 rounded-full 
                  bg-indigo-100 flex items-center justify-center 
                  group-hover:bg-indigo-600 group-hover:text-white 
                  transition-all duration-300"
                >
                  <span className="text-indigo-600 group-hover:text-white font-semibold">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeInstructions;
