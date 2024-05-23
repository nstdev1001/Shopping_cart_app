import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";
import { toast } from "react-toastify";

export interface WishListState {
  wishList: any;
  wishListItems: WishListItems[];
}

export interface WishListItems extends Product {
  checked: boolean;
}

const initialState: WishListState = {
  wishList: null,
  wishListItems: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<WishListItems>) => {
      const itemIndex = state.wishListItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex === -1) {
        state.wishListItems.push({ ...action.payload, checked: true });
        toast.success(`Added product to wish list!`, {
          autoClose: 1500,
        });
      }
      // console.log("payload in wishListSlice ", action.payload);
    },
    toggleWishlistItemChecked: (
      state,
      action: PayloadAction<WishListItems>
    ) => {
      const itemId = action.payload.id;
      const item = state.wishListItems.find((item: any) => item.id === itemId);
      if (item) {
        item.checked = !item.checked;
      }
    },
    removeFromWishList: (state, action: PayloadAction<WishListItems>) => {
      state.wishListItems = state.wishListItems.filter(
        (item) => item.id !== action.payload.id
      );
      toast.info("Removed product from wishlist", {
        autoClose: 1500,
      });
    },
  },
});

export const { addToWishList, toggleWishlistItemChecked, removeFromWishList } =
  wishListSlice.actions;
export default wishListSlice.reducer;
