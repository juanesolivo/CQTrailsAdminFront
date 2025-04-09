"use client"

import { useState, useEffect } from "react"
import CloseIcon from "@mui/icons-material/Close"

const RoleModal = ({ role, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    NombreRol: "",
    Descripcion: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (role) {
      setFormData({
        NombreRol: role.NombreRol || "",
        Descripcion: role.Descripcion || "",
      })
    }
  }, [role])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.NombreRol.trim()) {
      newErrors.NombreRol = "El nombre del rol es requerido"
    } else if (formData.NombreRol.length > 20) {
      newErrors.NombreRol = "El nombre del rol no puede exceder los 20 caracteres"
    }

    if (formData.Descripcion && formData.Descripcion.length > 200) {
      newErrors.Descripcion = "La descripción no puede exceder los 200 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{role ? "Editar Rol" : "Nuevo Rol"}</h2>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="NombreRol">Nombre del Rol</label>
              <input
                id="NombreRol"
                name="NombreRol"
                type="text"
                value={formData.NombreRol}
                onChange={handleChange}
                placeholder="Ej: Administrador"
                maxLength={20}
              />
              {errors.NombreRol && <span className="error-message">{errors.NombreRol}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="Descripcion">Descripción</label>
              <textarea
                id="Descripcion"
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleChange}
                placeholder="Describe las funciones y responsabilidades de este rol"
                rows={4}
                maxLength={200}
              ></textarea>
              {errors.Descripcion && <span className="error-message">{errors.Descripcion}</span>}
              <div className="character-count">{formData.Descripcion ? formData.Descripcion.length : 0}/200</div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal-submit">
              {role ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RoleModal
