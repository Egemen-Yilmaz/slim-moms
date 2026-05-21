import { useState, useRef } from "react";
import { searchProducts } from "../../../api/diary";
import css from "../../../pages/DiaryPage/DiaryPage.module.css";

export default function DiaryAddProductForm({
  onAddProduct,
  isMobileFormOpen,
}) {
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const debounceRef = useRef(null);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (selectedProduct) setSelectedProduct(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) {
      setSearchResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchProducts(value);
        setSearchResults(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !weight) return;
    onAddProduct({ productId: selectedProduct._id, weight: Number(weight) });
    setTitle("");
    setWeight("");
    setSelectedProduct(null);
    setSearchResults([]);
  };

  return (
    // Form tag'ini şu şekilde güncelle
    <form
      onSubmit={handleSubmit}
      className={isMobileFormOpen ? css.mobileFormWrapper : css.formContainer}
    >
      {/* Mobilde 'flex: 2' kuralı bozuyordu, onu sildik */}
      <div style={{ width: "100%", position: "relative" }}>
        <input
          className={css.inputField}
          placeholder="Enter product name"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <input
        className={css.gramsInput}
        type="number"
        placeholder="Grams"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        min="1"
        required
      />

      <button
        type="submit"
        className={`${css.submitBtn} ${isMobileFormOpen ? css.mobileBtn : ""}`}
      >
        {isMobileFormOpen ? "Add" : "+"}
      </button>
    </form>
  );
}
