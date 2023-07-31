"use client";
// CartContext.tsx
import React, { useState, createContext, useContext, ReactNode } from "react";

// Define the shape of an item in the cart
interface CartItem {
  id: number;
  name: string;
  price: number;
}

// Define the shape of the cart context
interface CartContextValue {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
}

// Create a new context for the cart
const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addItemToCart: () => {},
});

// Custom hook to access the cart context easily in functional components
export const useCart = () => {
  useContext(CartContext);
};

// CartProvider component that wraps the app and provides cart functionality
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addItemToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
  };

  // You can also add more functions like removeItemFromCart, clearCart, etc.

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
