import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Size {
  size: string;
}

const initialState: Size = {
  size: "S",
};

export const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    setSize(state, action: PayloadAction<string>) {
      state.size = action.payload;
    },
  },
});

export const { setSize } = sizeSlice.actions;
export default sizeSlice.reducer;
