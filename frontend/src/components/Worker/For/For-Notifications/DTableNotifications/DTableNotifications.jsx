import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTableNotifications.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBellSlash,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import NotificationSwitch from "../NotificationSwitch/NotificationSwitch";
import ChangeStatusNotify from "../ChangeStatusNotify/ChangeStatusNotify";

const DTableNotifications = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const idWorker = localStorage.getItem("idWorker");
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setStatus] = useState("Sin ver");
  const [showChangeStatusNotify, setShowChangeStatusNotify] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const columns = [
    {
      name: "Fecha",
      selector: (row) => new Date(row.fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      sortable: true,
      width: "140px",
    },
    {
      name: "Nombre Invernadero",
      selector: (row) => row.nombre_invernadero,
      sortable: true,
      width: "200px",
    },
    {
      name: "Número de cama",
      selector: (row) => row.numero_cama,
      sortable: true,
      width: "155px",
    },
    {
      name: "Tipo de cultivo",
      selector: (row) => row.tipo_cultivo,
      sortable: true,
      width: "145px",
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
      width: "120px",
    },
    {
      name: "Amenazas detectadas",
      selector: (row) => row.nombres_detectados,
      sortable: true,
      width: "auto",
    },
    {
      name: "Cambiar estado",
      cell: (row) => (
        <div className="icons-container">
          <FontAwesomeIcon
            icon={status === "Sin ver" ? faBell : faBellSlash}
            onClick={() => handleChangeNotification(row)}
            className="view-icon-notifications"
            size="lg"
          />
        </div>
      ),
      width: "150px",
    },
  ];

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, [status]);

  async function getNotifications() {
    try {
      setIsLoaded(true);
      const response = await fetch(
        `http://localhost:3000/worker/getnotifications/${idWorker}/${status}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setNotifications(data);
        setFilteredNotifications(data);
        
      } else {
        throw new Error("Error al obtener las notificaciones");
      }
    } catch (error) {
      console.error("Error al obtener las notificaciones:", error);
      setFilteredNotifications([]);
      setIsLoaded(true);
    }
  }

  const handleFilter = (event) => {
    try {
      const value = event.target.value.toLowerCase();
      setInputValue(value);
      if (value) {
        const searchValue = value.split(" ");
        const filtered = notifications.filter((notification) => {
          return searchValue.every((value) =>
            notification.nombre_invernadero.toLowerCase().includes(value)
          );
        });
        setFilteredNotifications(filtered);
      } else {
        setFilteredNotifications(notifications);
      }
    } catch (error) {
      console.error("Error durante el filtrado:", error);
      alert("Error durante el filtrado de invernaderos " + error);
    }
  };

  const handleChangeNotification = (row) => {
    setSelectedNotification(row);
    setShowChangeStatusNotify(true);
  };

  const handleCancelClick = () => {
    setShowChangeStatusNotify(false);
    setSelectedNotification(null);
    getNotifications();
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-notifications-worker">
      <div className="right-content-notification">
        <div className="title-work-search-notifications">
          <div>
            <h3>Notificaciones</h3>
            <label className="description-plagues">
              Actualmente mostrando notificaciones{" "}
              <span className="rol-worker">{status.toLowerCase()}</span>
            </label>
          </div>
          <div className="header-table-notifications-wor">
            <FontAwesomeIcon
              icon={faSearch}
              className="icon-plagues"
              size="lg"
            />
            <input
              type="text"
              placeholder="Buscar..."
              value={inputValue}
              onChange={handleFilter}
              className="search-plagues"
            />
            <span className="switch-label">{status}</span>
            <NotificationSwitch onChange={handleStatusChange} />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredNotifications}
          responsive={true}
          fixedHeader
          pagination
          paginationComponentOptions={paginacionOpciones}
          noDataComponent={
            isLoaded ? (
              <div className="no-beds-message">
                No hay notificaciones {status.toLowerCase()} registradas
              </div>
            ) : (
              <div className="loading-message">Cargando...</div>
            )
          }
        />
      </div>
      {showChangeStatusNotify && selectedNotification && (
        <ChangeStatusNotify
          onCancelClick={handleCancelClick}
          notification={selectedNotification}
        />
      )}
    </div>
  );
};

export default DTableNotifications;
