import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Layouts
import Header from './Components/Layouts/Header';
import Containner from './Components/Layouts/Container';

// Pages
import Home from './Components/Pages/Home';
import Filme from './Components/Pages/Filme';

function App() {
  return (
      <div>
      <Router>
        <Header />
        <Containner>
          <Routes>
              <Route path='/filme/:id' element={<Filme /> } />
              <Route path='/' element={<Home />} />
          </Routes>
        </Containner>
      </Router>
      </div>
  );
}

export default App;
