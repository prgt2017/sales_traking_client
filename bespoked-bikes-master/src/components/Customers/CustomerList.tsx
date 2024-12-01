import React, { useState, useEffect } from 'react';
import { Customer } from '../../types/Customer';
import { deleteCustomer, fetchCustomers } from '../../services/api';
import { formatDate } from '../../utils/helpers';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch customers from the API when the component mounts
  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        setError('Failed to load customers');
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    getCustomers();
  }, []);

  // Handle deleting a customer
  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      setError('Failed to delete customer');
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Start Date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td>{formatDate(customer.startDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerList;
