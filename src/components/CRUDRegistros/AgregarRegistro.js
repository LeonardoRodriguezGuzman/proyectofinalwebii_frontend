import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const endPoint = "http://localhost:8000/api/registro";

const AgregarRegistro = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (values) => {
        try {
            await axios.post(endPoint, values);
            navigate("/registros"); // Redirige a la lista de registros
        } catch (error) {
            console.error("Error al agregar el registro:", error);
        }
    };

    return (
        <Box m="20px">
            <Header
                title="Agregar Registro"
                subtitle="Crea un nuevo registro de producción"
            />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={registroSchema}
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
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.fecha}
                                name="fecha"
                                error={!!touched.fecha && !!errors.fecha}
                                helperText={touched.fecha && errors.fecha}
                                sx={{ gridColumn: "span 2" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Orden de Producción"
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
                                error={
                                    !!touched.idComponente &&
                                    !!errors.idComponente
                                }
                                helperText={
                                    touched.idComponente &&
                                    errors.idComponente
                                }
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
                                type="text"
                                label="Turno"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.turno}
                                name="turno"
                                error={!!touched.turno && !!errors.turno}
                                helperText={touched.turno && errors.turno}
                                sx={{ gridColumn: "span 2" }}
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
                                sx={{ gridColumn: "span 2" }}
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
                                label="Jornada"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.jornada}
                                name="jornada"
                                error={!!touched.jornada && !!errors.jornada}
                                helperText={touched.jornada && errors.jornada}
                                sx={{ gridColumn: "span 2" }}
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
                                error={
                                    !!touched.produccionReal &&
                                    !!errors.produccionReal
                                }
                                helperText={
                                    touched.produccionReal &&
                                    errors.produccionReal
                                }
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Agregar Registro
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

// Esquema de validación con Yup
const registroSchema = yup.object().shape({
    fecha: yup.date().required("La fecha es requerida"),
    odp: yup.string().required("La orden de producción es requerida"),
    idComponente: yup
        .number()
        .typeError("El ID del componente debe ser un número")
        .required("El ID del componente es requerido"),
    color: yup.string().required("El color es requerido"),
    turno: yup.string().required("El turno es requerido"),
    idTejedor: yup
        .number()
        .typeError("El ID del tejedor debe ser un número")
        .required("El ID del tejedor es requerido"),
    maquina: yup.string().required("La máquina es requerida"),
    jornada: yup
        .number()
        .typeError("La jornada debe ser un número")
        .required("La jornada es requerida"),
    produccionReal: yup
        .number()
        .typeError("La producción real debe ser un número")
        .required("La producción real es requerida"),
});

// Valores iniciales
const initialValues = {
    fecha: "",
    odp: "",
    idComponente: "",
    color: "",
    turno: "",
    idTejedor: "",
    maquina: "",
    jornada: "",
    produccionReal: "",
};

export default AgregarRegistro;
