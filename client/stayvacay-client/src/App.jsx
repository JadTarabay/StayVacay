import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Properties from './Pages/Properties';
import Property from './Pages/Property';
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicyAR from "./Pages/ar/PrivacyPolicyAR";
import TermsAndConditionsAR from "./Pages/ar/TermsAndConditionsAR";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/ar/privacy-policy" element={<PrivacyPolicyAR />} />
        <Route path="/ar/terms-and-conditions" element={<TermsAndConditionsAR />} />
      </Routes>
    </Router>
  );
}

export default App;
