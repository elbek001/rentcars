import React, { useState } from "react";

export default function CreateCar() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    year: "",
    engine: "2.0",
    category: "suv",
    description: "",
    imageUrl: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const steps = [
    { num: 1, title: "Информация" },
    { num: 2, title: "Фото" },
    { num: 3, title: "Марка" },
    { num: 4, title: "Цена" },
  ];

  // Обновление данных формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Следующий шаг
  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  // Назад
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Отправка формы
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.year || !formData.imageUrl || !formData.price) {
      setMessage("❌ Пожалуйста, заполните все обязательные поля");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        brand: formData.brand,
        year: formData.year,
        engine: formData.engine,
        category: formData.category,
        description: formData.description,
        imageUrl: formData.imageUrl,
        pricePerDay: Number(formData.price),
      };

      const response = await fetch("https://zb-qhvz.onrender.com/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Автомобиль успешно создан!");
        setFormData({
          name: "",
          brand: "",
          year: "",
          engine: "2.0",
          category: "suv",
          description: "",
          imageUrl: "",
          price: "",
        });
        setCurrentStep(1);
      } else {
        setMessage("❌ Ошибка: " + (data.message || "Не удалось создать авто"));
      }
    } catch (error) {
      setMessage("❌ Ошибка соединения: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-7 rounded-3xl ml-7  shadow-xl">
      <div className="max-w-4xl mx-auto  ">
        {/* Шаги */}
        <div className="flex justify-between mb-10">
          {steps.map((step) => (
            <div key={step.num} className="flex-1 flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                  currentStep >= step.num
                    ? "bg-purple-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {step.num}
              </div>
              <span
                className={`mt-2 text-sm ${
                  currentStep >= step.num
                    ? "text-purple-600 font-medium"
                    : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Основная форма */}
        <div className="bg-white shadow p-8 rounded-xl">
          {/* ШАГ 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">Название авто</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Toyota RAV4"
                    className="w-full p-2 border rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Год выпуска</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="2023"
                    className="w-full p-2 border rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">Двигатель</label>
                  <select
                    name="engine"
                    value={formData.engine}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg bg-gray-50"
                  >
                    {Array.from({ length: 80 }, (_, i) => (0.6 + i * 0.1).toFixed(1)).map((val) => (
                      <option key={val}>{val}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Категория</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg bg-gray-50"
                  >
                    <option value="suv">SUV</option>
                    <option value="sedan">Sedan</option>
                    <option value="sport">Sport</option>
                    <option value="truck">Truck</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Описание</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Описание автомобиля"
                  rows="3"
                  className="w-full p-2 border rounded-lg bg-gray-50"
                />
              </div>
            </div>
          )}

          {/* ШАГ 2 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <label className="block mb-2 text-sm font-medium">Фото автомобиля (URL)</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/car.jpg"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="preview"
                  className="w-64 h-40 object-cover rounded-lg mt-4 border"
                />
              )}
            </div>
          )}

          {/* ШАГ 3 — МАРКА */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <label className="block mb-2 text-sm font-medium">Марка автомобиля</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.brand && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                    {formData.brand}
                  </span>
                )}
              </div>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Например: BMW, Toyota, Audi"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
          )}

          {/* ШАГ 4 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <label className="block mb-2 text-sm font-medium">Цена (в $/день)</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="45"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
          )}

          {/* Сообщение */}
          {message && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* Кнопки */}
          <div className="flex justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Назад
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Далее
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
              >
                {loading ? "Отправка..." : "Создать авто"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
