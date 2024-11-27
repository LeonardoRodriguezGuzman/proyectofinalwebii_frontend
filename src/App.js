import React, {useState} from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MostrarComponentes from "./components/CRUDComponentes/MostrarComponentes";
import AgregarComponente from "./components/CRUDComponentes/AgregarComponente";
import ModificarComponente from "./components/CRUDComponentes/ModificarComponente";
import AgregarRegistro from "./components/CRUDRegistros/AgregarRegistro";
import MostrarRegistros from "./components/CRUDRegistros/MostrarRegistros";
import ModificarRegistro from "./components/CRUDRegistros/ModificarRegistro";
import MostrarTejedores from "./components/CRUDTejedores/MostrarTejedores";
import AgregarTejedor from "./components/CRUDTejedores/AgregarTejedor";
import ModificarTejedor from "./components/CRUDTejedores/ModificarTejedor";
import TopBar from "./components/page/TopBar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./components/page/dashboard/Dashboard";
import SideBar from "./components/page/SideBar";
import GraficaRegistros from "./components/graficas/Grafica";
import {AuthProvider} from "./auth/AuthContext";
import Login from "./components/Login/Login";



function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

  return (
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="App">
                  <SideBar isSidebar={isSidebar} />
                  <main className="content">
                      {/*<Login></Login>*/}
                      <TopBar setIsSidebar={setIsSidebar} />
                      {/*<AuthProvider>*/}
                          <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/componentes" element={<MostrarComponentes/>}/>
                              <Route path="/agregarComponente" element={<AgregarComponente/>}/>
                              <Route path="/modificarComponente/:id" element={<ModificarComponente/>}/>
                              <Route path="/tejedores" element={<MostrarTejedores/>}/>
                              <Route path="/agregarTejedor" element={<AgregarTejedor/>}/>
                              <Route path="/modificarTejedor/:id" element={<ModificarTejedor/>}/>
                              <Route path="/registros" element={<MostrarRegistros/>}/>
                              <Route path="/agregarRegistro" element={<AgregarRegistro/>}/>
                              <Route path="/modificarRegistro/:id" element={<ModificarRegistro/>}/>
                              <Route path="/graficaRegistros/" element={<GraficaRegistros/>}/>
                              <Route path="/login" element={<Login></Login>}></Route>
                          </Routes>
                      {/*</AuthProvider>*/}
                  </main>
              </div>
          </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
