import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Sayfa Seviyesinde Yükleme Spinner'ı (Loader altyapımızla entegre olana kadar geçici şık bir görsel alan)
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "Verdana, sans-serif",
      color: "#fc842c",
      fontWeight: "bold",
    }}
  >
    Loading Slim Moms...
  </div>
);

// Düzen bileşenleri (Layouts) dinamik değil, doğrudan import kalmalı
import PublicLayout from "./layouts/PublicLayout/PublicLayout.jsx";
import PrivateLayout from "./layouts/PrivateLayout/PrivateLayout.jsx";
import PrivateRoute from "./routes/PrivateRoute";

// SAYFALARI LAZY LOAD İLE YÜKLÜYORUZ (Sadece rota çağrıldığında indirilecekler)
const MainPage = lazy(() => import("./pages/MainPage/MainPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage.jsx"),
);
const DiaryPage = lazy(() => import("./pages/DiaryPage/DiaryPage.jsx"));
const CalculatorPage = lazy(
  () => import("./pages/CalculatorPage/CalculatorPage.jsx"),
);

export default function App() {
  return (
    /* Suspense bileşeni, lazy sayfalar arka planda indirilirken fallback alanını gösterir */
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* KAMUYA AÇIK ROTALAR */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>

        {/* GİRİŞ YAPMIŞ KULLANICIYA ÖZEL ROTALAR */}
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
    </Suspense>
  );
}
