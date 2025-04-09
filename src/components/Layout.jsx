import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { useLocation, useNavigate } from "react-router-dom"

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname.split("/")[1] || "dashboard"

  const handleLogout = () => {
    // En una aplicación real, aquí se llamaría a la API para cerrar sesión
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  return (
    <div className="app-layout">
      <Sidebar activePath={currentPath} />
      <div className="main-content">
        <Header title={getPageTitle(currentPath)} onLogout={handleLogout} />
        <div className="main-body">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

// Función para obtener el título de la página según la ruta actual
const getPageTitle = (path) => {
  const titles = {
    dashboard: "Dashboard",
    users: "Gestión de Usuarios",
    companies: "Gestión de Empresas",
    vehicles: "Gestión de Vehículos",
    reservations: "Gestión de Reservas",
    reports: "Reportes",
    settings: "Configuración",
  }

  return titles[path] || "Dashboard"
}

export default Layout

