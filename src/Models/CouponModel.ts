export interface CouponModel {
  uuid: string;
  companyUuid: string;
  category: number;
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  price: number;
  image: string;
  description: string;
}