import { useState } from "react";
import { api } from "../../../api/axios";
import { toast } from "react-toastify";

export default function DailyCaloriesForm({ openModal }) {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    targetWeight: "",
    bloodType: "0", // Başlangıç değerini gerçek kan grubu yaptık
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // BACKEND İLE UYUMLU YENİ PAYLOAD
      const payload = {
        weight: Number(formData.weight),
        height: Number(formData.height),
        age: Number(formData.age),
        targetWeight: Number(formData.targetWeight),
        bloodType: formData.bloodType, // Artık Number yapmıyoruz, string ("0", "A", "B", "AB") olarak gidiyor
      };

      const res = await api.post("/products/public-calorie", payload);

      toast.success("Calculation completed successfully");

      // Modal tetikleme
      if (openModal) {
        const calorieValue = res.data.data; // İçinde dailyCalorieIntake ve notAllowedProducts var
        openModal(calorieValue); // Veriyi ekstra bir objeye sarmalamadan, Egemen'den geldiği gibi ham haliyle gönderiyoruz
      }
    } catch (err) {
      console.error("CALCULATION ERROR:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Calculation failed. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Calculate your daily calorie intake now</h1>

      <form onSubmit={handleSubmit}>
        {/* HEIGHT */}
        <input
          name="height"
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          required
        />

        {/* AGE */}
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        {/* WEIGHT */}
        <input
          name="weight"
          type="number"
          placeholder="Current Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        {/* TARGET WEIGHT */}
        <input
          name="targetWeight"
          type="number"
          placeholder="Desired Weight (kg)"
          value={formData.targetWeight}
          onChange={handleChange}
          required
        />

        {/* YENİ KAN GRUBU SEÇENEKLERİ (BACKEND UYUMLU) */}
        <select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
        >
          <option value="0">0</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="AB">AB</option>
        </select>

        {/* SUBMIT */}
        <button disabled={loading}>
          {loading ? "Loading..." : "Start losing weight"}
        </button>
      </form>
    </div>
  );
}
