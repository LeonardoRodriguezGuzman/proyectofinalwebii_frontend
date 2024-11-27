import React,{useEffect, useState} from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../Header';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const endPoint = 'http://localhost:8000/api';
const MostrarTejedores = () => {
    const theme = useTheme();

    const columns = [
        { field: "nombre", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellidos", headerName: "Apellidos", flex: 1, minWidth: 150 },
        { field: "direccion", headerName: "Dirección", flex: 1, minWidth: 150 },
        { field: "cp", headerName: "Código Postal", flex: 1, minWidth: 100 },
        { field: "telefono", headerName: "Teléfono", flex: 1, minWidth: 100 },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Link
                        to={`/modificarTejedor/${params.row.idTejedor}`}
                        style={{
                            backgroundColor: colors.blueAccent[500],
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        <IconButton>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Link>
                    <button
                        onClick={() => deleteTejedor(params.row.idTejedor)}
                        style={{
                            backgroundColor: colors.redAccent[500],
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        <IconButton>
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </button>
                </Box>
            ),
        },
    ];

    const colors = tokens(theme.palette.mode);
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

    return (
        <Box m="20px">
            <Header title="Tejedores" subtitle="Gestión de los tejedores registrados" />
            <Box display="flex" justifyContent="flex-end" mb="20px">
                <Link to="/agregarTejedor" style={{ textDecoration: "none" }}>
                    <button
                        style={{
                            backgroundColor: colors.greenAccent[600],
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Agregar Tejedor
                        <IconButton>
                            <AddCircleOutlinedIcon />
                        </IconButton>
                    </button>
                </Link>
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={tejedores} // Asignar datos obtenidos de la API
                    columns={columns}
                    getRowId={(row) => row.idTejedor} // Especificar el campo único de ID
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
        /*<div>
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
        </div>*/
}

export default MostrarTejedores;