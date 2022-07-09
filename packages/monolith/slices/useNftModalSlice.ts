import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UseNftModalState = {
  nftId: string | null;
  shouldShow: boolean;
};

const slice = createSlice<
  UseNftModalState,
  {
    show: (state: UseNftModalState, action: PayloadAction<string>) => void;
    hide: (state: UseNftModalState) => void;
  }
>({
  name: "useNftModal",
  initialState: {
    nftId: null,
    shouldShow: false,
  },
  reducers: {
    show: (state, action) => {
      state.shouldShow = true;
      state.nftId = action.payload;
    },
    hide: (state) => {
      state.shouldShow = false;
      state.nftId = null;
    },
  },
});

export const { show, hide } = slice.actions;

export default slice.reducer;
