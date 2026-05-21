

export default function DiaryProductsList({ eatenProducts, onDeleteProduct }) {
  if (!eatenProducts || eatenProducts.length === 0) {
    return <p style={{ color: '#9b9b9b', fontStyle: 'italic', marginTop: '20px' }}>You haven't eaten anything on this date yet.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '350px', overflowY: 'auto' }}>
      {eatenProducts.map((item) => {
        // Backend'den dönen id'nin hangi anahtarda olduğunu garantiye alalım (_id veya id)
        const recordId = item._id || item.id;

        return (
          <li key={recordId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #e0e0e0', gap: '10px' }}>
            <span style={{ flex: 3, textAlign: 'left', color: '#212121' }}>{item.title?.en || 'Unknown Product'}</span>
            <span style={{ flex: 1, textAlign: 'right', color: '#9b9b9b' }}>{item.weight} g</span>
            <span style={{ flex: 1, textAlign: 'right', fontWeight: '500', color: '#212121' }}>{item.calories} kcal</span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: '#9b9b9b', cursor: 'pointer', fontSize: '16px', padding: '0 10px' }}
              onClick={() => onDeleteProduct(recordId)} // Burası recordId'yi yukarı fırlatmalı
            >
              ✕
            </button>
          </li>
        );
      })}
    </ul>
  );
}