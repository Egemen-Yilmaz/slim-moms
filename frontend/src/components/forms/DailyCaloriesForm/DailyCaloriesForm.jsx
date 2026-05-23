import { useState } from "react";
import { api } from "../../../api/axios.js";
import { toast } from "react-toastify";
import css from "./DailyCaloriesForm.module.css";

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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const h = Number(formData.height);
    const a = Number(formData.age);
    const w = Number(formData.weight);
    const tw = Number(formData.targetWeight);

    if (!formData.height || isNaN(h) || h < 100 || h > 250)
      newErrors.height = "Realistic height (100-250 cm).";
    if (!formData.age || isNaN(a) || a < 18 || a > 100)
      newErrors.age = "Age (18-100).";
    if (!formData.weight || isNaN(w) || w < 30 || w > 300)
      newErrors.weight = "Weight (30-300 kg).";
    if (!formData.targetWeight || isNaN(tw) || tw < 30 || tw > 300)
      newErrors.targetWeight = "Invalid desired weight.";
    if (w && tw && tw >= w)
      newErrors.targetWeight =
        "Desired weight must be less than current weight.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm())
      return toast.error("Please fix the errors in the form.");

    try {
      setLoading(true);
      const endpoint = isPrivate
        ? "/products/user-calorie"
        : "/products/public-calorie";
      const res = await api.post(endpoint, {
        weight: Number(formData.weight),
        height: Number(formData.height),
        age: Number(formData.age),
        targetWeight: Number(formData.targetWeight),
        bloodType: formData.bloodType,
      });

      toast.success("Calculation completed successfully");
      if (openModal) {
        openModal(res.data.data || res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Calculation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Calculate your daily calorie intake right now
      </h1>
      <form onSubmit={handleSubmit} className={css.form} noValidate>
        {/* SOL SÜTUN */}
        <div className={css.leftColumn}>
          <div className={css.inputGroup}>
            <input
              name="height"
              type="number"
              placeholder="Height *"
              value={formData.height}
              onChange={handleChange}
              className={`${css.input} ${errors.height ? css.inputError : ""}`}
            />
            {errors.height && (
              <span className={css.errorText}>{errors.height}</span>
            )}
          </div>
          <div className={css.inputGroup}>
            <input
              name="age"
              type="number"
              placeholder="Age *"
              value={formData.age}
              onChange={handleChange}
              className={`${css.input} ${errors.age ? css.inputError : ""}`}
            />
            {errors.age && <span className={css.errorText}>{errors.age}</span>}
          </div>
          <div className={css.inputGroup}>
            <input
              name="weight"
              type="number"
              placeholder="Current Weight *"
              value={formData.weight}
              onChange={handleChange}
              className={`${css.input} ${errors.weight ? css.inputError : ""}`}
            />
            {errors.weight && (
              <span className={css.errorText}>{errors.weight}</span>
            )}
          </div>
        </div>

        {/* SAĞ SÜTUN */}
        <div className={css.rightColumn}>
          <div className={css.inputGroup}>
            <input
              name="targetWeight"
              type="number"
              placeholder="Desired Weight *"
              value={formData.targetWeight}
              onChange={handleChange}
              className={`${css.input} ${errors.targetWeight ? css.inputError : ""}`}
            />
            {errors.targetWeight && (
              <span className={css.errorText}>{errors.targetWeight}</span>
            )}
          </div>
          <div className={css.inputGroup}>
            <label className={css.label}>Blood Type *</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className={css.input}
            >
              <option value="0">0 (I)</option>
              <option value="A">A (II)</option>
              <option value="B">B (III)</option>
              <option value="AB">AB (IV)</option>
            </select>
          </div>
        </div>

        {/* BUTON İÇİN AYRI BİR ROW ALANI AÇILDI */}
        <div className={css.buttonRow}>
          <button type="submit" disabled={loading} className={css.submitBtn}>
            {loading ? "Calculating..." : "Start losing weight"}
          </button>
        </div>
      </form>
    </div>
  );
}
