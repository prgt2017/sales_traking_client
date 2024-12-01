import React, { useEffect, useState } from 'react';
import { Salesperson } from '../../types/Salesperson';
import {fetchQuarterlyCommissionReport} from '../../services/api';

interface CommissionReport {
  salesperson: Salesperson;
  quarter: string;
  totalSales: number;
  commission: number;
}

const SalespersonCommissionReport: React.FC = () => {
  const [commissions, setCommissions] = useState<CommissionReport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCommissionReport = async () => {
      setLoading(true);
      try {
        const data = await fetchQuarterlyCommissionReport();
        setCommissions(data);
      } catch (err) {
        console.error('Error fetching commission data:', err);
        setError('Failed to load commission report.');
      } finally {
        setLoading(false);
      }
    };
    getCommissionReport();
  }, []);

  if (loading) {
    return <div>Loading Commission Report...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="mt-4">
      <h3>Quarterly Salesperson Commission Report</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Quarter</th>
            <th>Total Sales</th>
            <th>Commission</th>
          </tr>
        </thead>
        <tbody>
          {commissions.length > 0 ? (
            commissions.map((record, index) => (
              <tr key={index}>
                <td>{record.salesperson.firstName}</td>
                <td>{record.quarter}</td>
                <td>${record.totalSales.toLocaleString()}</td>
                <td>${record.commission.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No data available for the selected period.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalespersonCommissionReport;

