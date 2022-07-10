import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UseNftModalState = {
  nftId: string | null;
  id: number | null;
  shouldShow: boolean;
};

const slice = createSlice<
  UseNftModalState,
  {
    show: (
      state: UseNftModalState,
      action: PayloadAction<{
        nftId: string | null;
        id: number | null;
      }>
    ) => void;
    hide: (state: UseNftModalState) => void;
  }
>({
  name: "useNftModal",
  initialState: {
    nftId: null,
    id: null,
    shouldShow: false,
  },
  reducers: {
    show: (state, action) => {
      state.shouldShow = true;
      state.nftId = action.payload.nftId;
      state.id = action.payload.id;
    },
    hide: (state) => {
      state.shouldShow = false;
      state.nftId = null;
      state.id = null;
    },
  },
});

export const { show, hide } = slice.actions;

export default slice.reducer;
