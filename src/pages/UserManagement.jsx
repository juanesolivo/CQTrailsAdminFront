"use client"

import { useState, useEffect } from "react"
import UserModal from "../components/user-components/UserModal"
import DeleteConfirmModal from "../components/user-components/DeleteConfirmModal"
import RoleModal from "../components/role-components/RoleModal"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import BlockIcon from "@mui/icons-material/Block"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showUserModal, setShowUserModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  // Roles de ejemplo
  const roles = [
    { id: 0, name: "Administrador" },
    { id: 1, name: "Operador" },
    { id: 2, name: "Cliente" },
  ]

  // Datos de ejemplo
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockUsers = [
        { id: 1, email: "admin@cqtrails.com", nombre: "Admin", apellido: "Principal", idRol: 0, activo: true },
        { id: 2, email: "operador@cqtrails.com", nombre: "Operador", apellido: "Ejemplo", idRol: 1, activo: true },
        { id: 3, email: "cliente@empresa.com", nombre: "Cliente", apellido: "Empresa", idRol: 2, activo: true },
        { id: 4, email: "usuario@inactivo.com", nombre: "Usuario", apellido: "Inactivo", idRol: 2, activo: false },
        { id: 5, email: "otro@cqtrails.com", nombre: "Otro", apellido: "Usuario", idRol: 1, activo: true },
      ]
      setUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellido.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault()
    // La búsqueda ya se aplica automáticamente con el estado searchTerm
  }

  const handleAddUser = () => {
    setCurrentUser(null)
    setShowUserModal(true)
  }

  const handleEditUser = (user) => {
    setCurrentUser(user)
    setShowUserModal(true)
  }

  const handleDeleteUser = (user) => {
    setCurrentUser(user)
    setShowDeleteModal(true)
  }

  const handleChangeRole = (user) => {
    setCurrentUser(user)
    setShowRoleModal(true)
  }

  const handleToggleActive = (user) => {
    // En una aplicación real, esto llamaría a la API
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, activo: !u.activo }
      }
      return u
    })
    setUsers(updatedUsers)
  }

  const handleSaveUser = (userData) => {
    if (currentUser) {
      // Actualizar usuario existente
      const updatedUsers = users.map((user) => (user.id === currentUser.id ? { ...user, ...userData } : user))
      setUsers(updatedUsers)
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: users.length + 1,
        ...userData,
        activo: true,
      }
      setUsers([...users, newUser])
    }
    setShowUserModal(false)
  }

  const handleConfirmDelete = () => {
    // En una aplicación real, esto llamaría a la API
    const updatedUsers = users.filter((user) => user.id !== currentUser.id)
    setUsers(updatedUsers)
    setShowDeleteModal(false)
  }

  const handleSaveRole = (roleId) => {
    // En una aplicación real, esto llamaría a la API
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return { ...user, idRol: roleId }
      }
      return user
    })
    setUsers(updatedUsers)
    setShowRoleModal(false)
  }

  const getRoleName = (roleId) => {
    const role = roles.find((r) => r.id === roleId)
    return role ? role.name : "Desconocido"
  }

  return (
    <div className="user-management">
      <div className="user-actions">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <SearchIcon fontSize="small" />
            Buscar
          </button>
        </form>
        <button className="add-button" onClick={handleAddUser}>
          <AddIcon fontSize="small" />
          Nuevo Usuario
        </button>
      </div>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>
                  <td>{getRoleName(user.idRol)}</td>
                  <td>
                    <span className={`user-status ${user.activo ? "active" : "inactive"}`}>
                      {user.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div className="user-actions-cell">
                      <button className="action-button edit-button" onClick={() => handleEditUser(user)}>
                        <EditIcon fontSize="small" />
                        Editar
                      </button>
                      <button className="action-button delete-button" onClick={() => handleDeleteUser(user)}>
                        <DeleteIcon fontSize="small" />
                        Eliminar
                      </button>
                      <button
                        className={`action-button ${user.activo ? "deactivate-button" : "activate-button"}`}
                        onClick={() => handleToggleActive(user)}
                      >
                        {user.activo ? (
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
                      <button className="action-button role-button" onClick={() => handleChangeRole(user)}>
                        <AdminPanelSettingsIcon fontSize="small" />
                        Rol
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

      {showUserModal && (
        <UserModal user={currentUser} roles={roles} onSave={handleSaveUser} onClose={() => setShowUserModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          user={currentUser}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {showRoleModal && (
        <RoleModal
          user={currentUser}
          roles={roles}
          currentRoleId={currentUser?.idRol}
          onSave={handleSaveRole}
          onClose={() => setShowRoleModal(false)}
        />
      )}
    </div>
  )
}

export default UserManagement

