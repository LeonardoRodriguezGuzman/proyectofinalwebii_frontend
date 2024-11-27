import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../Header';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

const endPoint = 'http://localhost:8000/api';
const MostrarComponentes = () => {
        const theme = useTheme();
    const columns = [
        { field: "modelo", headerName: "Modelo", flex: 1, minWidth: 150 },
        { field: "componente", headerName: "Componente", flex: 1, minWidth: 150 },
        { field: "talla", headerName: "Talla", flex: 1, minWidth: 150 },
        { field: "tiempo", headerName: "Tiempo", flex: 1, minWidth: 100 },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Link
                        to={`/modificarComponente/${params.row.idComponente}`}
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
                        onClick={() => deleteComponente(params.row.idComponente)}
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
        <Box m="20px">
            <Header title="Componentes" subtitle="Gestión de los componentes registrados" />
            <Box display="flex" justifyContent="flex-end" mb="20px">
                <Link to="/agregarComponente" style={{ textDecoration: "none" }}>
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
                        Agregar Componente
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
                    rows={componentes} // Asignar datos obtenidos de la API
                    columns={columns}
                    getRowId={(row) => row.idComponente} // Especificar el campo único de ID
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
}

export default MostrarComponentes;