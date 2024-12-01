export interface Salesperson {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    startDate: string;
    terminationDate?: string;  // Optional field
    manager: string;
    commissionPercentage: number;
  }
  