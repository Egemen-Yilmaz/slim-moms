import { useState } from "react";

import DiaryDateCalendar from "../../components/diary/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/forms/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/diary/DiaryProductsList/DiaryProductsList";

import css from "./DiaryPage.module.css";

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className={css.page}>
      {/* DATE SELECTOR */}
      <DiaryDateCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* ADD PRODUCT */}
      <DiaryAddProductForm
        selectedDate={selectedDate}
        onSuccess={triggerRefresh}
      />

      {/* LIST */}
      <DiaryProductsList
        selectedDate={selectedDate}
        refresh={refresh}
        onChange={triggerRefresh}
      />
    </div>
  );
}
