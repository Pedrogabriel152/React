import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

// Toatify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Routes 
import RoutesApp from './routes';

// Provaider
import AuthProvider from './Contexts/auth';
import Header from './Components/Layouts/Header';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
