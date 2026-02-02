import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import History from "./components/History";
import Help from "./components/Help";
import Notifications from "./components/Notifications";
import Navbar from "./components/Navbar";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ManageAlerts from "./components/ManageAlerts";
import ManageHospitals from "./components/ManageHospitals";
import ManageDiseases from "./components/ManageDiseases";
import UserActivity from "./components/UserActivity";
import AdminGuard from "./components/AdminGuard";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* User */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/history" element={<History />} />
        <Route path="/help" element={<Help />} />
        <Route path="/alerts" element={<Notifications />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin/dashboard"
          element={<AdminGuard><AdminDashboard /></AdminGuard>}
        />

        <Route path="/admin/alerts"
          element={<AdminGuard><ManageAlerts /></AdminGuard>}
        />

        <Route path="/admin/hospitals"
          element={<AdminGuard><ManageHospitals /></AdminGuard>}
        />

        <Route path="/admin/diseases"
          element={<AdminGuard><ManageDiseases /></AdminGuard>}
        />

        <Route path="/admin/users"
          element={<AdminGuard><UserActivity /></AdminGuard>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
