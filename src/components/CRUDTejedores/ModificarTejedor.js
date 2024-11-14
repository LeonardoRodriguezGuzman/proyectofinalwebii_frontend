import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
//import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

const endpoint = "http://localhost:8000/api/tejedor";

const ModificarComponente = () => {
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [direccion, setDireccion] = useState('')
    const [cp, setCp] = useState(0)
    const [telefono, setTelefono] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams();


    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}/${id}`, {
            nombre:nombre,
            apellidos:apellidos,
            direccion:direccion,
            cp:cp,
            telefono:telefono
        })
        navigate('/tejedores')
    }
    useEffect(() => {
        const getTejedorById = async () => {
            const response = await axios.get(`${endpoint}/${id}`)
            setNombre(response.data.nombre)
            setApellidos(response.data.apellidos)
            setDireccion(response.data.direccion)
            setCp(response.data.cp)
            setTelefono(response.data.telefono)
        }
        getTejedorById()
        // eslint-disable-next-line
    },[])
    return(
        <div>
            <h3>Modificar Tejedor</h3>
            <form action="" onSubmit={update}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre}
                           onChange={(e) => setNombre(e.target.value)}/>
                    <label className="form-label">Apellidos</label>
                    <input type="text" className="form-control" value={apellidos}
                           onChange={(e) => setApellidos(e.target.value)}/>
                    <label className="form-label">Direccion</label>
                    <input type="text" className="form-control" value={direccion}
                           onChange={(e) => setDireccion(e.target.value)}/>
                    <label className="form-label">Codigo Postal</label>
                    <input type="number" className="form-control" value={cp} onChange={(e) => setCp(e.target.value)}/>
                    <label className="form-label">Telefono</label>
                    <input type="number" className="form-control" value={telefono}
                           onChange={(e) => setTelefono(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Modificar</button>
            </form>
        </div>
    );
}

export default ModificarComponente;
