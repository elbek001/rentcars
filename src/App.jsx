import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import ViewDetail from "./ViewDetail";
import CarList from "./CarList";

function AppContent() {
  const location = useLocation();

  // Agar URL "/admin" bilan boshlansa footer ko‘rinmasin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/details/:id" element={<ViewDetail />} />
        <Route path="/allCars" element={<CarList />} />

        {/* Admin panel routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Homepage />} />
          <Route path="cars" element={<CarsPage />} />
          <Route path="regions" element={<RegionsPage />} />
          <Route path="home" element={<Homepage />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
