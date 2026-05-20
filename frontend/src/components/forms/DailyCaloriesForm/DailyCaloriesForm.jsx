import { useState } from "react";
import { api } from "../../../api/axios";
import { toast } from "react-toastify";

export default function DailyCaloriesForm({ openModal }) {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    targetWeight: "",
    bloodType: "1",
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
      // 🔥 BACKEND İLE %100 UYUMLU PAYLOAD
      const payload = {
        weight: Number(formData.weight),
        height: Number(formData.height),
        age: Number(formData.age),
        targetWeight: Number(formData.targetWeight),
        bloodType: Number(formData.bloodType),
      };

      const res = await api.post("/products/public-calorie", payload);

      toast.success("Calculation completed successfully");

      // 🔥 modal açma
      if (openModal) {
        openModal(res.data.data);
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
        />

        {/* AGE */}
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />

        {/* WEIGHT (KRİTİK DÜZELTME) */}
        <input
          name="weight"
          type="number"
          placeholder="Current Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
        />

        {/* TARGET WEIGHT */}
        <input
          name="targetWeight"
          type="number"
          placeholder="Desired Weight (kg)"
          value={formData.targetWeight}
          onChange={handleChange}
        />

        {/* BLOOD TYPE */}
        <select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        {/* SUBMIT */}
        <button disabled={loading}>
          {loading ? "Loading..." : "Start losing weight"}
        </button>
      </form>
    </div>
  );
}
