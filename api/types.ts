export interface Category {
  id: string;
  name: string;
  icon: string;
  key: string;
}

export interface ProductOption {
  size: string;
  price: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  options: ProductOption[];
  recommendedFor: string;
}

export interface ProductList {
  title: string;
  type: "horizontal" | "vertical";
  products: Product[];
}

export interface StoreData {
  categories: Category[];
  productLists: ProductList[];
}

export type RebuyData = Product[];
