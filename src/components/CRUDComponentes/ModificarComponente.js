import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
//import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

const endpoint = "http://localhost:8000/api/componente";

const ModificarComponente = () => {
    const [modelo, setModelo] = useState('')
    const [componente, setComponente] = useState('')
    const [talla, setTalla] = useState('')
    const [tiempo, setTiempo] = useState(0)
    const [precio, setPrecio] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams();


    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}/${id}`, {
            modelo: modelo,
            componente: componente,
            talla: talla,
            tiempo: tiempo,
            precio: precio
        })
        navigate('/componentes')
    }
    useEffect(() => {
        const getComponenteById = async () => {
            const response = await axios.get(`${endpoint}/${id}`)
            setModelo(response.data.modelo)
            setComponente(response.data.componente)
            setTalla(response.data.talla)
            setTiempo(response.data.tiempo)
            setPrecio(response.data.precio)
        }
        getComponenteById()
        // eslint-disable-next-line
    },[])
    return(
        <div>
            <h3>Modificar Componente</h3>
            <form action="" onSubmit={update}>
                <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input type="text" className="form-control" value={modelo}
                           onChange={(e) => setModelo(e.target.value)}/>
                    <label className="form-label">Componente</label>
                    <input type="text" className="form-control" value={componente}
                           onChange={(e) => setComponente(e.target.value)}/>
                    <label className="form-label">Talla</label>
                    <input type="text" className="form-control" value={talla}
                           onChange={(e) => setTalla(e.target.value)}/>
                    <label className="form-label">Tiempo</label>
                    <input type="number" className="form-control" value={tiempo}
                           onChange={(e) => setTiempo(e.target.value)}/>
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" value={precio}
                           onChange={(e) => setPrecio(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Modificar</button>
            </form>
        </div>
    );
}

export default ModificarComponente;
