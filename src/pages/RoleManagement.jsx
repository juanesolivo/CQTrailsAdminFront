"use client"

import { useState, useEffect } from "react"
import RoleModal from "../components/RoleModal"
import DeleteRoleModal from "../components/DeleteRoleModal"
import RolePermissionsModal from "../components/RolePermissionsModal"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import LockIcon from "@mui/icons-material/Lock"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"

const RoleManagement = () => {
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [currentRole, setCurrentRole] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rolesPerPage] = useState(10)

  // Datos de ejemplo
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockRoles = [
        {
          IdRol: 1,
          NombreRol: "Administrador",
          Descripcion: "Control total del sistema",
          permisos: [
            { IdPermiso: 1, NombrePermiso: "Lectura", Descripcion: "Permiso para ver información", Puede: true },
            { IdPermiso: 2, NombrePermiso: "Creación", Descripcion: "Permiso para crear registros", Puede: true },
            {
              IdPermiso: 3,
              NombrePermiso: "Actualización",
              Descripcion: "Permiso para actualizar registros",
              Puede: true,
            },
            { IdPermiso: 4, NombrePermiso: "Eliminación", Descripcion: "Permiso para eliminar registros", Puede: true },
          ],
        },
        {
          IdRol: 2,
          NombreRol: "Operador",
          Descripcion: "Gestión de operaciones diarias",
          permisos: [
            { IdPermiso: 1, NombrePermiso: "Lectura", Descripcion: "Permiso para ver información", Puede: true },
            { IdPermiso: 2, NombrePermiso: "Creación", Descripcion: "Permiso para crear registros", Puede: true },
            {
              IdPermiso: 3,
              NombrePermiso: "Actualización",
              Descripcion: "Permiso para actualizar registros",
              Puede: true,
            },
            {
              IdPermiso: 4,
              NombrePermiso: "Eliminación",
              Descripcion: "Permiso para eliminar registros",
              Puede: false,
            },
          ],
        },
        {
          IdRol: 3,
          NombreRol: "Cliente",
          Descripcion: "Usuario final del servicio",
          permisos: [
            { IdPermiso: 1, NombrePermiso: "Lectura", Descripcion: "Permiso para ver información", Puede: true },
            { IdPermiso: 2, NombrePermiso: "Creación", Descripcion: "Permiso para crear registros", Puede: false },
            {
              IdPermiso: 3,
              NombrePermiso: "Actualización",
              Descripcion: "Permiso para actualizar registros",
              Puede: false,
            },
            {
              IdPermiso: 4,
              NombrePermiso: "Eliminación",
              Descripcion: "Permiso para eliminar registros",
              Puede: false,
            },
          ],
        },
        {
          IdRol: 4,
          NombreRol: "Supervisor",
          Descripcion: "Supervisa operaciones y genera reportes",
          permisos: [
            { IdPermiso: 1, NombrePermiso: "Lectura", Descripcion: "Permiso para ver información", Puede: true },
            { IdPermiso: 2, NombrePermiso: "Creación", Descripcion: "Permiso para crear registros", Puede: false },
            {
              IdPermiso: 3,
              NombrePermiso: "Actualización",
              Descripcion: "Permiso para actualizar registros",
              Puede: true,
            },
            {
              IdPermiso: 4,
              NombrePermiso: "Eliminación",
              Descripcion: "Permiso para eliminar registros",
              Puede: false,
            },
          ],
        },
        {
          IdRol: 5,
          NombreRol: "Invitado",
          Descripcion: "Acceso limitado solo a visualización",
          permisos: [
            { IdPermiso: 1, NombrePermiso: "Lectura", Descripcion: "Permiso para ver información", Puede: true },
            { IdPermiso: 2, NombrePermiso: "Creación", Descripcion: "Permiso para crear registros", Puede: false },
            {
              IdPermiso: 3,
              NombrePermiso: "Actualización",
              Descripcion: "Permiso para actualizar registros",
              Puede: false,
            },
            {
              IdPermiso: 4,
              NombrePermiso: "Eliminación",
              Descripcion: "Permiso para eliminar registros",
              Puede: false,
            },
          ],
        },
      ]

      const mockPermissions = [
        { IdPermiso: 1, NombrePermiso: "Lectura", Descripcion: "Permiso para ver información" },
        { IdPermiso: 2, NombrePermiso: "Creación", Descripcion: "Permiso para crear registros" },
        { IdPermiso: 3, NombrePermiso: "Actualización", Descripcion: "Permiso para actualizar registros" },
        { IdPermiso: 4, NombrePermiso: "Eliminación", Descripcion: "Permiso para eliminar registros" },
      ]

      setRoles(mockRoles)
      setPermissions(mockPermissions)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrar roles por búsqueda
  const filteredRoles = roles.filter(
    (role) =>
      role.NombreRol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (role.Descripcion && role.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Paginación
  const indexOfLastRole = currentPage * rolesPerPage
  const indexOfFirstRole = indexOfLastRole - rolesPerPage
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole)
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage)

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault()
    // La búsqueda ya se aplica automáticamente con el estado searchTerm
  }

  const handleAddRole = () => {
    setCurrentRole(null)
    setShowRoleModal(true)
  }

  const handleEditRole = (role) => {
    setCurrentRole(role)
    setShowRoleModal(true)
  }

  const handleDeleteRole = (role) => {
    setCurrentRole(role)
    setShowDeleteModal(true)
  }

  const handleManagePermissions = (role) => {
    setCurrentRole(role)
    setShowPermissionsModal(true)
  }

  const handleSaveRole = (roleData) => {
    if (currentRole) {
      // Actualizar rol existente
      const updatedRoles = roles.map((role) => (role.IdRol === currentRole.IdRol ? { ...role, ...roleData } : role))
      setRoles(updatedRoles)
    } else {
      // Crear nuevo rol
      const newRole = {
        IdRol: roles.length + 1,
        ...roleData,
        permisos: permissions.map((p) => ({ ...p, Puede: false })),
      }
      setRoles([...roles, newRole])
    }
    setShowRoleModal(false)
  }

  const handleConfirmDelete = () => {
    // En una aplicación real, esto llamaría a la API
    const updatedRoles = roles.filter((role) => role.IdRol !== currentRole.IdRol)
    setRoles(updatedRoles)
    setShowDeleteModal(false)
  }

  const handleSavePermissions = (updatedPermissions) => {
    // En una aplicación real, esto llamaría a la API
    const updatedRoles = roles.map((role) => {
      if (role.IdRol === currentRole.IdRol) {
        return { ...role, permisos: updatedPermissions }
      }
      return role
    })
    setRoles(updatedRoles)
    setShowPermissionsModal(false)
  }

  // Función para contar permisos activos
  const countActivePermissions = (permisos) => {
    return permisos.filter((p) => p.Puede).length
  }

  return (
    <div className="role-management">
      <div className="user-actions">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <SearchIcon fontSize="small" />
            Buscar
          </button>
        </form>
        <button className="add-button" onClick={handleAddRole}>
          <AddIcon fontSize="small" />
          Nuevo Rol
        </button>
      </div>

      {loading ? (
        <p>Cargando roles...</p>
      ) : (
        <>
          <div className="roles-grid">
            {currentRoles.map((role) => (
              <div key={role.IdRol} className="role-card">
                <div className="role-header">
                  <AdminPanelSettingsIcon className="role-icon" />
                  <h3 className="role-title">{role.NombreRol}</h3>
                </div>
                <div className="role-description">
                  <p>{role.Descripcion || "Sin descripción"}</p>
                </div>
                <div className="role-permissions">
                  <h4>
                    Permisos ({countActivePermissions(role.permisos)}/{role.permisos.length})
                  </h4>
                  <div className="permissions-list">
                    {role.permisos.map((permiso) => (
                      <div
                        key={permiso.IdPermiso}
                        className={`permission-badge ${permiso.Puede ? "permission-active" : "permission-inactive"}`}
                      >
                        {permiso.NombrePermiso}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="role-actions">
                  <button className="action-button edit-button" onClick={() => handleEditRole(role)}>
                    <EditIcon fontSize="small" />
                    Editar
                  </button>
                  <button className="action-button delete-button" onClick={() => handleDeleteRole(role)}>
                    <DeleteIcon fontSize="small" />
                    Eliminar
                  </button>
                  <button className="action-button permission-button" onClick={() => handleManagePermissions(role)}>
                    <LockIcon fontSize="small" />
                    Permisos
                  </button>
                </div>
              </div>
            ))}
          </div>

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

      {showRoleModal && (
        <RoleModal role={currentRole} onSave={handleSaveRole} onClose={() => setShowRoleModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteRoleModal role={currentRole} onConfirm={handleConfirmDelete} onClose={() => setShowDeleteModal(false)} />
      )}

      {showPermissionsModal && (
        <RolePermissionsModal
          role={currentRole}
          permissions={currentRole.permisos}
          onSave={handleSavePermissions}
          onClose={() => setShowPermissionsModal(false)}
        />
      )}
    </div>
  )
}

export default RoleManagement
