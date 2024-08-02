import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, ProductOption } from "@/api/types";

interface CartItem {
  product: Product;
  quantity: number;
  selectedOption: ProductOption;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedOption: ProductOption
  ) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    quantity: number,
    selectedOption: ProductOption
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedOption.size === selectedOption.size
    );

    setCart((prevCart) => {
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
        return newCart;
      }
      return [...prevCart, { product, quantity, selectedOption }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
