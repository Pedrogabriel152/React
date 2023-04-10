import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

// Routes 
import RoutesApp from './routes';

// Provaider
import AuthProvider from './Contexts/auth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
