import { Routes, Route, Navigate } from "react-router-dom";

function MainPage() {
  return <h1>Main Page</h1>;
}

function LoginPage() {
  return <h1>Login Page</h1>;
}

function RegistrationPage() {
  return <h1>Registration Page</h1>;
}

function DiaryPage() {
  return <h1>Diary Page</h1>;
}

function CalculatorPage() {
  return <h1>Calculator Page</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/calculator" element={<CalculatorPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
