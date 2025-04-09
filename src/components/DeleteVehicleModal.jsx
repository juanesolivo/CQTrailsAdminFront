"use client"
import CloseIcon from "@mui/icons-material/Close"

const DeleteVehicleModal = ({ vehicle, onConfirm, onClose }) => {
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
            ¿Estás seguro de que deseas eliminar el vehículo <strong>{vehicle.modelo}</strong> con placa{" "}
            <strong>{vehicle.placa}</strong>?
          </p>
          <p>Esta acción no se puede deshacer.</p>
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

export default DeleteVehicleModal
