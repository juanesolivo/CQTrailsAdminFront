"use client"

import { useState, useEffect } from "react"
import CityModal from "../components/city-components/CityModal"
import DeleteCityModal from "../components/city-components/DeleteCityModal"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import BlockIcon from "@mui/icons-material/Block"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import LocationCityIcon from "@mui/icons-material/LocationCity"

const CityManagement = () => {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCityModal, setShowCityModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentCity, setCurrentCity] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [citiesPerPage] = useState(10)
  const [statusFilter, setStatusFilter] = useState("all")

  // Datos de ejemplo
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockCities = [
        {
          IdCiudad: 1,
          Nombre: "Santiago",
          Estado: "Activo",
        },
        {
          IdCiudad: 2,
          Nombre: "Valparaíso",
          Estado: "Activo",
        },
        {
          IdCiudad: 3,
          Nombre: "Concepción",
          Estado: "Activo",
        },
        {
          IdCiudad: 4,
          Nombre: "La Serena",
          Estado: "Inactivo",
        },
        {
          IdCiudad: 5,
          Nombre: "Antofagasta",
          Estado: "Activo",
        },
        {
          IdCiudad: 6,
          Nombre: "Temuco",
          Estado: "Activo",
        },
        {
          IdCiudad: 7,
          Nombre: "Puerto Montt",
          Estado: "Inactivo",
        },
        {
          IdCiudad: 8,
          Nombre: "Arica",
          Estado: "Activo",
        },
      ]
      setCities(mockCities)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrar ciudades por búsqueda y estado
  const filteredCities = cities.filter((city) => {
    const searchMatch = city.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const statusMatch = statusFilter === "all" || city.Estado.toLowerCase() === statusFilter.toLowerCase()
    return searchMatch && statusMatch
  })

  // Paginación
  const indexOfLastCity = currentPage * citiesPerPage
  const indexOfFirstCity = indexOfLastCity - citiesPerPage
  const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity)
  const totalPages = Math.ceil(filteredCities.length / citiesPerPage)

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault()
    // La búsqueda ya se aplica automáticamente con el estado searchTerm
  }

  const handleAddCity = () => {
    setCurrentCity(null)
    setShowCityModal(true)
  }

  const handleEditCity = (city) => {
    setCurrentCity(city)
    setShowCityModal(true)
  }

  const handleDeleteCity = (city) => {
    setCurrentCity(city)
    setShowDeleteModal(true)
  }

  const handleToggleActive = (city) => {
    // En una aplicación real, esto llamaría a la API
    const updatedCities = cities.map((c) => {
      if (c.IdCiudad === city.IdCiudad) {
        return { ...c, Estado: c.Estado === "Activo" ? "Inactivo" : "Activo" }
      }
      return c
    })
    setCities(updatedCities)
  }

  const handleSaveCity = (cityData) => {
    if (currentCity) {
      // Actualizar ciudad existente
      const updatedCities = cities.map((city) =>
        city.IdCiudad === currentCity.IdCiudad ? { ...city, ...cityData } : city,
      )
      setCities(updatedCities)
    } else {
      // Crear nueva ciudad
      const newCity = {
        IdCiudad: cities.length + 1,
        ...cityData,
        Estado: "Activo",
      }
      setCities([...cities, newCity])
    }
    setShowCityModal(false)
  }

  const handleConfirmDelete = () => {
    // En una aplicación real, esto llamaría a la API
    const updatedCities = cities.filter((city) => city.IdCiudad !== currentCity.IdCiudad)
    setCities(updatedCities)
    setShowDeleteModal(false)
  }

  return (
    <div className="city-management">
      <div className="user-actions">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar ciudades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <SearchIcon fontSize="small" />
            Buscar
          </button>
        </form>

        <div className="filter-container">
          <span>Estado:</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-filter">
            <option value="all">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <button className="add-button" onClick={handleAddCity}>
          <AddIcon fontSize="small" />
          Nueva Ciudad
        </button>
      </div>

      {loading ? (
        <p>Cargando ciudades...</p>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentCities.map((city) => (
                <tr key={city.IdCiudad}>
                  <td>{city.IdCiudad}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LocationCityIcon fontSize="small" style={{ color: "var(--primary-color)" }} />
                      {city.Nombre}
                    </div>
                  </td>
                  <td>
                    <span className={`user-status ${city.Estado === "Activo" ? "active" : "inactive"}`}>
                      {city.Estado}
                    </span>
                  </td>
                  <td>
                    <div className="user-actions-cell">
                      <button className="action-button edit-button" onClick={() => handleEditCity(city)}>
                        <EditIcon fontSize="small" />
                        Editar
                      </button>
                      <button className="action-button delete-button" onClick={() => handleDeleteCity(city)}>
                        <DeleteIcon fontSize="small" />
                        Eliminar
                      </button>
                      <button
                        className={`action-button ${
                          city.Estado === "Activo" ? "deactivate-button" : "activate-button"
                        }`}
                        onClick={() => handleToggleActive(city)}
                      >
                        {city.Estado === "Activo" ? (
                          <>
                            <BlockIcon fontSize="small" />
                            Desactivar
                          </>
                        ) : (
                          <>
                            <CheckCircleIcon fontSize="small" />
                            Activar
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-button ${currentPage === page ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {showCityModal && (
        <CityModal city={currentCity} onSave={handleSaveCity} onClose={() => setShowCityModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteCityModal city={currentCity} onConfirm={handleConfirmDelete} onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  )
}

export default CityManagement
