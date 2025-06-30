import React, { createContext, useReducer } from "react";

// 1. Reducer function
const CartReducer = (state, action) => {
  switch (action.type) {
    case "addtocart":
      return { cart: [...state.cart, action.payload] };
    default:
      return state; // Don't forget to return the current state by default
  }
};

// 2. Create context
const CartContext = createContext();

// 3. Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, { cart: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// 4. Export context to use it in other components
export default CartContext;
