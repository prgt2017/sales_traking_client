import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import ProductList from '../components/Products/ProductList';
import ProductForm from '../components/Products/ProductForm';
import { fetchProducts, createProduct, updateProduct } from '../services/api';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle edit product
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  // Handle saving product (whether updating or creating)
  const handleSaveProduct = async (product: Product) => {
    try {
      if (selectedProduct) {
        // Update product
        const updatedProduct = await updateProduct(product);
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        const newProduct = await createProduct(product);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        toast.success('Product created successfully!');
      }
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product. Please try again.');
    }
  };

  return (
    <div>
      {/* Show spinner if data is loading */}
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <RingLoader size={60} color="#123abc" loading={loading} />
        </div>
      ) : (
        <>
          {/* Product List and Edit */}
          <ProductList products={products} onEdit={handleEdit} />

          {/* Product Form for Adding/Editing a Product */}
          {selectedProduct && (
            <ProductForm
              product={selectedProduct}
              onSave={handleSaveProduct}
              onCancel={handleCancel}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
