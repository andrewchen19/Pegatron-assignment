import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  name: string;
  genderOption: string[];
  gender: string;
  birthday: string;
  occupationOption: string[];
  occupation: string;
  phoneNumber: string;
  image: string;
  shouldDeleteId: string;
  isImageUploading: boolean;
}

const defaultState: UserState = {
  name: "",
  genderOption: ["Male", "Female"],
  gender: "Male",
  birthday: "2000-01-01",
  occupationOption: ["Student", "Teacher", "Engineer", "Unemployed"],
  occupation: "Student",
  phoneNumber: "",
  image:
    "https://res.cloudinary.com/dhrtfibhx/image/upload/v1721266453/pegatron/default_wozlch.jpg",
  shouldDeleteId: "",
  isImageUploading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    setUser: (state, action) => {
      const { name, gender, birthday, occupation, phoneNumber, image } =
        action.payload;

      state.name = name;
      state.gender = gender;
      state.birthday = birthday;
      state.occupation = occupation;
      state.phoneNumber = phoneNumber;
      state.image = image;

      localStorage.setItem("User", JSON.stringify(state));
    },
    resetUser: () => {
      localStorage.setItem("User", JSON.stringify(defaultState));
      return defaultState;
    },
    setUserImage: (state, action) => {
      state.image = action.payload;
      localStorage.setItem("User", JSON.stringify(state));
    },
    setShouldDeleteId: (state, action) => {
      state.shouldDeleteId = action.payload;
      localStorage.setItem("User", JSON.stringify(state));
    },
    setImageIsUploading: (state) => {
      state.isImageUploading = true;
      localStorage.setItem("User", JSON.stringify(state));
    },
    setImageIsNotUploading: (state) => {
      state.isImageUploading = false;
      localStorage.setItem("User", JSON.stringify(state));
    },
  },
});

// export single reducer
export const {
  setUser,
  resetUser,
  setUserImage,
  setShouldDeleteId,
  setImageIsUploading,
  setImageIsNotUploading,
} = userSlice.actions;

// export slice.reducer
export default userSlice.reducer;
