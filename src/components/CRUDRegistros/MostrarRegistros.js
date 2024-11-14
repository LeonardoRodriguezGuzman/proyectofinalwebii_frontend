import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const endPoint = 'http://localhost:8000/api';
const MostrarRegistros = () => {
    const[registros, setRegistros] = useState([]);
    useEffect(() => {
        getAllRegistros();
    },[])

    const getAllRegistros = async () => {
        const response = await axios.get(`${endPoint}/registros`);
        setRegistros(response.data);
    }

    const deleteRegistro = async (id) => {
        await axios.delete(`${endPoint}/registro/${id}`);
        getAllRegistros();
    }

    return(
        <div>
            <div className='d-grid gap-2'>
                <table className="table table-stripped">
                    <thead className="bg-primary text-white">
                    <tr className=''>
                        <th>Fecha</th>
                        <th>Orden de Produccion</th>
                        <th>Componente</th>
                        <th>Color</th>
                        <th>Turno</th>
                        <th>Tejedor</th>
                        <th>Maquina</th>
                        <th>Semana</th>
                        <th>Produccion Real</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        registros.map((registro) => (
                            <tr key={registro.idRegistro}>
                                <td>{registro.fecha}</td>
                                <td>{registro.odp}</td>
                                <td>{registro.idComponente}</td>
                                <td>{registro.color}</td>
                                <td>{registro.turno}</td>
                                <td>{registro.idTejedor}</td>
                                <td>{registro.maquina}</td>
                                <td>{registro.semana}</td>
                                <td>{registro.produccionReal}</td>
                                <td>
                                    <Link to={`/modificarRegistro/${registro.idRegistro}`} className='btn btn-primary text-white'>Modificar</Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteRegistro(registro.idRegistro)}
                                            className='btn btn-danger'>Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <Link to="/agregarRegistro" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
            </div>
        </div>
    );
}

export default MostrarRegistros;