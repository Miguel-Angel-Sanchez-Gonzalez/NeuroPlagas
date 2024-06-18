import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import "./SidebarFarmer.css";
import {faWarehouse, faPersonDigging, faChartBar, faBug, faVirus, faBell,} from "@fortawesome/free-solid-svg-icons";

const SidebarAdmin = () => {
  const { pathname } = useLocation();

  return (
    <div className="menu-admin">
      <div className="menu-list-admin">
        <Link
          to="/homeFarmer/notificaciones"
          className={`item-admin ${
            pathname.includes("notificaciones") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBell} className="icon" />
          Notificaciones
        </Link>
        <Link
          to="/homeFarmer/invernaderos"
          className={`item-admin ${
            pathname.includes("invernaderos") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faWarehouse} className="icon" />
          Invernadero
        </Link>
        <Link
          to="/homeFarmer/trabajadores"
          className={`item-admin ${
            pathname.includes("trabajadores") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faPersonDigging} className="icon" />
          Trabajador
        </Link>
        <Link
          to="/homeFarmer/reportes"
          className={`item-admin ${
            pathname.includes("reportes") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faChartBar} className="icon" />
          Reporte
        </Link>
        <Link
          to="/homeFarmer/plagas"
          className={`item-admin ${
            pathname.includes("plagas") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBug} className="icon" />
          Plaga
        </Link>
        <Link
          to="/homeFarmer/enfermedades"
          className={`item-admin ${
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

export default SidebarAdmin;
