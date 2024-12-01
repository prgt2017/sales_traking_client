export interface Sale {
  id: number;
  productId: number; // ID of the product, not the full product object
  customerId: number; // ID of the customer, not the full customer object
  salespersonId: number; // ID of the salesperson, not the full salesperson object
  salesDate: string; // Sales date in ISO string format
  price: number; // Price of the sale
  commission:number;
}
