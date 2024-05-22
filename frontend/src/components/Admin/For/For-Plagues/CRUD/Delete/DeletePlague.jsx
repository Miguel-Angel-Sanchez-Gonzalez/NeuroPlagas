import React, { useState } from "react";
import "./DeletePlague.css";

const DeletePlague = ({ onCancelClick, idPlague }) => {
  const onConfirmClick = () => {
    fetch(`http://localhost:3000/plague/${idPlague}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("La plaga se eliminó correctamente");
          onCancelClick();
          window.location.reload();
        } else {
          alert("Error al eliminar la plaga");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la plaga:", error);
        alert("Error al eliminar la plaga");
      });
  };

  return (
    <div className="delete-plague-form">
      <div className="container-delete-plague">
        <h4 className="h4-delete">Eliminar plaga</h4>
        <label>¿Está seguro que desea eliminar esta plaga?</label>
      </div>
      <div className="button-container-plague">
        <button
          className="button-delete-plague "
          type="submit"
          onClick={onConfirmClick}
        >
          Eliminar
        </button>
        <button className="btn-delete-plague-cancel " onClick={onCancelClick}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeletePlague;
