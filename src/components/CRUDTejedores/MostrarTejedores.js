import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const endPoint = 'http://localhost:8000/api';
const MostrarTejedores = () => {
    const[tejedores, setTejedores] = useState([]);
    useEffect(() => {
        getAllTejedores();
    },[])

    const getAllTejedores = async () => {
        const response = await axios.get(`${endPoint}/tejedores`);
        setTejedores(response.data);
    }

    const deleteTejedor = async (id) => {
        await axios.delete(`${endPoint}/tejedor/${id}`);
        getAllTejedores();
    }

    return(
        <div>
            <div className='d-grid gap-2'>
                <table className="table table-stripped">
                    <thead className="bg-primary text-white">
                    <tr className=''>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Direccion</th>
                        <th>CP</th>
                        <th>Telefono</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tejedores.map((tejedor) => (
                            <tr key={tejedor.idTejedor}>

                                <td>{tejedor.nombre}</td>
                                <td>{tejedor.apellidos}</td>
                                <td>{tejedor.direccion}</td>
                                <td>{tejedor.cp}</td>
                                <td>{tejedor.telefono}</td>
                                <td>
                                    <Link to={`/modificarTejedor/${tejedor.idTejedor}`} className='btn btn-primary text-white'>Modificar</Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteTejedor(tejedor.idTejedor)}
                                            className='btn btn-danger'>Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <Link to="/agregarTejedor" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
            </div>
        </div>
    );
}

export default MostrarTejedores;