import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const endPoint = 'http://localhost:8000/api/registro';
const AgregarRegistro = () => {
    const [fecha, setFecha] = useState()
    const [odp, setOdp] = useState(0)
    const [idComponente, setIdComponente] = useState(0)
    const [color, setColor] = useState('')
    const [turno, setTurno] = useState(0)
    const [idTejedor, setIdTejedor] = useState(0)
    const [maquina, setMaquina] = useState(0)
    const [semana, setSemana] = useState(0)
    const [produccionReal, setProduccionReal] = useState(0)
    const navigate = useNavigate()
    const store = async(e) => {
        e.preventDefault()
        await axios.post(endPoint, {fecha, odp, idComponente, color, turno, idTejedor, maquina, semana, produccionReal})
        navigate('/registros')
    }
    return (
        <div>
            <h3>Agregar Registro</h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input type="date" className="form-control" value={fecha}
                           onChange={(e) => setFecha(e.target.value)}/>
                    <label className="form-label">odp</label>
                    <input type="text" className="form-control" value={odp} onChange={(e) => setOdp(e.target.value)}/>
                    <label className="form-label">Componente</label>
                    <input type="number" className="form-control" value={idComponente}
                           onChange={(e) => setIdComponente(e.target.value)}/>
                    <label className="form-label">Color</label>
                    <input type="text" className="form-control" value={color}
                           onChange={(e) => setColor(e.target.value)}/>
                    <label className="form-label">turno</label>
                    <input type="number" className="form-control" value={turno}
                           onChange={(e) => setTurno(e.target.value)}/>
                    <label className="form-label">idTejedor</label>
                    <input type="number" className="form-control" value={idTejedor}
                           onChange={(e) => setIdTejedor(e.target.value)}/>
                    <label className="form-label">Maquina</label>
                    <input type="number" className="form-control" value={maquina}
                           onChange={(e) => setMaquina(e.target.value)}/>
                    <label className="form-label">Semana</label>
                    <input type="number" className="form-control" value={semana}
                           onChange={(e) => setSemana(e.target.value)}/>
                    <label className="form-label">Produccion Real</label>
                    <input type="number" className="form-control" value={produccionReal}
                           onChange={(e) => setProduccionReal(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </div>
    );
}

export default AgregarRegistro;
