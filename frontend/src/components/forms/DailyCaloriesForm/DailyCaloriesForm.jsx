import { useState } from "react";
import { api } from "../../../api/axios";
import { toast } from "react-toastify";

// isPrivate prop'unu ekledik (varsayılan olarak false)
export default function DailyCaloriesForm({ openModal, isPrivate = false }) {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    targetWeight: "",
    bloodType: "0",
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
      const payload = {
        weight: Number(formData.weight),
        height: Number(formData.height),
        age: Number(formData.age),
        targetWeight: Number(formData.targetWeight),
        bloodType: formData.bloodType,
      };

      // Giriş yapmış kullanıcılar için /products/user-calorie adresine gidiyor!
      const endpoint = isPrivate ? "/products/user-calorie" : "/products/public-calorie";
      
      const res = await api.post(endpoint, payload);

      toast.success("Calculation completed successfully");

      if (openModal) {
        // Senin backend'inden dönen nesne yapısına göre res.data.data veya doğrudan res.data'yı paslayalım
        const calorieValue = res.data.data || res.data; 
        openModal(calorieValue);
      }
    } catch (err) {
      console.error("CALCULATION ERROR:", err);
      const errorMessage = err.response?.data?.message || "Calculation failed.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <h1 style={{ fontSize: "24px", color: "#212121", marginBottom: "30px" }}>
        Calculate your daily calorie intake now
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input
          name="height"
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          style={{ padding: "12px", border: "none", borderBottom: "1px solid #e0e0e0", outline: "none", fontSize: "16px" }}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={{ padding: "12px", border: "none", borderBottom: "1px solid #e0e0e0", outline: "none", fontSize: "16px" }}
          required
        />

        <input
          name="weight"
          type="number"
          placeholder="Current Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          style={{ padding: "12px", border: "none", borderBottom: "1px solid #e0e0e0", outline: "none", fontSize: "16px" }}
          required
        />

        <input
          name="targetWeight"
          type="number"
          placeholder="Desired Weight (kg)"
          value={formData.targetWeight}
          onChange={handleChange}
          style={{ padding: "12px", border: "none", borderBottom: "1px solid #e0e0e0", outline: "none", fontSize: "16px" }}
          required
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontSize: "14px", color: "#9b9b9b" }}>Blood Type</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            style={{ padding: "12px", border: "none", borderBottom: "1px solid #e0e0e0", outline: "none", fontSize: "16px", background: "white" }}
          >
            <option value="0">0 (I)</option>
            <option value="A">A (II)</option>
            <option value="B">B (III)</option>
            <option value="AB">AB (IV)</option>
          </select>
        </div>

        <button 
          disabled={loading}
          style={{ marginTop: "20px", background: "#fc842c", color: "white", border: "none", padding: "15px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 6px rgba(252,132,44,0.2)" }}
        >
          {loading ? "Calculating..." : "Start losing weight"}
        </button>
      </form>
    </div>
  );
}