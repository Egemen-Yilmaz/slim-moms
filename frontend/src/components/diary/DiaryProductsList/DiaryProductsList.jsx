import DiaryProductsListItem from "../DiaryProductsListItem/DiaryProductListItem";
export default function DiaryProductsList({ eatenProducts, onDeleteProduct }) {
  if (!eatenProducts || eatenProducts.length === 0) {
    return (
      <p style={{ color: "#9b9b9b", fontStyle: "italic", marginTop: "20px" }}>
        You haven't eaten anything on this date yet.
      </p>
    );
  }

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        maxHeight: "350px",
        overflowY: "auto",
      }}
    >
      {eatenProducts.map((item) => {
        const recordId = item._id || item.id;

        return (
          <DiaryProductsListItem
            key={recordId}
            item={item}
            onDeleteProduct={onDeleteProduct}
          />
        );
      })}
    </ul>
  );
}
