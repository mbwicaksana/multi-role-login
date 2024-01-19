import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

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

const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase("ADD_TO_CART", (state, action) => {
    state.cart.push(action.payload);
  });
});

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
