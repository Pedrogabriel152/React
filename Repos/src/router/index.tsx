import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Main from "../Components/pages/Main";
import Repositorio from "../Components/pages/Repositorio";

const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Main />} />
                <Route path="/repositorio" element={ <Repositorio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;