import React, { useState, useEffect } from 'react';
import './RegisterDisease.css';

const RegisterDisease = ({ onCancelClick }) => {
  const [records, setRecords] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado

  const [values, setValues] = useState({
    nombreEnfermedad: "",
    nombreCientifico: "",
    descripcion: "",
    recomendaciones: "",
    acciones: ""
  });


  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setValues(values => ({
      ...values,
      [name]: value,
    }));
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); // Actualiza el estado cuando un input recibe enfoque
    setRecords(''); // Borra el mensaje de error
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Actualiza el estado cuando un input pierde el enfoque
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); 
    

    const data = {
      name: values.nombreEnfermedad,
      nameScientific: values.nombreCientifico,
      description: values.descripcion,
      recommendations: values.recomendaciones,
      actions: values.acciones
    };

    for (const key in values) {
      if (values[key] === "") {
        setRecords('Por favor complete todos los campos.');
        return;
      }
    }

    //Se esta haciendo la promesa
      const response = await fetch('http://localhost:3000/disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }) 
        if (response){
          alert('Se ha agregado correctamente la enfermedad.');
          window.location.reload();
        } else {
          setRecords('Hubo un problema al agregar la enfermedad. Por favor, inténtelo de nuevo más tarde.');
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
            <label className={`label-disease ${isFormSubmitted && !values.nombreEnfermedad && 'red-label'}`}>
              Nombre de la enfermedad*
            </label>
            <input
            className={`inputs-register-disease ${isFormSubmitted && !values.nombreEnfermedad && 'red-input'}`}
            type="text"
            required
            name="nombreEnfermedad"
            placeholder="Ingrese el nombre de la enfermedad"
            value={values.nombreEnfermedad}
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
        <div className="column-admin-register">
            <label className={`label-disease ${isFormSubmitted && !values.nombreCientifico && 'red-label'}`}>
              Nombre científico*
            </label>
          <input
            className={`inputs-register-disease ${isFormSubmitted && !values.nombreCientifico && 'red-input'}`}
            type="text"
            required
            name="nombreCientifico"
            placeholder="Ingrese el nombre científico"
            value={values.nombreCientifico}
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
      </div>
      <div className="form-section-disease">
        <div className="column-admin-register">
            <label className={`label-disease ${isFormSubmitted && !values.descripcion && 'red-label'}`}>
              Descripción*
            </label>
          <input
            className= {`input-description-register ${isFormSubmitted && !values.descripcion && 'red-input'}`}
            type="text"
            required
            name="descripcion"
            placeholder="Escriba una pequeña descripción"
            value={values.descripcion}
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
        <div className="column-admin-register">
            <label className={`label-disease ${isFormSubmitted && !values.recomendaciones && 'red-label'}`}>
              Recomendaciones*
            </label>
          <input
            className= {`input-description-register ${isFormSubmitted && !values.recomendaciones && 'red-input'}`}
            type="text"
            required
            name="recomendaciones"
            placeholder="Ingrese las recomendaciones"
            value={values.recomendaciones}
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
      </div>
      <div className="form-section-disease">
        <div className="column-admin-register">
            <label className={`label-disease ${isFormSubmitted && !values.acciones && 'red-label'}`}>
              Acciones*
            </label>
          <input
            className= { `input-description-register2 ${isFormSubmitted && !values.acciones && 'red-input'}`}
            type="text"
            required
            name="acciones"
            placeholder="Mencione las acciones a tomar"
            value={values.acciones}
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
      </div>
        <div className='button-container-admin'>
          <button className='button-admin' type="submit" onClick={handleSubmit} >Guardar</button>
          <button className='btncan-register-disease' onClick={onCancelClick}>Cancelar</button>
        </div>
        {records && !isInputFocused && <p className='error-message'>{records}</p>}
    </div>
    </div>
  );
};

export default RegisterDisease;