import React, { useState } from 'react';
import { Sale } from '../../types/Sale';
import { Product } from '../../types/Product';
import { Customer } from '../../types/Customer';
import { Salesperson } from '../../types/Salesperson';
import { formatDate } from '../../utils/helpers';

interface SalesListProps {
  sales: Sale[];
  products: Product[];
  customers: Customer[];
  salespersons: Salesperson[];
}

const SalesList: React.FC<SalesListProps> = ({ sales, products, customers, salespersons }) => {
  // States for date range filtering
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Filter the sales by the date range
  const filteredSales = sales.filter((sale) => {
    const saleDate = new Date(sale.salesDate);

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // If a start date is provided, filter by that date
    if (start && saleDate < start) return false;

    // If an end date is provided, filter by that date
    if (end && saleDate > end) return false;

    return true;
  });

  return (
    <div>
      {/* Date range filter section */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Product</th>
            <th>Customer</th>
            <th>Sales Date</th>
            <th>Price</th>
            <th>Salesperson</th>
            <th>Commission</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => {
            const product = products.find((p) => p.id === sale.productId);
            const customer = customers.find((c) => c.id === sale.customerId);
            const salesperson = salespersons.find((s) => s.id === sale.salespersonId);

            if (!product || !customer || !salesperson) return null;

            return (
              <tr key={sale.id}>
                <td>{product.name}</td>
                <td>{`${customer.firstName} ${customer.lastName}`}</td>
                <td>{formatDate(sale.salesDate)}</td>
                <td>${sale.price.toFixed(2)}</td>
                <td>{`${salesperson.firstName} ${salesperson.lastName}`}</td>
                <td>${(sale.price * salesperson.commissionPercentage / 100).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;
