import css from "./DiaryProductListItem.module.css";

export default function DiaryProductsListItem({ item, onDeleteProduct }) {
  const recordId = item._id || item.id;

  return (
    <li className={css.diaryItemRow}>
      {/* Ürün Adı */}
      <span className={css.diaryItemName}>
        {item.title?.en || "Unknown Product"}
      </span>

      {/* Gramaj */}
      <span className={css.diaryItemWeight}>{item.weight} g</span>

      {/* Kalori */}
      <span className={css.diaryItemCalories}>
        {item.calories} <span className={css.diaryItemUnit}>kcal</span>
      </span>

      {/* Silme Butonu */}
      <button
        type="button"
        className={css.diaryItemDelete}
        onClick={() => onDeleteProduct(recordId)}
      >
        ✕
      </button>
    </li>
  );
}
