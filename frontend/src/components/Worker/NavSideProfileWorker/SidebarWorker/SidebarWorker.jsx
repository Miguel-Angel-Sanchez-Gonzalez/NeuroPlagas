import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import "./SidebarWorker.css";
import {
  faHomeUser,
  faWarehouse,
  faPersonDigging,
  faChartBar,
  faBug,
  faVirus,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const SidebarWorker = () => {
  const { pathname } = useLocation();
  return (
    <div className="menu-farmer">
      <div className="menu-list-farmer">
        <Link
          to="/homeWorker/notificaciones"
          className={`item-farmer ${
            pathname.includes("notificaciones") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBell} className="icon" />
          Notificaciones
        </Link>
        <Link
          to="/homeWorker/invernaderos"
          className={`item-farmer ${
            pathname.includes("invernaderos") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faWarehouse} className="icon" />
          Invernadero
        </Link>

        <Link
          to="/homeWorker/reportes"
          className={`item-farmer ${
            pathname.includes("reportes") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faChartBar} className="icon" />
          Reporte
        </Link>

        <Link
          to="/homeWorker/plagas"
          className={`item-farmer ${
            pathname.includes("plagas") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBug} className="icon" />
          Plaga
        </Link>
        <Link
          to="/homeWorker/enfermedades"
          className={`item-farmer ${
            pathname.includes("enfermedades") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faVirus} className="icon" />
          Enfermedad
        </Link>
      </div>
    </div>
  );
};

export default SidebarWorker;
