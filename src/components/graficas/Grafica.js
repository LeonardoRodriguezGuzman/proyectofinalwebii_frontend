import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/";
import axios from "axios";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { BarChart } from "@mui/x-charts/BarChart";
import { tokens, ColorModeContext } from "../../theme";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Button, TextField } from "@mui/material";
import Header from "../Header";

dayjs.extend(weekOfYear);

const endPoint = "http://localhost:8000/api";

const Grafica = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(""); // Estado para la semana seleccionada
    const [registros, setRegistros] = useState({ etiquetas: [], valores: [] });

    const fetchData = async (semana) => {
        try {
            const response = await axios.get(`${endPoint}/registros`);
            const datosAgrupados = agruparPorComponenteYSemana(response.data, semana);
            const componentes = Object.keys(datosAgrupados); // Etiquetas (eje X)
            const valores = Object.values(datosAgrupados); // Valores (eje Y)

            setRegistros({ etiquetas: componentes, valores: valores });
        } catch (error) {
            console.error("Error al obtener los registros:", error);
        }
    };

    // Función para agrupar los datos por componente y semana
    const agruparPorComponenteYSemana = (registros, semanaSeleccionada) => {
        return registros.reduce((acumulador, registro) => {
            const semana = dayjs(registro.fecha).week(); // Obtener la semana del registro
            const componente = `Componente ${registro.idComponente}`; // Formatear el nombre del componente
            const produccionReal = registro.produccionReal || 0;

            // Filtrar por la semana seleccionada
            if (semana === semanaSeleccionada) {
                if (!acumulador[componente]) {
                    acumulador[componente] = 0;
                }
                acumulador[componente] += produccionReal;
            }

            return acumulador;
        }, {});
    };

    const exportarPDF = async () => {
        const graficaElement = document.getElementById("grafica");
        if (!graficaElement) return;

        const canvas = await html2canvas(graficaElement);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("portrait", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.setFontSize(16);
        pdf.text(`Reporte de Producción - Semana ${semanaSeleccionada}`, 10, 10);

        pdf.addImage(imgData, "PNG", 10, 20, pdfWidth - 20, pdfHeight);

        pdf.setFontSize(12);
        pdf.text("Interpretación de los datos:", 10, pdfHeight + 30);

        const textoInterpretacion = generarInterpretacion(registros);
        const lineHeight = 7;
        const lines = pdf.splitTextToSize(textoInterpretacion, pdfWidth - 20);
        lines.forEach((line, index) => {
            pdf.text(line, 10, pdfHeight + 40 + index * lineHeight);
        });

        pdf.save(`Reporte_Semana_${semanaSeleccionada}.pdf`);
    };

    const generarInterpretacion = (registros) => {
        let texto = `Durante la semana ${semanaSeleccionada}, se registraron los siguientes datos de producción:\n\n`;
        registros.etiquetas.forEach((etiqueta, index) => {
            texto += `- ${etiqueta}: ${registros.valores[index]} unidades producidas.\n`;
        });

        return texto;
    };

    const handleSemanaChange = (e) => {
        const nuevaSemana = parseInt(e.target.value) || 1;
        setSemanaSeleccionada(nuevaSemana);
    };

    const generarGrafica = () => {
        fetchData(semanaSeleccionada);
    };


    return (
        <Box m="20px">
            <Header
                title="Grafica de Produccion Semana"
                subtitle="Genera la produccion semanal por componente segun la semana"
            />
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
            <Box style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
                <label htmlFor="semanaInput" style={{ marginRight: "10px" }}>
                    Ingrese la semana:
                </label>
                <TextField
                    type="number"
                    id="semanaInput"
                    value={semanaSeleccionada}
                    onChange={handleSemanaChange}
                    style={{
                        marginRight: "10px",
                    }}
                />
                <Button
                    onClick={generarGrafica}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: colors.primary[500],
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Generar Gráfica
                </Button>
            </Box>

            <Box id="grafica" style={{ width: "100%", textAlign: "center" }}>
                {registros.etiquetas.length > 0 && registros.valores.length > 0 ? (
                    <BarChart
                        xAxis={[
                            {
                                id: "componente",
                                data: registros.etiquetas, // Etiquetas (eje X)
                                scaleType: "band",
                                label: "Componentes",
                            },
                        ]}
                        series={[
                            {
                                id: `Producción Semana ${semanaSeleccionada}`,
                                data: registros.valores, // Valores (eje Y)
                            },
                        ]}
                        yAxis={[
                            {
                                id: "produccion",
                                label: "Unidades Producidas",
                            },
                        ]}
                        height={400}
                        width={600}
                    />
                ) : (
                    <Box>No hay datos disponibles para la semana seleccionada.</Box>
                )}
            </Box>

            <Button
                onClick={exportarPDF}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: colors.primary[500],
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Exportar a PDF
            </Button>
        </Box>
        </Box>
    );
};

export default Grafica;
