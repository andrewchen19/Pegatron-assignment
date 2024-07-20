import { createSlice } from "@reduxjs/toolkit";
import type { UserProps } from "../../types";

// Define a type for the slice state
interface allUsersState {
  users: UserProps[];
  totalUsers: number;
  numOfPages: number;
  layout: string;
  showCreateUserContainer: boolean;
}

const defaultState: allUsersState = {
  users: [],
  totalUsers: 0,
  numOfPages: 1,
  layout: "grid",
  showCreateUserContainer: false,
};

const getLocalStorage = () => {
  return JSON.parse(
    localStorage.getItem("Users") ?? JSON.stringify(defaultState)
  );
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: getLocalStorage(),
  reducers: {
    setAllUsers: (state, action) => {
      const { users, totalUsers, numOfPages } = action.payload.data;

      state.users = users;
      state.totalUsers = totalUsers;
      state.numOfPages = numOfPages;

      localStorage.setItem("Users", JSON.stringify(state));
    },
    setLayout: (state, action) => {
      state.layout = action.payload;

      localStorage.setItem("Users", JSON.stringify(state));
    },
    resetAllUsers: (state) => {
      state.layout = "grid";

      localStorage.setItem("Users", JSON.stringify(state));
    },
  },
});

// export single reducer
export const { setAllUsers, setLayout, resetAllUsers } = allUsersSlice.actions;

// export slice.reducer
export default allUsersSlice.reducer;
