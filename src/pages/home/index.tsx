import AppLayout from "../../components/layouts/AppLayout";
import Features from "./Features";
import Hero from "./Hero";
import HomeInstructions from "./HomeInstructions";
import IntegrationExamples from "./IntegrationExamples";

const Homepage = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        <Hero />
        <Features />
        <IntegrationExamples />
        <HomeInstructions />
      </div>
    </AppLayout>
  );
};

export default Homepage;
