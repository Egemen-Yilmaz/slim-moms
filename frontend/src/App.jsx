import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout/PublicLayout";
import PrivateLayout from "./components/PrivateLayout/PrivateLayout";

import MainPage from "./pages/MainPage/MainPage";
import DiaryPage from "./pages/DiaryPage/DiaryPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/diary" element={<DiaryPage />} />
      </Route>
    </Routes>
  );
}
