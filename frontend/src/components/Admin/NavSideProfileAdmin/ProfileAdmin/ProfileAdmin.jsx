import React, { useState } from 'react';
import './ProfileAdmin.css';

const ProfileAdmin = ({ onCancelClick}) => {
    const [values, setValues] = useState({
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      telefono: "",
      correo: "",
      nombreUsuario: "",
      contrasenia:""
    });
  
    const handdleInputChange = (event) => {
      const { name, value } = event.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
    
  
    return (
      <div className="profile-admin-form">
        <div className='centrar-admin'>
        <h4 className='h4profile'>Configurar perfil</h4>
        <h5 className='h5profile'>*Campos requeridos</h5>
        <label className='titles-datos-admin'>Registre sus datos personales</label>
        <div className="form-section-profile">
          <div className="column-admin-profile">
            <label  className='titles-admin'>Nombre*</label>
            <input
              className='inputs-profile-admin'
              type="text"
              required
              name="nombre"
              placeholder="Ingrese su nombre"
              onChange={handdleInputChange}
            />
          </div>
          <div className="column-admin-profile">
            <label  className='titles-admin'>Primer apellido*</label>
            <input
              className='inputs-profile-admin'
              type="text"
              required
              name="primerApellido"
              placeholder="Ingrese su primer apellido"
              onChange={handdleInputChange}
            />
          </div>
          <div className="column-admin-profile">
            <label  className='titles-admin'>Segundo apellido*</label>
            <input
              className='inputs-profile-admin'
              type="text"
              required
              name="segundoApellido"
              placeholder="Ingrese su segundo apellido"
              onChange={handdleInputChange}
            />
          </div>
        </div>
        <div className="form-section-profile">
          <div className="column-admin-profile">
            <label className='titles-admin'>Correo*</label>
            <input
              className='inputs-profile-admin'
              type="text"
              required
              name="correo"
              placeholder="ejemplo@gmail.com"
              onChange={handdleInputChange}
            />
          </div>
          <div className="column-admin-profile">
            <label className='titles-admin'>Teléfono*</label>
            <input
              className='inputs-profile-admin'
              type="text"
              required
              name="telefono"
              placeholder="Ingrese su número telefónico"
              onChange={handdleInputChange}
            />
          </div>
          <div></div>
        </div>
  
        <h4 className='titles-datos-admin'>Configure los datos de inicio de sesión</h4>
        <div className="form-section-profile">
          <div className="column-admin-profile">
            <label className='titles-admin'>Nombre de usuario*</label>
            <input
              className='inputs-profile-admin2'
              type="text"
              required
              name="nombreUsuario"
              placeholder="Ingrese su nombre de usuario"
              onChange={handdleInputChange}
            />
          </div>
          <div className="column-admin-profile">
            <label className='titles-admin'>Contraseña*</label>
            <input
              className='inputs-profile-admin2'
              type="password"
              required
              name="contrasenia"
              placeholder="Contraseña"
              onChange={handdleInputChange}
            />
          </div>
        </div>
        <div className="password-rules-admin">
          <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
          <label>*Debes de incluir letras mayúsculas y minúsculas</label>
          <label>*Debes de incluir al menos un número y un símbolo (Todos son válidos).</label>
        </div>
        <div className='button-container-profile'>
            <button className='button-admin' type="submit">Guardar cambios</button>
            <button className='button-cancel-admin ' onClick={onCancelClick}>Cancelar</button>
          </div>
      </div>
      </div>
    );
  };
  
  export default ProfileAdmin;
  