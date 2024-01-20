import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = [{ id: 0, qty: 100 }];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

console.log("ON CREATE STORE : ", store.getState());

store.subscribe(() => {
  console.log("STORE CHANGE : ", store.getState());
});

store.dispatch(cartSlice.actions.addToCart({ id: 1, qty: 20 }));
