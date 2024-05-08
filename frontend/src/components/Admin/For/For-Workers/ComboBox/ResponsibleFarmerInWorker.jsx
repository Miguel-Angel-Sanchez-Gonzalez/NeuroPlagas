import React, { useEffect, useState } from "react";
import './ResponsibleFarmerInWorker.css';

function ResponsibleFarmerInWorker({ idFarmer, setIdFarmer, isFormSubmitted }) {
    const [isActive, setIsActive] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        getFarmers();
    }, []);

    async function getFarmers() {
        const response = await fetch(`http://localhost:3000/farmer/getNameFarmers`);
        const data = await response.json();
        setOptions(data.map(farmer => ({
            label: farmer.nombre,
            value: farmer.id_agricultor
        })));   
    } 

    const handleOptionClick = (option) => {
        setIdFarmer(option.value);
        setIsActive(false);
    };

    return (
        <div className="dropdown">
            <div
                className={`dropdown-btn ${isFormSubmitted && !idFarmer ? 'red-input' : ''}`}
                onClick={() => setIsActive(!isActive)}
            >
                {idFarmer ? options.find(option => option.value === idFarmer).label : "Seleccionar agricultor..."}
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className="dropdown-option" 
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ResponsibleFarmerInWorker;