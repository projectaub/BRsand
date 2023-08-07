import { configureStore } from "@reduxjs/toolkit";
import sandwich from "../modules/sandwich";

const store = configureStore({
  reducer: {
    sandwitch: sandwich,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
