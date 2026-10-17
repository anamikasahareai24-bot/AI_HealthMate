import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HealthProfile from "./pages/HealthProfile.jsx";
import DiseasePrediction from "./pages/DiseasePrediction.jsx";
import Medicines from "./pages/Medicines.jsx";
import ReportAnalyzer from "./pages/ReportAnalyzer.jsx";
import HealthcareServices from "./pages/HealthcareServices.jsx";
import BloodSupport from "./pages/BloodSupport.jsx";
import MyHealth from "./pages/MyHealth.jsx";
import MedicalVault from "./pages/MedicalVault.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";

// Authentication
import Auth from "./pages/Auth.jsx";
import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext.jsx";

// Components
import Sidebar from "./components/Sidebar.jsx";

// Global CSS
import "./styles/global.css";


// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  // Authentication check chal raha hai
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-card">
          <div className="loading-heart">
            ♥
          </div>

          <h2>AI HealthMate</h2>

          <p>
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  // Login nahi hai
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: "/profile",
        }}
      />
    );
  }

  // Login hai
  return children;
}


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        {/* ===============================
            SIDEBAR
        =============================== */}

        <Sidebar />


        {/* ===============================
            ROUTES
        =============================== */}

        <Routes>


          {/* ===============================
              HOME
          =============================== */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* ===============================
              AUTH
              SIGN IN + SIGN UP
          =============================== */}

          <Route
            path="/auth"
            element={<Auth />}
          />


          {/* ===============================
              DASHBOARD
          =============================== */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* ===============================
              HEALTH PROFILE
          =============================== */}

          <Route
            path="/health-profile"
            element={<HealthProfile />}
          />
{/* ===============================
              DISEASE PREDICTION
          =============================== */}

          <Route
            path="/disease-prediction"
            element={<DiseasePrediction />}
          />


          {/* ===============================
              MEDICINE ASSISTANT
          =============================== */}

          <Route
            path="/medicines"
            element={<Medicines />}
          />


          {/* ===============================
              REPORT ANALYZER
          =============================== */}

          <Route
            path="/report-analyzer"
            element={<ReportAnalyzer />}
          />


          {/* ===============================
              HEALTHCARE SERVICES
          =============================== */}

          <Route
            path="/healthcare-services"
            element={<HealthcareServices />}
          />


          {/* ===============================
              BLOOD SUPPORT
          =============================== */}

          <Route
            path="/blood-support"
            element={<BloodSupport />}
          />


          {/* ===============================
              MY HEALTH
          =============================== */}

          <Route
            path="/my-health"
            element={<MyHealth />}
          />


          {/* ===============================
              HEALTH TRACKING
          =============================== */}

         


          {/* ===============================
              MEDICAL VAULT
          =============================== */}

          <Route
            path="/medical-vault"
            element={<MedicalVault />}
          />


          {/* ===============================
              PROFILE
              LOGIN REQUIRED
          =============================== */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />


          {/* ===============================
              ABOUT
          =============================== */}

          <Route
            path="/about"
            element={<About />}
          />


          {/* ===============================
              WRONG URL
          =============================== */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;