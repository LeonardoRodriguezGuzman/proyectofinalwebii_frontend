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
import Main from "./components/page/Main";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
        <Main></Main>
        <BrowserRouter>
            <Routes>
                <Route path="/componentes" element={<MostrarComponentes />} />
                <Route path="/agregarComponente" element={<AgregarComponente />} />
                <Route path="/modificarComponente/:id" element={<ModificarComponente />} />
            </Routes>
        </BrowserRouter>
        <BrowserRouter>
            <Routes>
                <Route path="/tejedores" element={<MostrarTejedores />} />
                <Route path="/agregarTejedor" element={<AgregarTejedor />} />
                <Route path="/modificarTejedor/:id" element={<ModificarTejedor />} />
            </Routes>
        </BrowserRouter>
        <BrowserRouter>
            <Routes>
                <Route path="/registros" element={<MostrarRegistros />} />
                <Route path="/agregarRegistro" element={<AgregarRegistro />} />
                <Route path="/modificarRegistro/:id" element={<ModificarRegistro />} />
            </Routes>
        </BrowserRouter>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
