// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes/RoutesComponent';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <RoutesComponent /> {/* This will render the page based on URL */}
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
