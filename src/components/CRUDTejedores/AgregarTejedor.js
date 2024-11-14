import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const endPoint = 'http://localhost:8000/api/tejedor';
const AgregarTejedor = () => {
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [direccion, setDireccion] = useState('')
    const [cp, setCp] = useState('')
    const [telefono, setTelefono] = useState('')
    const navigate = useNavigate()
    const store = async(e) => {
        e.preventDefault()
        await axios.post(endPoint, {nombre, apellidos, direccion, cp, telefono})
        navigate('/tejedores')
    }
    return (
        <div>
            <h3>Agregar Tejedor</h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                    <label className="form-label">Apellidos</label>
                    <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required/>
                    <label className="form-label">Direccion</label>
                    <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required/>
                    <label className="form-label">Codigo Postal</label>
                    <input type="number" className="form-control" value={cp} onChange={(e) => setCp(e.target.value)} required/>
                    <label className="form-label">Telefono</label>
                    <input type="number" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </div>
    );
}

export default AgregarTejedor;
