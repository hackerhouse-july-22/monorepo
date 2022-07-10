import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UseNftModalState = {
  nftId?: number | null;
  id?: string | null;
  shouldShow: boolean;
};

export type ShowNftModalPayload = {
  id?: string;
  nftId?: number;
};

const slice = createSlice<
  UseNftModalState,
  {
    show: (
      state: UseNftModalState,
      action: PayloadAction<ShowNftModalPayload>
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
