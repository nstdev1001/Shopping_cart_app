import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Color {
  code: string;
  name: string;
}

const initialState: Color = {
  code: "#eeecee",
  name: "Alabaster White",
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<Color>) {
      state.code = action.payload.code;
      state.name = action.payload.name;
      // console.log("action.payload.name: ", action.payload.name);
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;
