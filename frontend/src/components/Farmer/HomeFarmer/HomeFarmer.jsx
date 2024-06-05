import React, { useState } from "react";
import NavbarFarmer from "../NavSideProfileFarmer/NavbarFarmer/NavbarFarmer";
import SidebarFarmer from "../NavSideProfileFarmer/SidebarFarmer/SidebarFarmer";
import "./HomeFarmer.css";
import { Route, Routes } from "react-router-dom";
import DTableGreenhouses from "../For/For-Greenhouses/DTableGreenhouses/DTableGreenhouses";
import DTableBeds from "../For/For-Beds/DTableBeds/DTableBeds";
import DTableImagesA from "../For/For-ImagesAnalized/DTableImagesAnalized/DTableImagesA";
import DTableWorkers from "../For/For-Workers/DTableWorkers/DTableWorkers";
import DTablePlagues from "../For/For-Plagues/DTablePlagues/DTablePlagues";
import DTableDiseases from "../For/For-Diseases/DTableDiseases/DTableDiseases";
import DTableNotifications from "../For/For-Notifications/DTableNotifications/DTableNotifications";
const HomeFarmer = () => {
  const [activeSection, setActiveSection] = useState("notifications"); // Establece la sección activa inicialmente como 'farmers'
  const [showProfileFarmer, setshowProfileFarmer] = useState(false);

  const handleConfigureProfileClick = () => {
    setshowProfileFarmer(true);
  };

  const handleProfileFormCancel = () => {
    setshowProfileFarmer(false);
  };

  return (
    <div>
      <div className="navbar-container-farmer">
        <NavbarFarmer onConfigureProfileClick={handleConfigureProfileClick} />
      </div>
      <div className="dashboard-farmer">
        <SidebarFarmer
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        <div className="table-container-farmer">
          <div className="space-farmer">
            <Routes>
              <Route path="/notificaciones" element={<DTableNotifications />} />
              <Route path="/invernaderos" element={<DTableGreenhouses />} />
              <Route path="/invernaderos/camas" element={<DTableBeds />} />
              <Route
                path="/invernaderos/camas/imagenes-analizadas"
                element={<DTableImagesA />}
              />
              <Route path="/trabajadores/" element={<DTableWorkers />} />
              <Route path="/plagas/" element={<DTablePlagues />} />
              <Route path="/enfermedades/" element={<DTableDiseases />} />
            </Routes>
          </div>
        </div>
      </div>
      {/*showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />*/}
    </div>
  );
};

export default HomeFarmer;
