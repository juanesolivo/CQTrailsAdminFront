"use client"
import CloseIcon from "@mui/icons-material/Close"

const DeleteRoleModal = ({ role, onConfirm, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Confirmar Eliminación</h2>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">
          <p>
            ¿Estás seguro de que deseas eliminar el rol <strong>{role.NombreRol}</strong>?
          </p>
          <p>Esta acción no se puede deshacer y podría afectar a los usuarios que tienen este rol asignado.</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="modal-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="modal-submit modal-danger" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteRoleModal
