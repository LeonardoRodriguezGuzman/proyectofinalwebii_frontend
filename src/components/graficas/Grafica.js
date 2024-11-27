import React from "react";
import { useTheme } from "@mui/material/";
import { ResponsiveBar} from "@nivo/bar";
import {ColorModeContext, tokens} from "../../theme";
import axios from "axios";
import {useContext, useEffect, useState} from "react";

const endPoint = 'http://localhost:8000/api';

const BarChart =() => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [tejedores, setTejedores] = useState([]);
    const [componentes, setComponentes] = useState([]);
    const [registros, setRegistros] = useState([]);
    const getAllTejedores = async () => {
        try {
            const response = await axios.get(`${endPoint}/tejedores`);
            setTejedores(response.data);
        } catch (error) {
            console.error("Error al obtener los tejedores:", error);
        }
    }

    const getAllComponentes = async () => {
        try {
            const response = await axios.get(`${endPoint}/componentes`);
            setComponentes(response.data);
        } catch (error) {
            console.error("Error al obtener los componentes:", error);
        }
    }


    const getAllRegistros = async () => {
        try {
            const response = await axios.get(`${endPoint}/registros`);
            setRegistros(response.data);
        } catch (error) {
            console.error("Error al obtener los registros:", error);
        }
    };

    useEffect(() => {
        getAllRegistros();
        getAllTejedores();
        getAllComponentes();
    }, []);


    if (!registros?.length) return null;

    return (
        <ResponsiveBar
            data={registros}
            keys={["produccionReal"]}  // Assuming "produccionReal" is the production quantity field
            indexBy="componente"        // Assuming "componente" is the component name field
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'ordinal' }}
            // Add other customizations (colors, axes, etc.)
        />
    );
};

export default BarChart;