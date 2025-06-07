import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import RateLimitDashboard from "./pages/MonitoringPage";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
//import { ProtectedRoutes } from "./utils/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />

      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/log-in" element={<LoginPage />} />
      <Route path="/logs" element={<RateLimitDashboard />} />
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
