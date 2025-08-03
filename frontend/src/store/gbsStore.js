import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const gbsStore = configureStore({
  reducer: {
    loggedInUser: userSlice.reducer,
  },
});
export default gbsStore;
