import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  // En una aplicación real, verificaríamos el token JWT o la sesión
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

