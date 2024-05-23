import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";
import { toast } from "react-toastify";
import { Color } from "./colorSlice";
import { Size } from "./sizeSlice";

export interface CartSate {
  cart: any;
  cartItems: CartItems[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

export interface CartItems extends Product {
  quantity: number;
  selectedColor: Color;
  selectedSize: Size;
}

const initialState: CartSate = {
  cart: null,
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

// const findItemIndex = (state: any, action: PayloadAction<CartItems>) => {
//   state.cartItems.findIndex((item: CartItems) => item.id === action.payload.id);
// };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItems>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex === -1) {
        state.cartItems.push({ ...action.payload });
        console.log("action.payload: ", action.payload);
        toast.success(`Added product to cart!`, {
          autoClose: 1500,
        });
      } else {
        state.cartItems[itemIndex].quantity += action.payload.quantity;
        toast.success(
          `Added ${state.cartItems[itemIndex].quantity} product to cart!`,
          {
            autoClose: 1500,
          }
        );
      }
    },
    deleteFromCart(state, action: PayloadAction<CartItems>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        toast.info(`Removed product from cart!`, {
          autoClose: 1500,
        });
      }
    },
    increaseQuantityInCart(state, action: PayloadAction<CartItems>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );

      state.cartItems[itemIndex].quantity += 1;
    },
    decreaseQuantityInCart(state, action: PayloadAction<CartItems>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      }
    },
    getTotal(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    resetCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseQuantityInCart,
  decreaseQuantityInCart,
  getTotal,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
