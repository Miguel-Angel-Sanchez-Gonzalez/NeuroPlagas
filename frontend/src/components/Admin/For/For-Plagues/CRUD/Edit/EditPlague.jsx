import React, { useState, useEffect } from 'react';
import './EditPlague.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const EditPlague = ({ rowData, onCancelClick, idPlague}) => {
  const [records, setRecords] = useState('');
  const [plagueExists, setPlagueExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [originalPlague, setOriginalPlague] = useState('');

  const [values, setValues] = useState({
    nombrePlaga: "",
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
    // if (name === 'nombrePlaga') {
    //   setPlagueExists(false);
    // }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); 
    setRecords(''); 
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };


  async function checkPlagueExists (plagueName) {
    const response = await fetch(`http://localhost:3000/plague/checkExist/${plagueName}`);
    const data = await response.json();
    return data.exists;
  };
  

  //Para el fetch de recuperacion de data de la plaga, mostrar los datos de la plaga
  useEffect(() => {
    const getPlagueById = () => {
      fetch(`http://localhost:3000/plague/${idPlague}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error al obtener la plaga: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Datos recibidos:", data);
          setOriginalPlague(data.nombre);
          setValues({
            nombrePlaga: data.nombre,
            nombreCientifico: data.nombre_cientifico,
            descripcion: data.descripcion,
            recomendaciones: data.recomendaciones,
            acciones: data.acciones
          });
        })
        .catch(error => {
          console.error('Error al obtener la plaga:', error);
        });
    };
    getPlagueById();
  }, [idPlague]);
  

  //Data para el fetch de actualizacion
  const data = {
    name: values.nombrePlaga,
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
    
    //Validando que la enfermedad exista
    //const plagueExists = await checkPlagueExists(values.nombreEnfermedad);
    if (values.nombrePlaga !== originalPlague) {
      const plagueExists = await checkPlagueExists(values.nombrePlaga);
      if (plagueExists) {
        setPlagueExists(true);
        return;
      } else {
        setPlagueExists(false);
      }
    }
  
    // Si todas las validaciones son correctas, proceder a actualizar
    updatePlagueData(); 
  }
  

  const updatePlagueData = () => {
    console.log("Datos a enviar al servidor:", data); 
    setIsLoading(true);
    fetch(`http://localhost:3000/plague/${idPlague}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        setIsLoading(false);
        setLoadingMessage('La plaga se actualizó correctamente.');
        setTimeout(() => {
          setLoadingMessage(''); // Oculta el mensaje después de unos segundos
          window.location.reload();
        }, 2000); 
      } else {
        throw new Error('No se pudo actualizar la plaga');
      }
    })
    .catch(error => {
      console.error('Error al actualizar la plaga:', error);
      alert("Error al actualizar la plaga");
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
        <div className="edit-plague-container">
          <div className='centrar-plague'>
          <h4 className='h4edit-plague'>Editar plaga</h4>
          <h5 className='h5edit-plague'>*Campos requeridos</h5>
          <label className='label-dato-plague'>Edite la plaga que desee</label>
          <div className="form-sec-plague-edit">
            <div className="column-edit-plague">
              <label className={`labels-plague-e ${isFormSubmitted && !values.nombrePlaga && 'red-label'}`}>
                  Nombre de la plaga*
              </label>
              <input
                className={`inputs-edit-plague ${isFormSubmitted && !values.nombrePlaga && 'red-input'}`}
                type="text"
                required
                name="nombrePlaga"
                placeholder="Ingrese el nombre de la plaga"
                value={values.nombrePlaga}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                style={values.nombrePlaga ? {  backgroundColor: '#EFF6FF' } : null}   
              />
              {plagueExists && values.nombrePlaga !== originalPlague && (
                <p className="plague-exists">La plaga ya fue registrada.</p>
              )}
            </div>
            <div className="column-edit-plague">
              <label className={`labels-plague-e ${isFormSubmitted && !values.nombreCientifico && 'red-label'}`}>
                Nombre científico*
              </label>
              <input
                className={`inputs-edit-plague ${isFormSubmitted && !values.nombreCientifico && 'red-input'}`}
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
          <div className="form-sec-plague-edit">
            <div className="column-edit-plague">
              <label className={`labels-plague-e ${isFormSubmitted && !values.descripcion && 'red-label'}`}>
                Descripción*
              </label>
              <textarea
                className= {`textarea-plague-e ${isFormSubmitted && !values.descripcion && 'red-input'}`}
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
            <div className="column-edit-plague">
              <label className={`labels-plague-e ${isFormSubmitted && !values.recomendaciones && 'red-label'}`}>
                  Recomendaciones*
              </label>
              <textarea
                className= {`textarea-plague-e ${isFormSubmitted && !values.recomendaciones && 'red-input'}`}
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
          <div className="form-sec-plague-edit">
            <div className="column-edit-plague">
              <label className={`labels-plague-e ${isFormSubmitted && !values.acciones && 'red-label'}`}>
                  Acciones*
                </label>
              <textarea
                className= {`textarea-plague-e2 ${isFormSubmitted && !values.acciones && 'red-input'}`}
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
          <div className='button-container-admin-pe'>
              <button className='button-plague-e' type="submit" onClick={onConfirmClick}>Guardar</button>
                 {/* {isLoading ? 'Enviando..' : 'Enviar'} */}
              <button className='button-plague-e ' onClick={onCancelClick}>Cancelar</button>
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

export default EditPlague;
