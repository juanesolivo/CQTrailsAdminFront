"use client"

import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LockIcon from "@mui/icons-material/Lock"
import InfoIcon from "@mui/icons-material/Info"

const RolePermissionsModal = ({ role, permissions, onSave, onClose }) => {
  const [updatedPermissions, setUpdatedPermissions] = useState([...permissions])

  const handleTogglePermission = (permissionId) => {
    setUpdatedPermissions(
      updatedPermissions.map((permission) =>
        permission.IdPermiso === permissionId ? { ...permission, Puede: !permission.Puede } : permission,
      ),
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(updatedPermissions)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal permissions-modal">
        <div className="modal-header">
          <h2 className="modal-title">Gestionar Permisos: {role.NombreRol}</h2>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="permissions-info">
              <InfoIcon className="info-icon" />
              <p>
                Selecciona los permisos que deseas otorgar al rol <strong>{role.NombreRol}</strong>. Los permisos
                determinan qué acciones pueden realizar los usuarios con este rol.
              </p>
            </div>

            <div className="permissions-table">
              <div className="permissions-header">
                <div className="permission-name">Permiso</div>
                <div className="permission-description">Descripción</div>
                <div className="permission-toggle">Estado</div>
              </div>

              {updatedPermissions.map((permission) => (
                <div key={permission.IdPermiso} className="permission-row">
                  <div className="permission-name">{permission.NombrePermiso}</div>
                  <div className="permission-description">{permission.Descripcion}</div>
                  <div className="permission-toggle">
                    <button
                      type="button"
                      className={`toggle-button ${permission.Puede ? "active" : "inactive"}`}
                      onClick={() => handleTogglePermission(permission.IdPermiso)}
                    >
                      {permission.Puede ? (
                        <>
                          <LockOpenIcon fontSize="small" />
                          <span>Permitido</span>
                        </>
                      ) : (
                        <>
                          <LockIcon fontSize="small" />
                          <span>Denegado</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal-submit">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RolePermissionsModal
