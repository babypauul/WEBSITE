import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Track, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (track: Track, licenseType: 'MP3' | 'WAV' | 'UNLIMITED') => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  cartTotal: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (track: Track, licenseType: 'MP3' | 'WAV' | 'UNLIMITED') => {
    // Simple logic: Base price * multiplier based on license
    let finalPrice = track.price || 29.99;
    if (licenseType === 'WAV') finalPrice += 20;
    if (licenseType === 'UNLIMITED') finalPrice += 100;

    const newItem: CartItem = {
      ...track,
      licenseType,
      price: finalPrice,
      id: `${track.id}-${licenseType}-${Date.now()}` // Unique ID for cart
    };

    setCart([...cart, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, isCartOpen, addToCart, removeFromCart, toggleCart, cartTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};