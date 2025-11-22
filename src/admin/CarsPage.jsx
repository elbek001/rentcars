import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [carId, setCarId] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    size: "",
    category: "",
    quantity: "",
    description: "",
    price: "",
    currency: "USD",
    sku: "",
    tax: ""
  });

  // GET car by ID
  const getCarById = async () => {
    if (!carId) return;

    setLoading(true);
    try {
      const res = await fetch(`https://zb-qhvz.onrender.com/api/cars/${carId}`);
      const data = await res.json();

      setFormData({
        name: data.name || "",
        weight: data.weight || "",
        size: data.size || "",
        category: data.category || "",
        quantity: data.quantity || "",
        description: data.description || "",
        price: data.price || "",
        currency: data.currency || "USD",
        sku: data.sku || "",
        tax: data.tax || ""
      });
    } catch (error) {
      alert("Car not found!");
    }
    setLoading(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SEND PUT request
  const saveEdit = async () => {
    if (!carId) {
      alert("Please load a car first!");
      return;
    }

    setLoading(true);
    try {
      await fetch(`https://zb-qhvz.onrender.com/api/cars/${carId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("Successfully updated!");
    } catch (error) {
      alert("Error updating car!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h1>

        {/* ID Input Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              placeholder="Enter Car ID"
              className="flex-1 p-3 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={getCarById}
              disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded font-medium transition disabled:bg-gray-400"
            >
              {loading ? "Loading..." : "Load"}
            </button>
          </div>
        </div>


        {/* EDIT FORM */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Product Information */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-4 text-gray-800">Product Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder=""
                  rows="3"
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>


          {/* Pricing */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-4 text-gray-800">Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax
                </label>
                <input
                  type="text"
                  name="tax"
                  value={formData.tax}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={saveEdit}
            disabled={loading || !carId}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-medium transition disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
