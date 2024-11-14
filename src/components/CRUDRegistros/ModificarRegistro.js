import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
//import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

const endpoint = "http://localhost:8000/api/registro";

const ModificarRegistro = () => {
    const [fecha, setFecha] = useState()
    const [odp, setOdp] = useState()
    const [idComponente, setIdComponente] = useState()
    const [color, setColor] = useState()
    const [turno, setTurno] = useState()
    const [idTejedor, setIdTejedor] = useState()
    const [maquina, setMaquina] = useState()
    const [semana, setSemana] = useState()
    const [produccionReal, setProduccionReal] = useState()
    const navigate = useNavigate()
    const {id} = useParams();


    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}/${id}`, {
            fecha:fecha,
            odp:odp,
            idComponente:idComponente,
            color:color,
            turno:turno,
            idTejedor:idTejedor,
            maquina:maquina,
            semana:semana,
            produccionReal:produccionReal
        })
        navigate('/registros')
    }
    useEffect(() => {
        const getTejedorById = async () => {
            const response = await axios.get(`${endpoint}/${id}`)
            setFecha(response.data.fecha)
            setOdp(response.data.odp)
            setIdComponente(response.data.idComponente)
            setColor(response.data.color)
            setTurno(response.data.turno)
            setIdTejedor(response.data.idTejedor)
            setMaquina(response.data.maquina)
            setSemana(response.data.semana)
            setProduccionReal(response.data.produccionReal)
        }
        getTejedorById()
        // eslint-disable-next-line
    },[])
    return(
        <div>
            <h3>Modificar Registro</h3>
            <form action="" onSubmit={update}>
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
                <button type="submit" className="btn btn-primary">Modificar</button>
            </form>
        </div>
    );
}

export default ModificarRegistro;
