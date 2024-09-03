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

export interface Appearance {
  colors: {
    login: {
      backgroundColor: string;
      buttonBackground: string;
      textColor: string;
      inputBorderColor: string;
      linkColor: string;
    };
    button: {
      text: string;
      background: string;
      tint: string;
      tabIconDefault: string;
      tabIconSelected: string;
    };
    tab: {
      activeTintColor: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    category: {
      itemBackground: string;
      textColor: string;
    };
    menu: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      logoutButtonColor: string;
      iconTintColor: string;
      buttonTextColor: string;
    };
    productList: {
      backgroundColor: string;
      borderColor: string;
      priceColor: string;
      addButtonColor: string;
      badgeBackgroundColor: string;
      badgeTextColor: string;
    };
    productDetails: {
      backgroundColor: string;
      textColor: string;
      selectedOptionBackground: string;
      selectedOptionText: string;
      unselectedOptionBackground: string;
      unselectedOptionText: string;
      buttonBackground: string;
      buttonText: string;
      controlButtonBackground: string;
      controlTextColor: string;
      pageTitleColor: string;
    };
    cart: {
      removeProductButtonBackgroundColor: string;
    };
  };
  images: {
    logo: {
      colored: string;
      white: string;
    };
    products: {
      catLitter: string;
      catLitterBox: string;
      dogFood: string;
      dogShampoo: string;
      fishSupplement: string;
      reptileTerrarium: string;
    };
  };
}

//Anderson interface

export interface PaymentMode {
  id: string;
  name: string;
  isEnabled: boolean;
}

export interface ListOfSuggestions {
  name: string;
  type: "horizontal" | "vertical";
  uri: string;
}
