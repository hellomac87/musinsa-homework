import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "store";

// Define a type for the slice state
interface CharactersState {
  fetching: boolean;
  error: boolean;
  items: [];
}

// Define the initial state using that type
const initialState: CharactersState = {
  fetching: false,
  error: false,
  items: [],
};

export const charactersSlice = createSlice({
  name: "characters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const {  } = charactersSlice.actions;

export const selectCharactors = (state: RootState) => state.characters;

export default charactersSlice.reducer;
