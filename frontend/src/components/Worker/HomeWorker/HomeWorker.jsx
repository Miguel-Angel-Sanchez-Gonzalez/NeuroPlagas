import React, { useState } from "react";
import NavbarWorker from "../NavSideProfileWorker/NavbarWorker/NavbarWorker";
import SidebarWorker from "../NavSideProfileWorker/SidebarWorker/SidebarWorker";
import "./HomeWorker.css";
import { Route, Routes } from "react-router-dom";
import DTableGreenhouses from "../For/For-Greenhouses/DTableGreenhouses/DTableGreenhouses";
import DTableBeds from "../For/For-Beds/DTableBeds/DTableBeds";
import DTableImagesA from "../For/For-ImagesAnalized/DTableImagesAnalized/DTableImagesA";
import DTablePlagues from "../For/For-Plagues/DTablePlagues/DTablePlagues";
import DTableDiseases from "../For/For-Diseases/DTableDiseases/DTableDiseases";
import DTableNotifications from "../../Farmer/For/For-Notifications/DTableNotifications/DTableNotifications";
const HomeWorker = () => {
  const [activeSection, setActiveSection] = useState("notifications"); // Establece la sección activa inicialmente como 'farmers'
  const [showProfileWorker, setshowProfileWorker] = useState(false);

  const handleConfigureProfileClick = () => {
    setshowProfileWorker(true);
  };

  const handleProfileFormCancel = () => {
    setshowProfileWorker(false);
  };

  return (
    <div>
      <div className="navbar-container-farmer">
        <NavbarWorker onConfigureProfileClick={handleConfigureProfileClick} />
      </div>
      <div className="dashboard-farmer">
        <SidebarWorker
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

export default HomeWorker;
