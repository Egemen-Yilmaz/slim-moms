import { useState } from "react";
import DailyCaloriesForm from "../../components/forms/DailyCaloriesForm/DailyCaloriesForm";
import Modal from "../../components/common/Modal/Modal";

export default function CalculatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpenModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  // Backend'den gelebilecek farklı varyasyonları (res.data veya res.data.data) güvenli okuma kılavuzu
  const getCalorieIntake = () => {
    if (!modalData) return 0;
    // userDiet objesinin içinden veya doğrudan root'tan kalori değerini yakala
    return (
      modalData.dailyCalorieIntake ||
      modalData.userDiet?.dailyCalorieIntake ||
      modalData.dailyCalories ||
      0
    );
  };

  const getNotAllowedProducts = () => {
    if (!modalData) return [];
    return (
      modalData.notAllowedProducts ||
      modalData.userDiet?.notAllowedProducts ||
      []
    );
  };

  return (
    <section
      style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}
    >
      <DailyCaloriesForm openModal={handleOpenModal} isPrivate={true} />

      {isModalOpen && modalData && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2
              style={{
                color: "#212121",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Your recommended daily calorie intake is
            </h2>
            <p
              style={{
                fontSize: "44px",
                fontWeight: "bold",
                color: "#fc842c",
                margin: "20px 0",
              }}
            >
              {getCalorieIntake()}{" "}
              <span style={{ fontSize: "18px" }}>kcal</span>
            </p>
            <hr
              style={{
                border: "0",
                borderTop: "1px solid #e0e0e0",
                margin: "20px 0",
              }}
            />

            <h3
              style={{
                fontSize: "16px",
                textAlign: "left",
                marginBottom: "12px",
                fontWeight: "bold",
                color: "#212121",
              }}
            >
              Foods you should not eat:
            </h3>

            {getNotAllowedProducts().length > 0 ? (
              <ul
                style={{
                  textAlign: "left",
                  maxHeight: "180px",
                  overflowY: "auto",
                  paddingLeft: "20px",
                  color: "#9b9b9b",
                }}
              >
                {getNotAllowedProducts()
                  .slice(0, 10)
                  .map((product, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: "6px", fontSize: "14px" }}
                    >
                      {typeof product === "object"
                        ? product.title?.en ||
                          product.name ||
                          JSON.stringify(product)
                        : product}
                    </li>
                  ))}
                {getNotAllowedProducts().length > 10 && (
                  <li
                    style={{
                      color: "#fc842c",
                      fontStyle: "italic",
                      fontSize: "13px",
                      marginTop: "4px",
                    }}
                  >
                    and {getNotAllowedProducts().length - 10} more products...
                  </li>
                )}
              </ul>
            ) : (
              <p
                style={{
                  textAlign: "left",
                  color: "#9b9b9b",
                  fontStyle: "italic",
                  fontSize: "14px",
                }}
              >
                No restrictions found for your profile!
              </p>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
