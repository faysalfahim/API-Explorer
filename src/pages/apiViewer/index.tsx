/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import AppLayout from "../../components/layouts/AppLayout";
import Viewer from "./Viewer";
import { LoadingSpinner } from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";

// Define interfaces
interface APIService {
  id: number;
  name: string;
  description: string;
  version: string;
  baseUrl: string;
  category: string;
  endpoints: Endpoint[];
}

export interface Endpoint {
  method: string;
  path: string;
  name: string;
  description: string;
  authentication: string;
  requestBody?: any;
  responses?: any;
}

const APIViewerPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const { serviceId } = useParams();

  // State for API data fetching
  // const [_apiServices, setApiServices] = useState<APIService[]>([]);
  const [selectedService, setSelectedService] = useState<APIService | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch local data
  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        setIsLoading(true);

        // Use fetch for local JSON file
        const response = await fetch("/jsons/dummydata.json");

        if (!response.ok) {
          throw new Error("Failed to load local API data");
        }

        const data = await response.json();
        const apiServicesData = data.apiServices;

        // setApiServices(apiServicesData);

        // Select service based on serviceId or first service
        const selectedServiceId = parseInt(serviceId || "1");
        const service = apiServicesData.find(
          (s: APIService) => s.id === selectedServiceId
        );

        setSelectedService(service);

        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setIsLoading(false);
      }
    };

    // Trigger the fetch
    fetchLocalData();
  }, [serviceId]);

  // Filter endpoints based on search term
  const filteredEndpoints =
    selectedService?.endpoints.filter(
      (endpoint) =>
        endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <AppLayout>
      {error ? (
        <ErrorDisplay error={error} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <Viewer
          selectedService={selectedService}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredEndpoints={filteredEndpoints}
        />
      )}
    </AppLayout>
  );
};

export default APIViewerPage;
