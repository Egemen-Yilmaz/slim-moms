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

  const handleSelectProduct = (product) => {
    // Backend modeline göre title.en veya farklı dildeki ismi inputa yazıyoruz
    setTitle(product.title?.en || product.title || "");
    setSelectedProduct(product);
    setSearchResults([]); // Listeyi kapat
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Eğer kullanıcı listeden seçmediyse ama direkt yazdıysa veya eksik bilgi varsa engelle
    if (!selectedProduct && searchResults.length > 0) {
      // Alternatif: İlk sonucu otomatik seçebiliriz
      handleSelectProduct(searchResults[0]);
      return;
    }

    if (!weight) return;

    // Redux veya API fonksiyonuna gönderiyoruz
    onAddProduct({
      productId: selectedProduct ? selectedProduct._id : null,
      weight: Number(weight),
    });

    // Formu temizle
    setTitle("");
    setWeight("");
    setSelectedProduct(null);
    setSearchResults([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={isMobileFormOpen ? css.mobileFormWrapper : css.formContainer}
    >
      <div style={{ width: "100%", position: "relative" }}>
        <input
          className={css.inputField}
          placeholder="Enter product name"
          value={title}
          onChange={handleTitleChange}
          required
        />

        {/* Canlı Arama Sonuçları Dropdown Menüsü */}
        {searchResults.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "white",
              border: "1px solid #e0e0e0",
              listStyle: "none",
              padding: 0,
              margin: 0,
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 10,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {searchResults.map((product) => (
              <li
                key={product._id}
                onClick={() => handleSelectProduct(product)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                  textAlign: "left",
                }}
                onMouseOver={(e) => (e.target.style.background = "#f5f5f5")}
                onMouseOut={(e) => (e.target.style.background = "white")}
              >
                {product.title?.en || "Unknown Product"}
              </li>
            ))}
          </ul>
        )}
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
