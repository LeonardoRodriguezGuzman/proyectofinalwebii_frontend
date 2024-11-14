import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const endPoint = 'http://localhost:8000/api/componente';
const AgregarComponente = () => {
    const [modelo, setModelo] = useState('')
    const [componente, setComponente] = useState('')
    const [talla, setTalla] = useState('')
    const [tiempo, setTiempo] = useState(0)
    const [precio, setPrecio] = useState(0)
    const navigate = useNavigate()
    const store = async(e) => {
        e.preventDefault()
        await axios.post(endPoint, {modelo, componente, talla, tiempo, precio})
        navigate('/componentes')
    }
    return (
        <div>
            <h3>Agregar Componente</h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input type="text" className="form-control" value={modelo} onChange={(e) => setModelo(e.target.value)}/>
                    <label className="form-label">Componente</label>
                    <input type="text" className="form-control" value={componente} onChange={(e) => setComponente(e.target.value)}/>
                    <label className="form-label">Talla</label>
                    <input type="text" className="form-control" value={talla} onChange={(e) => setTalla(e.target.value)}/>
                    <label className="form-label">Tiempo</label>
                    <input type="number" className="form-control" value={tiempo} onChange={(e) => setTiempo(e.target.value)}/>
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </div>
    );
}

export default AgregarComponente;
