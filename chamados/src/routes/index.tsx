import { Routes, Route } from 'react-router-dom'

import SignIn from '../Components/pages/SignIn';
import SignUp from '../Components/pages/SignUp';
import Dashboard from '../Components/pages/Dashboard';
import Private from './private';
import Profile from '../Components/pages/Profile';
import Customers from '../Components/pages/Customers';
import New from '../Components/pages/New';

const RoutesApp = () => {
  return(
    <Routes>
      <Route path="/" element={ <SignIn/> } />
      <Route path="/register" element={ <SignUp/> } />
      <Route path='/dashboard' element={ <Private><Dashboard/></Private> } />
      <Route path='/profile' element={ <Private><Profile/></Private> } />
      <Route path='/customers' element={ <Private><Customers/></Private> } />
      <Route path='/new' element={ <Private><New/></Private> } />
    </Routes>
  )
}

export default RoutesApp;