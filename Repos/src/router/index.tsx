import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Main from "../pages/Main";
import Repositorio from "../pages/Repositorio";

const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Main />} />
                <Route path="/repositorio/:repositorio" element={ <Repositorio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;