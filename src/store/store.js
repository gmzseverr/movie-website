// src/store.js
import { configureStore } from "@reduxjs/toolkit";

// Örnek reducer (gerçek projen varsa burada slice dosyalarını import edersin)
const rootReducer = (state = {}, action) => {
  return state;
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
