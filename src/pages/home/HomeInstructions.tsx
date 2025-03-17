const HomeInstructions = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How to Use This Platform
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Getting Started Guide
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Follow these steps to make your first API call
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Step 1</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">1</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900 font-medium">
                        Request an API key
                      </p>
                      <p className="text-gray-500">
                        Generate a unique API key for authentication
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Step 2</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">2</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900 font-medium">
                        Explore the API documentation
                      </p>
                      <p className="text-gray-500">
                        Browse available endpoints and understand
                        request/response formats
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Step 3</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">3</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900 font-medium">
                        Test API calls in the browser
                      </p>
                      <p className="text-gray-500">
                        Use our interactive API viewer to make test requests
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Step 4</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">4</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900 font-medium">
                        Integrate with your application
                      </p>
                      <p className="text-gray-500">
                        Implement API calls in your own code using your
                        preferred language
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInstructions;
