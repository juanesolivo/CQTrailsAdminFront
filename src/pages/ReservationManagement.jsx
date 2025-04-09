"use client"

import { useState, useEffect } from "react"
import ReservationDetailModal from "../components/ReservationDetailModal"
import ReservationStatusModal from "../components/ReservationStatusModal"
import SearchIcon from "@mui/icons-material/Search"
import VisibilityIcon from "@mui/icons-material/Visibility"
import EditIcon from "@mui/icons-material/Edit"
import FilterListIcon from "@mui/icons-material/FilterList"
import EventIcon from "@mui/icons-material/Event"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LocationOnIcon from "@mui/icons-material/LocationOn"

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [currentReservation, setCurrentReservation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [reservationsPerPage] = useState(10)
  const [statusFilter, setStatusFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Datos de ejemplo
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockCities = [
        { IdCiudad: 1, Nombre: "Santiago", Estado: "Activo" },
        { IdCiudad: 2, Nombre: "Valparaíso", Estado: "Activo" },
        { IdCiudad: 3, Nombre: "Concepción", Estado: "Activo" },
        { IdCiudad: 4, Nombre: "La Serena", Estado: "Inactivo" },
        { IdCiudad: 5, Nombre: "Antofagasta", Estado: "Activo" },
      ]

      const mockReservations = [
        {
          IdReservacion: 1,
          IdUsuario: 3,
          IdEmpleado: 2,
          IdEmpresa: 1,
          IdCiudadOrigen: 1,
          IdCiudadDestino: 2,
          FechaInicio: "2023-04-15T08:00:00",
          FechaFin: "2023-04-15T17:00:00",
          RutaPersonalizada: "Ruta turística por el centro",
          RequerimientosAdicionales: "Vehículo con aire acondicionado",
          Estado: "Completada",
          FechaReservacion: "2023-04-10T14:30:00",
          FechaConfirmacion: "2023-04-11T09:15:00",
          Total: 85000,
          SubTotal: 75000,
          MotivoRechazo: null,
          Usuario: { nombre: "Carlos", apellido: "Mendoza" },
          Empleado: { nombre: "Juan", apellido: "Pérez" },
          Empresa: { Nombre: "Transportes Rápidos S.A." },
          CiudadOrigen: { Nombre: "Santiago" },
          CiudadDestino: { Nombre: "Valparaíso" },
        },
        {
          IdReservacion: 2,
          IdUsuario: 4,
          IdEmpleado: null,
          IdEmpresa: 2,
          IdCiudadOrigen: 2,
          IdCiudadDestino: 3,
          FechaInicio: "2023-04-20T09:30:00",
          FechaFin: "2023-04-20T18:30:00",
          RutaPersonalizada: "Traslado al aeropuerto",
          RequerimientosAdicionales: "Espacio para 2 maletas grandes",
          Estado: "Pendiente",
          FechaReservacion: "2023-04-15T10:45:00",
          FechaConfirmacion: null,
          Total: 45000,
          SubTotal: 40000,
          MotivoRechazo: null,
          Usuario: { nombre: "María", apellido: "González" },
          Empleado: null,
          Empresa: { Nombre: "Viajes Seguros Ltda." },
          CiudadOrigen: { Nombre: "Valparaíso" },
          CiudadDestino: { Nombre: "Concepción" },
        },
        {
          IdReservacion: 3,
          IdUsuario: 5,
          IdEmpleado: null,
          IdEmpresa: 3,
          IdCiudadOrigen: 3,
          IdCiudadDestino: 4,
          FechaInicio: "2023-04-18T14:00:00",
          FechaFin: "2023-04-18T20:00:00",
          RutaPersonalizada: "Recorrido por viñedos",
          RequerimientosAdicionales: "Vehículo para 6 personas",
          Estado: "Rechazada",
          FechaReservacion: "2023-04-12T16:20:00",
          FechaConfirmacion: null,
          Total: 120000,
          SubTotal: 100000,
          MotivoRechazo: "No hay vehículos disponibles para la fecha solicitada",
          Usuario: { nombre: "Pedro", apellido: "Sánchez" },
          Empleado: null,
          Empresa: { Nombre: "Movilidad Urbana SpA" },
          CiudadOrigen: { Nombre: "Concepción" },
          CiudadDestino: { Nombre: "La Serena" },
        },
        {
          IdReservacion: 4,
          IdUsuario: 2,
          IdEmpleado: 1,
          IdEmpresa: 1,
          IdCiudadOrigen: 1,
          IdCiudadDestino: 5,
          FechaInicio: "2023-04-25T10:00:00",
          FechaFin: "2023-04-25T16:00:00",
          RutaPersonalizada: "Tour por la costa",
          RequerimientosAdicionales: "Paradas en miradores",
          Estado: "Completada",
          FechaReservacion: "2023-04-18T09:10:00",
          FechaConfirmacion: "2023-04-19T11:30:00",
          Total: 95000,
          SubTotal: 85000,
          MotivoRechazo: null,
          Usuario: { nombre: "Ana", apellido: "Martínez" },
          Empleado: { nombre: "Roberto", apellido: "Gómez" },
          Empresa: { Nombre: "Transportes Rápidos S.A." },
          CiudadOrigen: { Nombre: "Santiago" },
          CiudadDestino: { Nombre: "Antofagasta" },
        },
        {
          IdReservacion: 5,
          IdUsuario: 6,
          IdEmpleado: null,
          IdEmpresa: 2,
          IdCiudadOrigen: 5,
          IdCiudadDestino: 1,
          FechaInicio: "2023-04-30T08:30:00",
          FechaFin: "2023-04-30T12:30:00",
          RutaPersonalizada: "Traslado al centro comercial",
          RequerimientosAdicionales: null,
          Estado: "Pendiente",
          FechaReservacion: "2023-04-25T14:50:00",
          FechaConfirmacion: null,
          Total: 35000,
          SubTotal: 30000,
          MotivoRechazo: null,
          Usuario: { nombre: "Laura", apellido: "Díaz" },
          Empleado: null,
          Empresa: { Nombre: "Viajes Seguros Ltda." },
          CiudadOrigen: { Nombre: "Antofagasta" },
          CiudadDestino: { Nombre: "Santiago" },
        },
      ]
      setCities(mockCities)
      setReservations(mockReservations)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrar reservaciones por búsqueda, estado y ciudad
  const filteredReservations = reservations.filter((reservation) => {
    const searchMatch =
      (reservation.Usuario?.nombre + " " + reservation.Usuario?.apellido)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (reservation.Empresa?.Nombre || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reservation.RutaPersonalizada || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reservation.CiudadOrigen?.Nombre || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reservation.CiudadDestino?.Nombre || "").toLowerCase().includes(searchTerm.toLowerCase())

    const statusMatch = statusFilter === "all" || reservation.Estado.toLowerCase() === statusFilter.toLowerCase()

    const cityMatch =
      cityFilter === "all" ||
      reservation.IdCiudadOrigen === Number.parseInt(cityFilter) ||
      reservation.IdCiudadDestino === Number.parseInt(cityFilter)

    return searchMatch && statusMatch && cityMatch
  })

  // Paginación
  const indexOfLastReservation = currentPage * reservationsPerPage
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage
  const currentReservations = filteredReservations.slice(indexOfFirstReservation, indexOfLastReservation)
  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage)

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault()
    // La búsqueda ya se aplica automáticamente con el estado searchTerm
  }

  const handleViewDetails = (reservation) => {
    setCurrentReservation(reservation)
    setShowDetailModal(true)
  }

  const handleChangeStatus = (reservation) => {
    setCurrentReservation(reservation)
    setShowStatusModal(true)
  }

  const handleStatusChange = (newStatus, motivoRechazo = null) => {
    // En una aplicación real, esto llamaría a la API
    const updatedReservations = reservations.map((res) => {
      if (res.IdReservacion === currentReservation.IdReservacion) {
        return {
          ...res,
          Estado: newStatus,
          MotivoRechazo: newStatus === "Rechazada" ? motivoRechazo : res.MotivoRechazo,
          FechaConfirmacion: newStatus === "Completada" ? new Date().toISOString() : res.FechaConfirmacion,
        }
      }
      return res
    })
    setReservations(updatedReservations)
    setShowStatusModal(false)
  }

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Obtener clase de estado para el estilo
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completada":
        return "status-completed"
      case "pendiente":
        return "status-pending"
      case "rechazada":
        return "status-rejected"
      default:
        return ""
    }
  }

  return (
    <div className="reservation-management">
      <div className="reservation-actions">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar reservaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <SearchIcon fontSize="small" />
            Buscar
          </button>
        </form>

        <div className="action-buttons">
          <button 
            className="filter-toggle-button" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterListIcon fontSize="small" />
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="vehicle-filters">
          <div className="filters-header">
            <h3>Filtros de búsqueda</h3>
            <button 
              className="reset-filters-button"
              onClick={() => {
                setStatusFilter("all");
                setCityFilter("all");
              }}
            >
              Restablecer filtros
            </button>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label>
                <FilterListIcon fontSize="small" />
                Estado de la reservación
              </label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="pendiente">Pendientes</option>
                <option value="completada">Completadas</option>
                <option value="rechazada">Rechazadas</option>
              </select>
            </div>

            <div className="filter-group">
              <label>
                <LocationOnIcon fontSize="small" />
                Ciudad
              </label>
              <select 
                value={cityFilter} 
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="all">Todas las ciudades</option>
                {cities.map((city) => (
                  <option key={city.IdCiudad} value={city.IdCiudad}>
                    {city.Nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredReservations.length > 0 && (
            <div className="results-summary">
              Se encontraron {filteredReservations.length} reservaciones
            </div>
          )}
        </div>
      )}

      {loading ? (
        <p>Cargando reservaciones...</p>
      ) : (
        <>
          <table className="reservations-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Empresa</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Fin</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentReservations.map((reservation) => (
                <tr key={reservation.IdReservacion}>
                  <td>{reservation.IdReservacion}</td>
                  <td>
                    {reservation.Usuario ? `${reservation.Usuario.nombre} ${reservation.Usuario.apellido}` : "N/A"}
                  </td>
                  <td>{reservation.Empresa?.Nombre || "N/A"}</td>
                  <td>
                    <div className="city-cell">
                      <LocationOnIcon fontSize="small" className="city-icon" />
                      {reservation.CiudadOrigen?.Nombre || "N/A"}
                    </div>
                  </td>
                  <td>
                    <div className="city-cell">
                      <LocationOnIcon fontSize="small" className="city-icon" />
                      {reservation.CiudadDestino?.Nombre || "N/A"}
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <CalendarMonthIcon fontSize="small" className="date-icon" />
                      {formatDate(reservation.FechaInicio)}
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <EventIcon fontSize="small" className="date-icon" />
                      {formatDate(reservation.FechaFin)}
                    </div>
                  </td>
                  <td>
                    <span className={`reservation-status ${getStatusClass(reservation.Estado)}`}>
                      {reservation.Estado}
                    </span>
                  </td>
                  <td className="price-cell">${reservation.Total.toLocaleString()}</td>
                  <td>
                    <div className="reservation-actions-cell">
                      <button
                        className="action-button view-button"
                        onClick={() => handleViewDetails(reservation)}
                        title="Ver detalles"
                      >
                        <VisibilityIcon fontSize="small" />
                        Detalles
                      </button>
                      <button
                        className="action-button edit-button"
                        onClick={() => handleChangeStatus(reservation)}
                        title="Cambiar estado"
                      >
                        <EditIcon fontSize="small" />
                        Estado
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

      {showDetailModal && (
        <ReservationDetailModal
          reservation={currentReservation}
          onClose={() => setShowDetailModal(false)}
          formatDate={formatDate}
        />
      )}

      {showStatusModal && (
        <ReservationStatusModal
          reservation={currentReservation}
          onSave={handleStatusChange}
          onClose={() => setShowStatusModal(false)}
        />
      )}
    </div>
  )
}

export default ReservationManagement
