"use client"

import { useState, useEffect } from "react"
import CompanyModal from "../components/CompanyModal"
import DeleteCompanyModal from "../components/DeleteCompanyModal"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import BlockIcon from "@mui/icons-material/Block"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import BusinessIcon from "@mui/icons-material/Business"

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentCompany, setCurrentCompany] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [companiesPerPage] = useState(10)

  // Datos de ejemplo
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockCompanies = [
        {
          id: 1,
          Nombre: "Transportes Rápidos S.A.",
          ContactoEmail: "contacto@transportesrapidos.com",
          ContactoTelefono: "+56 9 1234 5678",
          Activo: true,
        },
        {
          id: 2,
          Nombre: "Viajes Seguros Ltda.",
          ContactoEmail: "info@viajesseguros.cl",
          ContactoTelefono: "+56 9 8765 4321",
          Activo: true,
        },
        {
          id: 3,
          Nombre: "Movilidad Urbana SpA",
          ContactoEmail: "contacto@movilidadurbana.com",
          ContactoTelefono: "+56 9 5555 6666",
          Activo: true,
        },
        {
          id: 4,
          Nombre: "Transporte Ejecutivo Premium",
          ContactoEmail: "reservas@ejecutivopremium.cl",
          ContactoTelefono: "+56 9 7777 8888",
          Activo: false,
        },
        {
          id: 5,
          Nombre: "Rutas del Sur",
          ContactoEmail: "info@rutasdelsur.cl",
          ContactoTelefono: "+56 9 3333 4444",
          Activo: true,
        },
      ]
      setCompanies(mockCompanies)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrar empresas por búsqueda
  const filteredCompanies = companies.filter(
    (company) =>
      company.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ContactoEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ContactoTelefono.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginación
  const indexOfLastCompany = currentPage * companiesPerPage
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany)
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage)

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault()
    // La búsqueda ya se aplica automáticamente con el estado searchTerm
  }

  const handleAddCompany = () => {
    setCurrentCompany(null)
    setShowCompanyModal(true)
  }

  const handleEditCompany = (company) => {
    setCurrentCompany(company)
    setShowCompanyModal(true)
  }

  const handleDeleteCompany = (company) => {
    setCurrentCompany(company)
    setShowDeleteModal(true)
  }

  const handleToggleActive = (company) => {
    // En una aplicación real, esto llamaría a la API
    const updatedCompanies = companies.map((c) => {
      if (c.id === company.id) {
        return { ...c, Activo: !c.Activo }
      }
      return c
    })
    setCompanies(updatedCompanies)
  }

  const handleSaveCompany = (companyData) => {
    if (currentCompany) {
      // Actualizar empresa existente
      const updatedCompanies = companies.map((company) =>
        company.id === currentCompany.id ? { ...company, ...companyData } : company,
      )
      setCompanies(updatedCompanies)
    } else {
      // Crear nueva empresa
      const newCompany = {
        id: companies.length + 1,
        ...companyData,
        Activo: true,
      }
      setCompanies([...companies, newCompany])
    }
    setShowCompanyModal(false)
  }

  const handleConfirmDelete = () => {
    // En una aplicación real, esto llamaría a la API
    const updatedCompanies = companies.filter((company) => company.id !== currentCompany.id)
    setCompanies(updatedCompanies)
    setShowDeleteModal(false)
  }

  return (
    <div className="company-management">
      <div className="user-actions">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <SearchIcon fontSize="small" />
            Buscar
          </button>
        </form>
        <button className="add-button" onClick={handleAddCompany}>
          <AddIcon fontSize="small" />
          Nueva Empresa
        </button>
      </div>

      {loading ? (
        <p>Cargando empresas...</p>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email de Contacto</th>
                <th>Teléfono de Contacto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <BusinessIcon fontSize="small" style={{ color: "var(--primary-color)" }} />
                      {company.Nombre}
                    </div>
                  </td>
                  <td>{company.ContactoEmail}</td>
                  <td>{company.ContactoTelefono}</td>
                  <td>
                    <span className={`user-status ${company.Activo ? "active" : "inactive"}`}>
                      {company.Activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div className="user-actions-cell">
                      <button className="action-button edit-button" onClick={() => handleEditCompany(company)}>
                        <EditIcon fontSize="small" />
                        Editar
                      </button>
                      <button className="action-button delete-button" onClick={() => handleDeleteCompany(company)}>
                        <DeleteIcon fontSize="small" />
                        Eliminar
                      </button>
                      <button
                        className={`action-button ${company.Activo ? "deactivate-button" : "activate-button"}`}
                        onClick={() => handleToggleActive(company)}
                      >
                        {company.Activo ? (
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

      {showCompanyModal && (
        <CompanyModal company={currentCompany} onSave={handleSaveCompany} onClose={() => setShowCompanyModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteCompanyModal
          company={currentCompany}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}

export default CompanyManagement
