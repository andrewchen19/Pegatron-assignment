import { Store } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import allUsersReducer from "./features/allUsers/allUsersSlice";
import userReducer from "./features/user/userSlice";

export const store: Store = configureStore({
  reducer: {
    allUsers: allUsersReducer,
    user: userReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
