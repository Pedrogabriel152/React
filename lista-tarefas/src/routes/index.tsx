import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../Components/Pages/Home';
import Register from '../Components/Pages/Register';
import Admin from '../Components/Pages/Admin';
import Private from './Private';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path='/admin' element={<Private> <Admin /> </Private>} /> 
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home /> }/>
        </Routes>
    );
}

export default RoutesApp;