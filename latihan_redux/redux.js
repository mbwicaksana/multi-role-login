import { legacy_createStore } from "redux";

const initialState = {
  cart: [
    {
      id: 1,
      qty: 100,
    },
  ],
};
// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

// STORE
const store = legacy_createStore(cartReducer);
console.log("ON CREATE STORE : ", store.getState());

// SUBSCRIBE
store.subscribe(() => {
  console.log("STORE CHANGE : ", store.getState());
});

// DISPATCH

store.dispatch({ type: "ADD_TO_CART", payload: { id: 666, qty: 100000 } });
