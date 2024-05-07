import React, { useState, useEffect } from 'react';
import './EditFarmer.css';

const EditFarmer = ({ rowData, onCancelClick, idFarmer }) => {

  //Para setear los valores al momento
  const [values, setValues] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    correo: "",
    nombreUsuario: "",
    contrasenia:""
  });


  //Para el fetch de recuperacion de data del farmer
  useEffect(() => {
    const getFarmerById = () => {
      fetch(`http://localhost:3000/farmer/${idFarmer}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error al obtener el agricultor');
        })
        .then(data => {
          // Actualizar el estado con los datos del agricultor
          setValues({
            nombre: data.nombre,
            primerApellido: data.primer_apellido,
            segundoApellido: data.segundo_apellido,
            telefono: data.telefono,
            correo: data.correo_electronico,
            nombreUsuario: data.nombre_usuario,
            contrasenia: data.contrasenia
          });
        })
        .catch(error => {
          console.error('Error al obtener el agricultor:', error);
        });
    };
    getFarmerById();
  }, [idFarmer]);
  
  
  //Data para el fetch de actualizacion
  const data = {
    name: values.nombre,
    surname: values.primerApellido,
    secondSurname: values.segundoApellido,
    phone: values.telefono,
    email: values.correo,
    nameUser: values.nombreUsuario,
    password: values.contrasenia,
    role: "farmer"
  };

  const onConfirmClick = () => {
    console.log("datos que se envian", data);
    fetch(`http://localhost:3000/farmer/${idFarmer}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          alert("El usuario se actualizo correctamente");
          onCancelClick();
          window.location.reload();
        } else {
          alert("Error al actualizar la info de este user");
        }
      })
      .catch(error => {
        console.error('Error al actualizar el farmer:', error);
        alert("Error al actualizar el farmer");
      });
  }




  const handdleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="edit-farmer-container">
      <div className='centrar-farmer'>
      <h4 className='h4edit-farmer'>Editar agricultor</h4>
      <h5 className='h5edit-farmer'>*Campos requeridos</h5>
      <label className='label-dato-farmer'>Edite sus datos personales</label>
      <div className="form-sec-farmer-edit">
        <div className="column-edit-farmer">
          <label  className='label-farmer-e'>Nombre*</label>
          <input
            className='inputs-edit-farmer'
            type="text"
            required
            name="nombre"
            placeholder="Ingrese su nombre"
            value={values.nombre}
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-farmer">
          <label  className='label-farmer-e'>Primer apellido*</label>
          <input
            className='inputs-edit-farmer'
            type="text"
            required
            name="primerApellido"
            placeholder="Ingrese su primer apellido"
            value={values.primerApellido}
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-farmer">
          <label  className='label-farmer-e'>Segundo apellido*</label>
          <input
            className='inputs-edit-farmer'
            type="text"
            required
            name="segundoApellido"
            placeholder="Ingrese su segundo apellido"
            value={values.segundoApellido}
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-sec-farmer-edit">
        <div className="column-edit-farmer">
          <label className='label-farmer-e'>Correo*</label>
          <input
            className='inputs-edit-farmer'
            type="text"
            required
            name="correo"
            placeholder="ejemplo@gmail.com"
            value={values.email}
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-farmer">
          <label className='label-farmer-e'>Teléfono*</label>
          <input
            className='inputs-edit-farmer'
            type="text"
            required
            name="telefono"
            placeholder="Ingrese su número telefónico"
            value={values.telefono}
            onChange={handdleInputChange}
          />
        </div>
        <div></div>
      </div>

      <label className='label-dato-farmer'>Edite sus datos de inicio de sesión</label>
      <div className="form-sec-farmer-edit">
        <div className="column-edit-farmer">
          <label className='label-farmer-e'>Nombre de usuario*</label>
          <input
            className='inputs-edit-farmer2'
            type="text"
            required
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            value={values.nombreUsuario}
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-farmer">
          <label className='label-farmer-e'>Contraseña*</label>
          <input
            className='inputs-edit-farmer2'
            type="password"
            required
            name="contrasenia"
            placeholder="Contraseña"
            value={values.contrasenia}
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="password-rules-farmer-e">
        <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
        <br/>
        <label>*Debes de incluir letras mayúsculas y minúsculas</label>
        <br/>
        <label>*Debes de incluir al menos un número y un símbolo (Todos son válidos).</label>
      </div>
      <div className='button-container-admin'>
          <button className='button-farmer' type="submit" onClick={onConfirmClick}>Guardar</button>
          <button className='button-farmer ' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default EditFarmer;
