import React from 'react';
import CustomerList from '../components/Customers/CustomerList';

const CustomerPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Customer Management</h2>
      <CustomerList />
    </div>
  );
};

export default CustomerPage;
