import React, { useState, useEffect } from 'react';
import './EditWorker.css';
import ResponsibleFarmerInWorker from '../../ComboBox/ResponsibleFarmerInWorker';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const EditWorker = ({onCancelClick, idWorker }) => {
  const [records, setRecords] = useState('');
  const [idFarmer, setIdFarmer] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [idAgricultorResponsable, setidAgricultorResponsable]  = useState('');

  const [values, setValues] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    correo: "",
    nombreUsuario: "",
    contrasenia: ""
  });

  const [valuesFarmer, setValuesFarmer] = useState({
    nombreAgricultorResponsable: ""
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); // Actualiza el estado cuando un input recibe enfoque
    setRecords(''); // Borra el mensaje de error
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Actualiza el estado cuando un input pierde el enfoque
  };

  //Para obtener la data del Worker y setearla en los INPUT
  useEffect(() => {
    const getWorkerById = () => {
      fetch(`http://localhost:3000/worker/${idWorker}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error al obtener el trabajador');
        })
        .then(data => {
          setValues({
            primerApellido: data.primer_apellido,
            nombre: data.nombre,
            segundoApellido: data.segundo_apellido,
            telefono: data.telefono,
            correo: data.correo_electronico,
            nombreUsuario: data.nombre_usuario,
            contrasenia: data.contrasenia
          });
          setidAgricultorResponsable(data.id_agricultor);

          fetch(`http://localhost:3000/farmer/${data.id_agricultor}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error al obtener el agricultor responsable');
          })
          .then(data => {
            setValuesFarmer({
              nombreAgricultorResponsable: data.nombre +" "+ data.primer_apellido +" "+ data.segundo_apellido
            });
          })
          .catch(error => {
            console.error('Error al obtener el agricultor responsable:', error);
          });

        })
        .catch(error => {
          console.error('Error al obtener el trabajador:', error);
        });
    };
    getWorkerById();
  }, [idWorker]);



  //Data para el fetch de actualizacion
  const data = {
    idFarmer : idAgricultorResponsable,
    name : values.nombre,
    surname : values.primerApellido,
    secondSurname : values.segundoApellido,
    phone : values.telefono,
    email: values.correo,
    nameUser : values.nombreUsuario,
    password : values.contrasenia,
    role : "worker"
  };

  const onConfirmClick = async () => {
    setIsFormSubmitted(true);
  
    // ESPACIO DE VALIDACIONES
  
    // Si todas las validaciones son correctas, proceder a actualizar
    
    console.log("la data que se va actualizar es: ", data);
    console.log("mi ID ES", idAgricultorResponsable);
    //updateWorkerData();
  };


  const updateWorkerData = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/worker/${idWorker}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        setIsLoading(false);
        setLoadingMessage('El trabajador se actualizó correctamente.');
        setTimeout(() => {
          setLoadingMessage(''); // Oculta el mensaje después de unos segundos
          window.location.reload();
        }, 2000); 
      } else {
        throw new Error('No se pudo actualizar el trabajador');
      }
    })
    .catch(error => {
      console.error('Error al actualizar el trabajador:', error);
      alert("Error al actualizar el trabajador");
    });
  };
  
  
  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="edit-worker-container">
        <div className='centrar-worker'>
          <h4 className='h4edit-worker'>Editar trabajador</h4>
          <h5 className='h5edit-worker'>*Campos requeridos</h5>
          <label className='label-dato-worker'>Edite sus datos personales</label>
          <div className="form-sec-worker-edit">
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.nombre && 'red-label'}`}>
                Nombre*
              </label>
              <input
                className= {`inputs-edit-worker ${isFormSubmitted && !values.nombre && 'red-input'}`}
                type="text"
                required
                name="nombre"
                placeholder="Ingrese su nombre"
                value={values.nombre}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                
              />
            </div>
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.primerApellido && 'red-label'}`}>
                Primer apellido*
              </label>
              <input
                className='inputs-edit-worker'
                type="text"
                required
                name="primerApellido"
                value={values.primerApellido}
                placeholder="Ingrese su primer apellido"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.segundoApellido && 'red-label'}`}>
                Segundo apellido*
              </label>
              <input
                className='inputs-edit-worker'
                type="text"
                required
                name="segundoApellido"
                value={values.segundoApellido}
                placeholder="Ingrese su segundo apellido"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
          </div>
          <div className="form-sec-worker-edit">
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.correo && 'red-label'}`}>
                Correo*
              </label>
              <input
                className='inputs-edit-worker'
                type="text"
                required
                name="correo"
                value={values.correo}
                placeholder="ejemplo@gmail.com"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.telefono && 'red-label'}`}>
                Teléfono*
              </label>
              <input
                className='inputs-edit-worker'
                type="text"
                required
                name="telefono"
                value={values.telefono}
                placeholder="Ingrese su número telefónico"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div></div>
          </div>
          <div className='espacio'>
            <label className='label-dato-worker'>Edite sus datos de inicio de sesión</label>
          </div>
          <div className="form-sec-worker-edit">
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.nombreUsuario && 'red-label'}`}>
                Nombre de usuario*
              </label>
              <input
                className='inputs-edit-worker2'
                type="text"
                required
                name="nombreUsuario"
                value={values.nombreUsuario}
                placeholder="Ingrese su nombre de usuario"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.contrasenia && 'red-label'}`}>
                  Contraseña*
                </label>
              <input
                className='inputs-edit-worker2'
                type="password"
                required
                name="contrasenia"
                value={values.contrasenia}
                placeholder="Contraseña"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
          </div>
          <div className="password-rules-worker-e">
            <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
            <br />
            <label>*Debe incluir al menos: una mayúscula, número y un símbolo (Todos son válidos).</label>
          </div>
          <label className='label-dato-worker'>Asigne su agricultor</label>
          <div className="form-sec-worker-edit">
            <div className="column-edit-worker">
              <label className='label-worker-e'>Agricultor responsable*</label>
              <ResponsibleFarmerInWorker
                idFarmer={idFarmer}
                setIdFarmer={setIdFarmer}
                isFormSubmitted={isFormSubmitted}
                value={valuesFarmer.nombreAgricultorResponsable}
                onFarmerSelected={(farmerId) => setidAgricultorResponsable(farmerId)}
                
              />


            </div>
          </div>
              <div className='button-container-admin'>
                <button className='button-worker' type="submit" onClick={onConfirmClick}>Guardar</button>
                <button className='button-worker ' onClick={onCancelClick}>Cancelar</button>
              </div>
              {records && !isInputFocused && <p className='error-message'>{records}</p>}
            </div>
            {loadingMessage && (
              <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification" />
            )}
          </div>
        </div>
  );
};

export default EditWorker;