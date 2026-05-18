import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout/PublicLayout";
import PrivateLayout from "./components/PrivateLayout/PrivateLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Route>
    </Routes>
  );
}
