import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './DataTableFarmer.css'; 

const DataTableFarmer = () => {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Primer apellido',
            selector: row => row.primerApellido,
            sortable: true
        },
        {
            name: 'Segundo apellido',
            selector: row => row.segundoApellido,
            sortable: true
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono
        },
        {
            name: 'Correo electrónico',
            selector: row => row.correo
        },
        {
            name: 'Usuario',
            selector: row => row.usuario,
            sortable: true
        },
        {
            name: 'Contraseña',
            selector: row => row.contrasenia
        }
    ];

    const data = [
        {
            id: 1,
            nombre: 'lizeth',
            primerApellido: 'Antonio',
            segundoApellido: 'López',
            telefono: '9512488426',
            correo: 'lizeth2_intel@gmail.com',
            usuario: 'zeti',
            contrasenia: '123',
        }
    ];

    const [records, setRecords] = useState(data);

    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    };

    const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-responsive'>
            <DataTable 
                title="Agricultores"
                columns={columns}
                data={records}
                responsive={true}
                selectableRows
                fixedHeader
                pagination
                paginationComponentOptions={paginacionOpciones}
                actions={
                    <div className='header-table'>
                        <FontAwesomeIcon icon={faSearch} className='search' />
                        <input type="text" placeholder='Buscar...' onChange={handleFilter} />
                        <button className='buttonAgricultor'>Registrar agricultor</button>
                    </div>
                }
            />
        </div>
    );
};

export default DataTableFarmer;
