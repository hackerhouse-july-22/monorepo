import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: "zebra",
    initialState: {
      nfts: [],
    },
    reducers: {
      setNfts: (state, action) => {
        state.nfts = action.payload;
      },
    },
    // extraReducers: {
    //   },
  
  })
  
  export const {
    setNfts,
  } = slice.actions
  
  export default slice.reducer