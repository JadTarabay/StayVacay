import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Properties from './Pages/Properties';
import Property from './Pages/Property';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<Property />} />
      </Routes>
    </Router>
  );
}

export default App;
