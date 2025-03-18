import SearchBar from "./SearchBar";
import ApiServices from "./ApiServices";
import AppLayout from "../../components/layouts/AppLayout";
import PageHeader from "../../components/common/PageHeader";
import { GlobeIcon } from "lucide-react";

const APIExplorer = () => {
  return (
    <AppLayout>
      <div className="pt-8 bg-gray-50">
        <PageHeader
          Icon={GlobeIcon} // Pass the imported icon component
          name="Available API Services"
          title=""
          message=""
          styles="bg-indigo-100"
        />
        <SearchBar />
        <ApiServices />
      </div>
    </AppLayout>
  );
};

export default APIExplorer;
