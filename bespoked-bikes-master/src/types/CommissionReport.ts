import { Salesperson } from "./Salesperson";

export interface CommissionReport {
    salesperson: Salesperson;
    quarter: string;
    totalSales: number;
    commission: number;
  }
  