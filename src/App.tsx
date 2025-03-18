import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Homepage from "./pages/home";
import APIViewerPage from "./pages/apiViewer";
import RequestAPIKeyPage from "./pages/requestAPIKey";
import ViewAPIKeyPage from "./pages/viewAPIKey/viewAPIKey";
import APIExplorer from "./pages/apiExplorer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/api-explorer" element={<APIExplorer />} />
        <Route path="/api-viewer/:serviceId" element={<APIViewerPage />} />
        <Route path="/request-key" element={<RequestAPIKeyPage />} />
        <Route path="/view-key" element={<ViewAPIKeyPage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
