import React, { createContext, useReducer } from "react";

// 1. Reducer function
const CartReducer = (state, action) => {
  switch (action.type) {
    case "addtocart":
      const existingItemIndex = state.cart.findIndex(
          item => item._id === action.payload._id
        );
      
       if (existingItemIndex !== -1)
         {
          return {
            ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          };
        } else {
          // If item doesn't exist, add it to the cart
          return {
            ...state,
            cart: [...state.cart, {...action.payload, quantity: 1}],
          };
        }

     case "remove":
      return { cart: state.cart.filter(a=>a._id !== action.payload._id) };
    default:
      return state;  
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
