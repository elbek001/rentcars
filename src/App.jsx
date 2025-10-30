import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Details from "./pages/Details";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Cars from "./pages/Cars"; // ✅ Bu sahifa bor
import ViewDetail from "./ViewDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/details" element={<Details />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cars" element={<Cars />} /> {/* ✅ Shu qatorda qo‘shamiz */}
        <Route path="/details/:id" element={<ViewDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
