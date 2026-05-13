export interface IProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}
export interface IProduct {
    id: string;
    name: string;
    description?: string;
    prices: {
        weight: number;
        price: number;
        originalPrice: number;
    }[];
    category: string;
    subCategory?: string;
    img: string;
}
export interface IProductCopy {
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
//# sourceMappingURL=interface.d.ts.map