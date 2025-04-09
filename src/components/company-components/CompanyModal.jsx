"use client"

import { useState, useEffect } from "react"
import CloseIcon from "@mui/icons-material/Close"

const CompanyModal = ({ company, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    Nombre: "",
    ContactoEmail: "",
    ContactoTelefono: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (company) {
      setFormData({
        Nombre: company.Nombre || "",
        ContactoEmail: company.ContactoEmail || "",
        ContactoTelefono: company.ContactoTelefono || "",
      })
    }
  }, [company])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.Nombre.trim()) {
      newErrors.Nombre = "El nombre de la empresa es requerido"
    }

    if (!formData.ContactoEmail) {
      newErrors.ContactoEmail = "El correo electrónico de contacto es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.ContactoEmail)) {
      newErrors.ContactoEmail = "El correo electrónico no es válido"
    }

    if (!formData.ContactoTelefono.trim()) {
      newErrors.ContactoTelefono = "El teléfono de contacto es requerido"
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
          <h2 className="modal-title">{company ? "Editar Empresa" : "Nueva Empresa"}</h2>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="Nombre">Nombre de la Empresa</label>
              <input
                id="Nombre"
                name="Nombre"
                type="text"
                value={formData.Nombre}
                onChange={handleChange}
                placeholder="Nombre de la empresa"
              />
              {errors.Nombre && <span className="error-message">{errors.Nombre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="ContactoEmail">Email de Contacto</label>
              <input
                id="ContactoEmail"
                name="ContactoEmail"
                type="email"
                value={formData.ContactoEmail}
                onChange={handleChange}
                placeholder="contacto@empresa.com"
              />
              {errors.ContactoEmail && <span className="error-message">{errors.ContactoEmail}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="ContactoTelefono">Teléfono de Contacto</label>
              <input
                id="ContactoTelefono"
                name="ContactoTelefono"
                type="text"
                value={formData.ContactoTelefono}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
              />
              {errors.ContactoTelefono && <span className="error-message">{errors.ContactoTelefono}</span>}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal-submit">
              {company ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyModal
