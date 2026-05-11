type IPrices ={
    weight: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    weightName: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  }
export interface ICartProduct {
  id: string;
  name: string;
  description?: string;
  price: IPrices;
  category: string;
  quantity: number;
  img: string;
}