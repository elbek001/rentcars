import React from "react";

export default function EditProduct() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-10 text-gray-800">Edit Product</h1>

      {/* Grid Container */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* Product Information */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">
            Product Information
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Off White"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Weight
              </label>
              <input
                type="number"
                placeholder="42"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Size
              </label>
              <input
                type="text"
                placeholder="Large"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Category
              </label>
              <input
                type="text"
                placeholder="Clothing"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Description
              </label>
              <textarea
                placeholder="Some initial text"
                rows="3"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">Pricing</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Price
              </label>
              <input
                type="text"
                placeholder="$100"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Currency
              </label>
              <input
                type="text"
                placeholder="USD"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                SKU
              </label>
              <input
                type="text"
                placeholder="829784929"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Tags
              </label>
              <input
                type="text"
                placeholder="t-shirt"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
