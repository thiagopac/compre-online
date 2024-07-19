export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  priceOld?: string;
  image: string;
  weight: string;
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
