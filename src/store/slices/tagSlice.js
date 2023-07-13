import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../api/apiService";

const initialState = {
  isLoading: false,
  error: null,
  tagList: [],
  selectedTags: [],
  allTags: [],
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllTagsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.tagList = action.payload;
    },
    addNewTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTag = action.payload;
      state.tagList.push(newTag);
      state.selectedTags.push(newTag);
    },
    updateSelectedTags(state, action) {
      state.selectedTags = action.payload;
    },
  },
});
export const { updateSelectedTags } = tagSlice.actions;

export const getAllTags = () => async (dispatch) => {
  dispatch(tagSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/tags`);
    dispatch(tagSlice.actions.getAllTagsSuccess(response.data));
  } catch (error) {
    dispatch(tagSlice.actions.hasError(error.message));
  }
};

export const addNewTag =
  ({ tag }) =>
  async (dispatch) => {
    dispatch(tagSlice.actions.startLoading());
    try {
      const response = await apiService.post(`/tags`, { tag });
      dispatch(tagSlice.actions.addNewTagSuccess(response.data));
    } catch (error) {
      dispatch(tagSlice.actions.hasError(error.message));
    }
  };
