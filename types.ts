export interface SolarEstimate {
  monthlyBill: number;
  systemSizeKw: number;
  estimatedCost: number;
  subsidyAmount: number;
  netCost: number;
  annualSavings: number;
  paybackPeriodYears: number;
}

export enum SolarSystemType {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial',
}

export interface BookingFormData {
  name: string;
  mobile: string;
  email: string;
  city: string;
  monthlyBill: string;
  roofType: string;
  comments: string;
}