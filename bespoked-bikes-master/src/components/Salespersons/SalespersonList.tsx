import React from 'react';
import { Salesperson } from '../../types/Salesperson';
import { formatDate } from '../../utils/helpers';

interface SalespersonListProps {
  salespersons: Salesperson[];
  loading: boolean;
  handleEdit: (selectedSalesperson: Salesperson) => void;
}

const SalespersonList: React.FC<SalespersonListProps> = ({ salespersons, loading, handleEdit }) => {
  return (
    <div className="container">
      {loading ? (
        <p>Loading salespersons...</p>
      ) : (
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Start Date</th>
                <th>Termination Date</th>
                <th>Commission (%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {salespersons.map((salesperson) => (
                <tr key={salesperson.id}>
                  <td>{salesperson.firstName} {salesperson.lastName}</td>
                  <td>{salesperson.phone}</td>
                  <td>{salesperson.address}</td>
                  <td>{formatDate(salesperson.startDate)}</td>
                  <td>{salesperson.terminationDate || 'N/A'}</td>
                  <td>{salesperson.commissionPercentage}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(salesperson)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalespersonList;
