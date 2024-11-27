import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const endPoint = "http://localhost:8000/api/tejedor";

const AgregarTejedor = () => {
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleFormSubmit = async (values) => {
        try {
            await axios.post(endPoint, values);
            navigate("/tejedores"); // Redirige a la lista de tejedores
        } catch (error) {
            console.error("Error al agregar el tejedor:", error);
        }
    };

    return (
        <Box m="20px">
            <Header title="Agregar Tejedor" subtitle="Crea un nuevo registro de tejedor" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={tejedorSchema}
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
                                type="text"
                                label="Nombre"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.nombre}
                                name="nombre"
                                error={!!touched.nombre && !!errors.nombre}
                                helperText={touched.nombre && errors.nombre}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Apellidos"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.apellidos}
                                name="apellidos"
                                error={!!touched.apellidos && !!errors.apellidos}
                                helperText={touched.apellidos && errors.apellidos}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Dirección"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.direccion}
                                name="direccion"
                                error={!!touched.direccion && !!errors.direccion}
                                helperText={touched.direccion && errors.direccion}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Código Postal"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.cp}
                                name="cp"
                                error={!!touched.cp && !!errors.cp}
                                helperText={touched.cp && errors.cp}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Teléfono"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.telefono}
                                name="telefono"
                                error={!!touched.telefono && !!errors.telefono}
                                helperText={touched.telefono && errors.telefono}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Agregar Tejedor
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

// Esquema de validación con Yup
const tejedorSchema = yup.object().shape({
    nombre: yup.string().required("El nombre es requerido"),
    apellidos: yup.string().required("Los apellidos son requeridos"),
    direccion: yup.string().required("La dirección es requerida"),
    cp: yup
        .number()
        .typeError("El código postal debe ser un número")
        .required("El código postal es requerido"),
    telefono: yup
        .string()
        .matches(
            /^[0-9]{10}$/,
            "El teléfono debe tener exactamente 10 dígitos"
        )
        .required("El teléfono es requerido"),
});

// Valores iniciales
const initialValues = {
    nombre: "",
    apellidos: "",
    direccion: "",
    cp: "",
    telefono: "",
};

export default AgregarTejedor;
