import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const addToCart = createAction("ADD_TO_CART");

const initialState = {
  cart: [
    {
      id: 1,
      qty: 10,
    },
    {
      id: 2,
      qty: 20,
    },
  ],
};

const cartReducer = createReducer([], (builder) => {
  builder.addCase(addToCart, (state, action) => {
    state.push(action.payload);
  });
});

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

console.log("ON CREATE STORE : ", store.getState());

store.subscribe(() => {
  console.log("STORE CHANGE : ", store.getState());
});

store.dispatch(addToCart({ id: 1, qty: 100 }));
