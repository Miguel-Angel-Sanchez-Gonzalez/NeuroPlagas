import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./HomeFarmer.css";
import NavbarFarmer from "../NavSideProfileFarmer/NavbarFarmer/NavbarFarmer";
import SidebarFarmer from "../NavSideProfileFarmer/SidebarFarmer/SidebarFarmer";
import DTableGreenhousesF from "../For/For-Greenhouses/DTableGreenhouses/DTableGreenhousesF";
import DTableBeds from "../For/For-Beds/DTableBeds/DTableBeds";
import DTableImagesA from "../For/For-ImagesAnalized/DTableImagesAnalized/DTableImagesA";
import DTableWorkers from "../For/For-Workers/DTableWorkers/DTableWorkers";
import DTablePlagues from "../For/For-Plagues/DTablePlagues/DTablePlagues";
import DTableDiseases from "../For/For-Diseases/DTableDiseases/DTableDiseases";
import DTableNotifications from "../For/For-Notifications/DTableNotifications/DTableNotifications";
import CardImagesAnalized from "../For/For-ImagesAnalized/CardImagesAnalized";
import DTableWorkerGreen from "../For/For-WorkerGreen/DTableWorkerGreen/DTableWorkerGreen";
import Dashboard from "../Dashboard/Dashboard";
import ProfileFarmer from "../NavSideProfileFarmer/ProfileFarmer/ProfileFarmer";

const RedirectToNotifications = () => {
  return <Navigate to="/homeFarmer/notificaciones" replace />;
};

const HomeFarmer = () => {
  const idFarmer = localStorage.getItem("idFarmer");
  const [showProfileFarmer, setShowProfileFarmer] = React.useState(false);
  const navigate = useNavigate();

  const handleConfigureProfileClick = () => {
    setShowProfileFarmer(true);
  };

  const handleProfileFormCancel = () => {
    setShowProfileFarmer(false);
  };

  return (
    <div>
      <div className="navbar-container-farmer">
        <NavbarFarmer onConfigureProfileClick={handleConfigureProfileClick} />
      </div>
      <div className="dashboard-farmer">
        <SidebarFarmer />
        <div className="table-container-farmer">
          <div className="space-farmer">
            <Routes>
              {/* Sirve para ver las rutas anidadas*/}
              <Route index element={<RedirectToNotifications />} />
              <Route path="/notificaciones" element={<DTableNotifications />} />
              <Route path="/invernaderos" element={<DTableGreenhousesF />} />
              <Route path="/invernaderos/camas" element={<DTableBeds />} />
              <Route
                path="/invernaderos/camas/imagenes-analizadas"
                element={<DTableImagesA />}
              />
              <Route
                path="/invernaderos/camas/imagenes-analizadas/ver-imagen"
                element={<CardImagesAnalized />}
              />
              <Route
                path="/trabajadores/invernaderos"
                element={<DTableWorkerGreen />}
              />
              <Route path="/reportes" element={<Dashboard />} />
              <Route path="/trabajadores/" element={<DTableWorkers />} />
              <Route path="/plagas/" element={<DTablePlagues />} />
              <Route path="/enfermedades/" element={<DTableDiseases />} />
            </Routes>
          </div>
        </div>
      </div>
      {showProfileFarmer && (
        <ProfileFarmer
          onCancelClick={handleProfileFormCancel}
          idFarmer={idFarmer}
        />
      )}
    </div>
  );
};

export default HomeFarmer;
