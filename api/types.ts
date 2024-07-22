export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface ProductOption {
  weight: string;
  price: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  options: ProductOption[];
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
