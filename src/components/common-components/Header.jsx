"use client"
import LogoutIcon from "@mui/icons-material/Logout"

const Header = ({ title, onLogout }) => {
  return (
    <header className="main-header">
      <h1 className="main-title">{title}</h1>
      <div className="main-actions">
        <button className="logout-button" onClick={onLogout}>
          <LogoutIcon fontSize="small" />
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}

export default Header

