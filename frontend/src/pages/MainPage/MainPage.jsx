import { useState } from "react";

import DailyCaloriesForm from "../../components/forms/DailyCaloriesForm/DailyCaloriesForm";

import Modal from "../../components/common/Modal/Modal";

import DailyCalorieIntake from "../../components/DailyCalorieIntake/DailyCalorieIntake";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [result, setResult] = useState(null);

  const openModal = (data) => {
    setResult(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <DailyCaloriesForm openModal={openModal} />

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <DailyCalorieIntake data={result} />
        </Modal>
      )}
    </div>
  );
}
