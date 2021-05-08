import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "api";
import type { AppDispatch, RootState } from "store";
import { Character } from "store/types/characters";

// Define a type for the slice state
interface CharactersState {
  fetching: boolean;
  error: boolean;
  items: Character[];
  removedItemIds: string[];
  params: {
    page: number;
    pageSize: number;
  };
}

// Define the initial state using that type
const initialState: CharactersState = {
  fetching: false,
  error: false,
  items: [],
  removedItemIds: [],
  params: {
    page: 1,
    pageSize: 10,
  },
};

export const charactersSlice = createSlice({
  name: "characters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetching: (state, action: PayloadAction) => {
      state.fetching = true;
    },
    success: (state, action: PayloadAction<{ items: []; page: number }>) => {
      const { items, page } = action.payload;
      state.items.push(...items);
      state.params.page = page;
      state.fetching = false;
    },
    failure: (state, action) => {
      state.error = true;
      state.fetching = false;
    },
    addRemoveId: (state, action: PayloadAction<string>) => {
      state.removedItemIds.push(action.payload);
    },
    resetRemovedIds: (state) => {
      state.removedItemIds = [];
    },
  },
});

export const { fetching, success, failure } = charactersSlice.actions;

export const selectCharactors = (state: RootState) => state.characters;

export default charactersSlice.reducer;

export const fetchCharacters = (page: number) => async (
  dispatch: AppDispatch
) => {
  dispatch(charactersSlice.actions.fetching());
  try {
    const response = await apiClient.get("/characters", {
      params: {
        page,
      },
    });
    const items = response.data.map((item: Character) => {
      return {
        ...item,
      };
    });
    dispatch(charactersSlice.actions.success({ items, page }));
  } catch (e) {
    dispatch(charactersSlice.actions.failure);
  }
};
