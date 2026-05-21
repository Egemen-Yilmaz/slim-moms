import { useState, useRef } from 'react';
import { searchProducts } from '../../../api/diary';

export default function DiaryAddProductForm({ onAddProduct }) {
  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState('');
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

    // Güvenli debounced asenkron API çağrısı
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchProducts(value);
        setSearchResults(res.data.data || []);
      } catch (err) {
        console.error('Ürün arama hatası:', err);
      }
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !weight) return;

    onAddProduct({
      productId: selectedProduct._id,
      weight: Number(weight),
    });

    setTitle('');
    setWeight('');
    setSelectedProduct(null);
    setSearchResults([]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', marginBottom: '30px', position: 'relative', zIndex: 50 }}>
      <div style={{ position: 'relative', flex: 2 }}>
        <input
          type="text"
          placeholder="Enter product name"
          style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none' }}
          value={title}
          onChange={handleTitleChange}
          required
        />
        
        {/* Arama Sonuçları Açılır Menüsü */}
        {searchResults.length > 0 && (
          <ul style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'white', border: '1px solid #e0e0e0', maxHeight: '200px', overflowY: 'auto', listStyle: 'none', padding: 0, margin: 0, boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
            {searchResults.map((product) => (
              <li
                key={product._id}
                style={{ padding: '10px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #f5f5f5' }}
                onClick={() => {
                  setTitle(product.title.en || product.title.ua || product.title.ru);
                  setSelectedProduct(product);
                  setSearchResults([]);
                }}
              >
                {product.title.en} ({product.calories} kcal / 100g)
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="number"
        placeholder="Grams"
        style={{ flex: 1, padding: '10px 0', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', textAlign: 'right' }}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        min="1"
        required
      />

      <button 
        type="submit" 
        disabled={!selectedProduct}
        style={{ background: selectedProduct ? '#fc842c' : '#ccc', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontSize: '24px', cursor: selectedProduct ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifycontent: 'center' }}
      >
        +
      </button>
    </form>
  );
}