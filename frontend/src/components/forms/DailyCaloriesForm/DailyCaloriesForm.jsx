import { useState } from "react";
import { api } from "../../../api/axios.js"; // ✨ Doğru bağıntı yolu (3 kat yukarıda)
import { toast } from "react-toastify";

export default function DailyCaloriesForm({ openModal, isPrivate = false }) {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    targetWeight: "",
    bloodType: "0",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const h = Number(formData.height);
    const a = Number(formData.age);
    const w = Number(formData.weight);
    const tw = Number(formData.targetWeight);

    if (!formData.height || isNaN(h) || h < 100 || h > 250) {
      newErrors.height = "Please enter a realistic height (100-250 cm).";
    }
    if (!formData.age || isNaN(a) || a < 18 || a > 100) {
      newErrors.age = "Age must be between 18 and 100.";
    }
    if (!formData.weight || isNaN(w) || w < 30 || w > 300) {
      newErrors.weight = "Please enter a valid weight (30-300 kg).";
    }
    if (!formData.targetWeight || isNaN(tw) || tw < 30 || tw > 300) {
      newErrors.targetWeight = "Please enter a valid desired weight.";
    }
    if (w && tw && tw >= w) {
      newErrors.targetWeight = "Desired weight must be less than current weight.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        weight: Number(formData.weight),
        height: Number(formData.height),
        age: Number(formData.age),
        targetWeight: Number(formData.targetWeight),
        bloodType: formData.bloodType,
      };

      const endpoint = isPrivate ? "/products/user-calorie" : "/products/public-calorie";
      const res = await api.post(endpoint, payload);

      toast.success("Calculation completed successfully");

      if (openModal) {
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
    <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", color: "#212121", marginBottom: "30px", fontFamily: "sans-serif", fontWeight: "bold" }}>
        Calculate your daily calorie intake now
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }} noValidate>
        
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="height"
            type="number"
            placeholder="Height (cm) *"
            value={formData.height}
            onChange={handleChange}
            style={{ padding: "12px 0", border: "none", borderBottom: errors.height ? "1px solid red" : "1px solid #e0e0e0", outline: "none", fontSize: "16px" }}
          />
          {errors.height && <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.height}</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="age"
            type="number"
            placeholder="Age *"
            value={formData.age}
            onChange={handleChange}
            style={{ padding: "12px 0", border: "none", borderBottom: errors.age ? "1px solid red" : "1px solid #e0e0e0", outline: "none", fontSize: "16px" }}
          />
          {errors.age && <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.age}</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="weight"
            type="number"
            placeholder="Current Weight (kg) *"
            value={formData.weight}
            onChange={handleChange}
            style={{ padding: "12px 0", border: "none", borderBottom: errors.weight ? "1px solid red" : "1px solid #e0e0e0", outline: "none", fontSize: "16px" }}
          />
          {errors.weight && <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.weight}</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="targetWeight"
            type="number"
            placeholder="Desired Weight (kg) *"
            value={formData.targetWeight}
            onChange={handleChange}
            style={{ padding: "12px 0", border: "none", borderBottom: errors.targetWeight ? "1px solid red" : "1px solid #e0e0e0", outline: "none", fontSize: "16px" }}
          />
          {errors.targetWeight && <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.targetWeight}</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "10px" }}>
          <label style={{ fontSize: "14px", color: "#9b9b9b" }}>Blood Type *</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            style={{ padding: "12px 0", border: "none", borderBottom: "1px solid #e0e0e0", outline: "none", fontSize: "16px", background: "white" }}
          >
            <option value="0">0 (I)</option>
            <option value="A">A (II)</option>
            <option value="B">B (III)</option>
            <option value="AB">AB (IV)</option>
          </select>
        </div>

        <button 
          type="submit"
          disabled={loading}
          style={{ marginTop: "25px", background: "#fc842c", color: "white", border: "none", padding: "15px", borderRadius: "30px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 6px rgba(252,132,44,0.2)" }}
        >
          {loading ? "Calculating..." : "Start losing weight"}
        </button>
      </form>
    </div>
  );
}