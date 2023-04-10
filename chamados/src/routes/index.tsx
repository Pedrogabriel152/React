import { Routes, Route } from 'react-router-dom'

import SignIn from '../Components/pages/SignIn';
import SignUp from '../Components/pages/SignUp';
import Dashboard from '../Components/pages/Dashboard';
import Private from './private';

const RoutesApp = () => {
  return(
    <Routes>
      <Route path="/" element={ <SignIn/> } />
      <Route path="/register" element={ <SignUp/> } />
      <Route path='/dashboard' element={ <Private><Dashboard/></Private> } />
    </Routes>
  )
}

export default RoutesApp;