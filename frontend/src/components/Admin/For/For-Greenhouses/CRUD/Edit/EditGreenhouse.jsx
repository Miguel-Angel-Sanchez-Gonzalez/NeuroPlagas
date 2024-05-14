import React, { useState, useEffect } from 'react';
import './EditGreenhouse.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';
import GreenhouseType from '../../ComboBox/GreenhouseType';
import ResponsibleFarmerAndWorker from '../../../For-Workers/ComboBox/ResponsibleFarmerAndWorker';

const EditGreenhouse = ({ onCancelClick, idGreenhouse }) => {
  const [records, setRecords] = useState('');
  const [greenhouseExists, setGreenhouseExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [idFarmer, setIdFarmer] = useState('');
  const [idAgricultorResponsable, setidAgricultorResponsable] = useState('');
  const [originalName, setOriginalName] = useState('');
  
  const [values, setValues] = useState({
    nombreInvernadero: "",
    tipoInvernadero: "",
    humedad: "",
    tamanio: "",
    agricultorResponsable: ""
  });


  const [valuesFarmer, setValuesFarmer] = useState({
    nombreAgricultorResponsable: ""
  });

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setValues(values => ({
      ...values,
      [name]: value,
    }));
    if (name === 'nombreInvernadero') {
      setGreenhouseExists(false);
    }
  };

  //PARA LOS COMBOBOX
  const handleTypeGreenhouseSelect = (selectedOption) => {
    setValues({ ...values, tipoInvernadero: selectedOption }); // Actualiza el tipo de invernadero seleccionado
  };

  const handleRespFarmerSelect = (selectedOption) => {
    setValues({ ...values, agricultorResponsable: selectedOption }); // Actualiza el tipo de invernadero seleccionado
  };
  //

  const handleInputFocus = () => {
    setIsInputFocused(true); // Actualiza el estado cuando un input recibe enfoque
    setRecords(''); // Borra el mensaje de error
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Actualiza el estado cuando un input pierde el enfoque
  };



  //Para obtener la data del Greenhouse y setearla en los INPUT
  useEffect(() => {
    const getGreenhouseById = () => {
      fetch(`http://localhost:3000/greenhouse/${idGreenhouse}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error al obtener el invernadero');
        })
        .then(data => {
          setOriginalName(data[0].nombre)
          
          setValues({
            nombreInvernadero: data[0].nombre,
            tipoInvernadero: data[0].tipo_invernadero,
            humedad: data[0].humedad,
            tamanio: data[0].tamanio
          });
          setidAgricultorResponsable(data[0].id_agricultor);
          console.log("el id del agricultor a byscar es" , data[0].id_agricultor);
          fetch(`http://localhost:3000/farmer/${data[0].id_agricultor}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error al obtener el agricultor responsable');
          })
          .then(data => {
            //console.log("data del agricultor" , data);
            setValuesFarmer({
              nombreAgricultorResponsable: data.nombre +" "+ data.primer_apellido +" "+ data.segundo_apellido
            });
          })
          .catch(error => {
            console.error('Error al obtener el agricultor responsable:', error);
          });

        })
        .catch(error => {
          console.error('Error al obtener el invernadero:', error);
        });
    };
    getGreenhouseById();
  }, [idGreenhouse]);




  useEffect(()=>{
    checkGreenhouseExists();
  }, []);


  /*FUNCIONES*/
  async function checkGreenhouseExists(greenhouseName){
      const response = await fetch(`http://localhost:3000/greenhouse/checkExist/${greenhouseName}`)
      const data = await response.json()
      //se están cargando los datos
      return data.exists;
  }
  
  //Data para el fetch de actualizacion
  const data = {
    idFarmer : idAgricultorResponsable,
    name: values.nombreInvernadero,
    typeGreenhouse: values.tipoInvernadero,
    humidity: values.humedad,
    size: values.tamanio
  };

  const onConfirmClick = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    //ESPACIO DE VALIDACIONES INVERNADERO
    
    for (const key in values) {
      if (values[key] === "" || (key === "agricultorResponsable" && !values[key])) {
        setRecords('Por favor complete todos los campos.');
        return;
      }
    }

        // Validar si el nombre de invernadero fue modificado
    if (values.nombreInvernadero !== originalName) {
      //Validando que el invernadero exista
      const greenhouseExists = await checkGreenhouseExists(values.nombreInvernadero);
      if (greenhouseExists) {
        setGreenhouseExists(true);
        return;
      }
    }else{
      setGreenhouseExists(false);
    }
    

    //YA QUE PASARON TODAS LAS VALIDACIONES
    setIsLoading(true);
    //console.log("La data que va hacer el update es: " , data);
    updateGreenhouseData();
  };


  const updateGreenhouseData = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/greenhouse/${idGreenhouse}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        setIsLoading(false);
        setLoadingMessage('El invernadero se actualizó correctamente.');
        setTimeout(() => {
          setLoadingMessage(''); // Oculta el mensaje después de unos segundos
          window.location.reload();
        }, 2000); 
      } else {
        throw new Error('No se pudo actualizar el invernadero');
      }
    })
    .catch(error => {
      console.error('Error al actualizar el invernadero:', error);
      alert("Error al actualizar el invernadero");
    });
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
        <div className="edit-greenhouse-container">
          <div className='centrar-greenhouse'>
          <h4 className='h4edit-greenhouse'>Editar invernadero</h4>
          <h5 className='h5edit-greenhouse'>*Campos requeridos</h5>
          <label className='label-dato-greenhouse'>Edite los datos del invernadero</label>
          <div className="form-sec-greenhouse-edit">
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.nombreInvernadero && 'red-label'}`}>
                Nombre del invernadero*
              </label>
              <input
                className={`inputs-edit-greenhouse ${isFormSubmitted && !values.nombreInvernadero && 'red-input'}`}
                type="text"
                required
                name="nombreInvernadero"
                placeholder="Ingrese el nombre del invernadero"
                value={values.nombreInvernadero}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={async () => {
                  handleInputBlur();
                }}
                style={values.nombreInvernadero ? {  backgroundColor: '#EFF6FF' } : null}
              />
              {greenhouseExists && <p className="greenhouse-exists">Nombre ya registrado.</p>}
            </div>
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.tipoInvernadero && 'red-label'}`}>
                Tipo de invernadero*
              </label>
              <GreenhouseType
                selected={values.tipoInvernadero}
                setSelected={handleTypeGreenhouseSelect}
              />
            </div>
          </div>
          <div className="form-sec-greenhouse-edit">
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.humedad && 'red-label'}`}>
                Humedad (C°)*
              </label>
              <input
                className={`inputs-edit-greenhouse2 ${isFormSubmitted && !values.humedad && 'red-input'}`}
                type="text"
                required
                name="humedad"
                placeholder="Humedad en °C"
                value={values.humedad}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                style={values.humedad ? {  backgroundColor: '#EFF6FF' } : null}
              />
            </div>
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.tamanio && 'red-label'}`}>
                Tamaño (mts)*
              </label>
              <input
                className={`inputs-edit-greenhouse2 ${isFormSubmitted && !values.tamanio && 'red-input'}`}
                type="text"
                required
                name="tamanio"
                placeholder="Ingrese el tamaño en mts."
                value={values.tamanio}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                style={values.tamanio ? {  backgroundColor: '#EFF6FF' } : null}
              />
            </div>
          </div>
          <br />
          <label className='label-dato-greenhouse'>Editar datos del agricultor </label>
          <div className="form-sec-greenhouse-edit">
            <div className="column-edit-greenhouse">
            <label className='label-worker-e'>Agricultor responsable*</label>
              <ResponsibleFarmerAndWorker
                idFarmer={idFarmer}
                setIdFarmer={setIdFarmer}
                isFormSubmitted={isFormSubmitted}
                value={valuesFarmer.nombreAgricultorResponsable}
                //ModoEdicion
                isEditing={true}
                onFarmerSelected={(farmerId) => setidAgricultorResponsable(farmerId)}
              />
            </div>
          </div>
          <div className='button-container-greenhouse '>
              <button className='button-greenhouse' type="submit" onClick={onConfirmClick}>Guardar</button>
              {/* {isLoading ? 'Enviando..' : 'Enviar'} */}
              <button className='button-greenhouse ' onClick={onCancelClick}>Cancelar</button>
            </div>
            {records && !isInputFocused && <p className='error-message-greenhouse'>{records}</p>}
        </div>
        {loadingMessage && (
            <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification"/>
          )}
        </div>
        </div>
  );
};

export default EditGreenhouse;
