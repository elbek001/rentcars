import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Vehicles from "./pages/Vehicles";
import AdminLayout from "./admin/AdminLayout";
import CarsPage from "./admin/CarsPage";
import RegionsPage from "./admin/RegionsPage";
import Homepage from "./admin/Homepage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Admin panel routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="cars" element={<CarsPage />} />
          <Route path="regions" element={<RegionsPage />} />
          <Route path="home" element={<Homepage />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
