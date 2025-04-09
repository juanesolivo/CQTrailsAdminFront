"use client"

import { useState, useEffect } from "react"
import {
  CalendarToday,
  DirectionsCar,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  LocationOn,
  Person,
  Business,
} from "@mui/icons-material"

// Componente para las tarjetas de estadísticas
const StatCard = ({ icon, title, value, color, bgColor }) => (
  <div
    className="stat-card"
    style={{
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "1.25rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: "8px",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: "0.9rem", color: "#666", margin: 0 }}>{title}</h3>
    </div>
    <p
      style={{
        fontSize: "1.75rem",
        fontWeight: "bold",
        color: color,
        margin: "0.5rem 0 0 0",
      }}
    >
      {value}
    </p>
  </div>
)

// Componente para el gráfico de barras semanal
const WeeklyBarChart = ({ data }) => {
  const maxValue = Math.max(...data.values) + 5

  return (
    <div className="chart-container">
      <h3 className="chart-title">Reservas de la Semana</h3>
      <div className="chart-bars">
        {data.labels.map((day, index) => (
          <div key={day} className="chart-bar-container">
            <div className="chart-bar-label">{day}</div>
            <div className="chart-bar-wrapper">
              <div
                className="chart-bar"
                style={{
                  height: `${(data.values[index] / maxValue) * 100}%`,
                  backgroundColor: "#008f39",
                }}
              ></div>
            </div>
            <div className="chart-bar-value">{data.values[index]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente para el gráfico circular
const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativeAngle = 0
  const gradientStops = data.flatMap((item) => {
    const angle = (item.value / total) * 360
    const start = cumulativeAngle
    cumulativeAngle += angle
    return [`${item.color} ${start}deg`, `${item.color} ${cumulativeAngle}deg`]
  }).join(', ')

  const pieStyle = {
    background: `conic-gradient(${gradientStops})`,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  }

  return (
    <div className="pie-chart-container">
      <h3 className="chart-title">Distribución de Vehículos</h3>
      <div className="pie-chart-wrapper">
        <div className="pie-chart" style={pieStyle}></div>
      </div>
      <div className="pie-legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.color }}></div>
            <div className="legend-label">{item.label}</div>
            <div className="legend-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Dashboard = () => {
  // Estado para los datos simulados
  const [weeklyData, setWeeklyData] = useState({
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    values: [8, 12, 15, 10, 20, 25, 18],
  })

  const [vehicleDistribution, setVehicleDistribution] = useState([
    { label: "Sedán", value: 18, color: "#008f39" },
    { label: "SUV", value: 12, color: "#00bf4c" },
    { label: "Van", value: 8, color: "#4caf50" },
    { label: "Minibús", value: 4, color: "#8bc34a" },
  ])

  const [recentReservations, setRecentReservations] = useState([])
  const [loading, setLoading] = useState(true)

  // Simular carga de datos
  useEffect(() => {
    setTimeout(() => {
      const mockReservations = [
        {
          id: "RES-2023-001",
          cliente: "Juan Pérez",
          origen: "Aeropuerto Internacional",
          destino: "Hotel Costa Verde",
          fecha: "09/04/2025",
          hora: "14:30",
          estado: "Confirmada",
          vehiculo: "Sedan - Toyota Corolla",
          empresa: "Transportes Rápidos S.A.",
        },
        {
          id: "RES-2023-002",
          cliente: "María González",
          origen: "Hotel Las Palmas",
          destino: "Centro Comercial Plaza",
          fecha: "09/04/2025",
          hora: "15:45",
          estado: "En Proceso",
          vehiculo: "SUV - Honda CR-V",
          empresa: "Viajes Seguros Ltda.",
        },
        {
          id: "RES-2023-003",
          cliente: "Carlos Rodríguez",
          origen: "Centro de Convenciones",
          destino: "Aeropuerto Internacional",
          fecha: "10/04/2025",
          hora: "08:15",
          estado: "Pendiente",
          vehiculo: "Van - Hyundai H1",
          empresa: "Movilidad Urbana SpA",
        },
        {
          id: "RES-2023-004",
          cliente: "Ana Martínez",
          origen: "Residencial Los Pinos",
          destino: "Universidad Central",
          fecha: "10/04/2025",
          hora: "09:30",
          estado: "Confirmada",
          vehiculo: "Sedan - Nissan Versa",
          empresa: "Transportes Rápidos S.A.",
        },
        {
          id: "RES-2023-005",
          cliente: "Roberto Sánchez",
          origen: "Plaza Principal",
          destino: "Estadio Municipal",
          fecha: "11/04/2025",
          hora: "16:00",
          estado: "Pendiente",
          vehiculo: "Minibús - Mercedes Sprinter",
          empresa: "Rutas del Sur",
        },
      ]

      setRecentReservations(mockReservations)
      setLoading(false)
    }, 1000)
  }, [])

  // Función para obtener el color según el estado
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmada":
        return { bg: "#e6f7ed", text: "#28a745", icon: <CheckCircle style={{ color: "#28a745" }} /> }
      case "En Proceso":
        return { bg: "#fff8e6", text: "#ffc107", icon: <Schedule style={{ color: "#ffc107" }} /> }
      case "Pendiente":
        return { bg: "#f8f9fa", text: "#6c757d", icon: <Schedule style={{ color: "#6c757d" }} /> }
      case "Cancelada":
        return { bg: "#feebee", text: "#dc3545", icon: <Warning style={{ color: "#dc3545" }} /> }
      default:
        return { bg: "#f8f9fa", text: "#6c757d", icon: null }
    }
  }

  return (
    <div className="dashboard-container">
      {/* Tarjetas de estadísticas */}
      <div className="stats-grid">
        <StatCard
          icon={<Person style={{ color: "green" }} />}
          title="Usuarios Activos"
          value="24"
          color="#008f39"
          bgColor="rgba(0, 143, 57, 0.1)"
        />
        <StatCard
          icon={<Business style={{ color: "green" }} />}
          title="Empresas Registradas"
          value="8"
          color="#008f39"
          bgColor="rgba(0, 143, 57, 0.1)"
        />
        <StatCard
          icon={<DirectionsCar style={{ color: "green" }} />}
          title="Vehículos Disponibles"
          value="42"
          color="#008f39"
          bgColor="rgba(0, 143, 57, 0.1)"
        />
        <StatCard
          icon={<CalendarToday style={{ color: "green" }} />}
          title="Reservas Activas"
          value="15"
          color="#008f39"
          bgColor="rgba(0, 143, 57, 0.1)"
        />
      </div>

      {/* Resumen de Actividad */}
      <div className="activity-summary">
          <div className="section-header">
            <h2 className="section-title">Resumen de Actividad</h2>
          </div>

          <div className="activity-cards">
            <div className="activity-card">
              <div className="activity-icon" style={{ backgroundColor: "rgba(0, 143, 57, 0.1)" }}>
                <TrendingUp style={{ color: "#008f39" }} />
              </div>
              <div className="activity-content">
                <h3>Crecimiento Semanal</h3>
                <p className="activity-value">+12.5%</p>
                <p className="activity-description">Incremento en reservas comparado con la semana anterior</p>
              </div>
            </div>

            <div className="activity-card">
              <div className="activity-icon" style={{ backgroundColor: "rgba(25, 118, 210, 0.1)" }}>
                <DirectionsCar style={{ color: "#1976d2" }} />
              </div>
              <div className="activity-content">
                <h3>Vehículo Más Reservado</h3>
                <p className="activity-value">Toyota Corolla</p>
                <p className="activity-description">28 reservas en los últimos 30 días</p>
              </div>
            </div>

            <div className="activity-card">
              <div className="activity-icon" style={{ backgroundColor: "rgba(255, 152, 0, 0.1)" }}>
                <LocationOn style={{ color: "#ff9800" }} />
              </div>
              <div className="activity-content">
                <h3>Destino Popular</h3>
                <p className="activity-value">Aeropuerto Internacional</p>
                <p className="activity-description">35% de todas las reservas</p>
              </div>
            </div>
          </div>
        </div>

      {/* Gráficos y Tablas */}
      <div className="dashboard-content">
        <div className="dashboard-charts">
          <div className="chart-card">
            <WeeklyBarChart data={weeklyData} />
          </div>
          <div className="chart-card">
            <PieChart data={vehicleDistribution} />
          </div>
        </div>

        {/* Tabla de Reservas Recientes */}
        <div className="recent-reservations">
          <div className="section-header">
            <h2 className="section-title">Últimas Reservaciones</h2>
            <button className="view-all-button">Ver todas</button>
          </div>

          {loading ? (
            <p>Cargando reservaciones...</p>
          ) : (
            <div className="reservations-table-container">
              <table className="reservations-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReservations.map((reservation) => {
                    const statusStyle = getStatusColor(reservation.estado)

                    return (
                      <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.cliente}</td>
                        <td>
                          <div className="location-cell">
                            <LocationOn fontSize="small" style={{ color: "#6c757d" }} />
                            <span>{reservation.origen}</span>
                          </div>
                        </td>
                        <td>
                          <div className="location-cell">
                            <LocationOn fontSize="small" style={{ color: "#008f39" }} />
                            <span>{reservation.destino}</span>
                          </div>
                        </td>
                        <td>{reservation.fecha}</td>
                        <td>{reservation.hora}</td>
                        <td>
                          <div
                            className="status-badge"
                            style={{
                              backgroundColor: statusStyle.bg,
                              color: statusStyle.text,
                            }}
                          >
                            {statusStyle.icon}
                            <span>{reservation.estado}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        
      </div>
    </div>
  )
}

export default Dashboard
