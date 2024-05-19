import React from 'react';
import NavbarAdmin from '../NavSideProfileAdmin/NavbarAdmin/NavbarAdmin';
import SidebarAdmin from '../NavSideProfileAdmin/SidebarAdmin/SidebarAdmin';
import DTableDiseases from '../For/For-Diseases/DTableDiseases/DTableDiseases';
import DTableFarmers from '../For/For-Farmers/DTableFarmers/DTableFarmers';
import ProfileAdmin from '../NavSideProfileAdmin/ProfileAdmin/ProfileAdmin';
import DTableGreenhouses from '../For/For-Greenhouses/DTableGreenhouses/DTableGreenhouses';
import DTablePlagues from '../For/For-Plagues/DTablePlagues/DTablePlagues';
import DTableWorkers from '../For/For-Workers/DTableWorkers/DTableWorkers';
import Dashboard from '../../Dashboard/Dashboard';
import './HomeAdmin.css'; // Importa tus estilos CSS aquí
import { Route, Routes, useNavigate } from 'react-router-dom';

const HomeAdmin = () => {
    const [showProfileAdmin, setShowProfileAdmin] = React.useState(false);
    const navigate = useNavigate();

    const handleConfigureProfileClick = () => {
        setShowProfileAdmin(true);
    };

    const handleProfileFormCancel = () => {
        setShowProfileAdmin(false);
    };

    return (
        <div>
            <div className="navbar-container-admin">
                <NavbarAdmin onConfigureProfileClick={handleConfigureProfileClick} />
            </div>
            <div className='dashboard-admin'>
                <SidebarAdmin />
                <div className='table-container-admin'>
                    <div className='space-admin'>
                        <Routes>

                            <Route path="/agricultores" element={<DTableFarmers />} />
                            <Route path="/invernaderos" element={<DTableGreenhouses />} />
                            <Route path="/trabajadores" element={<DTableWorkers />} />
                            <Route path="/reportes" element={<Dashboard />} />
                            <Route path="/plagas" element={<DTablePlagues />} />
                            <Route path="/enfermedades" element={<DTableDiseases />} />
                        </Routes>
                    </div>
                </div>
            </div>
            {showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />}
        </div>
    );
};

export default HomeAdmin;
