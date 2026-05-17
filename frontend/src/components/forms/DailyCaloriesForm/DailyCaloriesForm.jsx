import { useState } from "react";

import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";

import DailyCalorieIntake from "../../DailyCalorieIntake/DailyCalorieIntake";

function DailyCaloriesForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Calculate your daily calorie intake right now</h1>

      <form>
        <input type="number" placeholder="Height" />

        <input type="number" placeholder="Age" />

        <input type="number" placeholder="Current weight" />

        <input type="number" placeholder="Desired weight" />

        <Button type="button" onClick={handleOpenModal}>
          Start losing weight
        </Button>
      </form>

      {isModalOpen && (
        <Modal>
          <DailyCalorieIntake />
        </Modal>
      )}
    </div>
  );
}

export default DailyCaloriesForm;
