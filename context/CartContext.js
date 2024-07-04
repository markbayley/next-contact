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
  const [error, setError] = useState("");

  const addToCart = (product) => {
    if (option === "") {
      setError("Select an option");
      console.log("1")
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.option === option
      );
      console.log("option", option)
      console.log("favorites", favorites);
      console.log("existingProduct", existingProduct)

      if (existingProduct) {
        setError("Product with this option is already in the cart");
        console.log("3")
        return prevCart;
      } else {
        console.log("4")
        return [...prevCart, { ...product, quantity: 1, option: option }];
        
      }
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

  const updateFavorite = (product, isFavorited) => {
    setFavorites((prevFavorites) => {
      const existingFavorite = prevFavorites.find(
        (item) => item.id === product.id && item.option === option
      );

      if (isFavorited && !existingFavorite) {
        return [...prevFavorites, { ...product, option: option }];
      } else if (!isFavorited) {
        return prevFavorites.filter(
          (item) => item.id !== product.id || item.option !== option
        );
      }
      return prevFavorites;
    });
  };

  const handleFavoriteClick = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    const isFavorited = favorites.some(
      (item) => item.id === product.id && item.option === option
    );

    const favoriteWithoutOption = favorites.find(
      (fav) => fav.id === product.id && fav.option === ""
    );

    

    if (favoriteWithoutOption) {
      setFavorites((prevFavorites) => prevFavorites.filter(
        (item) =>  item.option !== "")
      );
      console.log("favoriteWithoutOption", favoriteWithoutOption)
    }
   
    updateFavorite(product, !isFavorited);
  };

  const removeFromFavorites = (product) => {
    setFavorites((prevCart) =>
      prevCart.filter((item) => item.id !== product.id && item.option === product.option)
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
