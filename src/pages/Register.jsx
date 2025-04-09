"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import logo from "../assets/CQTRAILSLOGO.svg"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // En una aplicación real, aquí se llamaría a la API para registrar
      console.log("Register attempt with:", formData)

      // Redirigimos al login después del registro
      navigate("/login")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo">
          <img src={logo || "/placeholder.svg"} alt="CQ Trails Logo" />
        </div>
        <h1 className="auth-title">Crear Cuenta de Administrador</h1>
        <p className="auth-subtitle">Completa el formulario para registrarte</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre completo"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@cqtrails.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Crea una contraseña segura"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="auth-button">
          Crear Cuenta
        </button>
      </form>

      <div className="auth-footer">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="auth-link">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register

