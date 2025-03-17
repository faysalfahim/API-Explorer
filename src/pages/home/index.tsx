import AppLayout from "../../components/layouts/AppLayout";
import HomeInstructions from "./HomeInstructions";
import ApiServices from "./ApiServices";
import SearchBar from "./SearchBar";
import Hero from "./Hero";

const Homepage = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        <Hero />
        <SearchBar />
        <ApiServices />
        <HomeInstructions />
      </div>
    </AppLayout>
  );
};

export default Homepage;
