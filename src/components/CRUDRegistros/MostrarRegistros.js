import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Box, IconButton, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";



const endPoint = "http://localhost:8000/api";

const MostrarRegistros = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [registros, setRegistros] = useState([]);
    const columns = [
        { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 150 },
        { field: "odp", headerName: "Orden de Producción", flex: 1, minWidth: 150 },
        { field: "idComponente", headerName: "Componente", flex: 1, minWidth: 150 },
        { field: "color", headerName: "Color", flex: 1, minWidth: 100 },
        { field: "turno", headerName: "Turno", flex: 1, minWidth: 100 },
        { field: "idTejedor", headerName: "Tejedor", flex: 1, minWidth: 150 },
        { field: "maquina", headerName: "Máquina", flex: 1, minWidth: 100 },
        { field: "jornada", headerName: "Jornada", flex: 1, minWidth: 100 },
        {
            field: "produccionReal",
            headerName: "Producción Real",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Link
                        to={`/modificarRegistro/${params.row.idRegistro}`}
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
                    {/* Botón de eliminar */}
                    <button
                        onClick={() => deleteRegistro(params.row.idRegistro)}
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

    useEffect(() => {
        getAllRegistros();
    }, []);

    const getAllRegistros = async () => {
        try {
            const response = await axios.get(`${endPoint}/registros`);
            setRegistros(response.data);
        } catch (error) {
            console.error("Error al obtener los registros:", error);
        }
    };

    const deleteRegistro = async (id) => {
        try {
            await axios.delete(`${endPoint}/registro/${id}`);
            getAllRegistros();
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
        }
    };

    return (
        <Box m="20px">
            <Header
                title="Registros"
                subtitle="Gestión de los registros de producción"
            />
            <Box display="flex" justifyContent="flex-end" mb="20px">
                <Link to="/agregarRegistro" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddCircleOutlinedIcon />}
                    >
                        Agregar Registro
                    </Button>
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
                    rows={registros}
                    columns={columns}
                    getRowId={(row) => row.idRegistro}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default MostrarRegistros;
