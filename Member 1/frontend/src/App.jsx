import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AIHealthCenter from "./pages/AIHealthCenter";
import ReportsVault from "./pages/ReportsVault";
import Medicines from "./pages/Medicines";
import HealthcareServices from "./pages/HealthcareServices";
import BloodSupport from "./pages/BloodSupport";
import MyHealth from "./pages/MyHealth";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/ai-health-center"
          element={<AIHealthCenter />}
        />

        <Route
          path="/reports-vault"
          element={<ReportsVault />}
        />

        <Route
  path="/reports-vault"
  element={<ReportsVault />}
/>

<Route
  path="/medical-vault"
  element={<ReportsVault />}
/>

        <Route
          path="/medicines"
          element={<Medicines />}
        />

        <Route
          path="/healthcare-services"
          element={<HealthcareServices />}
        />

        <Route
          path="/blood-support"
          element={<BloodSupport />}
        />

        <Route
          path="/my-health"
          element={<MyHealth />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;