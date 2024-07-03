import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [option, setOption] = useState("");

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, option: option }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, option: option }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const updateOption = (productId, newOption) => {
    setOption(newOption);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, option: option } : item
      )
    );
  };

  const updateFavorite = (product, isFavorited) => {
    setFavorites((prevFavorites) => {
      if (isFavorited) {
        return [...prevFavorites, product];
      } else {
        return prevFavorites.filter((item) => item.id !== product.id);
      }
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        option,
        addToCart,
        removeFromCart,
        removeFromFavorites,
        updateQuantity,
        updateFavorite,
        updateOption,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
