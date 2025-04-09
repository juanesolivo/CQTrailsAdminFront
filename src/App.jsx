import { Routes, Route, Navigate } from "react-router-dom"
import "./App.css"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import UserManagement from "./pages/UserManagement"
import CompanyManagement from "./pages/CompanyManagement"
import ReservationManagement from "./pages/ReservationManagement"
import RoleManagement from "./pages/RoleManagement"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import VehicleManagement from "./pages/VehicleManagement"
import CityManagement from "./pages/CityManagement"


const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="companies" element={<CompanyManagement />} />
          <Route path="cities" element={<CityManagement />} />
          <Route path="reservations" element={<ReservationManagement />} />
          <Route path="vehicles" element={<VehicleManagement />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="settings" element={<div>Página de Configuración (En desarrollo)</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
