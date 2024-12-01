// Helper function to format currency values (for product sale price, commissions, etc.)
export const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  
  // Helper function to format dates (e.g., sales date, creation date)
  export const formatDate = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Helper function to calculate the commission for a sale
  export const calculateCommission = (salePrice: number, commissionPercentage: number): number => {
    return (salePrice * commissionPercentage) / 100;
  };
  
  // Helper function to validate email format
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // Helper function to check if a product already exists in the products list (for no duplicates)
  export const isProductDuplicate = (productList: Array<{ name: string }>, productName: string): boolean => {
    return productList.some((product) => product.name.toLowerCase() === productName.toLowerCase());
  };
  
  // Helper function to check if a salesperson already exists (no duplicates)
  export const isSalespersonDuplicate = (salespersonList: Array<{ firstName: string, lastName: string }>, firstName: string, lastName: string): boolean => {
    return salespersonList.some(
      (salesperson) => salesperson.firstName.toLowerCase() === firstName.toLowerCase() && salesperson.lastName.toLowerCase() === lastName.toLowerCase()
    );
  };
  
  // Helper function to check if a product is on discount (for price adjustments)
  export const isProductOnDiscount = (productName: string, discounts: Array<{ product: string, discountPercentage: number }>): boolean => {
    return discounts.some((discount) => discount.product.toLowerCase() === productName.toLowerCase());
  };
  