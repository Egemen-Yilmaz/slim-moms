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
      const payload = {
        weight: Number(formData.weight),
        height: Number(formData.height),
        age: Number(formData.age),
        targetWeight: Number(formData.targetWeight),
        bloodType: Number(formData.bloodType),
      };

      const res = await api.post("/products/public-calorie", payload);

      const calorieValue = res.data.data;

      openModal(calorieValue);

      toast.success("Calculation completed");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Calculate your daily calorie intake now</h1>

      <form onSubmit={handleSubmit}>
        <input name="height" placeholder="Height" onChange={handleChange} />
        <input name="age" placeholder="Age" onChange={handleChange} />
        <input name="weight" placeholder="Weight" onChange={handleChange} />
        <input
          name="targetWeight"
          placeholder="Target Weight"
          onChange={handleChange}
        />

        <select name="bloodType" onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <button disabled={loading}>
          {loading ? "Loading..." : "Start losing weight"}
        </button>
      </form>
    </div>
  );
}
