import React, { useState } from "react";
import "./DeleteGreenhouse.css";

const DeleteGreenhouse = ({ onCancelClick, idGreenhouse }) => {
  const onConfirmClick = () => {
    try {
      fetch(`http://localhost:3000/greenhouse/${idGreenhouse}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            onCancelClick();
          } else {
            throw new Error("Error al eliminar el invernadero");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el invernadero:", error);
          alert("Error al eliminar el invernadero");
        });
    } catch (error) {
      console.error("Error al eliminar el invernadero:", error);
      alert("Error al eliminar el invernadero");
    }
  };

  return (
    <div className="delete-greenhouse-form">
      <div className="container-delete-greenhouse">
        <h4 className="h4-delete-greenhouse">Eliminar invernadero</h4>
        <label>¿Está seguro que desea eliminar este invernadero?</label>
      </div>
      <div className="button-container-greenhouse">
        <button
          className="button-delete-greenhouse"
          type="submit"
          onClick={onConfirmClick}
        >
          Eliminar
        </button>
        <button
          className="btn-delete-greenhouse-cancel "
          onClick={onCancelClick}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteGreenhouse;
