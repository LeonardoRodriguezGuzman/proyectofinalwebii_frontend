import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, TextField} from "@mui/material";
import Header from "../Header";
import {Formik} from "formik";
import * as yup from "yup";
//import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

const endpoint = "http://localhost:8000/api/componente";

const ModificarComponente = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({
        modelo: "",
        componente: "",
        talla: "",
        tiempo: "",
        precio: "",
    });

    useEffect(() => {
        const getComponenteById = async () => {
            const response = await axios.get(`${endpoint}/${id}`)
            const { modelo, componente, talla, tiempo, precio } = response.data;
            setInitialValues({
                modelo,
                componente,
                talla,
                tiempo,
                precio,
            });
        }
        getComponenteById()
        // eslint-disable-next-line
    },[])

    const handleFormSubmit = async (values) => {
        try {
            await axios.put(`${endpoint}/${id}`, values);
            navigate("/componentes");
        } catch (error) {
            console.error("Error al modificar el componente:", error);
        }
    };

    return(
        <Box m="20px">
            <Header title="Modificar Componente" subtitle="Modifica el registro de un componente existente"/>

            <Formik
                initialValues={initialValues}
                validationSchema={componenteSchema}
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
                                Modificar
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
        .string()
        .typeError("El precio debe ser una cantidad")
        .required("El precio es requerido"),
});


export default ModificarComponente;
