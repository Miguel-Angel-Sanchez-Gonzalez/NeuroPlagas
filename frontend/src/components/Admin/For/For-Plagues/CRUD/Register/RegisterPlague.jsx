import React, { useState, useEffect } from 'react';
import './RegisterPlague.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const RegisterPlague = ({ onCancelClick }) => {
  const [records, setRecords] = useState('');
  const [plagueExists, setPlagueExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

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
    if (name === 'nombrePlaga') {
      setPlagueExists(false);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); 
    setRecords(''); 
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };


  useEffect(()=>{
    checkPlagueExists();
  }, []);

  /*VER SI LA PLAGA EXISTE*/
  async function checkPlagueExists(plagueName){
      const response = await fetch(`http://localhost:3000/plague/checkExist/${plagueName}`)
      const data = await response.json()
      //se están cargando los datos
      return data.exists;
  } 

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsFormSubmitted(true); 

      for (const key in values) {
        if (values[key] === "") {
          setRecords('Por favor complete todos los campos.');
          return;
        }
      }
        
        //Validando que la enfermedad exista
        //const plagueExists = await checkPlagueExists(values.nombreEnfermedad);
        if (plagueExists) {
          setPlagueExists(true);
          return;
        }

        setIsLoading(true);
        const data = {
          name: values.nombrePlaga,
          nameScientific: values.nombreCientifico,
          description: values.descripcion,
          recommendations: values.recomendaciones,
          actions: values.acciones
        };


        //Se esta haciendo la promesa
        //Post para insertar datos de plaga
          const response = await fetch('http://localhost:3000/plague/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }) 
            if (response){
              const responseData = await response.json();
              const { id } = responseData; // Obtiene el ID del agricultor del backend
              setIsLoading(false);
              setLoadingMessage('Se ha agregado correctamente la plaga.');
              setTimeout(() => {
              setLoadingMessage(''); // Oculta el mensaje después de unos segundos
              window.location.reload();
              }, 2000);
            } else {
              setRecords('Hubo un problema al agregar la plaga. Por favor, inténtelo de nuevo más tarde.');
              setIsLoading(false);
            }
        
  };


  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
        <div className="register-plague-container">
          <div className='centrar-plague'>
            <h4 className='h4register-plague'>Registrar plaga</h4>
            <h5 className='h5register-plague'>*Campos requeridos</h5>
            <label className='label-dato-plague'>Registre una nueva plaga</label>
          <div className="form-sec-plague-register">
            <div className="column-register-plague">
                <label className={`labels-plague-r ${isFormSubmitted && !values.nombrePlaga && 'red-label'}`}>
                  Nombre de la plaga*
                </label>
                <input
                className={`inputs-register-plague ${isFormSubmitted && !values.nombrePlaga && 'red-input'}`}
                type="text"
                required
                name="nombrePlaga"
                placeholder="Ingrese el nombre de la plaga"
                value={values.nombrePlaga}
                onChange={handleInputChange}
                onFocus={handleInputFocus} // Nuevo evento de enfoque
                onBlur={async () => {
                  handleInputBlur();
                  if (values.nombrePlaga) {
                    const plagueExists = await checkPlagueExists(values.nombrePlaga);
                    setPlagueExists(plagueExists);
                  }
                }}
              />
              {plagueExists && <p className="plague-exists">La plaga ya fue registrada.</p>}
            </div>
            <div className="column-register-plague">
                <label className={`labels-plague-r ${isFormSubmitted && !values.nombreCientifico && 'red-label'}`}>
                  Nombre científico*
                </label>
              <input
                className={`inputs-register-plague ${isFormSubmitted && !values.nombreCientifico && 'red-input'}`}
                type="text"
                required
                name="nombreCientifico"
                placeholder="Ingrese el nombre científico"
                value={values.nombreCientifico}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}   
              />
            </div>
          </div>
          <div className="form-sec-plague-register">
            <div className="column-register-plague">
                <label className={`labels-plague-r ${isFormSubmitted && !values.descripcion && 'red-label'}`}>
                  Descripción*
                </label>
              <textarea
                className= {`textarea-plague-r ${isFormSubmitted && !values.descripcion && 'red-input'}`}
                type="text"
                required
                name="descripcion"
                placeholder="Escriba una pequeña descripción"
                value={values.descripcion}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}  
              />
            </div>
            <div className="column-register-plague">
                <label className={`labels-plague-r ${isFormSubmitted && !values.recomendaciones && 'red-label'}`}>
                  Recomendaciones*
                </label>
              <textarea
                className= {`textarea-plague-r ${isFormSubmitted && !values.recomendaciones && 'red-input'}`}
                type="text"
                required
                name="recomendaciones"
                placeholder="Ingrese las recomendaciones"
                value={values.recomendaciones}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}   
              />
            </div>
          </div>
          <div className="form-sec-plague-register">
            <div className="column-register-plague">
                <label className={`labels-plague-r ${isFormSubmitted && !values.acciones && 'red-label'}`}>
                  Acciones*
                </label>
              <textarea
                className= {`textarea-plague-r2 ${isFormSubmitted && !values.acciones && 'red-input'}`}
                type="text"
                required
                name="acciones"
                placeholder="Mencione las acciones a tomar"
                value={values.acciones}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}   
              />
            </div>
          </div>
          <div className='button-container-admin-fr'>
              <button className='button-plague-r' type="submit" onClick={handleSubmit}>Guardar</button>
                 {/* {isLoading ? 'Enviando..' : 'Enviar'} */}
              <button className='button-plague-r ' onClick={onCancelClick}>Cancelar</button>
            </div>
              {records && !isInputFocused && <p className='error-message'>{records}</p>}
            </div>
            {loadingMessage && (
            <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification"/>
          )}
        </div>
      </div>
  );
}

export default RegisterPlague;