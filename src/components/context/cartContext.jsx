// src/Cart/cartContext.js
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const CartContext = createContext();
const STORAGE_KEY = "shopping_cart";

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data)) setCart(data);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    }
  }, [cart, loaded]);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      const quantityToAdd = product.quantity ?? 1;

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd,
        };
        return updated;
      }
      return [...prev, { ...product, quantity: quantityToAdd }];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;