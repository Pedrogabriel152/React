import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../Components/Pages/Home';
import Register from '../Components/Pages/Register';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path='/' element={<Home /> }/>
            <Route path='/register' element={<Register />} />
        </Routes>
    );
}

export default RoutesApp;