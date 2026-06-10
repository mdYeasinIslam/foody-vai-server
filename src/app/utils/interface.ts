export interface Product {
  _id: string;
  productId: string;
  userId: string;
  name: string;
  description: string;
  price: Record<string, any>;
  category: string;
  subCategory: string;
  quantity: number;
  img: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderInfo {
  customerName: string;
  subTotal: number;
  deliveryCharge: number;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  deliveryDate: string;
  note: string;
  defaultAddress: {
    _id: string;
    districtId: string;
    districtName: string;
    areaId: string;
    areaName: string;
    contactName: string;
    phone: string;
    addressName: string;
    address: string;
    isDefault: boolean;
    __v: number;
  };
  items: Product[];
}
export interface ITotals {
  subTotal: number;
  tax: number;
  deliveryFee: number;
  totalAmount: number;
}
export interface IOrderCreate {
  userId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  totals: ITotals;
  paymentMethod: string;
  deliveryDate: string;
  specialNote: string;
  // status: "pending";
  items: {
    id: string;
    productId: string;
    userId: string | null;
  }[];
}
