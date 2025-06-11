import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import RateLimitDashboard from "./pages/MonitoringPage";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import DashboardRedirect from "./pages/redirect/DashboardRedirect";
//import { ProtectedRoutes } from "./utils/ProtectedRoutes";

function App() {
  return (
    <>
      <Toaster />
    
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <DashboardRedirect />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/:username/:recipeId?"
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
    </>
  );
}

export default App;
