import { useState } from "react";

import DailyCaloriesForm from "../../components/forms/DailyCaloriesForm/DailyCaloriesForm.jsx";

import Modal from "../../components/common/Modal/Modal";

import DailyCalorieIntake from "../../components/DailyCalorieIntake/DailyCalorieIntake";

export default function CalculatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [result, setResult] = useState(null);

  const openModal = (data) => {
    const formattedData = {
      dailyCalorieIntake: data.dailyCalorieIntake || data.dailyRate, // Her iki ihtimali de garantiye aldık
      notAllowedProducts: data.notAllowedProducts,
    };

    setResult(formattedData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Private alan olduğu için isPrivate prop'unu true olarak geçiyoruz */}
      <DailyCaloriesForm openModal={openModal} isPrivate={true} />

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          {/* showRegisterBtn prop'unu false geçerek bu sayfadaki modalda butonun çıkmasını engelliyoruz */}
          <DailyCalorieIntake data={result} showRegisterBtn={false} />
        </Modal>
      )}
    </div>
  );
}
