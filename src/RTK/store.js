import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice, pokemonSlice } from "./slice";

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
    favorite: favoriteSlice.reducer,
  },
});

export default store;
