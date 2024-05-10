import React, { useState, useEffect } from 'react';
import './EditDisease.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const EditDisease = ({ rowData, onCancelClick, idDisease}) => {
  const [records, setRecords] = useState('');
  const [diseaseExists, setDiseaseExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [originalDisease, setOriginalDisease] = useState('');
  
  
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
    // if (name === 'nombreEnfermedad') {
    //   setDiseaseExists(false);
    // }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); 
    setRecords(''); 
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  async function checkDiseaseExists(diseaseName) {
    const response = await fetch(`http://localhost:3000/disease/checkExist/${diseaseName}`);
    const data = await response.json();
    return data.exists;
  };

  //Para el fetch de recuperacion de data de la enfermedad, mostrar los datos de la enfermedad
  useEffect(() => {
    const getDiseaseById = () => {
      fetch(`http://localhost:3000/disease/${idDisease}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error al obtener la enfermedad: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Datos recibidos:", data);
          setOriginalDisease(data.nombre);
          setValues({
            nombreEnfermedad: data.nombre,
            nombreCientifico: data.nombre_cientifico,
            descripcion: data.descripcion,
            recomendaciones: data.recomendaciones,
            acciones: data.acciones
          });
          //setOriginalDiseaseExists(true);
        })
        
        .catch(error => {
          console.error('Error al obtener la enfermedad:', error);
          //setOriginalDiseaseExists(false); 
        });
    };
    getDiseaseById();
  }, [idDisease]);
  

  //Data para el fetch de actualizacion
  const data = {
    name: values.nombreEnfermedad,
    nameScientific: values.nombreCientifico,
    description: values.descripcion,
    recommendations: values.recomendaciones,
    actions: values.acciones
  };

  const onConfirmClick = async () => {
  setIsFormSubmitted(true);

  for (const key in values) {
    if (values[key] === "") {
      setRecords('Por favor complete todos los campos.');
      return;
    }
  }

  // if (!originalDiseaseExists) {
  //   // Mostrar mensaje de error si la enfermedad original no existe
  //   setRecords('La enfermedad original no existe.');
  //   return;
  // }

  if (values.nombreEnfermedad !== originalDisease) {
    // Verificar si la enfermedad nueva ya existe en la base de datos
    const diseaseExists = await checkDiseaseExists(values.nombreEnfermedad);
    if (diseaseExists) {
      setDiseaseExists(true);
      return;
    } else {
      setDiseaseExists(false);
    }
  }

  updateDiseaseData();
};

  

  const updateDiseaseData = () => {
    console.log("Datos a enviar al servidor:", data); 
    setIsLoading(true);
    fetch(`http://localhost:3000/disease/${idDisease}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        setIsLoading(false);
        setLoadingMessage('La enfermedad se actualizó correctamente.');
        setTimeout(() => {
          setLoadingMessage(''); // Oculta el mensaje después de unos segundos
          window.location.reload();
        }, 2000); 
      } else {
        throw new Error('No se pudo actualizar la enfermedad');
      }
    })
    .catch(error => {
      console.error('Error al actualizar la enfermedad:', error);
      alert("Error al actualizar la enfermedad");
      setIsLoading(false);
    });
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
        <div className="edit-disease-container">
          <div className='centrar-disease'>
          <h4 className='h4edit-disease'>Editar enfermedad</h4>
          <h5 className='h5edit-disease'>*Campos requeridos</h5>
          <label className='label-dato-disease'>Edite la enfermedad que desee</label>
          <div className="form-sec-disease-edit">
            <div className="column-edit-disease">
            <label className={`labels-disease-e ${isFormSubmitted && !values.nombreEnfermedad && 'red-label'}`}>
                  Nombre de la enfermedad*
              </label>
              <input
                className={`inputs-edit-disease ${isFormSubmitted && !values.nombreEnfermedad && 'red-input'}`}
                type="text"
                required
                name="nombreEnfermedad"
                placeholder="Ingrese el nombre de la enfermedad"
                value={values.nombreEnfermedad}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                style={values.nombreEnfermedad ? {  backgroundColor: '#EFF6FF' } : null}   
              />
              {diseaseExists && values.nombreEnfermedad !== originalDisease && (
                <p className="disease-exists">La enfermedad ya fue registrada.</p>
              )}
            </div>
            <div className="column-edit-disease">
              <label className={`labels-disease-e ${isFormSubmitted && !values.nombreCientifico && 'red-label'}`}>
                Nombre científico*
              </label>
              <input
                className={`inputs-edit-disease ${isFormSubmitted && !values.nombreCientifico && 'red-input'}`}
                type="text"
                required
                name="nombreCientifico"
                placeholder="Ingrese el nombre científico"
                value={values.nombreCientifico}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                style={values.nombreCientifico ? {  backgroundColor: '#EFF6FF' } : null} 
              />
            </div>
          </div>
          <div className="form-sec-disease-edit">
            <div className="column-edit-disease">
            <label className={`labels-disease-e ${isFormSubmitted && !values.descripcion && 'red-label'}`}>
                Descripción*
              </label>
              <textarea
                className= {`textarea-disease-e ${isFormSubmitted && !values.descripcion && 'red-input'}`}
                type="text"
                required
                name="descripcion"
                placeholder="Escriba una pequeña descripción"
                value={values.descripcion}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                style={values.descripcion ? {  backgroundColor: '#EFF6FF' } : null}
              />
            </div>
            <div className="column-edit-disease">
            <label className={`labels-disease-e ${isFormSubmitted && !values.recomendaciones && 'red-label'}`}>
                  Recomendaciones*
              </label>
              <textarea
                className= {`textarea-disease-e ${isFormSubmitted && !values.recomendaciones && 'red-input'}`}
                type="text"
                required
                name="recomendaciones"
                placeholder="Ingrese las recomendaciones"
                value={values.recomendaciones}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                style={values.recomendaciones ? {  backgroundColor: '#EFF6FF' } : null}   
              />
            </div>
          </div>
          <div className="form-sec-disease-edit">
            <div className="column-edit-disease">
            <label className={`labels-disease-e${isFormSubmitted && !values.acciones && 'red-label'}`}>
                  Acciones*
                </label>
              <textarea
                className= {`textarea-disease-e2 ${isFormSubmitted && !values.acciones && 'red-input'}`}
                type="text"
                required
                name="acciones"
                placeholder="Mencione las acciones a tomar"
                value={values.acciones}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                style={values.acciones ? {  backgroundColor: '#EFF6FF' } : null}
              />
            </div>
          </div>
          <div className='button-container-admin-de'>
              <button className='button-disease-e' type="submit" onClick={onConfirmClick}>Guardar</button>
                 {/* {isLoading ? 'Enviando..' : 'Enviar'} */}
              <button className='button-disease-e ' onClick={onCancelClick}>Cancelar</button>
            </div>
              {records && !isInputFocused && <p className='error-message'>{records}</p>}
            </div>
            {loadingMessage && (
            <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification"/>
          )}
      </div>
    </div>
  );
};

export default EditDisease;
