import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const endPoint = 'http://localhost:8000/api';
const MostrarComponentes = () => {
        const[componentes, setComponentes] = useState([]);
        useEffect(() => {
            getAllComponentes();
        },[])

    const getAllComponentes = async () => {
        const response = await axios.get(`${endPoint}/componentes`);
        setComponentes(response.data);
    }

    const deleteComponente = async (id) => {
        await axios.delete(`${endPoint}/componente/${id}`);
        getAllComponentes();
    }

    return(
      <div>
          <div className='d-grid gap-2'>
            <table className="table table-stripped">
                <thead className="bg-primary text-white">
                <tr className=''>
                    <th>Modelo</th>
                    <th>Componente</th>
                    <th>Talla</th>
                    <th>Tiempo</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                </tr>
                </thead>
                <tbody>
                {
                    componentes.map((componente) => (
                        <tr key={componente.idComponente}>

                            <td>{componente.modelo}</td>
                            <td>{componente.componente}</td>
                            <td>{componente.talla}</td>
                            <td>{componente.tiempo} segundos</td>
                            <td>
                                <Link to={`/modificarComponente/${componente.idComponente}`} className='btn btn-primary text-white'>Modificar</Link>
                            </td>
                            <td>
                                <button onClick={() => deleteComponente(componente.idComponente)}
                                        className='btn btn-danger'>Eliminar
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
              <Link to="/agregarComponente" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
          </div>
      </div>
    );
}

export default MostrarComponentes;