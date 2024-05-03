import React, { useEffect, useState } from "react";
import './CBResponFarmer.css';

function CBResponFarmer({ selected, setSelected }) {
    const [isActive, setIsActive] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(()=>{
        getFarmers();
    },[])

    /*FUNCIONES*/
    async function getFarmers(){
        const response = await fetch(`http://localhost:3000/farmer/`)
        const data = await response.json()
        setOptions(data.map(farmer => farmer.name));
        console.log(farmers)
    } 

    const handleOptionClick = (option) => {
        setSelected(option === "Seleccionar tipo..." ? "" : option);
        setIsActive(false);
    };


    return (
        <div className="dropdown-cbfarmer">
            <div
                className="dropdown-cbfarmer-btn"
                onClick={() => setIsActive(!isActive)}
            >
                {selected || "Seleccionar tipo..."}
            </div>
            {isActive && (
                <div className="dropdown-cbfarmer-content">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`dropdown-cbfarmer-option ${option === "Seleccionar tipo..." ? 'placeholder' : ''}`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CBResponFarmer;
