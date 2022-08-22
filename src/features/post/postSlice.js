import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    page: 0,
    posts: [],
    filteredPosts: [],
    isLoading: false
  },
  reducers: {
    startLoadingPost: (state) => {
      state.isLoading = true;
    },
    readPost: (state, action) => {
        state.isLoading = false;
        state.page = action.payload.page;
        state.posts = action.payload.posts;
        state.filteredPosts = action.payload.posts;
    },
    loadPost: (state, action) => {
        state.isLoading = false;
        state.filteredPosts = action.payload.posts;
    },
    createPost: (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, action.payload.post];
        state.filteredPosts = [...state.filteredPosts, action.payload.post];
    },
    deletePost: (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.filteredPosts = action.payload.filteredPosts;
    }
  },
});

export const { startLoadingPost, readPost, loadPost, createPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
