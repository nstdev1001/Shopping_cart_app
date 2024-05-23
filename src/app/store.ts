import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../reducers/productSlice";
import { cartSlice } from "../reducers/cartSlice";
import { wishListSlice } from "../reducers/wishListSlice";
import { colorSlice } from "../reducers/colorSlice";
import { sizeSlice } from "../reducers/sizeSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    wishList: wishListSlice.reducer,
    color: colorSlice.reducer,
    size: sizeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
