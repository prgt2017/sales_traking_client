import React, { useState } from 'react';
import { Sale } from '../../types/Sale';
import { Product } from '../../types/Product';
import { Customer } from '../../types/Customer';
import { Salesperson } from '../../types/Salesperson';

interface SalesFormProps {
    onSave: (sale: Sale) => void;  
    products: Product[];
    customers: Customer[];
    salespersons: Salesperson[];
}

const SalesForm: React.FC<SalesFormProps> = ({ onSave, products, customers, salespersons }) => {
    const [productId, setProductId] = useState<number | string>('');
    const [customerId, setCustomerId] = useState<number | string>('');
    const [salespersonId, setSalespersonId] = useState<number | string>('');
    const [salesDate, setSalesDate] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!productId || !customerId || !salespersonId || !salesDate || !price) {
            alert('Please fill in all fields');
            return;
        }

        // Creating a newSale object without the 'id' field
        const newSale = {
            productId: Number(productId), 
            customerId: Number(customerId),  
            salespersonId: Number(salespersonId),  
            salesDate,
            price: Number(price),  
            commission: 0,
            id: 0
        };

        // Call the onSave function with the correctly shaped object
        onSave(newSale);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label><strong>Product</strong></label>
                        <select
                            className="form-control"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        >
                            <option value="">Select Product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label><strong>Customer</strong></label>
                        <select
                            className="form-control"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                        >
                            <option value="">Select Customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.firstName} {customer.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label><strong>Saleperson</strong></label>
                        <select
                            className="form-control"
                            value={salespersonId}
                            onChange={(e) => setSalespersonId(e.target.value)}
                        >
                            <option value="">Select Salesperson</option>
                            {salespersons.map((salesperson) => (
                                <option key={salesperson.id} value={salesperson.id}>
                                    {salesperson.firstName} {salesperson.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label><strong>Sales Date</strong></label>
                        <input
                            type="date"
                            className="form-control"
                            value={salesDate}
                            onChange={(e) => setSalesDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label><strong>Sale Price</strong></label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
                Add
            </button>
        </form>
    );
};

export default SalesForm;
