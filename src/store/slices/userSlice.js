import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../api/apiService";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    error: null,
    updatedProfile: null,
    avatarUrl: "",
    recipeCount: null,
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateAvatarUrl: (state, action) => {
      state.avatarUrl = action.payload;
    },
    getCurrentUserSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userProfile = action.payload;
    },
    updateCurrentUserSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload;
    },
  },
  extraReducers: {},
});

export const { updateAvatarUrl } = userSlice.actions;

export const getCurrentUser = () => async (dispatch) => {
  dispatch(userSlice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(userSlice.actions.updateCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.hasError(error.message));
  }
};

export const updateCurrentUser =
  ({ name, avatarUrl, country }) =>
  async (dispatch) => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await apiService.put("/users/me", {
        name,
        avatarUrl,
        country,
      });
      dispatch(userSlice.actions.updateCurrentUserSuccess(response.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(userSlice.actions.hasError(error.message));
    }
  };
