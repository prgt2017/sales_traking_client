import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import SalespersonPage from '../pages/SalespersonPage';
import CustomerPage from '../pages/CustomerPage';
import SalesPage from '../pages/SalesPage';

const RoutesComponent: React.FC = () => {
  return (
    <div className="container-fluid">
      {/* Navbar for navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Sales Tracking</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/salespersons">Salespersons</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Customers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sales">Sales</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          {/* Default route to redirect to /salespersons */}
          <Route path="/" element={<SalespersonPage />} />

          {/* Other routes */}
          <Route path="/salespersons" element={<SalespersonPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default RoutesComponent;
