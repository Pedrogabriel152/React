import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import RoutesApp from './routes';

function App() {
  return (
    <Router>
      <RoutesApp />
    </Router>
  );
}

export default App;
