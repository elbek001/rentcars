  import React, { useState, useEffect, useCallback } from "react";
  import { Car, ChevronRight } from "lucide-react";

  // ✅ Хардкод категорий (обязательно!)
  const HARDCODED_CATEGORIES = [
    { name: "All vehicles", slug: "all", icon: "🚗" },
    { name: "Sedan", slug: "sedan", icon: "🚘" },
    { name: "Cabriolet", slug: "cabriolet", icon: "🚙" },
    { name: "Pickup", slug: "pickup", icon: "🛻" },
    { name: "Suv", slug: "suv", icon: "🚙" },
    { name: "Minivan", slug: "minivan", icon: "🚐" },
  ];

  export default function VehicleSelector() {
    const [brands, setBrands] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loadingVehicles, setLoadingVehicles] = useState(false);
    const [error, setError] = useState("");

    // ✅ Загружаем бренды
    useEffect(() => {
      const controller = new AbortController();

      fetch("https://zb-qhvz.onrender.com/api/brands", {
        signal: controller.signal,
      })
        .then((res) => res.ok && res.json())
        .then((data) => setBrands(Array.isArray(data) ? data : []))
        .catch((err) => {
          if (err.name !== "AbortError") console.error("Brands error:", err);
        });

      return () => controller.abort();
    }, []);

    // ✅ Функция загрузки транспорта по категориям
    const fetchVehicles = useCallback(async (slug, signal) => {
      setLoadingVehicles(true);
      setError("");

      try {
        const url =
          slug === "all"
            ? "https://zb-qhvz.onrender.com/api/cars"
            : `https://zb-qhvz.onrender.com/api/cars/category/${slug}`;

        const res = await fetch(url, { signal });

        if (!res.ok) throw new Error(`Failed to load ${slug}`);

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.cars || [];

        setVehicles(list);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Could not load vehicles");
          setVehicles([]);
        }
      } finally {
        setLoadingVehicles(false);
      }
    }, []);

    // ✅ Перезагружаем транспорт при изменении категории
    useEffect(() => {
      const controller = new AbortController();
      fetchVehicles(selectedCategory, controller.signal);
      return () => controller.abort();
    }, [selectedCategory, fetchVehicles]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-900 flex justify-center">
              Select a vehicle group
            </h1>

            {/* ✅ Табы категорий */}
            <div className="flex gap-3 mt-8 justify-center">
              {HARDCODED_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 border-2 ${
                    selectedCategory === cat.slug
                      ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200 scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Grid */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          {loadingVehicles ? (
            <SkeletonGrid />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : vehicles.length > 0 ? (
            <>
              <div className="bg-white rounded-xl p-4 mb-8 shadow-sm border border-gray-200">
                <p className="text-gray-700 text-center font-medium">
                  <span className="text-purple-600 font-bold">{vehicles.length}</span> vehicle{vehicles.length !== 1 ? "s" : ""} available
                </p>
              </div>
              <VehicleGrid vehicles={vehicles} />
            </>
          ) : (
            <EmptyState />
          )}
        </main>

        <BrandSection brands={brands} />
      </div>
    );
  }

  // ======================= UI Subcomponents =======================

  function SkeletonGrid() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md animate-pulse p-6">
            <div className="bg-gray-200 h-40 mb-4 rounded"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  function ErrorMessage({ message }) {
    return <div className="text-center py-12 text-red-600 font-semibold">{message}</div>;
  }

  function EmptyState() {
    return (
      <div className="text-center py-12">
        <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No vehicles found</p>
      </div>
    );
  }

  function VehicleGrid({ vehicles }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((v, idx) => (
          <div
            key={v._id ?? v.id ?? idx}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              {v.imageUrl ? (
                <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Car className="w-24 h-24 text-gray-300" />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-600">
                Available
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{v.brand}</h3>
                  <p className="text-sm text-gray-600 mt-1">{v.name}</p>
                </div>
                <div className="text-right bg-purple-50 px-3 py-2 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">${v.pricePerDay}</p>
                  <p className="text-xs text-gray-600">per day</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3.5 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-purple-200 hover:shadow-xl">
                View Details <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function BrandSection({ brands }) {
    return (
      <section className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* ===== Top Brand Logos ===== */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-20                                py-10 rounded-2xl bg-gray-50">
        {["toyota", "ford", "mercedes", "jeep", "bmw", "audi"].map((brand) => (
          <div key={brand} className="w-20 opacity-90">
            <img
              src={`https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${brand}.svg`}
              alt={brand}
              className="w-full h-auto invert-0"
            />
          </div>
        ))}
      </div>
          <div className="flex flex-wrap gap-16 justify-center items-center">
            {brands.length === 0 ? (
              <p className="text-gray-500"></p>
            ) : (
              brands.map((b) => (
                <div key={b._id} className="text-center opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer">
                  <div className="text-4xl mb-3">{b.logo || "🚗"}</div>
                  <p className="font-bold text-gray-800 text-sm">{b.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    );
  }