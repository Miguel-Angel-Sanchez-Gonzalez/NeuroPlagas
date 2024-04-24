import React, { useState, useEffect } from 'react';
import './RegisterDisease.css';

const RegisterDisease = ({ onCancelClick }) => {
  const [enfermedades, setEnfermedades] = useState([]);
  const [message, setMessage] = useState('');

  const [values, setValues] = useState({
    nombreEnfermedad: "",
    nombreCientifico: "",
    descripcion: "",
    recomendaciones: "",
    acciones: ""
  });

//    useEffect(()=>{
//     updateDisease();
//   },[])

// async function updateDisease(){
//   const response = await fetch(`http://localhost:3000/disease`)
//   const data = await response.json()
//   setEnfermedades(data);
//   console.log(enfermedades)
// } 


  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setValues(values => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: values.nombreEnfermedad,
      nameScientific: values.nombreCientifico,
      description: values.descripcion,
      recommendations: values.recomendaciones,
      actions: values.acciones
    };

    //Se esta haciendo la promesa
      const response = await fetch('http://localhost:3000/disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }) 
        if (response){
          setMessage('Se ha agregado correctamente la enfermedad.');
          //updateDisease();
          window.location.reload();
        }
  };
  


  return (
    <div className="register-disease-form">
      <div className='centrar-disease'>
      <h4 className='h4register'>Registrar enfermedad</h4>
      <h5 className='h5register'>*Campos requeridos</h5>
      <label className='label-datos-disease'>Registre una nueva enfermedad</label>
      <div className="form-section-disease">
        <div className="column-admin-register">
          <label className='label-disease'>Nombre de la enfermedad*</label>
          <input
            className='inputs-register-disease'
            type="text"
            required
            name="nombreEnfermedad"
            placeholder="Ingrese el nombre de la enfermedad"
            value={values.nombreEnfermedad}
            onChange={handleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-disease'>Nombre científico*</label>
          <input
            className='inputs-register-disease'
            type="text"
            required
            name="nombreCientifico"
            placeholder="Ingrese el nombre científico"
            value={values.nombreCientifico}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-section-disease">
        <div className="column-admin-register">
          <label className='label-disease'>Descripción*</label>
          <input
            className='input-description-register'
            type="text"
            required
            name="descripcion"
            placeholder="Escriba una pequeña descripción"
            value={values.descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-disease'>Recomendacciones*</label>
          <input
            className='input-description-register'
            type="text"
            required
            name="recomendaciones"
            placeholder="Ingrese las recomendaciones"
            value={values.recomendaciones}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-section-disease">
        <div className="column-admin-register">
          <label className='label-disease'>Acciones*</label>
          <input
            className='input-description-register2'
            type="text"
            required
            name="acciones"
            placeholder="Mencione las acciones a tomar"
            value={values.acciones}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='button-container-admin'>
          <button className='button-admin' type="submit" onClick={handleSubmit} >Guardar</button>
          <button className='btncan-register-disease' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default RegisterDisease;