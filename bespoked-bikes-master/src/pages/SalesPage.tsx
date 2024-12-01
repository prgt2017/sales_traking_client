import React, { useState, useEffect } from 'react';
import { Sale } from '../types/Sale';
import { fetchSales, fetchProducts, fetchCustomers, fetchSalespersons, createSale } from '../services/api';
import SalesList from '../components/Sales/SalesList';
import SalesForm from '../components/Sales/SalesForm';
import { Product } from '../types/Product';
import { Customer } from '../types/Customer';
import { Salesperson } from '../types/Salesperson';
import { toast } from 'react-toastify';

const SalesPage: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [showSaleForm, setShowSaleForm] = useState<boolean>(false); // New state for form visibility

  useEffect(() => {
    const getSalesData = async () => {
      setLoading(true);
      try {
        const salesData = await fetchSales();
        const productsData = await fetchProducts();  // Make sure this fetches the products
        const customersData = await fetchCustomers();  // Make sure this fetches customers
        const salespersonsData = await fetchSalespersons();  // Make sure this fetches salespersons

        setSales(salesData);
        setProducts(productsData);
        setCustomers(customersData);
        setSalespersons(salespersonsData);
        setFilteredSales(salesData);  // Initially show all sales
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load sales data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getSalesData();
  }, []);

  const handleSaveSale = async (sale: Sale) => {
    try {
      const newSale = await createSale(sale); // Pass the sale without 'id'
      setSales([...sales, newSale]);
      setFilteredSales([...filteredSales, newSale]);
      setShowSaleForm(false); // Hide the form after saving
      toast.success('Sale saved successfully!');
    } catch (error) {
      console.error('Error saving sale:', error);
      toast.error('Failed to save the sale. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sales Management</h2>

      {/* Button to toggle visibility of the SalesForm */}
      {!showSaleForm && (
        <button
          className="btn btn-primary mb-4"
          onClick={() => setShowSaleForm(true)} // Show the form when clicked
        >
          Add New Sale
        </button>
      )}

      {/* Conditionally render SalesForm */}
      {showSaleForm && (
        <SalesForm
          onSave={handleSaveSale}
          products={products}
          customers={customers}
          salespersons={salespersons}
        />
      )}

      {/* Sales List */}
      {loading ? (
        <p>Loading sales data...</p>
      ) : (
        <SalesList sales={filteredSales} products={products} customers={customers} salespersons={salespersons} />
      )}
    </div>
  );
};

export default SalesPage;
