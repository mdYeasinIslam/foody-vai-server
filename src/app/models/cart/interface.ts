export interface ICartProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  weight: number;
  originalPrice: number;
  category: string;
  quantity: number;
  img: string;
}