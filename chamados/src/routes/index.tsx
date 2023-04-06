import { Routes, Route } from 'react-router-dom'

import SignIn from '../Components/pages/SignIn';
import SignUp from '../Components/pages/SignUp';
import Dashboard from '../Components/pages/Dashboard';

const RoutesApp = () => {
  return(
    <Routes>
      <Route path="/" element={ <SignIn/> } />
      <Route path="/register" element={ <SignUp/> } />
      <Route path='/dashboard' element={ <Dashboard/> } />
    </Routes>
  )
}

export default RoutesApp;