import axios from 'axios';
import { Customer } from '../types/Customer';
import { Product } from '../types/Product';
import { Sale } from '../types/Sale';
import { Salesperson } from '../types/Salesperson';
import { CommissionReport } from '../types/CommissionReport';

const BASE_URL = 'http://localhost:5117/api'; // Define base URL here

// Create an Axios instance for reusable configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch Products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get('/product');
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Create Product
export const createProduct = async (product: Product): Promise<Product> => {
  const response = await axiosInstance.post('/product', product);
  return response.data;
};

// Update Product
export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axiosInstance.put(`/product/${product.id}`, product);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to update product.');
    }
    throw error;
  }
};

// Fetch Salespersons
export const fetchSalespersons = async (): Promise<Salesperson[]> => {
  try {
    const response = await axiosInstance.get('/Salesperson');
    return response.data;
  } catch (error) {
    console.error('Error fetching salespersons:', error);
    throw error;
  }
};

// Fetch Sales
export const fetchSales = async (): Promise<Sale[]> => {
  try {
    const response = await axiosInstance.get('/sales');
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

// Create Sale
export const createSale = async (sale: Sale): Promise<Sale> => {
  const response = await axiosInstance.post('/sales', sale);
  return response.data;
};


// Fetch Customers
export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axiosInstance.get('/customer');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Delete Customer
export const deleteCustomer = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/customer/${id}`);
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

// Delete Salesperson
export const deleteSalesperson = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/salespersons/${id}`);
  } catch (error) {
    console.error('Error deleting salesperson:', error);
    throw error;
  }
};

// Fetch Salesperson by ID
export const fetchSalesperson = async (id: number): Promise<Salesperson> => {
  try {
    const response = await axiosInstance.get(`/Salesperson/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching salesperson:', error);
    throw error;
  }
};

// Update Salesperson
export const updateSalesperson = async (salesperson: Salesperson): Promise<Salesperson> => {
  try {
    const response = await axiosInstance.put(`/salesperson/${salesperson.id}`, salesperson);
    return response.data; // Return the updated salesperson data
  } catch (error) {
    console.error('Error updating salesperson:', error);
    throw error; // Rethrow the error for the calling function to handle
  }
};

// Add Salesperson
export const addSalesperson = async (salesperson: Salesperson): Promise<void> => {
  try {
    await axiosInstance.post('/salespersons', salesperson);
  } catch (error) {
    console.error('Error adding salesperson:', error);
    throw error;
  }
};

// Fetch Quarterly Commission Report
export const fetchQuarterlyCommissionReport = async (): Promise<CommissionReport[]> => {
  try {
    const response = await axiosInstance.get('/salesperson/commissions');
    return response.data;
  } catch (error) {
    console.error('Error fetching quarterly commission report:', error);
    throw error;
  }
};
