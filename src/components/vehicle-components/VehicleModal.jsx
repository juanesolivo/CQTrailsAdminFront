"use client"

import { useState, useEffect } from "react"
import CloseIcon from "@mui/icons-material/Close"
import ImageIcon from "@mui/icons-material/Image"
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal"
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

const VehicleModal = ({ vehicle, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    anio: new Date().getFullYear(),
    tipo: "Sedán",
    capacidad: 5,
    precio: 0,
    imagenes: [
      { tipo: "general", file: null, preview: null },
      { tipo: "interior", file: null, preview: null },
      { tipo: "lateral", file: null, preview: null },
    ],
  })
  const [errors, setErrors] = useState({})
  const [imagesComplete, setImagesComplete] = useState(false)

  const tiposVehiculo = ["Sedán", "SUV", "Hatchback", "Pickup", "Minivan", "Deportivo", "Otro"]

  useEffect(() => {
    if (vehicle) {
      // Si estamos editando, convertimos las URLs a previews
      const imagenes = [
        { tipo: "general", file: null, preview: vehicle.imagenes[0].url },
        { tipo: "interior", file: null, preview: vehicle.imagenes[1].url },
        { tipo: "lateral", file: null, preview: vehicle.imagenes[2].url },
      ]

      setFormData({
        placa: vehicle.placa || "",
        modelo: vehicle.modelo || "",
        anio: vehicle.anio || new Date().getFullYear(),
        tipo: vehicle.tipo || "Sedán",
        capacidad: vehicle.capacidad || 5,
        precio: vehicle.precio || 0,
        imagenes,
      })

      setImagesComplete(true)
    }
  }, [vehicle])

  useEffect(() => {
    // Verificar si todas las imágenes están completas
    const allImagesSelected = formData.imagenes.every((img) => img.file !== null || img.preview !== null)
    setImagesComplete(allImagesSelected)
  }, [formData.imagenes])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "anio" || name === "capacidad" || name === "precio" ? Number.parseInt(value, 10) || 0 : value,
    })
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const newImagenes = [...formData.imagenes]
      newImagenes[index] = {
        ...newImagenes[index],
        file: file,
        preview: reader.result,
      }

      setFormData({
        ...formData,
        imagenes: newImagenes,
      })
    }
    reader.readAsDataURL(file)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.placa.trim()) {
      newErrors.placa = "La placa es requerida"
    }

    if (!formData.modelo.trim()) {
      newErrors.modelo = "El modelo es requerido"
    }

    if (!formData.anio || formData.anio < 1900 || formData.anio > new Date().getFullYear() + 1) {
      newErrors.anio = "El año debe ser válido"
    }

    if (!formData.capacidad || formData.capacidad < 1) {
      newErrors.capacidad = "La capacidad debe ser al menos 1"
    }

    if (!formData.precio || formData.precio <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0"
    }

    if (!imagesComplete) {
      newErrors.imagenes = "Se requieren las 3 imágenes (general, interior y lateral)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // En una aplicación real, aquí se subirían las imágenes a un servicio
      // y se obtendrían las URLs. Para este ejemplo, simulamos ese proceso.

      // Preparar los datos para guardar
      const vehicleData = {
        ...formData,
        // Convertir los archivos a URLs (en una app real, estas serían las URLs devueltas por el servicio)
        imagenes: formData.imagenes.map((img) => ({
          tipo: img.tipo,
          url: img.preview || (vehicle && vehicle.imagenes.find((i) => i.tipo === img.tipo)?.url) || "/placeholder.svg",
        })),
      }

      onSave(vehicleData)
    }
  }

  const getImageIcon = (tipo) => {
    switch (tipo) {
      case "general":
        return <ImageIcon />
      case "interior":
        return <AirlineSeatReclineNormalIcon />
      case "lateral":
        return <DirectionsCarFilledIcon />
      default:
        return <ImageIcon />
    }
  }

  const getImageLabel = (tipo) => {
    switch (tipo) {
      case "general":
        return "Vista General"
      case "interior":
        return "Interior"
      case "lateral":
        return "Vista Lateral"
      default:
        return "Imagen"
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal vehicle-modal">
        <div className="modal-header">
          <h2 className="modal-title">{vehicle ? "Editar Vehículo" : "Nuevo Vehículo"}</h2>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="placa">Placa</label>
                <input
                  id="placa"
                  name="placa"
                  type="text"
                  value={formData.placa}
                  onChange={handleChange}
                  placeholder="ABC123"
                />
                {errors.placa && <span className="error-message">{errors.placa}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="anio">Año</label>
                <input
                  id="anio"
                  name="anio"
                  type="number"
                  value={formData.anio}
                  onChange={handleChange}
                  placeholder="2023"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
                {errors.anio && <span className="error-message">{errors.anio}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input
                  id="modelo"
                  name="modelo"
                  type="text"
                  value={formData.modelo}
                  onChange={handleChange}
                  placeholder="Toyota Corolla"
                />
                {errors.modelo && <span className="error-message">{errors.modelo}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="precio">Precio (USD)</label>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="25000"
                  min="0"
                />
                {errors.precio && <span className="error-message">{errors.precio}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipo">Tipo de Vehículo</label>
                <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange}>
                  {tiposVehiculo.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="capacidad">Capacidad (pasajeros)</label>
                <input
                  id="capacidad"
                  name="capacidad"
                  type="number"
                  value={formData.capacidad}
                  onChange={handleChange}
                  placeholder="5"
                  min="1"
                />
                {errors.capacidad && <span className="error-message">{errors.capacidad}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Imágenes del Vehículo</label>
              <p className="image-help-text">Se requieren exactamente 3 imágenes: vista general, interior y lateral.</p>
              {errors.imagenes && <span className="error-message">{errors.imagenes}</span>}

              <div className="vehicle-images-upload">
                {formData.imagenes.map((imagen, index) => (
                  <div key={imagen.tipo} className="image-upload-container">
                    <label htmlFor={`imagen-${imagen.tipo}`} className="image-upload-label">
                      {getImageIcon(imagen.tipo)}
                      <span>{getImageLabel(imagen.tipo)}</span>
                      <div className="image-upload-preview">
                        {imagen.preview ? (
                          <img
                            src={imagen.preview || "/placeholder.svg"}
                            alt={`Vista previa - ${getImageLabel(imagen.tipo)}`}
                          />
                        ) : (
                          <div className="no-image">Sin imagen</div>
                        )}
                      </div>
                      <input
                        type="file"
                        id={`imagen-${imagen.tipo}`}
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        className="image-upload-input"
                      />
                      <button type="button" className="select-image-button">
                        Seleccionar imagen
                      </button>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal-submit">
              {vehicle ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VehicleModal
