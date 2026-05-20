import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout/PublicLayout.jsx";
import PrivateLayout from "./components/PrivateLayout/PrivateLayout.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import DiaryPage from "./pages/DiaryPage/DiaryPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage.jsx";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Route>
    </Routes>
  );
}
