import { Link } from "react-router-dom"
import logo from "../../assets/CQTRAILSLOGO.svg"
// Importamos los iconos de Material UI
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import BusinessIcon from "@mui/icons-material/Business"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import EventNoteIcon from "@mui/icons-material/EventNote"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import LocationCityIcon from "@mui/icons-material/LocationCity"

const Sidebar = ({ activePath }) => {
  const menuItems = [
    { id: "", path: "/", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "users", path: "/users", label: "Usuarios", icon: <PeopleIcon /> },
    { id: "companies", path: "/companies", label: "Empresas", icon: <BusinessIcon /> },
    { id: "cities", path: "/cities", label: "Ciudades", icon: <LocationCityIcon /> },
    { id: "vehicles", path: "/vehicles", label: "Vehículos", icon: <DirectionsCarIcon /> },
    { id: "reservations", path: "/reservations", label: "Reservas", icon: <EventNoteIcon /> },
    { id: "roles", path: "/roles", label: "Roles y Permisos", icon: <AdminPanelSettingsIcon /> },
  //  { id: "settings", path: "/settings", label: "Configuración", icon: <SettingsIcon /> },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logo || "/placeholder.svg"} alt="CQ Trails Logo" />
        </div>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <Link key={item.id} to={item.path} className={`sidebar-menu-item ${activePath === item.id ? "active" : ""}`}>
            <span className="sidebar-menu-item-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

