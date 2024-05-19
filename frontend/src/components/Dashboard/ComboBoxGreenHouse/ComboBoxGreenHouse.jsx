import React, { useState, useEffect } from 'react';
import './ComboBoxGreenHouse.css';

const ComboBoxGreenHouse = ({ onChange }) => {
  const [greenhouses, setGreenhouses] = useState([]);
  const [selectedGreenhouse, setSelectedGreenhouse] = useState('');

  useEffect(() => {
    // Fetch data from the endpoint
    fetch('http://localhost:3000/greenhouse')
      .then(response => response.json())
      .then(data => {
        setGreenhouses(data);
      })
      .catch(error => console.error('Error al cargar los invernaderos:', error));
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedGreenhouse(value);
    onChange(value, event.target.selectedOptions[0].dataset.id);
  };

  return (
    <div className="combobox-greenhouse">
      <select value={selectedGreenhouse} onChange={handleChange}>
        <option value="" disabled>Invernaderos</option>
        {greenhouses.map((greenhouse, index) => (
          <option key={index} value={greenhouse.nombre} data-id={greenhouse.id_invernadero}>
            {greenhouse.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBoxGreenHouse;
