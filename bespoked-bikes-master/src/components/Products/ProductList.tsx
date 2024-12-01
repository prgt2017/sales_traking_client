// src/components/Products/ProductList.tsx
import React from 'react';
import { Product } from '../../types/Product';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit }) => {
  return (
    <div className="container mt-5">
      <h3 className="mb-4">Product List</h3>
      
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Style</th>
            <th>Sale Price</th>
            <th>Qty On Hand</th>
            <th>Commission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.manufacturer}</td>
              <td>{product.style}</td>
              <td>${product.salePrice.toFixed(2)}</td>
              <td>{product.qtyOnHand}</td>
              <td>{product.commissionPercentage}%</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
