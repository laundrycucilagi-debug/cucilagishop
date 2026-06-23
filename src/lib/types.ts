export type ProductStatus = "available" | "limited" | "empty";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Sale = {
  id: string;
  saleDate: string;
  productId: string;
  quantity: number;
  normalPrice: number;
  discountPercentage: number;
  sellingPrice: number;
  total: number;
  notes?: string;
};

export type StockHistory = {
  id: string;
  productId: string;
  stockBefore: number;
  stockChange: number;
  stockAfter: number;
  notes: string;
  createdAt: string;
};
