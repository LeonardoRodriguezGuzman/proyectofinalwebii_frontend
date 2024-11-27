import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";

const endpoint = "http://localhost:8000/api/registro";

const ModificarRegistro = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({
        fecha: "",
        odp: "",
        idComponente: "",
        color: "",
        turno: "",
        idTejedor: "",
        maquina: "",
        semana: "",
        produccionReal: "",
    });

    // Cargar los valores iniciales del registro
    useEffect(() => {
        const getRegistroById = async () => {
            try {
                const response = await axios.get(`${endpoint}/${id}`);
                const {
                    fecha,
                    odp,
                    idComponente,
                    color,
                    turno,
                    idTejedor,
                    maquina,
                    semana,
                    produccionReal,
                } = response.data;
                setInitialValues({
                    fecha,
                    odp,
                    idComponente,
                    color,
                    turno,
                    idTejedor,
                    maquina,
                    semana,
                    produccionReal,
                });
            } catch (error) {
                console.error("Error al obtener el registro:", error);
            }
        };
        getRegistroById();
    }, [id]);

    // Manejo de la actualización
    const handleFormSubmit = async (values) => {
        try {
            await axios.put(`${endpoint}/${id}`, values);
            navigate("/registros");
        } catch (error) {
            console.error("Error al modificar el registro:", error);
        }
    };

    return (
        <Box m="20px">
            <Header title="Modificar Registro" subtitle="Modifica un registro existente" />

            <Formik
                initialValues={initialValues}
                validationSchema={registroSchema}
                onSubmit={handleFormSubmit}
                enableReinitialize
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Fecha"
                                InputLabelProps={{ shrink: true }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.fecha}
                                name="fecha"
                                error={!!touched.fecha && !!errors.fecha}
                                helperText={touched.fecha && errors.fecha}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Orden de Producción (ODP)"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.odp}
                                name="odp"
                                error={!!touched.odp && !!errors.odp}
                                helperText={touched.odp && errors.odp}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="ID Componente"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.idComponente}
                                name="idComponente"
                                error={!!touched.idComponente && !!errors.idComponente}
                                helperText={touched.idComponente && errors.idComponente}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Color"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.color}
                                name="color"
                                error={!!touched.color && !!errors.color}
                                helperText={touched.color && errors.color}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Turno"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.turno}
                                name="turno"
                                error={!!touched.turno && !!errors.turno}
                                helperText={touched.turno && errors.turno}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="ID Tejedor"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.idTejedor}
                                name="idTejedor"
                                error={!!touched.idTejedor && !!errors.idTejedor}
                                helperText={touched.idTejedor && errors.idTejedor}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Máquina"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.maquina}
                                name="maquina"
                                error={!!touched.maquina && !!errors.maquina}
                                helperText={touched.maquina && errors.maquina}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Semana"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.semana}
                                name="semana"
                                error={!!touched.semana && !!errors.semana}
                                helperText={touched.semana && errors.semana}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Producción Real"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.produccionReal}
                                name="produccionReal"
                                error={!!touched.produccionReal && !!errors.produccionReal}
                                helperText={touched.produccionReal && errors.produccionReal}
                                sx={{ gridColumn: "span 1" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Modificar Registro
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

// Esquema de validación
const registroSchema = yup.object().shape({
    fecha: yup.date().required("La fecha es requerida"),
    odp: yup.string().required("La ODP es requerida"),
    idComponente: yup.number().required("El ID del componente es requerido"),
    color: yup.string().required("El color es requerido"),
    turno: yup.number().required("El turno es requerido"),
    idTejedor: yup.number().required("El ID del tejedor es requerido"),
    maquina: yup.string().required("La máquina es requerida"),
    semana: yup.number().required("La semana es requerida"),
    produccionReal: yup.number().required("La producción real es requerida"),
});

export default ModificarRegistro;
