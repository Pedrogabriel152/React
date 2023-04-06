import { Routes, Route } from 'react-router-dom'

import SignIn from '../Components/pages/SignIn';
import SignUp from '../Components/pages/SignUp';

const RoutesApp = () => {
  return(
    <Routes>
      <Route path="/" element={ <SignIn/> } />
      <Route path="/register" element={ <SignUp/> } />
    </Routes>
  )
}

export default RoutesApp;