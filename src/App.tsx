import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MultiStepFormPage from "./pages/MultiStepFormPage";
const App: React.FC = () => {
  // Get authentication state from Redux store
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Forgot Password Page */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Multi-Step Form Page (Protected Route) */}
        <Route
          path="/multi-step-form"
          element={
            isAuthenticated ? (
              <MultiStepFormPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Fallback for invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
