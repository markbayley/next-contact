import React, { createContext, useState, useContext } from "react";
import { products } from "../data/products.js";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [option, setOption] = useState("");
  const [error, setError] = useState(false);

  const addToCart = (product) => {
    if (option === "") {
      setError(true);
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.option === option
      );
      console.log("option", option);
      console.log("favorites", favorites);
      console.log("existingProduct", existingProduct);

      if (existingProduct) {
        setError("Product with this option is already in the cart");
        console.log("3");
        return prevCart;
      } else {
        console.log("4");
        return [...prevCart, { ...product, quantity: 1, option: option }];
      }
    });
  };

  const transferToCart = (product) => {
    setCart((prevCart) => {
      return [...prevCart, { ...product, quantity: 1, option: product.option }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== product.id || item.option !== product.option
      )
    );
  };

  const updateQuantity = (product, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id && item.option === product.option
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const updateOption = (productId, newOption) => {
    setError("");
    setOption(newOption);
  };

  const updateFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const existingFavoriteIndex = prevFavorites.findIndex(
        (item) => item.id === product.id && item.option !== option
      );
  
      if (existingFavoriteIndex === -1) {
        // If no existing favorite is found, add the product with the current option
        return [...prevFavorites, { ...product, option: option }];
      } else {
        // If an existing favorite with a different option is found, update its option
        const updatedFavorites = [...prevFavorites];
        updatedFavorites[existingFavoriteIndex] = {
          ...updatedFavorites[existingFavoriteIndex],
          option: option
        };
        return updatedFavorites;
      }
    });
  };
  

  const handleFavoriteClick = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    updateFavorite(product);
  };

  const removeFromFavorites = (product) => {
    setFavorites((prevCart) =>
      prevCart.filter(
        (item) => item.id !== product.id 
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        option,
        error,
        products,
        addToCart,
        removeFromCart,
        removeFromFavorites,
        updateQuantity,
        handleFavoriteClick,
        updateOption,
        getTotalPrice,
        setOption,
        transferToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
