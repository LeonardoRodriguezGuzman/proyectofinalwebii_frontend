import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

const endPoint = 'http://localhost:8000/api/componente';
const AgregarComponente = () => {

    // Función para manejar el envío del formulario
    const handleFormSubmit = async (values) => {
        try {
            await axios.post(endPoint, values);
            navigate("/componentes"); // Redirige a la lista de tejedores
        } catch (error) {
            console.error("Error al agregar el componente:", error);
        }
    };
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
        <Box m="20px">
            <Header title="Agregar Componente" subtitle="Crea un nuevo registro de componente" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={componenteSchema}
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
                                label="Modelo"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.modelo}
                                name="modelo"
                                error={!!touched.modelo && !!errors.modelo}
                                helperText={touched.modelo && errors.modelo}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Componente"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.componente}
                                name="componente"
                                error={!!touched.componente && !!errors.componente}
                                helperText={touched.componente && errors.componente}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Talla"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.talla}
                                name="talla"
                                error={!!touched.talla && !!errors.talla}
                                helperText={touched.talla && errors.talla}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Tiempo"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.tiempo}
                                name="tiempo"
                                error={!!touched.tiempo && !!errors.tiempo}
                                helperText={touched.tiempo && errors.tiempo}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Precio"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.precio}
                                name="precio"
                                error={!!touched.precio && !!errors.precio}
                                helperText={touched.precio && errors.precio}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Agregar Componente
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

const componenteSchema = yup.object().shape({
    modelo: yup.string().required("El modelo es requerido"),
    componente: yup.string().required("Los componente es requerido"),
    talla: yup.string().required("La talla es requerida"),
    tiempo: yup
        .number()
        .typeError("El tiempo debe ser un número")
        .required("El tiempo es requerido"),
    precio: yup
        .number()
        .typeError("El precio debe ser un número")
        .required("El precio es requerido"),
});

const initialValues = {
    modelo: "",
    componente: "",
    talla: "",
    tiempo: "",
    precio: "",
};

export default AgregarComponente;
