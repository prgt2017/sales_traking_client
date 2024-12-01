import React, { useState, useEffect } from 'react';
import { Product } from '../../types/Product';

interface ProductFormProps {
  product: Product | null;  // Product is now required (no null or undefined allowed)
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || 0,
    name: product?.name || '',
    manufacturer: product?.manufacturer || '',
    style: product?.style || '',
    purchasePrice: product?.purchasePrice || 0,
    salePrice: product?.salePrice || 0,
    qtyOnHand: product?.qtyOnHand || 0,
    commissionPercentage: product?.commissionPercentage || 0,
  });

  // If product changes, update formData
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        manufacturer: product.manufacturer,
        style: product.style,
        purchasePrice: product.purchasePrice,
        salePrice: product.salePrice,
        qtyOnHand: product.qtyOnHand,
        commissionPercentage: product.commissionPercentage,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);  // Trigger save action for the updated product

    // Clear out the form data after saving the product
    setFormData({
      id: 0,
      name: '',
      manufacturer: '',
      style: '',
      purchasePrice: 0,
      salePrice: 0,
      qtyOnHand: 0,
      commissionPercentage: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h3>Edit Product</h3> {/* Always show "Edit Product" */}

      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="name" className="form-label"><strong>Name</strong></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="manufacturer" className="form-label"><strong>Manufacturer</strong></label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter manufacturer name"
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="style" className="form-label"><strong>Style</strong></label>
          <input
            type="text"
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product style"
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="purchasePrice" className="form-label"><strong>Purchase Price</strong></label>
          <input
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter purchase price"
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="salePrice" className="form-label"><strong>Sale Price</strong></label>
          <input
            type="number"
            id="salePrice"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter sale price"
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="qtyOnHand" className="form-label"><strong>Qty On Hand</strong></label>
          <input
            type="number"
            id="qtyOnHand"
            name="qtyOnHand"
            value={formData.qtyOnHand}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter quantity on hand"
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="commissionPercentage"
            className="form-label"><strong>Commission Percentage</strong></label>
          <input
            type="number"
            id="commissionPercentage"
            name="commissionPercentage"
            value={formData.commissionPercentage}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter commission percentage"
            required
          />
        </div>
      </div>
      <div className="form-group mt-3">
        <button type="submit" className="btn btn-primary">Update</button>
        
        <button className="btn btn-secondary ml-2" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
